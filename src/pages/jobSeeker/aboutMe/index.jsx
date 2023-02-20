import {
  Card,
  CardContent,
  Checkbox,
  FormGroup,
  Radio,
  RadioGroup,
  Stack,
} from "@mui/material";
import React, { useEffect } from "react";
import { SVG } from "@assets/svg";
import { FormControlReminder, FormLabelBox } from "./style";
import { OutlinedButton } from "@components/button";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import {
  HorizontalDateInput,
  HorizontalLabelInput,
  HorizontalPhoneInput,
} from "@components/input";
import { getEducationLevels } from "@redux/slice/choices";
import { validateJobSeekerAboutMe } from "./validator";
import { ErrorMessage } from "@components/caption";
import {
  formatPhoneNumber,
  formatPhoneNumberIntl,
} from "react-phone-number-input";
import { EMPLOYMENT_STATUS } from "@utils/enum";
import { updateJobSeekerAboutMeAPI } from "@api/jobSeeker";

const AboutMe = (props) => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.auth);
  const { educationLevels } = useSelector((state) => state.choices);
  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      mobileNumber: {
        national: "",
        international: "",
        value: "",
      },
      countryCode: "",
      gender: "",
      dob: "",
      employmentStatus: "",
      description: "",
      highestEducation: "",
      marketInformationNotification: false,
      jobNotification: false,
    },
    validationSchema: validateJobSeekerAboutMe,
    onSubmit: async (values) => {
      console.log(values);
      const countryCode = values.mobileNumber.international.split(" ")[0];
      const mobileNumber = (values.mobileNumber.value || "").replace(
        countryCode,
        ""
      );

      const payload = {
        full_name: values.fullName,
        email: values.email,
        mobile_number: mobileNumber,
        country_code: countryCode,
        employment_status: values.employmentStatus,
        description: values.description,
        highest_education: values.highestEducation,
        market_information_notification: values.marketInformationNotification,
        job_notification: values.jobNotification,
      };
      if (payload.mobile_number === currentUser.mobileNumber) {
        delete payload.mobile_number;
        delete payload.country_code;
      }
      if (payload.email === currentUser.email) {
        delete payload.email;
      }
      const res = await updateJobSeekerAboutMeAPI(payload);
      console.log(res);
    },
  });
  useEffect(() => {
    if (!educationLevels.data.length) {
      dispatch(getEducationLevels());
    }
  }, []);
  useEffect(() => {
    const currentUserMobileNumber =
      currentUser.countryCode && currentUser.mobileNumber
        ? currentUser.countryCode + currentUser.mobileNumber
        : "";
    const newState = {
      fullName: currentUser.name,
      email: currentUser.email,
      mobileNumber: {
        national: currentUserMobileNumber
          ? formatPhoneNumber(currentUserMobileNumber)
          : "",
        international: currentUserMobileNumber
          ? formatPhoneNumberIntl(currentUserMobileNumber)
          : "",
        value: currentUserMobileNumber,
      },
      gender: currentUser.profile.gender,
      dob: currentUser.profile.dob,
      employmentStatus: currentUser.profile.employmentStatus,
      description: currentUser.profile.description,
      highestEducation: currentUser.profile.highestEducation || "",
      marketInformationNotification:
        currentUser.profile.marketInformationNotification,
      jobNotification: currentUser.profile.jobNotification,
    };
    for (const key in newState) {
      formik.setFieldValue(key, newState[key]);
    }
  }, [currentUser]);

  return (
    <>
      <Card
        sx={{
          "&.MuiCard-root": {
            boxShadow: "0px 15px 40px rgba(0, 0, 0, 0.05)",
            borderRadius: "10px",
          },
        }}
      >
        <CardContent
          sx={{
            "&.MuiCardContent-root": {
              padding: "30px",
            },
          }}
        >
          <h2 className="mb-4">About Me</h2>
          <form onSubmit={formik.handleSubmit}>
            <HorizontalLabelInput
              placeholder="Full Name"
              label="Full name"
              {...formik.getFieldProps("fullName")}
            />
            {formik.touched.fullName && formik.errors.fullName ? (
              <ErrorMessage>{formik.errors.fullName}</ErrorMessage>
            ) : null}
            <HorizontalLabelInput
              placeholder="Email"
              label="Email"
              {...formik.getFieldProps("email")}
            />
            {formik.touched.email && formik.errors.email ? (
              <ErrorMessage>{formik.errors.email}</ErrorMessage>
            ) : null}
            <HorizontalPhoneInput
              label="Mobile Number (optional)"
              value={""}
              onChange={(e) => formik.setFieldValue("mobileNumber", e)}
              defaultCountry={formik.values.countryCode}
              international
              onCountryChange={(e) => formik.setFieldValue("countryCode", e)}
              isInvalidNumber={(isValid) => {
                if (!isValid) {
                  formik.setFieldError("mobileNumber", "Invalid Mobile Number");
                }
              }}
              onBlur={formik.getFieldProps("mobileNumber").onBlur}
              name="mobileNumber"
            />
            {formik.touched.mobileNumber && formik.errors.mobileNumber ? (
              <ErrorMessage>{formik.errors.mobileNumber}</ErrorMessage>
            ) : null}
            <Stack
              direction={{ xs: "column", lg: "row" }}
              spacing={{ xs: 2, lg: 2, md: 2 }}
              alignItems={{ xs: "start", lg: "center" }}
              className="mb-3"
            >
              <label className="w-30">Gender</label>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                {...formik.getFieldProps("gender")}
              >
                <FormLabelBox
                  value="male"
                  control={
                    <Radio
                      sx={{
                        color: "#CACACA",
                        "&.Mui-checked": {
                          color: "#EEA23D",
                        },
                      }}
                    />
                  }
                  label="Male"
                />
                <FormLabelBox
                  value="female"
                  control={
                    <Radio
                      sx={{
                        color: "#CACACA",
                        "&.Mui-checked": {
                          color: "#EEA23D",
                        },
                      }}
                    />
                  }
                  label="Female"
                />
              </RadioGroup>
            </Stack>
            {formik.touched.gender && formik.errors.gender ? (
              <ErrorMessage>{formik.errors.gender}</ErrorMessage>
            ) : null}
            <HorizontalDateInput
              label="Birth date"
              onChange={(e) => formik.setFieldValue("dob", e)}
              value={formik.values.dob}
              onBlur={formik.getFieldProps("dob").onBlur}
            />
            {formik.touched.dob && formik.errors.dob ? (
              <ErrorMessage>{formik.errors.dob}</ErrorMessage>
            ) : null}
            <HorizontalLabelInput
              label="Employment status"
              type="select"
              placeholder="Select Your status"
              options={Object.keys(EMPLOYMENT_STATUS).map((status) => {
                return {
                  value: EMPLOYMENT_STATUS[status],
                  label: status[0].toUpperCase() + status.substring(1),
                };
              })}
              {...formik.getFieldProps("employmentStatus")}
            />
            {formik.touched.employmentStatus &&
            formik.errors.employmentStatus ? (
              <ErrorMessage>{formik.errors.employmentStatus}</ErrorMessage>
            ) : null}
            <HorizontalLabelInput
              label="Highest education (optional)"
              type="select"
              placeholder="Select Your highest education"
              options={educationLevels.data.map((educationLevel) => ({
                value: educationLevel.id,
                label: educationLevel.title,
              }))}
              {...formik.getFieldProps("highestEducation")}
            />
            <HorizontalLabelInput
              label="Introduce yourself (optional)"
              type="textarea"
              placeholder="Write a few words about yourself"
              {...formik.getFieldProps("description")}
            />
            <FormGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
            >
              <FormControlReminder
                control={
                  <Checkbox
                    icon={<SVG.UncheckIcon />}
                    checkedIcon={<SVG.CheckBoxIcon />}
                    sx={{
                      color: "#CACACA",
                      transition: "all 0.5s ease-out",
                      "&.Mui-checked": {
                        color: "#EEA23D",
                        transition: "all 0.5s ease-out",
                      },
                    }}
                  />
                }
                onChange={(e) =>
                  formik.setFieldValue("jobNotification", e.target.checked)
                }
                checked={formik.values.jobNotification || false}
                label=" I wish to receive Job Application Notifications and other Job-related information from Koor "
              />
              <FormControlReminder
                control={
                  <Checkbox
                    icon={<SVG.UncheckIcon />}
                    checkedIcon={<SVG.CheckBoxIcon />}
                    sx={{
                      color: "#CACACA",
                      transition: "all 0.5s ease-out",
                      "&.Mui-checked": {
                        color: "#EEA23D",
                        transition: "all 0.5s ease-out",
                      },
                    }}
                  />
                }
                onChange={(e) =>
                  formik.setFieldValue(
                    "marketInformationNotification",
                    e.target.checked
                  )
                }
                checked={formik.values.marketInformationNotification || false}
                label="I wish to receive marketing information from Koor and/or service providers on products or services offered by Koor or other parties."
              />
            </FormGroup>
            <div className="text-center mt-5">
              <OutlinedButton
                type="submit"
                title={
                  <>
                    <span className="me-2 d-inline-flex">
                      <SVG.CheckIcon />
                    </span>
                    update info
                  </>
                }
                // onClick={props.handleClickOpen}
                sx={{
                  "&.MuiButton-outlined": {
                    border: "1px solid #EEA23D !important",
                    color: "#EEA23D !important",
                    fontWeight: "500",
                    fontSize: "16px",
                    padding: "10px 30px",
                    "&:hover": { background: "rgba(255, 165, 0, 0.1)" },
                    "@media (max-width: 992px)": {
                      padding: "10px 16px",
                      fontSize: "14px",
                    },
                  },
                }}
              />
            </div>
          </form>
        </CardContent>
      </Card>
    </>
  );
};
export default AboutMe;

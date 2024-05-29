import {
  Box,
  Card,
  CardContent,
  FormGroup,
  IconButton,
  Radio,
  RadioGroup,
  Stack,
} from "@mui/material";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { SVG } from "../../../assets/svg";
import { FormLabelBox } from "./style";
import { OutlinedButton } from "../../../components/button";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import {
  CheckboxInput,
  HorizontalDateInput,
  HorizontalLabelInput,
  HorizontalPhoneInput,
} from "../../../components/input";
import {
  getCities,
  getCountries,
  getEducationLevels,
} from "../../../redux/slice/choices";
import { validateJobSeekerAboutMe } from "./validator";
import { ErrorMessage } from "../../../components/caption";
import {
  formatPhoneNumber,
  formatPhoneNumberIntl,
} from "react-phone-number-input";
import { EMPLOYMENT_STATUS } from "../../../utils/enum";
import { updateJobSeekerAboutMeAPI } from "../../../api/jobSeeker";
import { FormControlReminder } from "../../../components/style";
import {
  DATABASE_DATE_FORMAT,
  DATE_FORMAT,
} from "../../../utils/constants/constants";
import { setErrorToast } from "../../../redux/slice/toast";
import { updateCurrentUser } from "../../../redux/slice/user";
import DialogBox from "../../../components/dialogBox";
import NoItem from "../myProfile/noItem";
import { Capacitor } from "@capacitor/core";

const AboutMe = (props) => {
  const dispatch = useDispatch();
  const platform = Capacitor.getPlatform();
  const {
    auth: { currentUser },
    choices: { educationLevels, countries, cities },
  } = useSelector((state) => state);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [filledData, setFilledData] = useState(null);
  const [countryId, setCountryId] = useState("");
  const currentYear = dayjs().year();
  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      mobileNumber: {
        national: "",
        international: "",
        value: "",
      },
      country: "",
      city: "",
      countryCode: "",
      gender: "",
      dob: "",
      employmentStatus: "",
      profileTitle: "",
      description: "",
      highestEducation: "",
      marketInformationNotification: false,
      jobNotification: false,
      experience: "",
    },
    validationSchema: validateJobSeekerAboutMe,
    onSubmit: async (values) => {
      setLoading(true);
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
        dob: dayjs(values.dob).format(DATABASE_DATE_FORMAT),
        gender: values.gender,
        employment_status: values.employmentStatus,
        profile_title: values.profileTitle,
        description: values.description,
        highest_education: values.highestEducation,
        market_information_notification: values.marketInformationNotification,
        job_notification: values.jobNotification,
        country: values.country,
        city: values.city,
        experience: Number(values.experience) || 0,
      };
      if (
        payload.mobile_number === currentUser.mobileNumber ||
        !payload.mobile_number
      ) {
        delete payload.mobile_number;
        delete payload.country_code;
      }
      if (payload.email === currentUser.email) {
        delete payload.email;
      }
      const res = await updateJobSeekerAboutMeAPI(payload);
      setFilledData(formik.values);
      if (res.remote === "success") {
        // dispatch(setSuccessToast("About Me Updated Successfully"));
        setLoading(false);
        handleToggleModel();
        dispatch(
          updateCurrentUser({
            name: values.fullName,
            email: values.email,
            mobileNumber,
            countryCode,
            profile: {
              country: countries.data.find(
                (country) => country.id === values.country
              ),
              city: cities.data[values.country].find(
                (city) => city.id === values.city
              ),
              gender: values.gender,
              dob: dayjs(values.dob).format(DATE_FORMAT),
              employmentStatus: values.employmentStatus,
              profileTitle: values.profileTitle,
              description: values.description,
              highestEducation: educationLevels.data.find(
                (level) => level.id === values.highestEducation
              ),
              marketInformationNotification:
                values.marketInformationNotification,
              jobNotification: values.jobNotification,
              experience: values.experience,
            },
          })
        );
      } else {
        formik.setErrors({ mobileNumber: res.error.errors.mobile_number });
        dispatch(
          setErrorToast(
            res.error.errors.dob ||
              res.error.errors.mobile_number ||
              "Something went wrong"
          )
        );
      }
      setLoading(false);
    },
  });
  useEffect(() => {
    if (filledData) {
      formik.setFieldValue("city", filledData.city);
      formik.setFieldValue("country", filledData.country);
      formik.setFieldValue("description", filledData.description);
      formik.setFieldValue("dob", filledData.dob);
      formik.setFieldValue("email", filledData.email);
      formik.setFieldValue("employmentStatus", filledData.employmentStatus);
      formik.setFieldValue("profileTitle", filledData.profileTitle);
      formik.setFieldValue("experience", filledData.experience);
      formik.setFieldValue("fullName", filledData.fullName);
      formik.setFieldValue("gender", filledData.gender);
      formik.setFieldValue("highestEducation", filledData.highestEducation);
      formik.setFieldValue(
        "marketInformationNotification",
        filledData.marketInformationNotification
      );
      formik.setFieldValue(
        "countryCode",
        filledData.mobileNumber.international.split(" ")[0]
      );
      formik.setFieldValue("mobileNumber", {
        national: filledData.mobileNumber.national,
        international: filledData.mobileNumber.international,
        value: filledData.mobileNumber.value,
      });
    }
  }, [filledData]);
  useEffect(() => {
    if (!educationLevels.data.length) {
      dispatch(getEducationLevels());
    }
    if (!countries.data.length) {
      dispatch(getCountries());
    }
  }, []);
  useEffect(() => {
    if (formik.values.country) {
      setCountryId(formik.values.country);
    }
    if (countryId) {
      dispatch(getCities({ countryId }));
    }
  }, [formik.values.country, countryId]);
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
      country: currentUser.profile.country?.id || "",
      city: currentUser.profile.city?.id || "",
      gender: currentUser.profile.gender,
      dob: currentUser.profile.dob ? dayjs(currentUser.profile.dob) : "",
      employmentStatus: currentUser.profile.employmentStatus,
      profileTitle: currentUser.profile.profileTitle,
      description: currentUser.profile.description,
      highestEducation: currentUser.profile.highestEducation?.id || "",
      marketInformationNotification:
        currentUser.profile.marketInformationNotification,
      jobNotification: currentUser.profile.jobNotification,
      experience: currentUser.profile.experience || "",
    };
    for (const key in newState) {
      formik.setFieldValue(key, newState[key]);
    }
  }, [currentUser]);
  const handleToggleModel = () => {
    if (Object.keys(formik.errors).length === 0) {
      setOpen(!open);
    }
  };
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
          <div className="add-content">
            <Stack
              spacing={2}
              direction={"row"}
              alignItems={"center"}
              justifyContent={"space-between"}
            >
              <h2 className="mb-0">About</h2>
              {platform === "android" || platform === "ios" ? (
                <IconButton size="small" onClick={() => props.fun()}>
                  <SVG.ArrowUpIcon />
                </IconButton>
              ) : null}
            </Stack>
            {platform === "android" || platform === "ios" ? (
              <>
                {props.toggle ? (
                  <form onSubmit={formik.handleSubmit} className="mt-4">
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
                      disabled="true"
                      title="You can not update the email"
                      {...formik.getFieldProps("email")}
                    />
                    {formik.touched.email && formik.errors.email ? (
                      <ErrorMessage>{formik.errors.email}</ErrorMessage>
                    ) : null}
                    <HorizontalPhoneInput
                      label="Mobile Number"
                      value={formik.values.mobileNumber.value}
                      onChange={(e) => formik.setFieldValue("mobileNumber", e)}
                      defaultCountry={formik.values.countryCode}
                      international
                      onCountryChange={(e) =>
                        formik.setFieldValue("countryCode", e)
                      }
                      isInvalidNumber={(isValid) => {
                        if (!isValid) {
                          formik.setFieldError(
                            "mobileNumber",
                            "Invalid Mobile Number"
                          );
                        }
                      }}
                      onBlur={formik.getFieldProps("mobileNumber").onBlur}
                      name="mobileNumber"
                    />
                    {formik.touched.mobileNumber &&
                    formik.errors.mobileNumber ? (
                      <ErrorMessage>{formik.errors.mobileNumber}</ErrorMessage>
                    ) : null}
                    <Stack
                      direction={{ xs: "row", lg: "row" }}
                      spacing={{ xs: 2, lg: 2, md: 2 }}
                      alignItems={{ xs: "center", lg: "center" }}
                      className="mb-3"
                    >
                      <label style={{ width: "30%" }}>Gender</label>
                      <div style={{ width: "70%" }}>
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
                      </div>
                    </Stack>
                    {formik.touched.gender && formik.errors.gender ? (
                      <ErrorMessage>{formik.errors.gender}</ErrorMessage>
                    ) : null}
                    <HorizontalDateInput
                      label="Birth date"
                      onChange={(e) => formik.setFieldValue("dob", e)}
                      value={formik.values.dob}
                      onBlur={formik.getFieldProps("dob").onBlur}
                      maxDate={dayjs(`${currentYear}-12-31`)}
                      openTo="year"
                      className="labelbox"
                      inputProps={{
                        placeholder: "Select year",
                      }}
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
                      <ErrorMessage>
                        {formik.errors.employmentStatus}
                      </ErrorMessage>
                    ) : null}
                    <HorizontalLabelInput
                      placeholder="Profile Title"
                      label="Profile Title"
                      {...formik.getFieldProps("profileTitle")}
                    />
                    {formik.touched.profileTitle &&
                    formik.errors.profileTitle ? (
                      <ErrorMessage>{formik.errors.profileTitle}</ErrorMessage>
                    ) : null}
                    <HorizontalLabelInput
                      label="Country"
                      type="select"
                      placeholder="Select Country"
                      options={countries.data.map((country) => ({
                        value: country.id,
                        label: country.title,
                      }))}
                      {...formik.getFieldProps("country")}
                    />
                    {formik.touched.country && formik.errors.country ? (
                      <ErrorMessage>{formik.errors.country}</ErrorMessage>
                    ) : null}
                    {formik.values.country && (
                      <HorizontalLabelInput
                        label="City"
                        type="select"
                        placeholder="City"
                        disabled={!formik.values.country}
                        options={(cities.data[formik.values.country] || []).map(
                          (educationLevel) => ({
                            value: educationLevel.id,
                            label: educationLevel.title,
                          })
                        )}
                        {...formik.getFieldProps("city")}
                      />
                    )}
                    {formik.touched.city && formik.errors.city ? (
                      <ErrorMessage>{formik.errors.city}</ErrorMessage>
                    ) : null}
                    <HorizontalLabelInput
                      type="number"
                      placeholder="Experience"
                      label="No of Experience (Years)"
                      {...formik.getFieldProps("experience")}
                    />
                    {formik.touched.experience && formik.errors.experience ? (
                      <ErrorMessage>{formik.errors.experience}</ErrorMessage>
                    ) : null}
                    <HorizontalLabelInput
                      label="Highest education"
                      type="select"
                      placeholder="Select Your highest education"
                      options={educationLevels.data.map((educationLevel) => ({
                        value: educationLevel.id,
                        label: educationLevel.title,
                      }))}
                      {...formik.getFieldProps("highestEducation")}
                    />
                    {formik.touched.highestEducation &&
                    formik.errors.highestEducation ? (
                      <ErrorMessage>
                        {formik.errors.highestEducation}
                      </ErrorMessage>
                    ) : null}
                    <HorizontalLabelInput
                      label="Introduce yourself"
                      type="textarea"
                      placeholder="Write a few words about yourself"
                      {...formik.getFieldProps("description")}
                    />
                    {formik.touched.description && formik.errors.description ? (
                      <ErrorMessage>{formik.errors.description}</ErrorMessage>
                    ) : null}
                    <FormGroup
                      row
                      aria-labelledby="demo-row-radio-buttons-group-label"
                      name="row-radio-buttons-group"
                    >
                      <FormControlReminder
                        sx={{
                          display: "flex",
                          alignItems: "start",
                        }}
                        control={
                          <CheckboxInput
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
                            "jobNotification",
                            e.target.checked
                          )
                        }
                        checked={formik.values.jobNotification || false}
                        label=" I wish to receive Job Application Notifications and other Job-related information from Koor "
                      />
                      <FormControlReminder
                        sx={{
                          display: "flex",
                          alignItems: "start",
                        }}
                        control={
                          <CheckboxInput
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
                        checked={
                          formik.values.marketInformationNotification || false
                        }
                        label="I wish to receive marketing information from Koor and/or service providers on products or services offered by Koor or other parties."
                      />
                    </FormGroup>
                    <div className="text-center mt-5">
                      <OutlinedButton
                        disabled={loading}
                        type="submit"
                        title={
                          <>
                            {loading ? (
                              "Updating..."
                            ) : (
                              <>
                                <span className="me-2 d-inline-flex">
                                  <SVG.CheckIcon />
                                </span>
                                update info
                              </>
                            )}
                          </>
                        }
                        sx={{
                          "&.MuiButton-outlined": {
                            border: "1px solid #EEA23D !important",
                            color: "#EEA23D !important",
                            fontWeight: "500",
                            fontSize: "16px",
                            padding: "10px 30px",
                            width: "191px",
                            height: "42px",
                            "&:hover": { background: "rgba(255, 165, 0, 0.1)" },
                            "@media (max-width: 992px)": {
                              padding: "10px 16px",
                              fontSize: "16px",
                            },
                            "@media (max-width: 480px)": {
                              width: "174px",
                              fontSize: "14px",
                              padding: "10px 10px !important",
                            },
                          },
                        }}
                      />
                    </div>
                  </form>
                ) : (
                  ""
                )}
              </>
            ) : (
              <form onSubmit={formik.handleSubmit} className="mt-4">
                <Box className="job_profile_date">
                  <HorizontalLabelInput
                    placeholder="Full Name"
                    label="Full name"
                    {...formik.getFieldProps("fullName")}
                  />
                  {formik.touched.fullName && formik.errors.fullName ? (
                    <ErrorMessage>{formik.errors.fullName}</ErrorMessage>
                  ) : null}
                  {/* <HorizontalLabelInput
                  placeholder="Email"
                  label="Email"
                  disabled="true"
                  title="You can not update the email"
                  {...formik.getFieldProps("email")}
                />
                {formik.touched.email && formik.errors.email ? (
                  <ErrorMessage>{formik.errors.email}</ErrorMessage>
                ) : null} */}
                  <HorizontalPhoneInput
                    label="Mobile Number"
                    value={formik.values.mobileNumber.value}
                    onChange={(e) => formik.setFieldValue("mobileNumber", e)}
                    defaultCountry={formik.values.countryCode}
                    international
                    onCountryChange={(e) =>
                      formik.setFieldValue("countryCode", e)
                    }
                    isInvalidNumber={(isValid) => {
                      if (!isValid) {
                        formik.setFieldError(
                          "mobileNumber",
                          "Invalid Mobile Number"
                        );
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
                  <Box className="job_profile_date">
                    <HorizontalDateInput
                      label="Birth date"
                      onChange={(e) => formik.setFieldValue("dob", e)}
                      value={formik.values.dob}
                      onBlur={formik.getFieldProps("dob").onBlur}
                      maxDate={dayjs(`${currentYear}-12-31`)}
                      openTo="year"
                      className="labelbox"
                      inputProps={{
                        placeholder: "Select year",
                      }}
                    />
                  </Box>
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
                    <ErrorMessage>
                      {formik.errors.employmentStatus}
                    </ErrorMessage>
                  ) : null}
                  <HorizontalLabelInput
                    placeholder="Profile Title"
                    label="Profile Title"
                    {...formik.getFieldProps("profileTitle")}
                  />
                  {formik.touched.profileTitle && formik.errors.profileTitle ? (
                    <ErrorMessage>{formik.errors.profileTitle}</ErrorMessage>
                  ) : null}
                  <HorizontalLabelInput
                    label="Country"
                    type="select"
                    placeholder="Select Country"
                    options={countries.data.map((country) => ({
                      value: country.id,
                      label: country.title,
                    }))}
                    {...formik.getFieldProps("country")}
                  />
                  {formik.touched.country && formik.errors.country ? (
                    <ErrorMessage>{formik.errors.country}</ErrorMessage>
                  ) : null}
                  <HorizontalLabelInput
                    label="City"
                    type="select"
                    placeholder={
                      formik.values.country ? "City" : "Select Country first"
                    }
                    disabled={!formik.values.country}
                    options={(cities.data[formik.values.country] || []).map(
                      (educationLevel) => ({
                        value: educationLevel.id,
                        label: educationLevel.title,
                      })
                    )}
                    {...formik.getFieldProps("city")}
                  />
                  {formik.touched.city && formik.errors.city ? (
                    <ErrorMessage>{formik.errors.city}</ErrorMessage>
                  ) : null}
                  <HorizontalLabelInput
                    type="number"
                    placeholder="Experience"
                    label="No of Experience (Years)"
                    {...formik.getFieldProps("experience")}
                  />
                  {formik.touched.experience && formik.errors.experience ? (
                    <ErrorMessage>{formik.errors.experience}</ErrorMessage>
                  ) : null}
                  <HorizontalLabelInput
                    label="Highest education"
                    type="select"
                    placeholder="Select Your highest education"
                    options={educationLevels.data.map((educationLevel) => ({
                      value: educationLevel.id,
                      label: educationLevel.title,
                    }))}
                    {...formik.getFieldProps("highestEducation")}
                  />
                  {formik.touched.highestEducation &&
                  formik.errors.highestEducation ? (
                    <ErrorMessage>
                      {formik.errors.highestEducation}
                    </ErrorMessage>
                  ) : null}
                  <HorizontalLabelInput
                    label="Introduce yourself"
                    type="textarea"
                    placeholder="Write a few words about yourself"
                    {...formik.getFieldProps("description")}
                  />
                  {formik.touched.description && formik.errors.description ? (
                    <ErrorMessage>{formik.errors.description}</ErrorMessage>
                  ) : null}
                  <FormGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                  >
                    <FormControlReminder
                      sx={{
                        display: "flex",
                        alignItems: "start",
                      }}
                      control={
                        <CheckboxInput
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
                          "jobNotification",
                          e.target.checked
                        )
                      }
                      checked={formik.values.jobNotification || false}
                      label=" I wish to receive Job Application Notifications and other Job-related information from Koor "
                    />
                    <FormControlReminder
                      sx={{
                        display: "flex",
                        alignItems: "start",
                      }}
                      control={
                        <CheckboxInput
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
                      checked={
                        formik.values.marketInformationNotification || false
                      }
                      label="I wish to receive marketing information from Koor and/or service providers on products or services offered by Koor or other parties."
                    />
                  </FormGroup>
                  <div className="text-center mt-5">
                    <OutlinedButton
                      disabled={loading}
                      type="submit"
                      title={
                        <>
                          {loading ? (
                            "Updating..."
                          ) : (
                            <>
                              <span className="me-2 d-inline-flex">
                                <SVG.CheckIcon />
                              </span>
                              update info
                            </>
                          )}
                        </>
                      }
                      sx={{
                        "&.MuiButton-outlined": {
                          border: "1px solid #EEA23D !important",
                          color: "#EEA23D !important",
                          fontWeight: "500",
                          fontSize: "16px",
                          padding: "10px 30px",
                          width: "191px",
                          height: "42px",
                          "&:hover": { background: "rgba(255, 165, 0, 0.1)" },
                          "@media (max-width: 992px)": {
                            padding: "10px 16px",
                            fontSize: "16px",
                          },
                          "@media (max-width: 480px)": {
                            width: "174px",
                            fontSize: "14px",
                            padding: "10px 10px !important",
                          },
                        },
                      }}
                    />
                  </div>
                </Box>
              </form>
            )}
          </div>
        </CardContent>
      </Card>
      <DialogBox open={open} handleClose={handleToggleModel}>
        <div className="add-content">
          <h2
            className={`mb-4 ${
              platform === "android" || platform === "ios"
                ? "text-start"
                : "text-center"
            }`}
          >
            Great!
          </h2>
          <>
            <div>
              <NoItem
                icon={<SVG.AlertCheckICon />}
                description={
                  <p>
                    Your profile has been updated, Thank you for adding this
                    important information.
                  </p>
                }
              />
            </div>
          </>

          <div className="text-center mt-4">
            <OutlinedButton
              onClick={handleToggleModel}
              title={<>Got It</>}
              sx={{
                "&.MuiButtonBase-root": {
                  border: "1px solid #EEA23D !important",
                  color: "#EEA23D !important",
                  fontSize: "16px",
                  padding: "6px 30px !important",
                  "&:hover": { background: "#eea23d14" },
                  "@media (max-width: 992px)": {
                    padding: "10px 16px",
                    fontSize: "14px",
                  },
                },
              }}
            />
          </div>
        </div>
      </DialogBox>
    </>
  );
};
export default AboutMe;

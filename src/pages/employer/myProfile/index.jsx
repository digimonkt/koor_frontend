import { OutlinedButton } from "@components/button";
import {
  AttachmentDragNDropInput,
  CheckboxInput,
  HorizontalLabelInput,
  HorizontalPhoneInput,
  ProfilePicInput,
} from "@components/input";
import { ORGANIZATION_TYPE } from "@utils/enum";
import {
  Card,
  CardContent,
  // FormControl,
  FormGroup,
  Grid,
  Stack,
  FormControlLabel,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { validateEmployerAboutMe } from "../validator";
import { ErrorMessage } from "@components/caption";
import { updateEmployerAboutMe } from "@api/employer";
import { useDispatch, useSelector } from "react-redux";
import {
  formatPhoneNumber,
  formatPhoneNumberIntl,
} from "react-phone-number-input";
import Loader from "@components/loader";
import { UpdateProfileImageAPI } from "@api/user";
import { ErrorToast, SuccessToast } from "@components/toast";
import { setProfilePic } from "@redux/slice/user";
const FormControlReminder = styled(FormControlLabel)`
  & .MuiFormControlLabel-label {
    font-family: "Poppins";
    font-style: normal;
    font-weight: 400;
    font-size: 12px;

    color: #121212;
  }
`;
function MyProfileComponent() {
  const { currentUser } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const [profilePicLoading, setProfilePicLoading] = useState("");
  const formik = useFormik({
    initialValues: {
      organizationName: "",
      organizationType: ORGANIZATION_TYPE.business,
      mobileNumber: {
        national: "",
        international: "",
        value: "",
      },
      countryCode: "",
      licenseId: "",
      license: [],
      marketingInformationNotification: false,
      otherNotification: false,
    },
    validationSchema: validateEmployerAboutMe,
    onSubmit: async (values) => {
      setLoading(true);
      const countryCode = values.mobileNumber.international.split(" ")[0];
      const mobileNumber = (values.mobileNumber.value || "").replace(
        countryCode,
        ""
      );

      const payload = {
        organization_type: values.organizationType,
        organization_name: values.organizationName,
        market_information_notification:
          values.marketingInformationNotification,
        other_notification: values.otherNotification,
        license_id: values.licenseId,
        license: values.license[0],
        mobile_number: mobileNumber,
        country_code: countryCode,
      };
      if (payload.mobile_number === currentUser.mobileNumber) {
        delete payload.mobile_number;
        delete payload.country_code;
      }
      const formData = new FormData();
      for (const key in payload) {
        if (payload[key]) formData.append(key, payload[key]);
      }
      const res = await updateEmployerAboutMe(formData);
      if (res.remote === "success") {
        console.log({ res });
        setLoading(false);
      } else {
        console.log({ res });
        setLoading(false);
      }
    },
  });
  useEffect(() => {
    if (currentUser) {
      const currentUserMobileNumber =
        currentUser.countryCode && currentUser.mobileNumber
          ? currentUser.countryCode + currentUser.mobileNumber
          : "";
      formik.setFieldValue("organizationName", currentUser.name);
      formik.setFieldValue(
        "organizationType",
        currentUser.profile.organizationType
      );
      formik.setFieldValue("licenseId", currentUser.profile.licenseId);
      formik.setFieldValue("license", [currentUser.profile.licenseIdFile]);
      formik.setFieldValue("mobileNumber", {
        national: currentUserMobileNumber
          ? formatPhoneNumber(currentUserMobileNumber)
          : "",
        international: currentUserMobileNumber
          ? formatPhoneNumberIntl(currentUserMobileNumber)
          : "",
        value: currentUserMobileNumber,
      });
    }
  }, [currentUser]);
  const dispatch = useDispatch();
  const handleProfilePicSave = async (file) => {
    setProfilePicLoading("loading");
    const newFormData = new FormData();
    newFormData.append("profile_image", file);
    dispatch(setProfilePic(URL.createObjectURL(file)));
    const res = await UpdateProfileImageAPI(newFormData);
    if (res.remote === "success") setProfilePicLoading("updated");
    else setProfilePicLoading("error");
  };

  return (
    <>
      <Stack direction="row" spacing={3} className="mb-3" alignItems={"center"}>
        <h1 className="headding m-0">Add info to complete your profile</h1>
        {/* <span className="later" style={{ color: "#274593" }}>
          Do it later
        </span> */}
      </Stack>

      <Grid container spacing={2}>
        <Grid item lg={6} xs={12}>
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
                <h2 className="mb-4">About</h2>
                <form onSubmit={formik.handleSubmit}>
                  <HorizontalLabelInput
                    placeholder="Organization Name"
                    label="Organization Name"
                    {...formik.getFieldProps("organizationName")}
                  />
                  {formik.touched.organizationName &&
                  formik.errors.organizationName ? (
                    <ErrorMessage>
                      {formik.errors.organizationName}
                    </ErrorMessage>
                  ) : null}
                  <HorizontalLabelInput
                    label="Type of the organization"
                    type="select"
                    options={[
                      {
                        value: ORGANIZATION_TYPE.business,
                        label: "Business",
                      },
                      {
                        value: ORGANIZATION_TYPE.ngo,
                        label: "NGO",
                      },
                      {
                        value: ORGANIZATION_TYPE.government,
                        label: "Government",
                      },
                    ]}
                    {...formik.getFieldProps("organizationType")}
                  />

                  <HorizontalPhoneInput
                    label="Mobile Number (optional)"
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
                  />
                  {formik.touched.mobileNumber && formik.errors.mobileNumber ? (
                    <ErrorMessage>{formik.errors.mobileNumber}</ErrorMessage>
                  ) : null}
                  <HorizontalLabelInput
                    placeholder="License ID"
                    label="License ID"
                    {...formik.getFieldProps("licenseId")}
                  />

                  <Stack
                    direction="row"
                    spacing={2}
                    alignItems="center"
                    className="dashedborder mb-3"
                  >
                    <AttachmentDragNDropInput
                      handleDrop={(e) => formik.setFieldValue("license", e)}
                      single
                      files={formik.values.license}
                      deleteFile={(e) => formik.setFieldValue("license", [])}
                    />
                  </Stack>
                  {formik.touched.license && formik.errors.license ? (
                    <ErrorMessage>{formik.errors.license}</ErrorMessage>
                  ) : null}
                  <FormGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                  >
                    <FormControlReminder
                      onChange={(e) =>
                        formik.setFieldValue(
                          "otherNotification",
                          e.target.checked
                        )
                      }
                      checked={formik.values.otherNotification}
                      control={<CheckboxInput />}
                      label=" I wish to receive notifications and other related information from Koor"
                    />
                  </FormGroup>
                  <FormGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                  >
                    <FormControlReminder
                      onChange={(e) =>
                        formik.setFieldValue(
                          "marketingInformationNotification",
                          e.target.checked
                        )
                      }
                      checked={formik.values.marketingInformationNotification}
                      control={<CheckboxInput />}
                      label="I wish to receive marketing information from Koor and/or service providers on products or services offered by Koor or other parties."
                    />
                  </FormGroup>
                  <div className="text-center mt-3">
                    <OutlinedButton
                      variant="outlined"
                      title={
                        loading ? <Loader loading={loading} /> : "Update Info"
                      }
                      type="submit"
                      disabled={loading}
                    />
                  </div>
                </form>
              </div>
            </CardContent>
          </Card>
        </Grid>
        <Grid item lg={6} xs={12}>
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
              <ProfilePicInput
                title="Your organization logo"
                textColor="#274593"
                color="#274593"
                bgColor="rgba(40, 71, 146, 0.1)"
                handleSave={handleProfilePicSave}
                image={currentUser.profileImage}
                loading={profilePicLoading === "loading"}
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <SuccessToast
        open={profilePicLoading === "updated"}
        message="Profile Pic Updated successfully"
      />
      <ErrorToast
        open={profilePicLoading === "error"}
        message="Something went wrong"
      />
    </>
  );
}

export default MyProfileComponent;

import { OutlinedButton } from "@components/button";
import {
  AttachmentDragNDropInput,
  CheckboxInput,
  HorizontalLabelInput,
  HorizontalPhoneInput,
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
import React from "react";
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
    onSubmit: (values) => {
      const payload = {
        organization_type: values.organizationType,
        organization_name: values.organizationName,
        market_information_notification:
          values.marketingInformationNotification,
        other_notification: values.otherNotification,
        license_id: values.licenseId,
        license: values.license[0],
        mobile_number: values.mobileNumber.national,
        country_code: values.mobileNumber.international.split(" ")[0],
      };
      const formData = new FormData();
      for (const key in payload) {
        formData.append(key, payload[key]);
      }
      console.log({ payload });
    },
  });
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
                    label="Organization Name"
                    {...formik.getFieldProps("organizationName")}
                  />
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

                  <HorizontalLabelInput
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
                  <FormGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                  >
                    <FormControlReminder
                      value="wish"
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
                      value="wish"
                      control={<CheckboxInput />}
                      label=" I wish to receive marketing information from Koor and/or service providers on products or services offered by Koor or other parties."
                    />
                  </FormGroup>
                  <div className="text-center mt-3">
                    <OutlinedButton
                      variant="outlined"
                      title="update info"
                      type="submit"
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
              {/* <UploadFile
                title="Your organization logo"
                textcolor="#274593"
                color="#274593"
                bgcolor="rgba(40, 71, 146, 0.1)"
              /> */}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}

export default MyProfileComponent;

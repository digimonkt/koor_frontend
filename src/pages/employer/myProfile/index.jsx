import { OutlinedButton } from "@components/button";
import {
  AttachmentDragNDropInput,
  CheckboxInput,
  HorizontalLabelInput,
  HorizontalPhoneInput,
  ProfilePicInput,
} from "@components/input";
import {
  Card,
  CardContent,
  // FormControl,
  FormGroup,
  Grid,
  Stack,
} from "@mui/material";
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
import { GetSuggestedAddressAPI, UpdateProfileImageAPI } from "@api/user";
import { ErrorToast, SuccessToast } from "@components/toast";
import { setProfilePic, updateCurrentUser } from "@redux/slice/user";
import { FormControlReminder } from "@components/style";
// import { setSuccessToast } from "@redux/slice/toast";
import DialogBox from "@components/dialogBox";
import NoItem from "@pages/jobSeeker/myProfile/noItem";
import { SVG } from "@assets/svg";
import { getCities, getCountries, getTenderSector } from "@redux/slice/choices";
import { useDebounce } from "usehooks-ts";
import styles from "./myProfile.module.css";
function MyProfileComponent() {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const [profilePicLoading, setProfilePicLoading] = useState("");
  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [suggestedAddress, setSuggestedAddress] = useState([]);
  const { countries, cities, sectors } = useSelector((state) => state.choices);
  const debouncedSearchValue = useDebounce(searchValue, 500);
  const formik = useFormik({
    initialValues: {
      organizationName: "",
      organizationType: "",
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
      country: "",
      city: "",
      address: "",
      description: "",
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
        country: values.country,
        city: values.city,
        address: values.address,
        description: values.description,
        license_id: values.licenseId,
        license: values.license[0],
        mobile_number: mobileNumber,
        country_code: countryCode,
      };
      if (payload.mobile_number === currentUser.mobileNumber) {
        delete payload.mobile_number;
        delete payload.country_code;
      }
      if (payload.license_id === currentUser.profile.licenseId) {
        delete payload.license_id;
      }
      const formData = new FormData();
      for (const key in payload) {
        if (key === "license") {
          if (payload[key] instanceof File) {
            formData.append(key, payload[key]);
          }
        } else {
          if (payload[key]) formData.append(key, payload[key]);
        }
      }
      const res = await updateEmployerAboutMe(formData);
      if (res.remote === "success") {
        // dispatch(setSuccessToast("Updated Successfully"));
        handleToggleModel();
        dispatch(
          updateCurrentUser({
            name: values.organizationName,
            mobileNumber,
            countryCode,
            profile: {
              // website: values.website,
              organizationType: sectors.data.find(
                (sector) => sector.id === values.organizationType
              ),
              licenseId: values.licenseId,
              licenseIdFile: values.license[0],
              marketingInformationNotification:
                values.marketingInformationNotification,
              otherNotification: values.otherNotification,
              country: countries.data.find(
                (country) => country.id === values.country
              ),
              city: cities.data[values.country]?.find(
                (city) => city.id === values.city
              ),
              address: values.address,
            },
          })
        );
        setLoading(false);
      } else {
        console.log({ res });
        setLoading(false);
      }
    },
  });
  const getSuggestedAddress = async (search) => {
    const res = await GetSuggestedAddressAPI(search);
    if (res.remote === "success") {
      setSuggestedAddress(res.data.predictions);
    }
  };
  useEffect(() => {
    if (formik.values.country && !cities.data[formik.values.country]?.length) {
      dispatch(getCities({ countryId: formik.values.country }));
    }
  }, [formik.values.country]);
  useEffect(() => {
    if (!countries.data.length) {
      dispatch(getCountries());
    }
    if (!sectors.data.length) {
      dispatch(getTenderSector());
    }
  }, []);
  useEffect(() => {
    if (
      debouncedSearchValue &&
      debouncedSearchValue !== formik.values.address
    ) {
      getSuggestedAddress(debouncedSearchValue);
    }
  }, [debouncedSearchValue]);
  useEffect(() => {
    if (currentUser) {
      const currentUserMobileNumber =
        currentUser.countryCode && currentUser.mobileNumber
          ? currentUser.countryCode + currentUser.mobileNumber
          : "";
      formik.setFieldValue("organizationName", currentUser.name);
      formik.setFieldValue(
        "organizationType",
        currentUser.profile.organizationType?.id
      );
      formik.setFieldValue("country", currentUser.profile.country.id || "");
      formik.setFieldValue("city", currentUser.profile.city.id || "");
      formik.setFieldValue("address", currentUser.profile.address);
      setSearchValue(currentUser.profile.address);
      formik.setFieldValue("description", currentUser.profile.description);
      formik.setFieldValue("licenseId", currentUser.profile.licenseId);
      formik.setFieldValue(
        "license",
        currentUser.profile.licenseIdFile
          ? [currentUser.profile.licenseIdFile]
          : []
      );
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
  const handleProfilePicSave = async (file) => {
    setProfilePicLoading("loading");
    const newFormData = new FormData();
    newFormData.append("profile_image", file);
    dispatch(setProfilePic(URL.createObjectURL(file)));
    const res = await UpdateProfileImageAPI(newFormData);
    if (res.remote === "success") setProfilePicLoading("updated");
    else setProfilePicLoading("error");
  };

  const handleToggleModel = () => {
    if (Object.keys(formik.errors).length === 0) {
      setOpen(!open);
    }
  };
  return (
    <>
      <Stack direction="row" spacing={3} className="mb-3" alignItems={"center"}>
        <h1 className="heading m-0">Add info to complete your profile</h1>
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
                    placeholder="Type of the organization"
                    type="select"
                    options={sectors.data.map((sector) => ({
                      value: sector.id,
                      label: sector.title,
                    }))}
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
                    placeholder="Country"
                    label="Country"
                    type="select"
                    options={countries.data.map((country) => ({
                      value: country.id,
                      label: country.title,
                    }))}
                    {...formik.getFieldProps("country")}
                  />
                  <HorizontalLabelInput
                    placeholder="City"
                    label="City"
                    type="select"
                    options={(cities.data[formik.values.country] || []).map(
                      (country) => ({
                        value: country.id,
                        label: country.title,
                      })
                    )}
                    {...formik.getFieldProps("city")}
                  />
                  <HorizontalLabelInput
                    label="Address"
                    type="text"
                    placeholder="Address"
                    className="add-form-control"
                    name={formik.getFieldProps("address").name}
                    onBlur={(e) => formik.getFieldProps("address").onBlur}
                    onChange={(e) => setSearchValue(e.target.value)}
                    value={searchValue}
                  />
                  {debouncedSearchValue &&
                    searchValue !== formik.values.address && (
                      <div className={styles.search_results_box}>
                        {suggestedAddress.map((address) => {
                          return (
                            <div
                              key={address.description}
                              className={styles.search_results}
                              onClick={() => {
                                formik.setFieldValue(
                                  "address",
                                  address.description
                                );
                                setSearchValue(address.description);
                              }}
                            >
                              {address.description}
                            </div>
                          );
                        })}
                      </div>
                    )}
                  <HorizontalLabelInput
                    placeholder="Description"
                    label="Description"
                    type="textarea"
                    {...formik.getFieldProps("description")}
                  />
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
      <DialogBox open={open} handleClose={handleToggleModel}>
        <div className="add-content">
          <h2 className="mb-4">Great!</h2>
          <>
            <div>
              <NoItem
                bgColor="#D9D9D9"
                color="#274593"
                icon={<SVG.AlertCheckICon />}
                description={
                  <p>
                    Thank you for adding this important information. Our team
                    will review it and activate your account within 24 hours.
                    Psst, it may happen even faster, stay tuned 😉
                  </p>
                }
              />
            </div>
          </>

          <div className="text-center mt-4">
            <OutlinedButton onClick={handleToggleModel} title={<>Got It</>} />
          </div>
        </div>
      </DialogBox>
    </>
  );
}

export default MyProfileComponent;

import {
  Card,
  CardContent,
  FormGroup,
  Grid,
  IconButton,
  Select,
  Stack,
} from "@mui/material";
import React, { useEffect, useState } from "react";

import { styled } from "@mui/material/styles";

import { OutlinedButton } from "../../../components/button";
import DialogBox from "../../../components/dialogBox";
import {
  AttachmentDragNDropInput,
  CheckboxInput,
  HorizontalLabelInput,
  HorizontalPhoneInput,
  ProfilePicInput,
} from "../../../components/input";
import { SVG } from "../../../assets/svg";
import { FormControlReminder } from "../../../components/style";
import { useDispatch, useSelector } from "react-redux";
import {
  getCities,
  getCountries,
  getTenderSector,
} from "../../../redux/slice/choices";
import NoItem from "../../../pages/jobSeeker/myProfile/noItem";
import { useFormik } from "formik";
import { useDebounce } from "usehooks-ts";
import {
  GetSuggestedAddressAPI,
  UpdateProfileImageAPI,
} from "../../../api/user";
import styles from "./myProfile.module.css";
import { ErrorMessage } from "../../../components/caption";
import { validateVendorAboutMe } from "../validate";
import { updateVendorAboutMeAPI } from "../../../api/vendor";
import {
  formatPhoneNumber,
  formatPhoneNumberIntl,
} from "react-phone-number-input";
import { updateCurrentUser, setProfilePic } from "../../../redux/slice/user";
import Sectors from "./sectors";
import Tags from "./tags";
import { Capacitor } from "@capacitor/core";
import { useNavigate } from "react-router-dom";
import { USER_ROLES } from "@utils/enum";
import { setErrorToast } from "@redux/slice/toast";

export const SelectBox = styled(Select)`
  & .MuiSelect-select {
    background: #f0f0f0;
    border-radius: 10px;
  }
  &.MuiInputBase-root {
    border-radius: 10px;
    font-family: "Poppins";
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 22px;

    letter-spacing: 0.02em;

    color: #121212;
  }
  & fieldset {
    display: none;
  }
`;

function MyProfile() {
  const dispatch = useDispatch();
  const platform = Capacitor.getPlatform();
  const [toggle, setToggle] = useState(["about"]);
  const navigate = useNavigate();
  const handleToggleModel2 = (type) => {
    setToggle((prev) =>
      prev.includes(type) ? prev.filter((el) => el !== type) : [...prev, type]
    );
  };

  const {
    auth: { currentUser },
    choices: { countries, cities, sectors },
  } = useSelector((state) => state);
  const [profilePicLoading, setProfilePicLoading] = useState("");
  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [suggestedAddress, setSuggestedAddress] = useState([]);
  const debouncedSearchValue = useDebounce(searchValue, 500);
  const getSuggestedAddress = async (search) => {
    const res = await GetSuggestedAddressAPI(search);
    if (res.remote === "success") {
      setSuggestedAddress(res.data.predictions);
    }
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleToggleModel = () => {
    if (Object.keys(formik.errors).length === 0) {
      setOpen(!open);
    }
  };

  const formik = useFormik({
    initialValues: {
      organizationName: "",
      organizationType: "",
      mobileNumber: {
        nation: "",
        international: "",
        value: "",
      },
      countryCode: "",
      country: "",
      city: "",
      address: "https://",
      website: "",
      description: "",
      businessLicenseId: "",
      businessLicense: [],
      certificationNumber: "",
      certification: [],
      yearsOfOperating: "",
      noOfJobsAsExperience: "",
      marketingInformationNotification: false,
      otherNotification: false,
    },
    validationSchema: validateVendorAboutMe,
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true);
      const countryCode = values.mobileNumber.international.split(" ")[0];
      const mobileNumber = (values.mobileNumber.value || "").replace(
        countryCode,
        ""
      );
      const payload = {
        organization_name: values.organizationName,
        organization_type: values.organizationType,
        license_id: values.businessLicenseId,
        license: values.businessLicense[0],
        registration_number: values.certificationNumber,
        certificate: values.certification[0],
        market_information_notification:
          values.marketingInformationNotification,
        other_notification: values.otherNotification,
        operating_years: values.yearsOfOperating,
        jobs_experience: values.noOfJobsAsExperience,
        description: values.description,
        website: values.website,
        address: values.address,
        country: values.country,
        city: values.city,
        mobile_number: mobileNumber,
        country_code: countryCode,
      };
      if (
        payload.mobile_number === currentUser.mobileNumber ||
        !payload.mobile_number
      ) {
        delete payload.mobile_number;
        delete payload.country_code;
      }
      if (!payload.registration_number) {
        delete payload.registration_number;
      }
      if (!payload.organization_type) {
        delete payload.organization_type;
      }
      const newFormData = new FormData();
      for (const keys in payload) {
        if (payload[keys] !== undefined && payload[keys] !== null) {
          if (payload[keys].forEach) {
            payload[keys].forEach((data) => {
              if (payload[keys] instanceof File) {
                newFormData.append(keys, data);
              }
            });
          } else if (!payload[keys].id) {
            newFormData.append(keys, payload[keys]);
          }
        }
      }

      const response = await updateVendorAboutMeAPI(newFormData);
      if (response.remote === "success") {
        handleToggleModel();
        setSubmitting(false);
        const updatedUser = {
          name: values.organizationName,
          mobileNumber,
          countryCode,
          profile: {
            website: values.website,
            licenseId: values.businessLicenseId,
            licenseIdFile: values.businessLicense[0],
            registrationNumber: values.certificationNumber,
            registrationCertificate: values.certification[0],
            marketingInformationNotification:
              values.marketingInformationNotification,
            otherNotification: values.otherNotification,
            description: values.description,
            operatingYears: values.operatingYears,
            jobsExperience: values.noOfJobsAsExperience,
            organizationType: sectors.data.find(
              (sector) => sector.id === values.organizationType
            ),

            address: values.address,
            country: countries.data.find(
              (country) => country.id === values.country
            ),
            city: cities.data[values.country]?.find(
              (city) => city.id === values.city
            ),
          },
        };
        if (!updatedUser.profile.city) {
          delete updatedUser.profile.city;
        }
        if (!updatedUser.profile.country) {
          delete updatedUser.profile.country;
        }
        dispatch(updateCurrentUser(updatedUser));
      } else {
        dispatch(setErrorToast("Something went wrong"));
        setSubmitting(false);
      }
    },
  });

  const handleProfilePicSave = async (file) => {
    setProfilePicLoading("loading");
    const newFormData = new FormData();
    newFormData.append("profile_image", file);
    dispatch(setProfilePic(URL.createObjectURL(file)));
    const res = await UpdateProfileImageAPI(newFormData);
    if (res.remote === "success") setProfilePicLoading("updated");
    else setProfilePicLoading("error");
  };

  useEffect(() => {
    if (currentUser) {
      const currentUserMobileNumber =
        currentUser.countryCode && currentUser.mobileNumber
          ? currentUser.countryCode + currentUser.mobileNumber
          : "";
      const newFormikState = {
        organizationName: currentUser.name,
        organizationType: currentUser.profile.organizationType?.id || "",
        mobileNumber: {
          national: currentUserMobileNumber
            ? formatPhoneNumber(currentUserMobileNumber)
            : "",
          international: currentUserMobileNumber
            ? formatPhoneNumberIntl(currentUserMobileNumber)
            : "",
          value: currentUserMobileNumber,
        },
        website: currentUser.profile.website,
        country: currentUser.profile.country?.id || "",
        city: currentUser.profile.city?.id || "",
        address: currentUser.profile.address,
        description: currentUser.profile.description,
        businessLicenseId: currentUser.profile.licenseId,
        businessLicense: currentUser.profile.licenseIdFile
          ? [currentUser.profile.licenseIdFile]
          : [],
        certificationNumber: currentUser.profile.registrationNumber,
        certification: currentUser.profile.registrationCertificate
          ? [currentUser.profile.registrationCertificate]
          : [],
        yearsOfOperating: currentUser.profile.operatingYears,
        noOfJobsAsExperience: currentUser.profile.jobsExperience,
        marketingInformationNotification:
          currentUser.profile.marketInformationNotification,
        otherNotification: !!currentUser.profile.otherNotification,
      };
      setSearchValue(currentUser.profile.address);
      for (const key in newFormikState) {
        formik.setFieldValue(key, newFormikState[key]);
      }
    }
  }, [currentUser]);
  console.log({ currentUser });
  useEffect(() => {
    if (!countries.data.length) {
      dispatch(getCountries());
    }
    if (!sectors.data.length) {
      dispatch(getTenderSector());
    }
  }, []);
  useEffect(() => {
    if (formik.values.country && !cities.data[formik.values.country]?.length) {
      dispatch(getCities({ countryId: formik.values.country }));
    }
  }, [formik.values.country]);
  useEffect(() => {
    if (
      debouncedSearchValue &&
      debouncedSearchValue !== formik.values.address
    ) {
      getSuggestedAddress(debouncedSearchValue);
    }
  }, [debouncedSearchValue]);
  console.log(formik.isSubmitting, "her");
  return (
    <>
      {!currentUser?.profileCompleted && (
        <Stack
          direction={{ xs: "column", lg: "row" }}
          alignItems={{ xs: "start" }}
          spacing={{ xs: 1, lg: 3 }}
          className="mb-3"
        >
          <h1 className="heading m-0">Add info to complete your profile</h1>
          <span
            onClick={() => navigate(`/${USER_ROLES.vendor}/dashboard`)}
            className="later mt-2"
            style={{
              color: "#274593",
            }}
          >
            Do it later
          </span>
        </Stack>
      )}

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
                <Stack
                  spacing={2}
                  direction={"row"}
                  alignItems={"center"}
                  justifyContent={"space-between"}
                >
                  {platform === "android" || platform === "ios" ? (
                    <Stack direction="row" alignItems="flex-end">
                      <IconButton onClick={() => navigate(-1)}>
                        <SVG.LeftArrow />
                      </IconButton>
                      <h2 className="mb-0">About</h2>
                    </Stack>
                  ) : (
                    <h2 className="mb-0">About</h2>
                  )}
                  {platform === "android" || platform === "ios" ? (
                    <IconButton
                      size="small"
                      onClick={() => handleToggleModel2("about")}
                    >
                      <SVG.ArrowUpIcon />
                    </IconButton>
                  ) : null}
                </Stack>
                {platform === "android" || platform === "ios" ? (
                  <>
                    {toggle.includes("about") ? (
                      <form
                        onSubmit={formik.handleSubmit}
                        style={{ marginTop: "10px" }}
                      >
                        <HorizontalLabelInput
                          placeholder="Organization Name"
                          className="add-form-control"
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
                          className="add-form-control"
                          placeholder="Select a type of your company"
                          type="select"
                          options={sectors.data.map((sector) => ({
                            value: sector.id,
                            label: sector.title,
                          }))}
                          {...formik.getFieldProps("organizationType")}
                        />
                        {formik.touched.organizationType &&
                        formik.errors.organizationType ? (
                          <ErrorMessage>
                            {formik.errors.organizationType}
                          </ErrorMessage>
                        ) : null}
                        <HorizontalPhoneInput
                          label="Mobile Number (optional)"
                          value={formik.values.mobileNumber.value}
                          onChange={(e) =>
                            formik.setFieldValue("mobileNumber", e)
                          }
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
                        {formik.touched.mobileNumber &&
                        formik.errors.mobileNumber ? (
                          <ErrorMessage>
                            {formik.errors.mobileNumber}
                          </ErrorMessage>
                        ) : null}
                        <HorizontalLabelInput
                          placeholder="Country"
                          className="add-form-control"
                          label="Country"
                          type="select"
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
                          placeholder="City"
                          className="add-form-control"
                          label="City"
                          type="select"
                          options={(
                            cities.data[formik.values.country] || []
                          ).map((country) => ({
                            value: country.id,
                            label: country.title,
                          }))}
                          {...formik.getFieldProps("city")}
                        />
                        {formik.touched.city && formik.errors.city ? (
                          <ErrorMessage>{formik.errors.city}</ErrorMessage>
                        ) : null}
                        <HorizontalLabelInput
                          label="Address"
                          type="text"
                          placeholder="Address"
                          className="add-form-control"
                          name={formik.getFieldProps("address").name}
                          onBlur={(_) => formik.getFieldProps("address").onBlur}
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
                        {formik.touched.address && formik.errors.address ? (
                          <ErrorMessage>{formik.errors.address}</ErrorMessage>
                        ) : null}
                        <HorizontalLabelInput
                          placeholder="Website"
                          label="Website"
                          {...formik.getFieldProps("website")}
                        />
                        {formik.touched.website && formik.errors.website ? (
                          <ErrorMessage>{formik.errors.website}</ErrorMessage>
                        ) : null}
                        <HorizontalLabelInput
                          placeholder="Description"
                          label="Description"
                          type="textarea"
                          {...formik.getFieldProps("description")}
                        />
                        {formik.touched.description &&
                        formik.errors.description ? (
                          <ErrorMessage>
                            {formik.errors.description}
                          </ErrorMessage>
                        ) : null}
                        <HorizontalLabelInput
                          placeholder="Business license"
                          label="Business license"
                          {...formik.getFieldProps("businessLicenseId")}
                        />
                        {formik.touched.businessLicenseId &&
                        formik.errors.businessLicenseId ? (
                          <ErrorMessage>
                            {formik.errors.businessLicenseId}
                          </ErrorMessage>
                        ) : null}
                        <Stack
                          direction="row"
                          spacing={2}
                          alignItems="center"
                          className="dashedborder mb-3"
                        >
                          <AttachmentDragNDropInput
                            handleDrop={(e) =>
                              formik.setFieldValue("businessLicense", e)
                            }
                            single
                            files={formik.values.businessLicense}
                            deleteFile={(_) =>
                              formik.setFieldValue("businessLicense", [])
                            }
                          />
                        </Stack>
                        {formik.touched.businessLicense &&
                        formik.errors.businessLicense ? (
                          <ErrorMessage>
                            {formik.errors.businessLicense}
                          </ErrorMessage>
                        ) : null}
                        <HorizontalLabelInput
                          placeholder="Certificate number"
                          label="Registration certificate"
                          {...formik.getFieldProps("certificationNumber")}
                        />
                        {formik.touched.certificationNumber &&
                        formik.errors.certificationNumber ? (
                          <ErrorMessage>
                            {formik.errors.certificationNumber}
                          </ErrorMessage>
                        ) : null}
                        <Stack
                          direction="row"
                          spacing={2}
                          alignItems="center"
                          className="dashedborder mb-3"
                        >
                          <AttachmentDragNDropInput
                            handleDrop={(e) =>
                              formik.setFieldValue("certification", e)
                            }
                            single
                            files={formik.values.certification}
                            deleteFile={(e) =>
                              formik.setFieldValue("certification", [])
                            }
                          />
                        </Stack>
                        {formik.touched.certification &&
                        formik.errors.certification ? (
                          <ErrorMessage>
                            {formik.errors.certification}
                          </ErrorMessage>
                        ) : null}
                        <HorizontalLabelInput
                          placeholder="Years of operating"
                          label="Years of operating"
                          {...formik.getFieldProps("yearsOfOperating")}
                        />
                        {formik.touched.yearsOfOperating &&
                        formik.errors.yearsOfOperating ? (
                          <ErrorMessage>
                            {formik.errors.yearsOfOperating}
                          </ErrorMessage>
                        ) : null}
                        <HorizontalLabelInput
                          placeholder="No. of jobs as experience"
                          label="No. of jobs as experience"
                          {...formik.getFieldProps("noOfJobsAsExperience")}
                        />
                        {formik.touched.noOfJobsAsExperience &&
                        formik.errors.noOfJobsAsExperience ? (
                          <ErrorMessage>
                            {formik.errors.noOfJobsAsExperience}
                          </ErrorMessage>
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
                            checked={
                              formik.values.marketingInformationNotification
                            }
                            control={<CheckboxInput />}
                            label="I wish to receive marketing information from Koor and/or service providers on products or services offered by Koor or other parties."
                          />
                        </FormGroup>
                        <div className="text-center mt-3">
                          <OutlinedButton
                            type="submit"
                            variant="outlined"
                            disabled={formik.isSubmitting}
                            title={
                              formik.isSubmitting
                                ? "updating..."
                                : "update info"
                            }
                            startIcon={<SVG.CheckIcon />}
                          />
                        </div>
                      </form>
                    ) : (
                      ""
                    )}
                  </>
                ) : (
                  <>
                    <form onSubmit={formik.handleSubmit}>
                      <HorizontalLabelInput
                        placeholder="Organization Name"
                        className="add-form-control"
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
                        className="add-form-control"
                        placeholder="Select a type of your company"
                        type="select"
                        options={sectors.data.map((sector) => ({
                          value: sector.id,
                          label: sector.title,
                        }))}
                        {...formik.getFieldProps("organizationType")}
                      />
                      {formik.touched.organizationType &&
                      formik.errors.organizationType ? (
                        <ErrorMessage>
                          {formik.errors.organizationType}
                        </ErrorMessage>
                      ) : null}
                      <HorizontalPhoneInput
                        label="Mobile Number (optional)"
                        value={formik.values.mobileNumber.value}
                        onChange={(e) =>
                          formik.setFieldValue("mobileNumber", e)
                        }
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
                      {formik.touched.mobileNumber &&
                      formik.errors.mobileNumber ? (
                        <ErrorMessage>
                          {formik.errors.mobileNumber}
                        </ErrorMessage>
                      ) : null}
                      <HorizontalLabelInput
                        placeholder="Country"
                        className="add-form-control"
                        label="Country"
                        type="select"
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
                        placeholder="City"
                        className="add-form-control"
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
                      {formik.touched.city && formik.errors.city ? (
                        <ErrorMessage>{formik.errors.city}</ErrorMessage>
                      ) : null}
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
                      {formik.touched.address && formik.errors.address ? (
                        <ErrorMessage>{formik.errors.address}</ErrorMessage>
                      ) : null}
                      <HorizontalLabelInput
                        placeholder="Website"
                        label="Website"
                        {...formik.getFieldProps("website")}
                      />
                      {formik.touched.website && formik.errors.website ? (
                        <ErrorMessage>{formik.errors.website}</ErrorMessage>
                      ) : null}
                      <HorizontalLabelInput
                        placeholder="Description"
                        label="Description"
                        type="textarea"
                        {...formik.getFieldProps("description")}
                      />
                      {formik.touched.description &&
                      formik.errors.description ? (
                        <ErrorMessage>{formik.errors.description}</ErrorMessage>
                      ) : null}
                      <HorizontalLabelInput
                        placeholder="Business license"
                        label="Business license"
                        {...formik.getFieldProps("businessLicenseId")}
                      />
                      {formik.touched.businessLicenseId &&
                      formik.errors.businessLicenseId ? (
                        <ErrorMessage>
                          {formik.errors.businessLicenseId}
                        </ErrorMessage>
                      ) : null}
                      <Stack
                        direction="row"
                        spacing={2}
                        alignItems="center"
                        className="dashedborder mb-3"
                      >
                        <AttachmentDragNDropInput
                          handleDrop={(e) =>
                            formik.setFieldValue("businessLicense", e)
                          }
                          single
                          files={formik.values.businessLicense}
                          deleteFile={(e) =>
                            formik.setFieldValue("businessLicense", [])
                          }
                        />
                      </Stack>
                      {formik.touched.businessLicense &&
                      formik.errors.businessLicense ? (
                        <ErrorMessage>
                          {formik.errors.businessLicense}
                        </ErrorMessage>
                      ) : null}
                      <HorizontalLabelInput
                        placeholder="Certificate number"
                        label="Registration certificate"
                        {...formik.getFieldProps("certificationNumber")}
                      />
                      {formik.touched.certificationNumber &&
                      formik.errors.certificationNumber ? (
                        <ErrorMessage>
                          {formik.errors.certificationNumber}
                        </ErrorMessage>
                      ) : null}
                      <Stack
                        direction="row"
                        spacing={2}
                        alignItems="center"
                        className="dashedborder mb-3"
                      >
                        <AttachmentDragNDropInput
                          handleDrop={(e) =>
                            formik.setFieldValue("certification", e)
                          }
                          single
                          files={formik.values.certification}
                          deleteFile={(e) =>
                            formik.setFieldValue("certification", [])
                          }
                        />
                      </Stack>
                      {formik.touched.certification &&
                      formik.errors.certification ? (
                        <ErrorMessage>
                          {formik.errors.certification}
                        </ErrorMessage>
                      ) : null}
                      <HorizontalLabelInput
                        placeholder="Years of operating"
                        label="Years of operating"
                        {...formik.getFieldProps("yearsOfOperating")}
                      />
                      {formik.touched.yearsOfOperating &&
                      formik.errors.yearsOfOperating ? (
                        <ErrorMessage>
                          {formik.errors.yearsOfOperating}
                        </ErrorMessage>
                      ) : null}
                      <HorizontalLabelInput
                        placeholder="No. of jobs as experience"
                        label="No. of jobs as experience"
                        {...formik.getFieldProps("noOfJobsAsExperience")}
                      />
                      {formik.touched.noOfJobsAsExperience &&
                      formik.errors.noOfJobsAsExperience ? (
                        <ErrorMessage>
                          {formik.errors.noOfJobsAsExperience}
                        </ErrorMessage>
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
                          checked={
                            formik.values.marketingInformationNotification
                          }
                          control={<CheckboxInput />}
                          label="I wish to receive marketing information from Koor and/or service providers on products or services offered by Koor or other parties."
                        />
                      </FormGroup>
                      <div className="text-center mt-3">
                        <OutlinedButton
                          type="submit"
                          variant="outlined"
                          title={
                            formik.isSubmitting ? "updating..." : "update info"
                          }
                          startIcon={<SVG.CheckIcon />}
                        />
                      </div>
                    </form>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        </Grid>
        <Grid item lg={6} xs={12}>
          <Stack direction="column" spacing={2}>
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
                  fun={() => handleToggleModel2("job")}
                  toggle={toggle.includes("job")}
                />
              </CardContent>
            </Card>
            <Sectors
              fun={() => handleToggleModel2("sectors")}
              toggle={toggle.includes("sectors")}
            />
            <Tags
              fun={() => handleToggleModel2("tags")}
              toggle={toggle.includes("tags")}
            />
          </Stack>
        </Grid>
      </Grid>
      <DialogBox open={open} handleClose={handleClose}>
        <div className="add-content">
          <h2 className="mb-4">Great!</h2>
          <>
            <div>
              <NoItem
                bgColor="#D5e3f7"
                color="#274593"
                icon={<SVG.AlertCheckICon />}
                description={
                  <p>
                    Thank you for adding this important information. Our team
                    will review it and activate your account within 24 hours.{" "}
                    <br />
                    <br />
                    Psst, it may happen even faster, stay tuned 😉
                  </p>
                }
              />
            </div>
          </>

          <div className="text-center mt-4">
            <OutlinedButton onClick={handleClose} title={<>Got It</>} />
          </div>
        </div>
      </DialogBox>
    </>
  );
}

export default MyProfile;

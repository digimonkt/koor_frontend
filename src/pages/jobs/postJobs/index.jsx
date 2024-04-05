import {
  Box,
  Card,
  CardContent,
  Divider,
  FormControlLabel,
  FormGroup,
  Grid,
  IconButton,
  Stack,
  Switch,
} from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import {
  AttachmentDragNDropInput,
  CheckboxInput,
  DateInput,
  LabeledInput,
  QuillInput,
  SelectInput,
} from "../../../components/input";
import CurrencyInput from "./currencyInput";
import { FilledButton, OutlinedButton } from "../../../components/button";
import { useFormik } from "formik";
import { validateCreateJobInput } from "../validator";
import { ErrorMessage } from "../../../components/caption";
import { PAY_PERIOD, USER_ROLES } from "../../../utils/enum";
import { useDispatch, useSelector } from "react-redux";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
  getCities,
  getCountries,
  getEducationLevels,
  getJobCategories,
  getJobSubCategories,
  getLanguages,
  getSkills,
} from "../../../redux/slice/choices";
import {
  buyCreditsAPI,
  createJobAPI,
  getDashboardActivityAPI,
  getMinimumCreditForJobPostAPI,
  updateEmployerJobAPI,
} from "../../../api/employer";
import { ErrorToast, SuccessToast } from "../../../components/toast";
import dayjs from "dayjs";
import { getJobDetailsByIdAPI } from "../../../api/job";
import { DATABASE_DATE_FORMAT } from "../../../utils/constants/constants";
import { useDebounce } from "usehooks-ts";
import { GetSuggestedAddressAPI } from "../../../api/user";
import styles from "./postJobs.module.css";
import { JobFormControl } from "./style";
import DialogBox from "../../../components/dialogBox";
import { SVG } from "../../../assets/svg";
import urlcat from "urlcat";
import {
  setJobPostUpdate,
  setMinimumCreditJobPost,
  setTotalAvailableCredits,
} from "../../../redux/slice/employer";
import { getPackageAPI } from "../../../api/choices";
import { Package } from "../../../components/package";
import { setErrorToast, setSuccessToast } from "../../../redux/slice/toast";
const SUBMITTING_STATUS_ENUM = Object.freeze({
  loading: "loading",
  submitted: "submitted",
  updated: "updated",
  error: "error",
  null: "",
});
function PostJobsComponent() {
  const { currentUser } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    countries,
    cities,
    jobCategories,
    jobSubCategories,
    educationLevels,
    languages,
    skills,
  } = useSelector((state) => state.choices);
  const { minimumCreditJobPost, totalAvailableCredits } = useSelector(
    (state) => state.employer
  );
  const { isMobileView } = useSelector((state) => state.platform);
  const [searchParams] = useSearchParams();
  const [submitting, setSubmitting] = useState(SUBMITTING_STATUS_ENUM.null);
  const [jobId, setJobId] = useState(null);
  const [open, setOpen] = useState(false);
  const [isRedirect, setIsRedirect] = useState(false);
  const [packageData, setPackageData] = useState([]);
  const [buyPackage, setBuyPackage] = useState(false);
  const [descData, setDescData] = useState("");
  const [applicationInstructionData, setApplicationInstructionData] =
    useState("");
  const handleRedirect = () => {
    setOpen(close);
    setIsRedirect(true);
  };
  const formik = useFormik({
    initialValues: {
      title: "",
      budgetCurrency: "usd",
      budgetAmount: 0,
      budgetPayPeriod: PAY_PERIOD.month,
      description: "",
      country: "",
      city: "",
      address: "",
      jobCategories: "",
      jobSubCategory: "",
      isFullTime: false,
      isPartTime: false,
      hasContract: false,
      deadline: "",
      startDate: "",
      isContactEmail: false,
      isApplyThroughKoor: false,
      isApplyThroughEmail: false,
      isApplyThroughWebsite: false,
      websiteLink: "",
      applicationInstruction: "",
      contactEmail: "",
      cc1: "",
      cc2: "",
      duration: 0,
      experience: "",
      highestEducation: "",
      languages: [],
      skills: [],
      attachments: [],
      attachmentsRemove: [],
    },
    validationSchema: validateCreateJobInput,
    onSubmit: async (values, { resetForm }) => {
      setSubmitting(SUBMITTING_STATUS_ENUM.loading);
      const payload = {
        title: values.title,
        budget_currency: values.budgetCurrency,
        budget_amount: values.budgetAmount,
        budget_pay_period: values.budgetPayPeriod,
        description: descData,
        country: values.country,
        city: values.city,
        address: values.address,
        job_category: values.jobCategories,
        job_sub_category: values.jobSubCategory,
        highest_education: values.highestEducation,
        is_full_time: values.isFullTime,
        is_part_time: values.isPartTime,
        has_contract: values.hasContract,
        deadline: dayjs(values.deadline).format(DATABASE_DATE_FORMAT),
        start_date: values.startDate
          ? dayjs(values.startDate).format(DATABASE_DATE_FORMAT)
          : "",
        contact_email: values.isApplyThroughEmail ? values.contactEmail : "",
        cc1: values.cc1,
        cc2: values.cc2,
        language: values.languages,
        skill: values.skills,
        attachments: values.attachments,
        attachments_remove: values.attachmentsRemove,
        duration: values.duration,
        experience: values.experience,
        apply_through_koor: values.isApplyThroughKoor || "false",
        apply_through_email: values.isApplyThroughEmail || "false",
        apply_through_website: values.isApplyThroughWebsite || "false",
        application_instruction: values.applicationInstruction,
        website_link: values.websiteLink,
      };
      const newFormData = new FormData();
      for (const key in payload) {
        if (key === "language") {
          payload.language.forEach((language) => {
            if (language) {
              const languageFormat = { language };
              newFormData.append("language", JSON.stringify(languageFormat));
            }
          });
        } else if (key === "attachments") {
          payload.attachments.forEach((attachment) => {
            if (!attachment.id) {
              newFormData.append(key, attachment);
            }
          });
        } else if (payload[key]) {
          if (payload[key].forEach) {
            payload[key].forEach((data) => {
              newFormData.append(key, data);
            });
          } else {
            if (payload[key]) newFormData.append(key, payload[key]);
          }
        }
      }
      let res;
      if (!jobId) {
        // create
        res = await createJobAPI(newFormData);
        if (res.remote === "success") {
          dispatch(setJobPostUpdate(true));
          setSubmitting(SUBMITTING_STATUS_ENUM.submitted);
          resetForm();
        } else {
          setSubmitting(SUBMITTING_STATUS_ENUM.error);
        }
      } else {
        // update
        res = await updateEmployerJobAPI(jobId, newFormData);
        if (res.remote === "success") {
          dispatch(setJobPostUpdate(true));
          setSubmitting(SUBMITTING_STATUS_ENUM.updated);
        } else {
          setSubmitting(SUBMITTING_STATUS_ENUM.error);
        }
      }
      if (res.remote === "success") {
        setOpen(true);
      }
    },
  });

  const [suggestedAddress, setSuggestedAddress] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const debouncedSearchValue = useDebounce(searchValue, 500);
  const getJobDetailsById = useCallback(async (jobId) => {
    const response = await getJobDetailsByIdAPI({ jobId });
    if (response.remote === "success") {
      const { data } = response;
      formik.setFieldValue("title", data?.title || "");
      formik.setFieldValue("budgetCurrency", data?.budgetCurrency);
      formik.setFieldValue("budgetAmount", data?.budgetAmount || 0);
      formik.setFieldValue("budgetPayPeriod", data?.budgetPayPeriod);
      formik.setFieldValue("description", data?.description || "");
      formik.setFieldValue("country", data?.country?.id || "");
      formik.setFieldValue("city", data?.city?.id || "");
      formik.setFieldValue("address", data?.address || "");
      formik.setFieldValue("duration", data?.duration || "");
      formik.setFieldValue("experience", data?.experience || "");
      setSearchValue(data.address);
      formik.setFieldValue("jobCategories", data?.jobCategories?.id || "");
      formik.setFieldValue("jobSubCategory", data?.jobSubCategory?.id || "");
      formik.setFieldValue("isFullTime", data?.isFullTime || false);
      formik.setFieldValue("isPartTime", data?.isPartTime || false);
      formik.setFieldValue("hasContract", data?.hasContract || false);
      formik.setFieldValue("deadline", dayjs(data.deadline));
      formik.setFieldValue("startDate", dayjs(data.startDate));
      formik.setFieldValue(
        "isContactEmail",
        Boolean(data?.contactEmail) || false
      );
      formik.setFieldValue("contactEmail", data?.contactEmail || "");
      formik.setFieldValue("cc1", data?.cc1 || "");
      formik.setFieldValue("cc2", data?.cc2 || "");
      formik.setFieldValue(
        "isApplyThroughKoor",
        Boolean(data?.isApplyThroughKoor) || false
      );
      formik.setFieldValue(
        "isApplyThroughEmail",
        Boolean(data?.isApplyThroughEmail) || false
      );
      formik.setFieldValue(
        "isApplyThroughWebsite",
        Boolean(data?.isApplyThroughWebsite) || false
      );
      formik.setFieldValue(
        "applicationInstruction",
        data?.applicationInstruction || ""
      );
      formik.setFieldValue("websiteLink", data?.websiteLink || "");
      formik.setFieldValue(
        "highestEducation",
        data?.highestEducation?.id || ""
      );
      // !TEMPORARY SOLUTION
      formik.setFieldValue(
        "languages",
        data.languages.map && data.languages.length
          ? [...data.languages.map((language) => language.language.id)]
          : []
      );
      formik.setFieldValue(
        "skills",
        data.skills.map ? data.skills.map((skill) => skill.id) : []
      );
      formik.setFieldValue("attachments", data?.attachments || []);
    }
  }, []);

  const getSuggestedAddress = async (search) => {
    const res = await GetSuggestedAddressAPI(search);
    if (res.remote === "success") {
      setSuggestedAddress(res?.data?.predictions);
    }
  };
  const handleClose = () => {
    setOpen(false);
    setIsRedirect(true);
  };
  const getMinimumCreditForJobPost = async () => {
    const res = await getMinimumCreditForJobPostAPI();
    if (res.remote === "success") {
      dispatch(setMinimumCreditJobPost(res.data));
    }
  };
  const getDashboardActivity = async () => {
    const res = await getDashboardActivityAPI();
    if (res.remote === "success") {
      dispatch(setTotalAvailableCredits(res.data.availableCredits));
    }
  };
  const getPackageData = async () => {
    const resp = await getPackageAPI();
    if (resp.remote === "success") {
      setPackageData(resp.data);
    }
  };
  const handleBuyPackage = async (planDetails) => {
    const data = {
      package: planDetails.title.toLowerCase(),
      points: planDetails.credit,
      amount: Number(planDetails.price),
      note: `Employer buy ${planDetails.title} Plan`,
    };
    const resp = await buyCreditsAPI({ employer: currentUser.id, data });
    if (resp.remote === "success") {
      setBuyPackage(!buyPackage);
      dispatch(setSuccessToast("Buy Plan Successfully"));
    } else {
      dispatch(setErrorToast("Something Went Wrong"));
    }
  };
  const handleEditorValue = (content) => {
    setDescData(content);
    formik.setFieldValue(
      "description",
      content !== "<p><br></p>" ? content : ""
    );
  };
  const handleApplicationInstructionEditorValue = (content) => {
    setApplicationInstructionData(content);
    formik.setFieldValue(
      "applicationInstruction",
      content !== "<p><br></p>" ? content : ""
    );
  };

  useEffect(() => {
    if (isRedirect) {
      navigate(`/${USER_ROLES.employer}/manage-jobs`);
    }
  }, [isRedirect]);
  useEffect(() => {
    if (
      debouncedSearchValue &&
      debouncedSearchValue !== formik.values.address
    ) {
      getSuggestedAddress(debouncedSearchValue);
    }
  }, [debouncedSearchValue]);
  useEffect(() => {
    const newJobId = searchParams.get("jobId");
    if (newJobId && jobId !== newJobId) setJobId(newJobId);
  }, [searchParams.get("jobId")]);
  useEffect(() => {
    if (jobId) {
      getJobDetailsById(jobId);
    }
  }, [jobId]);
  useEffect(() => {
    if (!countries.data.length) {
      dispatch(getCountries());
    }
    if (!jobCategories.data.length) {
      dispatch(getJobCategories());
    }
    if (!educationLevels.data.length) {
      dispatch(getEducationLevels());
    }
    if (!languages.data.length) {
      dispatch(getLanguages());
    }
    if (!skills.data.length) {
      dispatch(getSkills());
    }
  }, []);
  useEffect(() => {
    if (formik.values.country && !cities.data[formik.values.country]?.length) {
      dispatch(getCities({ countryId: formik.values.country }));
    }
  }, [formik.values.country]);
  useEffect(() => {
    if (
      formik.values.jobCategories &&
      !jobSubCategories.data[formik.values.jobCategories]?.length
    ) {
      dispatch(
        getJobSubCategories({ categoryId: formik.values.jobCategories })
      );
    }
  }, [formik.values.jobCategories]);
  useEffect(() => {
    if (!currentUser.profile.isVerified) {
      navigate(urlcat("../employer/manage-jobs"));
    }
  }, []);
  useEffect(() => {
    getDashboardActivity();
    getMinimumCreditForJobPost();
  }, [buyPackage]);
  useEffect(() => {
    getPackageData();
  }, []);
  return (
    <div className="job-application">
      <Card
        sx={{
          "&.MuiCard-root": {
            boxShadow: "0px 15px 40px rgba(0, 0, 0, 0.05)",
            borderRadius: "10px",
            mb: 3,
          },
        }}
      >
        <CardContent
          sx={{
            "&.MuiCardContent-root": {
              padding: "25px 25px 25px",
            },
          }}
        >
          <div className="job-content">
            <h2>
              {isMobileView && (
                <IconButton LinkComponent={Link} to={"/employer/manage-jobs"}>
                  <ArrowBackIcon />
                </IconButton>
              )}
              {jobId ? "Update Job" : "Post new job"}
              <span className="right-pull">
                <IconButton LinkComponent={Link} to={"/employer/manage-jobs"}>
                  <CloseIcon />
                </IconButton>
              </span>
            </h2>
            <div className="form-content">
              <form onSubmit={formik.handleSubmit}>
                <Grid container spacing={2}>
                  <Grid item xl={5} xs={12} lg={5} sm={6}>
                    <LabeledInput
                      title="Title of your job"
                      className="add-form-control"
                      placeholder="Online Research Participant (Work From Home/Part Time/Casual)…"
                      required
                      {...formik.getFieldProps("title")}
                    />
                    {formik.touched.title && formik.errors.title ? (
                      <ErrorMessage>{formik.errors.title}</ErrorMessage>
                    ) : null}
                  </Grid>
                  <Grid item xl={3} xs={12} lg={3} sm={6}>
                    <LabeledInput
                      title="Experience in Years"
                      className="add-form-control"
                      placeholder="Experience in Years"
                      type="number"
                      required
                      {...formik.getFieldProps("experience")}
                    />
                    {formik.touched.experience && formik.errors.experience ? (
                      <ErrorMessage>{formik.errors.experience}</ErrorMessage>
                    ) : null}
                  </Grid>
                  <Grid item xl={4} lg={4} sm={12}>
                    <CurrencyInput
                      currency="USD"
                      title="Salary"
                      type="number"
                      optionsValues={{
                        currency: formik.getFieldProps("budgetCurrency"),
                        input: formik.getFieldProps("budgetAmount"),
                        payPeriod: formik.getFieldProps("budgetPayPeriod"),
                      }}
                      errors={{
                        currency: formik.touched.budgetCurrency
                          ? formik.errors.budgetCurrency
                          : "",
                        input: formik.touched.budgetAmount
                          ? formik.errors.budgetAmount
                          : "",
                        payPeriod: formik.touched.budgetPayPeriod
                          ? formik.errors.budgetPayPeriod
                          : "",
                      }}
                    />
                  </Grid>
                  <Grid item xl={12} lg={12} xs={12} sm={12}>
                    <Box
                      sx={{
                        "& .ql-container.ql-snow": {
                          minHeight: "150px",
                          background: "#f0f0f0",
                        },
                        "& .ql-toolbar": {
                          background: "#f0f0f0",
                        },
                      }}
                      // sx={{
                      //   height: { xs: "300px", sm: "270px", md: "250px" },
                      // }}
                    >
                      <label>
                        Description<span className="required-field">*</span>
                      </label>
                      <QuillInput
                        type="textarea"
                        placeholder="Write more details to attract the right candidates."
                        value={descData || formik.values.description}
                        onChange={(value) => handleEditorValue(value)}
                      />
                    </Box>
                    <Box
                      style={{
                        width: "100%",
                        marginTop: "10px",
                      }}
                    >
                      {formik.touched.description &&
                      formik.errors.description ? (
                        <ErrorMessage>{formik.errors.description}</ErrorMessage>
                      ) : null}
                    </Box>
                  </Grid>
                  <Grid item xl={5} lg={5} sm={4} xs={12}>
                    <label>
                      Location<span className="required-field">*</span>
                    </label>
                    <SelectInput
                      className="location-select"
                      placeholder="Country"
                      defaultValue=""
                      options={countries.data.map((country) => ({
                        value: country.id,
                        label: country.title,
                      }))}
                      {...formik.getFieldProps("country")}
                    />
                    {formik.touched.country && formik.errors.country ? (
                      <ErrorMessage>{formik.errors.country}</ErrorMessage>
                    ) : null}
                  </Grid>
                  <Grid item xl={4} lg={4} sm={4} xs={12}>
                    <label>City</label>
                    <SelectInput
                      placeholder={formik.values.country ? "City" : "City"}
                      disabled={!formik.values.country}
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
                  </Grid>
                  <Grid item xl={3} lg={3} sm={4} xs={12}>
                    <label>
                      Working place address{" "}
                      <span className="required-field">*</span>
                    </label>
                    <div className={styles.positionReltive}>
                      <input
                        type="text"
                        placeholder="Address"
                        className="add-form-control"
                        name={formik.getFieldProps("address").name}
                        onBlur={() => formik.getFieldProps("address").onBlur}
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
                    </div>
                    {formik.touched.address && formik.errors.address ? (
                      <ErrorMessage>{formik.errors.address}</ErrorMessage>
                    ) : null}
                  </Grid>
                  <Grid item xl={6} lg={6} xs={12}>
                    <label>
                      Job Category
                      <span className="required-field">*</span>
                    </label>
                    <SelectInput
                      defaultValue=""
                      placeholder="Select a Job category"
                      options={jobCategories?.data?.map((jobCategory) => ({
                        value: jobCategory?.id,
                        label: jobCategory?.title,
                      }))}
                      name="jobCategories"
                      value={formik.values.jobCategories}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      {...formik.getFieldProps("jobCategories")}
                    />
                    {formik.touched.jobCategories &&
                    formik.errors.jobCategories ? (
                      <ErrorMessage>{formik.errors.jobCategories}</ErrorMessage>
                    ) : null}
                  </Grid>
                  <Grid item xl={6} lg={6} xs={12}>
                    <label>Sub Category</label>
                    <SelectInput
                      defaultValue=""
                      placeholder={
                        formik.values.jobCategories
                          ? "Job Sub Category"
                          : "Select Category first"
                      }
                      options={(
                        jobSubCategories.data[formik.values.jobCategories] || []
                      ).map((subCategory) => ({
                        value: subCategory.id,
                        label: subCategory.title,
                      }))}
                      {...formik.getFieldProps("jobSubCategory")}
                    />
                    {formik.touched.jobSubCategory &&
                    formik.errors.jobSubCategory ? (
                      <ErrorMessage>
                        {formik.errors.jobSubCategory}
                      </ErrorMessage>
                    ) : null}
                  </Grid>
                  <Grid item xl={5} lg={5} xs={12} className="jobtype_grid">
                    <label>Job type</label>
                    <FormGroup
                      row
                      sx={{
                        marginLeft: "7px",
                        display: "flex",
                        marginTop: "8px",
                      }}
                    >
                      <JobFormControl
                        className="update_checkbox"
                        control={
                          <CheckboxInput
                            sx={{
                              padding: "9px 5px",
                              fontSize: "16px !important",
                            }}
                          />
                        }
                        label="Part Time"
                        checked={formik.values.isPartTime}
                        {...formik.getFieldProps("isPartTime")}
                      />
                      <JobFormControl
                        className="update_checkbox"
                        control={
                          <CheckboxInput
                            sx={{
                              padding: "9px 5px",
                              fontSize: "16px !important",
                            }}
                          />
                        }
                        label="Full Time"
                        checked={formik.values.isFullTime}
                        {...formik.getFieldProps("isFullTime")}
                      />
                      <JobFormControl
                        className="update_checkbox"
                        control={
                          <CheckboxInput
                            sx={{
                              padding: "9px 5px",
                              fontSize: "16px !important",
                            }}
                          />
                        }
                        label="Consultant"
                        checked={formik.values.hasContract}
                        {...formik.getFieldProps("hasContract")}
                      />
                    </FormGroup>
                  </Grid>
                  <Grid item xl={3} lg={3} sm={4} xs={12} className="mt-2">
                    <LabeledInput
                      title="Duration in Month"
                      className="add-form-control"
                      type="number"
                      placeholder="Months"
                      {...formik.getFieldProps("duration")}
                    />

                    {formik.touched.duration && formik.errors.duration ? (
                      <ErrorMessage>{formik.errors.duration}</ErrorMessage>
                    ) : null}
                  </Grid>
                  <Grid item xl={2} lg={2} sm={4} xs={6} className="mt-2">
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <Stack
                        direction="row"
                        alignItems="center"
                        justifyContent="space-between"
                        className="mb-2"
                      >
                        <label className="mb-1 d-inline-block">
                          Start Date<span className="required-field">*</span>{" "}
                        </label>
                      </Stack>
                      <DateInput
                        className="smallfont"
                        type="date"
                        onChange={(e) => formik.setFieldValue("startDate", e)}
                        value={formik.values.startDate}
                        onBlur={formik.getFieldProps("startDate").onBlur}
                      />
                      {formik.touched.startDate && formik.errors.startDate ? (
                        <ErrorMessage>{formik.errors.startDate}</ErrorMessage>
                      ) : null}
                    </div>
                  </Grid>
                  <Grid item xl={2} lg={2} xs={6} sm={4} className="mt-2">
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <Stack
                        direction="row"
                        alignItems="center"
                        justifyContent="space-between"
                        className="mb-2"
                      >
                        <label className="mb-1 d-inline-block">
                          Deadline<span className="required-field">*</span>{" "}
                        </label>
                      </Stack>
                      <DateInput
                        className="smallfont"
                        onChange={(e) => formik.setFieldValue("deadline", e)}
                        type="date"
                        value={formik.values.deadline}
                        onBlur={formik.getFieldProps("deadline").onBlur}
                        minDate={dayjs().format("YYYY-MM-DD")}
                      />
                      {formik.touched.deadline && formik.errors.deadline ? (
                        <ErrorMessage>{formik.errors.deadline}</ErrorMessage>
                      ) : null}
                    </div>
                  </Grid>
                  <Grid item xl={12} lg={12} xs={12}>
                    <Divider sx={{ borderColor: "#CACACA", opacity: "1" }} />
                  </Grid>
                  <Grid item xl={12} lg={12} xs={12}>
                    <h2 className="mt-3">Ways to apply</h2>
                  </Grid>
                  <Grid item xl={12} lg={12} sm={12} xs={12}>
                    <FormGroup>
                      <FormControlLabel
                        sx={{ width: "198px" }}
                        control={<Switch />}
                        label="Apply through Koor"
                        checked={formik.values.isApplyThroughKoor}
                        {...formik.getFieldProps("isApplyThroughKoor")}
                      />
                    </FormGroup>
                    {formik.touched.isApplyThroughKoor &&
                    formik.errors.isApplyThroughKoor ? (
                      <ErrorMessage>
                        {formik.errors.isApplyThroughKoor}
                      </ErrorMessage>
                    ) : null}
                  </Grid>
                  <Grid item xl={4} lg={4} sm={4} xs={12}>
                    <FormGroup>
                      <FormControlLabel
                        sx={{ width: "165px" }}
                        control={<Switch />}
                        type="email"
                        label="Apply by email"
                        checked={formik.values.isApplyThroughEmail}
                        {...formik.getFieldProps("isApplyThroughEmail")}
                      />
                    </FormGroup>
                    <input
                      className="add-form-control"
                      type="email"
                      placeholder="Your email address"
                      {...formik.getFieldProps("contactEmail")}
                    />
                    {formik.touched.contactEmail &&
                    formik.errors.contactEmail ? (
                      <ErrorMessage>{formik.errors.contactEmail}</ErrorMessage>
                    ) : null}
                  </Grid>
                  <Grid
                    item
                    xl={4}
                    lg={4}
                    sm={4}
                    xs={12}
                    sx={{
                      marginTop: "41px",
                      "@media (max-width: 480px)": {
                        marginTop: "0px",
                      },
                    }}
                  >
                    <input
                      className="add-form-control"
                      type="email"
                      placeholder="CC email address"
                      {...formik.getFieldProps("cc1")}
                    />
                    {formik.touched.cc1 && formik.errors.cc1 ? (
                      <ErrorMessage>{formik.errors.cc1}</ErrorMessage>
                    ) : null}
                  </Grid>
                  <Grid
                    item
                    xl={4}
                    lg={4}
                    sm={4}
                    xs={12}
                    sx={{
                      marginTop: "41px",
                      "@media (max-width: 480px)": {
                        marginTop: "0px",
                      },
                    }}
                  >
                    <input
                      className="add-form-control"
                      type="email"
                      placeholder="Another CC email address"
                      {...formik.getFieldProps("cc2")}
                    />
                    {formik.touched.cc2 && formik.errors.cc2 ? (
                      <ErrorMessage>{formik.errors.cc2}</ErrorMessage>
                    ) : null}
                  </Grid>
                  <Grid item xl={12} lg={12} xs={12}>
                    <Box
                      sx={{
                        "& .ql-container.ql-snow": {
                          minHeight: "150px",
                          background: "#f0f0f0",
                        },
                        "& .ql-toolbar": {
                          background: "#f0f0f0",
                        },
                      }}
                    >
                      <label>Application Instructions </label>
                      <QuillInput
                        type="textarea"
                        placeholder="Write a brief text overview of your application process. You can also include links, emails, etc."
                        value={
                          applicationInstructionData ||
                          formik.values.applicationInstruction
                        }
                        onChange={(value) =>
                          handleApplicationInstructionEditorValue(value)
                        }
                      />
                    </Box>
                    <Box
                      style={{
                        width: "100%",
                        marginTop: "10px",
                      }}
                    >
                      {formik.touched.applicationInstruction &&
                      formik.errors.applicationInstruction ? (
                        <ErrorMessage>
                          {formik.errors.applicationInstruction}
                        </ErrorMessage>
                      ) : null}
                    </Box>
                  </Grid>
                  <Grid item xl={12} lg={12} xs={12} mt={1}>
                    <FormGroup>
                      <FormControlLabel
                        sx={{ width: "255px" }}
                        control={<Switch />}
                        type="url"
                        label="Apply through your website"
                        checked={formik.values.isApplyThroughWebsite}
                        {...formik.getFieldProps("isApplyThroughWebsite")}
                      />
                    </FormGroup>
                    {/* <Box className="Apply_through_input"> */}
                    <LabeledInput
                      title=""
                      className="add-form-control"
                      placeholder="Paste a link to your website’s application form"
                      required
                      {...formik.getFieldProps("websiteLink")}
                    />
                    {/* </Box> */}
                    {formik.touched.websiteLink && formik.errors.websiteLink ? (
                      <ErrorMessage>{formik.errors.websiteLink}</ErrorMessage>
                    ) : null}
                  </Grid>
                  <Grid item xl={12} lg={12} xs={12}>
                    <Divider sx={{ borderColor: "#CACACA", opacity: "1" }} />
                  </Grid>
                  <Grid item xl={12} lg={12} xs={12}>
                    <h2 className="mt-2">Preferences</h2>
                  </Grid>
                  <Grid item xl={4} lg={4} xs={12} sm={6}>
                    <label>Education level</label>
                    <SelectInput
                      defaultValue=""
                      placeholder="Choose an education level"
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
                  </Grid>
                  {/* <Grid item xl={12} lg={12} xs={12}>
                    <label className="mb-2">
                      Required languages
                      <span style={{ opacity: "0.5" }}>(Maximum 3)</span>
                      <span className="required-field">*</span>
                    </label>
                    <Grid container spacing={2}>
                      {[0, 1, 2].map((i) => {
                        return (
                          <Grid item xl={4} lg={4} xs={12} key={i}>
                            <SelectInput
                              placeholder="Select a Language"
                              className="mb-3"
                              options={languages.data.map((language) => ({
                                value: language.id,
                                label: language.title,
                              }))}
                              name={`languages[${i}].language`}
                              value={formik.values.languages[i].language || ""}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                            />

                            {i === 0 ? (
                              <>
                                {formik.touched.languages &&
                                  formik.errors.languages ? (
                                  <ErrorMessage>
                                    {formik.errors.languages}
                                  </ErrorMessage>
                                ) : null}
                              </>
                            ) : (
                              ""
                            )}
                          </Grid>
                        );
                      })}
                    </Grid>
                  </Grid> */}
                  <Grid item xl={4} lg={4} xs={12} sm={6}>
                    <label>
                      Required languages{" "}
                      <span style={{ color: "#848484" }}>(Maximum 3)</span>
                      {/* <span className="required-field">*</span> */}
                    </label>
                    <SelectInput
                      defaultValue=""
                      placeholder="Select a Language"
                      multiple
                      options={languages.data.map((language) => ({
                        value: language.id,
                        label: language.title,
                      }))}
                      {...formik.getFieldProps("languages")}
                    />
                    {formik.touched.languages && formik.errors.languages ? (
                      <ErrorMessage>{formik.errors.languages}</ErrorMessage>
                    ) : null}
                  </Grid>
                  <Grid item xl={4} lg={4} xs={12} sm={6}>
                    <label className="mb-2">
                      Job skills
                      <span style={{ opacity: "0.5" }}>(Maximum 3)</span>
                      {/* <span className="required-field">*</span> */}
                    </label>
                    <SelectInput
                      className="mb-3"
                      defaultValue=""
                      placeholder="Select a Skill"
                      options={skills.data.map((skill) => ({
                        value: skill.id,
                        label: skill.title,
                      }))}
                      multiple
                      {...formik.getFieldProps("skills")}
                    />
                    {formik.touched.skills && formik.errors.skills ? (
                      <ErrorMessage>{formik.errors.skills}</ErrorMessage>
                    ) : null}
                  </Grid>
                </Grid>

                <Grid item xl={12} lg={12} xs={12}>
                  <Divider sx={{ borderColor: "#CACACA", opacity: "1" }} />
                </Grid>
                <Grid item xl={12} lg={12} xs={12}>
                  <h2 className="mt-3 mb-3">Attach files</h2>
                  {formik.errors?.attachments ? (
                    <ErrorMessage>{formik.errors?.attachments}</ErrorMessage>
                  ) : null}
                  <AttachmentDragNDropInput
                    files={formik.getFieldProps("attachments").value}
                    handleDrop={(file) => {
                      const currentAttachments = formik.values.attachments;
                      if (file.length + currentAttachments.length > 10) {
                        formik.setFieldError(
                          "attachments",
                          `Maximum 10 files allowed. you can upload only ${
                            10 - currentAttachments.length
                          } remaining`
                        );
                      } else {
                        const filesTaken = file.slice(
                          0,
                          10 - currentAttachments.length
                        );
                        formik.setFieldValue("attachments", [
                          ...currentAttachments,
                          ...filesTaken,
                        ]);
                      }
                    }}
                    deleteFile={(file, index) => {
                      if (file.id) {
                        formik.setFieldValue("attachmentsRemove", [
                          ...formik.values.attachmentsRemove,
                          file.id,
                        ]);
                        formik.setFieldValue(
                          "attachments",
                          formik.values.attachments.filter(
                            (attachment) => attachment.path !== file.path
                          )
                        );
                      } else {
                        formik.setFieldValue(
                          "attachments",
                          formik.values.attachments.filter(
                            (_, i) => i !== index
                          )
                        );
                      }
                    }}
                  />
                </Grid>
                <Grid item xl={12} lg={12} xs={12}>
                  <Divider
                    sx={{ borderColor: "#CACACA", opacity: "1", my: 2 }}
                  />
                </Grid>
                {!jobId && totalAvailableCredits < minimumCreditJobPost ? (
                  <div>
                    Currently, you have{" "}
                    <b>{totalAvailableCredits} credits remaining </b>. In order
                    to post a job, you will need to purchase{" "}
                    <b>
                      {minimumCreditJobPost - totalAvailableCredits} more
                      credits.{" "}
                    </b>
                  </div>
                ) : (
                  <div>
                    Currently, you have{" "}
                    <b>{totalAvailableCredits} credits remaining </b>. In order
                    to post a job, you will redeemed{" "}
                    <b>{minimumCreditJobPost} credits</b> .
                  </div>
                )}
                <Grid container spacing={2}>
                  <Grid item xl={12} lg={12} xs={12}>
                    <h2 className="mt-2">Job Posting Plan</h2>
                  </Grid>
                </Grid>
                <Box>
                  <Package
                    packageData={packageData}
                    handleBuyPackage={handleBuyPackage}
                  />
                </Box>
                <hr className="mt-3" />
                <Grid item xl={12} lg={12} xs={12}>
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    flexWrap="wrap"
                    style={{ marginTop: "40px" }}
                  >
                    <FilledButton
                      title={
                        submitting === SUBMITTING_STATUS_ENUM.loading
                          ? jobId
                            ? "Updating..."
                            : "Posting..."
                          : jobId
                          ? "UPDATE THE JOB"
                          : "POST NEW JOB"
                      }
                      type="submit"
                      disabled={
                        submitting === SUBMITTING_STATUS_ENUM.loading ||
                        (!jobId && totalAvailableCredits < minimumCreditJobPost)
                      }
                      sx={{
                        borderRadius: "73px !important",
                        border: "1px solid #848484 !important",
                        color: "#ffffff !important",
                        fontWeight: "600 !important",
                        fontSize: "16px !important",
                        fontFamily: "Bahnschrift !important",
                        padding: "10px 50px !important",
                        background: "#274593 !important",
                        display: "none",

                        "&:hover": {
                          color: "#848484 !important",
                        },
                        "@media (max-width: 480px)": {
                          padding: "10px 50px !important",
                          width: "100%",
                          display: "block",
                          marginBottom: "10px",
                          fontSize: "14px !important",
                        },
                      }}
                    />
                    <OutlinedButton
                      title="Cancel"
                      disabled={submitting === SUBMITTING_STATUS_ENUM.loading}
                      sx={{
                        borderRadius: "73px !important",
                        border: "1px solid #848484 !important",
                        color: "#848484 !important",
                        fontWeight: "600 !important",
                        fontSize: "16px !important",
                        fontFamily: "Bahnschrift !important",
                        padding: "10px 50px !important",

                        "&:hover": {
                          background: "rgba(40, 71, 146, 0.1) !important",
                          color: "#848484 !important",
                        },
                        "@media (max-width: 480px)": {
                          padding: "10px 50px !important",
                          width: "100%",
                          fontSize: "14px !important",
                        },
                      }}
                      onClick={() => navigate("/employer/manage-jobs")}
                    />
                    <FilledButton
                      title={
                        submitting === SUBMITTING_STATUS_ENUM.loading
                          ? jobId
                            ? "Updating..."
                            : "Posting..."
                          : jobId
                          ? "UPDATE THE JOB"
                          : "POST NEW JOB"
                      }
                      type="submit"
                      disabled={
                        submitting === SUBMITTING_STATUS_ENUM.loading ||
                        (!jobId && totalAvailableCredits < minimumCreditJobPost)
                      }
                      sx={{
                        borderRadius: "73px !important",
                        border: "1px solid #848484 !important",
                        color: "#ffffff !important",
                        fontWeight: "600 !important",
                        fontSize: "16px !important",
                        fontFamily: "Bahnschrift !important",
                        padding: "10px 50px !important",
                        background: "#274593 !important",

                        "&:hover": {
                          color: "#848484 !important",
                        },
                        "@media (max-width: 480px)": {
                          padding: "10px 50px !important",
                          width: "100%",
                          marginTop: "10px",
                          fontSize: "14px !important",
                          display: "none",
                        },
                      }}
                    />
                  </Stack>
                </Grid>
              </form>
            </div>
          </div>
        </CardContent>
      </Card>
      <SuccessToast
        open={submitting === SUBMITTING_STATUS_ENUM.submitted}
        handleClose={() => setSubmitting(SUBMITTING_STATUS_ENUM.null)}
        message="Job Posted Successfully"
      />
      <SuccessToast
        open={submitting === SUBMITTING_STATUS_ENUM.updated}
        handleClose={() => setSubmitting(SUBMITTING_STATUS_ENUM.null)}
        message="Job Updated Successfully"
      />
      <ErrorToast
        open={submitting === SUBMITTING_STATUS_ENUM.error}
        handleClose={() => setSubmitting(SUBMITTING_STATUS_ENUM.null)}
        message="Some thing went wrong!"
      />
      <DialogBox open={open} handleClose={handleClose}>
        <Box
          className="new_post_dailog"
          sx={{
            "@media (max-width:600px)": {
              flexDirection: "column-reverse",
            },
          }}
        >
          <Box
            sx={{
              width: "70%",
              "@media (max-width:600px)": {
                width: "100%",
                textAlign: "center",
              },
            }}
          >
            <h1 className="mb-3">Done!</h1>
            <p>
              {jobId
                ? "Your job post just updated. It will be reviewed and available on Koor shortly."
                : "Your new job post just submitted. It will be reviewed and available on Koor shortly."}
            </p>
            <Box className={`${styles.cancel_popup}`}>
              <OutlinedButton
                title="Go to my jobs"
                onClick={() => handleRedirect()}
                sx={{
                  fontSize: "16px",
                  fontWeight: "600",

                  "@madia (max-width: 480px)": {
                    fontSize: "14px",
                    width: "100%",
                  },
                }}
              />
            </Box>
          </Box>
          <Box
            sx={{
              width: "30%",
              "& svg": { width: "150.36px", height: "150.88px" },
              "@media (max-width:600px)": {
                width: "100%",
                textAlign: "center",
              },
            }}
          >
            <SVG.JobPost className="w-100" />
          </Box>
        </Box>
      </DialogBox>
    </div>
  );
}

export default PostJobsComponent;

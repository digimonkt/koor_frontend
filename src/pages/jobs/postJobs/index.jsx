import {
  Card,
  CardContent,
  Divider,
  FormGroup,
  Grid,
  IconButton,
  Slider,
  Stack,
} from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import {
  AttachmentDragNDropInput,
  CheckboxInput,
  DateInput,
  LabeledInput,
  LabeledRadioInput,
  SelectInput,
} from "@components/input";
import CurrencyInput from "./currencyInput";
import { JobFormControl } from "../../jobSeeker/myProfile/job-preferences";
import { FilledButton, OutlinedButton } from "@components/button";
import { useFormik } from "formik";
import { validateCreateJobInput } from "../validator";
import { ErrorMessage } from "@components/caption";
import { PAY_PERIOD, USER_ROLES, LANGUAGE_PROFICIENCY } from "@utils/enum";
import { useDispatch, useSelector } from "react-redux";
import {
  getCities,
  getCountries,
  getEducationLevels,
  getJobCategories,
  getLanguages,
  getSkills,
} from "@redux/slice/choices";
import { createJobAPI, updateEmployerJobAPI } from "@api/employer";
import { ErrorToast, SuccessToast } from "@components/toast";
import dayjs from "dayjs";
import { getJobDetailsByIdAPI } from "@api/job";
import { DATABASE_DATE_FORMAT } from "@utils/constants/constants";

const SUBMITTING_STATUS_ENUM = Object.freeze({
  loading: "loading",
  submitted: "submitted",
  updated: "updated",
  error: "error",
  null: "",
});
function PostJobsComponent() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    countries,
    cities,
    jobCategories,
    educationLevels,
    languages,
    skills,
  } = useSelector((state) => state.choices);
  const [searchParams] = useSearchParams();
  const [submitting, setSubmitting] = useState(SUBMITTING_STATUS_ENUM.null);
  const [jobId, setJobId] = useState(null);
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
      jobCategories: [],
      isFullTime: false,
      isPartTime: false,
      hasContract: false,
      deadline: "",
      startDate: "",
      isContactEmail: false,
      contactEmail: "",
      isContactPhone: false,
      contactPhone: "",
      isContactWhatsapp: false,
      workingDays: 5,
      contactWhatsapp: "",
      highestEducation: "",
      languages: [
        { language: "", spoken: "", written: "" },
        { language: "", spoken: "", written: "" },
        { language: "", spoken: "", written: "" },
      ],
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
        description: values.description,
        country: values.country,
        city: values.city,
        address: values.address,
        job_category: values.jobCategories,
        is_full_time: values.isFullTime,
        is_part_time: values.isPartTime,
        has_contract: values.hasContract,
        working_days: values.workingDays,
        deadline: dayjs(values.deadline).format(DATABASE_DATE_FORMAT),
        start_date: dayjs(values.startDate).format(DATABASE_DATE_FORMAT),
        contact_email: values.isContactEmail ? values.contactEmail : "",
        contact_phone: values.isContactPhone ? values.contactPhone : "",
        contact_whatsapp: values.isContactWhatsapp
          ? values.contactWhatsapp
          : "",
        highest_education: values.highestEducation,
        language: values.languages,
        skill: values.skills,
        attachments: values.attachments,
        attachments_remove: values.attachmentsRemove,
      };
      const newFormData = new FormData();
      for (const key in payload) {
        if (key === "language") {
          payload.language.forEach((language) => {
            if (language.language && language.spoken && language.written) {
              newFormData.append("language", JSON.stringify(language));
            }
          });
        } else if (key === "attachments") {
          payload.attachments.forEach((attachment) => {
            if (!attachment.id) {
              newFormData.append(key, attachment);
            }
          });
        } else {
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
          setSubmitting(SUBMITTING_STATUS_ENUM.submitted);
          resetForm();
        } else {
          console.log(res);
          setSubmitting(SUBMITTING_STATUS_ENUM.error);
        }
      } else {
        // update
        res = await updateEmployerJobAPI(jobId, newFormData);
        if (res.remote === "success") {
          setSubmitting(SUBMITTING_STATUS_ENUM.updated);
        } else {
          setSubmitting(SUBMITTING_STATUS_ENUM.error);
        }
      }
      if (res.remote === "success") {
        navigate(`/${USER_ROLES.employer}/manage-jobs`);
      }
    },
  });

  const getJobDetailsById = useCallback(async (jobId) => {
    const response = await getJobDetailsByIdAPI({ jobId });
    if (response.remote === "success") {
      const { data } = response;
      formik.setFieldValue("title", data.title);
      formik.setFieldValue("budgetCurrency", data.budgetCurrency);
      formik.setFieldValue("budgetAmount", data.budgetAmount);
      formik.setFieldValue("budgetPayPeriod", data.budgetPayPeriod);
      formik.setFieldValue("description", data.description);
      formik.setFieldValue("country", data.country.id);
      formik.setFieldValue("city", data.city.id);
      formik.setFieldValue("address", data.address);
      formik.setFieldValue(
        "jobCategories",
        data.jobCategories.map
          ? data.jobCategories.map((category) => category.id)
          : []
      );
      formik.setFieldValue("isFullTime", data.isFullTime);
      formik.setFieldValue("isPartTime", data.isPartTime);
      formik.setFieldValue("hasContract", data.hasContract);
      formik.setFieldValue("deadline", dayjs(data.deadline));
      formik.setFieldValue("startDate", dayjs(data.startDate));
      formik.setFieldValue("isContactEmail", Boolean(data.contactEmail));
      formik.setFieldValue("contactEmail", data.contactEmail);
      formik.setFieldValue("isContactPhone", Boolean(data.contactPhone));
      formik.setFieldValue("contactPhone", data.contactPhone);
      formik.setFieldValue("isContactWhatsapp", Boolean(data.contactWhatsapp));
      formik.setFieldValue("contactWhatsapp", data.contactWhatsapp);
      formik.setFieldValue("workingDays", data.workingDays);
      formik.setFieldValue("highestEducation", data.highestEducation.id);

      // !TEMPORARY SOLUTION
      formik.setFieldValue(
        "languages",
        data.languages.map
          ? [
              ...data.languages.map((language) => ({
                language: language.language.id,
                spoken: language.spoken,
                written: language.written,
              })),
              {
                language: "",
                spoken: "",
                written: "",
              },
              {
                language: "",
                spoken: "",
                written: "",
              },
            ]
          : [1, 2, 3].map(() => ({
              language: "",
              spoken: "",
              written: "",
            }))
      );
      formik.setFieldValue("highestEducation", data.highestEducation.id);
      formik.setFieldValue(
        "skills",
        data.skills.map ? data.skills.map((skill) => skill.id) : []
      );
      formik.setFieldValue("attachments", data.attachments);
    }
  }, []);
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
              Post a new job
              <span className="right-pull">
                <IconButton LinkComponent={Link} to={"/employer/manage-jobs"}>
                  <CloseIcon />
                </IconButton>
              </span>
            </h2>
            <div className="form-content">
              <form onSubmit={formik.handleSubmit}>
                <Grid container spacing={2}>
                  <Grid item xl={8} lg={8}>
                    <LabeledInput
                      title="Title of your job"
                      className="add-form-control"
                      placeholder="Online Research Participant (Work From Home/Part Time/Casual)…"
                      {...formik.getFieldProps("title")}
                    />
                    {formik.touched.title && formik.errors.title ? (
                      <ErrorMessage>{formik.errors.title}</ErrorMessage>
                    ) : null}
                  </Grid>
                  <Grid item xl={4} lg={4}>
                    <CurrencyInput
                      currency="USD"
                      title="Budget"
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
                  <Grid item xl={12} lg={12} xs={12}>
                    <div>
                      <label>Description</label>
                      <textarea
                        className="form-control-area"
                        placeholder="Write more details to attract the right candidates."
                        {...formik.getFieldProps("description")}
                      ></textarea>
                    </div>
                    {formik.touched.description && formik.errors.description ? (
                      <ErrorMessage>{formik.errors.description}</ErrorMessage>
                    ) : null}
                  </Grid>
                  <Grid item xl={9} lg={9} xs={12}>
                    <label>Location</label>
                    <Grid container spacing={2}>
                      <Grid item xl={6} lg={6} xs={12}>
                        <SelectInput
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
                      <Grid item xl={6} lg={6} xs={12}>
                        <SelectInput
                          placeholder={
                            formik.values.country
                              ? "City"
                              : "Select Country first"
                          }
                          disabled={!formik.values.country}
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
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xl={3} lg={3} xs={12}>
                    <label>Working place address</label>
                    <input
                      placeholder="Address"
                      className="add-form-control"
                      {...formik.getFieldProps("address")}
                    />
                    {formik.touched.address && formik.errors.address ? (
                      <ErrorMessage>{formik.errors.address}</ErrorMessage>
                    ) : null}
                  </Grid>
                  <Grid item xl={12} lg={12} xs={12}>
                    <label>Job Category (Maximum 2)</label>
                    <Grid container spacing={2}>
                      <Grid item xl={6} lg={6} xs={12}>
                        <SelectInput
                          defaultValue=""
                          placeholder="Select a Job category"
                          options={jobCategories.data.map((jobCategory) => ({
                            value: jobCategory.id,
                            label: jobCategory.title,
                          }))}
                          name={"jobCategories[0]"}
                          value={formik.values.jobCategories[0] || ""}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                        {formik.touched.jobCategories &&
                        formik.errors.jobCategories ? (
                          <ErrorMessage>
                            {formik.errors.jobCategories}
                          </ErrorMessage>
                        ) : null}
                      </Grid>
                      <Grid item xl={6} lg={6} xs={12}>
                        <SelectInput
                          defaultValue=""
                          placeholder="Select a Job category"
                          options={jobCategories.data.map((jobCategory) => ({
                            value: jobCategory.id,
                            label: jobCategory.title,
                          }))}
                          name="jobCategories[1]"
                          value={formik.values.jobCategories[1] || ""}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xl={3} lg={4} xs={12}>
                    <label>Job type</label>
                    <FormGroup row sx={{ marginLeft: "7px" }}>
                      <JobFormControl
                        control={<CheckboxInput />}
                        label="Part Time"
                        {...formik.getFieldProps("isPartTime")}
                      />
                      <JobFormControl
                        control={<CheckboxInput />}
                        label="Full Time"
                        {...formik.getFieldProps("isFullTime")}
                      />
                      <JobFormControl
                        control={<CheckboxInput />}
                        label="Contract"
                        {...formik.getFieldProps("hasContract")}
                      />
                    </FormGroup>
                  </Grid>
                  <Grid item xl={3} lg={4} xs={12}>
                    <label>Timing ({formik.values.workingDays} Day week)</label>
                    <Slider
                      defaultValue={5}
                      step={1}
                      marks
                      min={1}
                      max={7}
                      valueLabelDisplay="auto"
                      valueLabelFormat={(value) => `${value} Day week`}
                      {...formik.getFieldProps("workingDays")}
                      value={formik.getFieldProps("workingDays").value || 5}
                    />
                    {formik.touched.timing && formik.errors.timing ? (
                      <ErrorMessage>{formik.errors.timing}</ErrorMessage>
                    ) : null}
                  </Grid>
                  <Grid item xl={3} lg={3} xs={12}>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <DateInput
                        label="Start Date"
                        onChange={(e) => formik.setFieldValue("startDate", e)}
                        value={formik.values.startDate}
                        onBlur={formik.getFieldProps("startDate").onBlur}
                      />
                      {formik.touched.startDate && formik.errors.startDate ? (
                        <ErrorMessage>{formik.errors.startDate}</ErrorMessage>
                      ) : null}
                    </div>
                  </Grid>
                  <Grid item xl={3} lg={3} xs={12}>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <DateInput
                        label="Deadline"
                        onChange={(e) => formik.setFieldValue("deadline", e)}
                        value={formik.values.deadline}
                        onBlur={formik.getFieldProps("deadline").onBlur}
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
                    <h2 className="mt-3">Additional ways to apply</h2>
                  </Grid>
                  <Grid item xl={4} lg={4} xs={12}>
                    <JobFormControl
                      control={<CheckboxInput />}
                      label="Apply by email"
                      checked={formik.values.isContactEmail}
                      {...formik.getFieldProps("isContactEmail")}
                    />
                    <input
                      className="add-form-control"
                      placeholder="Your email address"
                      {...formik.getFieldProps("contactEmail")}
                    />
                    {formik.touched.contactEmail &&
                    formik.errors.contactEmail ? (
                      <ErrorMessage>{formik.errors.contactEmail}</ErrorMessage>
                    ) : null}
                  </Grid>
                  <Grid item xl={4} lg={4} xs={12}>
                    <JobFormControl
                      control={<CheckboxInput />}
                      label="Apply by call or SMS"
                      checked={formik.values.isContactPhone}
                      {...formik.getFieldProps("isContactPhone")}
                    />
                    <input
                      className="add-form-control"
                      placeholder="Your mobile number"
                      {...formik.getFieldProps("contactPhone")}
                    />
                    {formik.touched.contactPhone &&
                    formik.errors.contactPhone ? (
                      <ErrorMessage>{formik.errors.contactPhone}</ErrorMessage>
                    ) : null}
                  </Grid>
                  <Grid item xl={4} lg={4} xs={12}>
                    <JobFormControl
                      control={<CheckboxInput />}
                      label="Apply via WhatsApp"
                      checked={formik.values.isContactWhatsapp}
                      {...formik.getFieldProps("isContactWhatsapp")}
                    />
                    <input
                      className="add-form-control"
                      placeholder="Your WhatsApp number"
                      {...formik.getFieldProps("contactWhatsapp")}
                    />
                    {formik.touched.contactWhatsapp &&
                    formik.errors.contactWhatsapp ? (
                      <ErrorMessage>
                        {formik.errors.contactWhatsapp}
                      </ErrorMessage>
                    ) : null}
                  </Grid>
                  <Grid item xl={12} lg={12} xs={12}>
                    <Divider sx={{ borderColor: "#CACACA", opacity: "1" }} />
                  </Grid>
                  <Grid item xl={12} lg={12} xs={12}>
                    <h2 className="mt-2">Preferences</h2>
                  </Grid>
                  <Grid item xl={4} lg={4} xs={12}>
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
                  <Grid item xl={12} lg={12} xs={12}>
                    <label>
                      Required languages
                      <span style={{ opacity: "0.5" }}>(Maximum 3)</span>
                    </label>
                    <Grid container spacing={2}>
                      {[0, 1, 2].map((i) => {
                        return (
                          <Grid item xl={4} lg={4} xs={12} key={i}>
                            <SelectInput
                              placeholder="Select a Language"
                              options={languages.data.map((language) => ({
                                value: language.id,
                                label: language.title,
                              }))}
                              name={`languages[${i}].language`}
                              value={formik.values.languages[i].language || ""}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                            />
                            <LabeledRadioInput
                              title="Spoken"
                              name={`languages[${i}].spoken`}
                              value={formik.values.languages[i].spoken || ""}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              options={Object.keys(LANGUAGE_PROFICIENCY).map(
                                (prof) => {
                                  return {
                                    value: LANGUAGE_PROFICIENCY[prof],
                                    label: prof,
                                  };
                                }
                              )}
                            />
                            <LabeledRadioInput
                              title="Written"
                              name={`languages[${i}].written`}
                              value={formik.values.languages[i].written || ""}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              options={Object.keys(LANGUAGE_PROFICIENCY).map(
                                (prof) => {
                                  return {
                                    value: LANGUAGE_PROFICIENCY[prof],
                                    label: prof,
                                  };
                                }
                              )}
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
                  </Grid>
                </Grid>
                <Grid item xl={12} lg={12} xs={12}>
                  <label>
                    Job skills{" "}
                    <span style={{ opacity: "0.5" }}>(Maximum 3)</span>
                  </label>
                  <Grid container spacing={2}>
                    <Grid item xl={4} lg={4} xs={12}>
                      <SelectInput
                        defaultValue=""
                        placeholder="Select a Skill"
                        options={skills.data.map((skill) => ({
                          value: skill.id,
                          label: skill.title,
                        }))}
                        name="skills[0]"
                        value={formik.values.skills[0] || ""}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched.skills && formik.errors.skills ? (
                        <ErrorMessage>{formik.errors.skills}</ErrorMessage>
                      ) : null}
                    </Grid>
                    <Grid item xl={4} lg={4} xs={12}>
                      <SelectInput
                        defaultValue=""
                        placeholder="Select a Skill"
                        options={skills.data.map((skill) => ({
                          value: skill.id,
                          label: skill.title,
                        }))}
                        name="skills[1]"
                        value={formik.values.skills[1] || ""}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                    </Grid>
                    <Grid item xl={4} lg={4} xs={12}>
                      <SelectInput
                        defaultValue=""
                        placeholder="Select a Skill"
                        options={skills.data.map((skill) => ({
                          value: skill.id,
                          label: skill.title,
                        }))}
                        name="skills[2]"
                        value={formik.values.skills[2] || ""}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xl={12} lg={12} xs={12}>
                  <Divider sx={{ borderColor: "#CACACA", opacity: "1" }} />
                </Grid>
                <Grid item xl={12} lg={12} xs={12}>
                  <h2 className="mt-2 mb-3">Attach files</h2>
                  <AttachmentDragNDropInput
                    files={formik.getFieldProps("attachments").value}
                    handleDrop={(file) => {
                      formik.setValues({
                        ...formik.values,
                        attachments: [
                          ...formik.getFieldProps("attachments").value,
                          file[0],
                        ],
                      });
                    }}
                    deleteFile={(file) => {
                      if (file.id) {
                        formik.setFieldValue("attachmentsRemove", [
                          ...formik.values.attachmentsRemove,
                          file.id,
                        ]);
                      } else {
                        formik.setFieldValue(
                          "attachments",
                          formik.values.attachments.filter(
                            (attachment) => attachment.path !== file.path
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
                <Grid item xl={12} lg={12} xs={12}>
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <OutlinedButton
                      title="Cancel"
                      disabled={submitting === SUBMITTING_STATUS_ENUM.loading}
                      sx={{
                        "&.MuiButton-outlined": {
                          borderRadius: "73px",
                          border: "0px",
                          color: "#848484",
                          fontWeight: "500",
                          fontSize: "16px",
                          fontFamily: "Bahnschrift",
                          padding: "6px 50px",

                          "&:hover": {
                            background: "rgba(40, 71, 146, 0.1)",
                            color: "#274593",
                          },
                          "@media (max-width: 992px)": {
                            padding: "5px 15px",
                            fontSize: "14px",
                          },
                        },
                      }}
                    />
                    <FilledButton
                      title={
                        submitting === SUBMITTING_STATUS_ENUM.loading
                          ? jobId
                            ? "Updating..."
                            : "Posting..."
                          : jobId
                          ? "UPDATE THE JOB"
                          : "POST THE JOB"
                      }
                      type="submit"
                      disabled={submitting === SUBMITTING_STATUS_ENUM.loading}
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
    </div>
  );
}

export default PostJobsComponent;

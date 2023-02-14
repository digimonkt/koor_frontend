import {
  Card,
  CardContent,
  Divider,
  FormGroup,
  Grid,
  IconButton,
  Stack,
} from "@mui/material";
import React, { useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { Link } from "react-router-dom";
import {
  AttachmentDragNDropInput,
  CheckboxInput,
  LabeledInput,
  SelectInput,
} from "@components/input";
import CurrencyInput from "./currencyInput";
import { JobFormControl } from "../../jobSeeker/myProfile/job-preferences";
import { FilledButton, OutlinedButton } from "@components/button";
import { useFormik } from "formik";
import { validateCreateJobInput } from "../validator";
import { ErrorMessage } from "@components/caption";
import { PAY_PERIOD } from "@utils/enum";
import { useDispatch, useSelector } from "react-redux";
import {
  getCities,
  getCountries,
  getEducationLevels,
  getJobCategories,
  getLanguages,
  getSkills,
} from "@redux/slice/choices";
import { createJobAPI } from "@api/employer";

function PostJobsComponent() {
  const dispatch = useDispatch();
  const {
    countries,
    cities,
    jobCategories,
    educationLevels,
    languages,
    skills,
  } = useSelector((state) => state.choices);

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
      isContactEmail: false,
      contactEmail: "",
      isContactPhone: false,
      contactPhone: "",
      isContactWhatsapp: false,
      workingDays: 5,
      contactWhatsapp: "",
      highestEducation: "",
      languages: [],
      skills: [],
      attachments: [],
    },
    validationSchema: validateCreateJobInput,
    onSubmit: async (values) => {
      const payload = {
        title: values.title,
        budget_currency: values.budgetCurrency,
        budget_amount: values.budgetAmount,
        budget_pay_period: values.budgetPayPeriod,
        description: values.description,
        country: values.country,
        city: values.city,
        address: values.address,
        jobCategories: values.jobCategories,
        is_full_time: values.isFullTime,
        is_part_time: values.isPartTime,
        has_contract: values.hasContract,
        working_days: values.workingDays,
        contact_email: values.isContactEmail ? values.contactEmail : "",
        contact_phone: values.isContactPhone ? values.contactPhone : "",
        contact_whatsapp: values.isContactWhatsapp
          ? values.contactWhatsapp
          : "",
        highest_education: values.highestEducation,
        languages: values.languages,
        skills: values.skills,
        attachments: values.attachments,
      };
      const newFormData = new FormData();
      for (const key in payload) {
        if (payload[key].map) {
          payload[key].forEach((data) => {
            newFormData.append(key, data);
          });
        } else {
          if (payload[key]) newFormData.append(key, payload[key]);
        }
      }
      const res = await createJobAPI(newFormData);
      if (res.remote === "success") {
        console.log(res);
      } else {
        console.log(res);
      }
      // now newFormData can be used to send in api
      // NOTE: `timing` is remaining
    },
  });

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
                      placeholder="Menara Suruhanjaya Syakinat St..."
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
                  <Grid item xl={4} lg={4} xs={12}>
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
                  <Grid item xl={4} lg={4} xs={12}>
                    <label>Timing</label>
                    <input
                      type="text"
                      placeholder="5 Day week"
                      className="add-form-control"
                      {...formik.getFieldProps("workingDays")}
                    />
                    {formik.touched.timing && formik.errors.timing ? (
                      <ErrorMessage>{formik.errors.timing}</ErrorMessage>
                    ) : null}
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
                      <Grid item xl={4} lg={4} xs={12}>
                        <SelectInput
                          defaultValue=""
                          placeholder="Select a Language"
                          options={languages.data.map((language) => ({
                            value: language.id,
                            label: language.title,
                          }))}
                          name="languages[0]"
                          value={formik.values.languages[0] || ""}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                        {formik.touched.languages && formik.errors.languages ? (
                          <ErrorMessage>{formik.errors.languages}</ErrorMessage>
                        ) : null}
                      </Grid>
                      <Grid item xl={4} lg={4} xs={12}>
                        <SelectInput
                          placeholder="Select a Language"
                          options={languages.data.map((language) => ({
                            value: language.id,
                            label: language.title,
                          }))}
                          name="languages[1]"
                          value={formik.values.languages[1] || ""}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                      </Grid>
                      <Grid item xl={4} lg={4} xs={12}>
                        <SelectInput
                          placeholder="Select a Language"
                          options={languages.data.map((language) => ({
                            value: language.id,
                            label: language.title,
                          }))}
                          name="languages[2]"
                          value={formik.values.languages[2] || ""}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                      </Grid>
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
                      title="POST THE JOB"
                      isBlueButton
                      type="submit"
                    />
                  </Stack>
                </Grid>
              </form>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default PostJobsComponent;

import {
  Card,
  CardContent,
  Divider,
  FormGroup,
  Grid,
  IconButton,
  Stack,
} from "@mui/material";
import React from "react";
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

function PostJobsComponent() {
  const formik = useFormik({
    initialValues: {
      title: "",
      budgetCurrency: "usd",
      budgetAmount: null,
      budgetPayPeriod: PAY_PERIOD.month,
      description: "",
      country: "",
      city: "",
      address: "",
      jobCategory1: "",
      jobCategory2: "",
      isFullTime: false,
      isPartTime: false,
      hasContract: false,
      isContactEmail: false,
      contactEmail: "",
      isContactPhone: false,
      contactPhone: "",
      isContactWhatsapp: false,
      contactWhatsapp: "",
      highestEducation: "",
      language1: "",
      language2: "",
      language3: "",
      skill1: "",
      skill2: "",
      skill3: "",
      attachments: [],
    },
    validationSchema: validateCreateJobInput,
    onSubmit: (values) => {
      const payload = {
        title: values.title,
        budget_currency: values.budgetCurrency,
        budget_amount: values.budgetCurrency,
        budget_pay_period: values.budgetPayPeriod,
        description: values.description,
        country: values.country,
        city: values.city,
        address: values.address,
        job_category_1: values.jobCategory1,
        job_category_2: values.jobCategory2,
        is_full_time: values.isFullTime,
        is_part_time: values.isPartTime,
        has_contract: values.hasContract,
        contact_email: values.isContactEmail ? values.contactEmail : "",
        contact_phone: values.isContactPhone ? values.contactPhone : "",
        contact_whatsapp: values.isContactWhatsapp
          ? values.contactWhatsapp
          : "",
        highest_education: values.highestEducation,
        language_1: values.language1,
        language_2: values.language2,
        language_3: values.language3,
        skill_1: values.skill1,
        skill_2: values.skill2,
        skill_3: values.skill3,
        attachments: values.attachments,
      };
      const newFormData = new FormData();
      for (const key in payload) {
        newFormData.append(key, payload[key]);
      }
      // now newFormData can be used to send in api
      // NOTE: `timing` is remaining
    },
  });
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
                          options={[{ value: "1", label: "India" }]}
                          value="1"
                          {...formik.getFieldProps("country")}
                        />
                        {formik.touched.country && formik.errors.country ? (
                          <ErrorMessage>{formik.errors.country}</ErrorMessage>
                        ) : null}
                      </Grid>
                      <Grid item xl={6} lg={6} xs={12}>
                        <SelectInput
                          placeholder="City"
                          defaultValue=""
                          options={[{ value: "1", label: "Gwalior" }]}
                          value="1"
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
                          options={[{ value: "react", label: "ReactJS" }]}
                          {...formik.getFieldProps("jobCategory1")}
                        />
                        {formik.touched.jobCategory1 &&
                        formik.errors.jobCategory1 ? (
                          <ErrorMessage>
                            {formik.errors.jobCategory1}
                          </ErrorMessage>
                        ) : null}
                      </Grid>
                      <Grid item xl={6} lg={6} xs={12}>
                        <SelectInput
                          defaultValue=""
                          placeholder="Select a Job category"
                          options={[{ value: "react", label: "ReactJS" }]}
                          {...formik.getFieldProps("jobCategory2")}
                        />
                        {formik.touched.jobCategory2 &&
                        formik.errors.jobCategory2 ? (
                          <ErrorMessage>
                            {formik.errors.jobCategory2}
                          </ErrorMessage>
                        ) : null}
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
                      // {...formik.getFieldProps("hasContract")}
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
                      options={[
                        { value: "1", label: "Education 1" },
                        { value: "2", label: "Education 2" },
                        { value: "3", label: "Education 3" },
                      ]}
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
                          options={[
                            { value: "english", label: "English" },
                            { value: "hindi", label: "Hindi" },
                            { value: "sanskrit", label: "Sanskrit" },
                          ]}
                          {...formik.getFieldProps("language1")}
                        />
                        {formik.touched.language1 && formik.errors.language1 ? (
                          <ErrorMessage>{formik.errors.language1}</ErrorMessage>
                        ) : null}
                      </Grid>
                      <Grid item xl={4} lg={4} xs={12}>
                        <SelectInput
                          placeholder="Select a Language"
                          options={[
                            { value: "english", label: "English" },
                            { value: "hindi", label: "Hindi" },
                            { value: "sanskrit", label: "Sanskrit" },
                          ]}
                          {...formik.getFieldProps("language2")}
                        />
                      </Grid>
                      <Grid item xl={4} lg={4} xs={12}>
                        <SelectInput
                          placeholder="Select a Language"
                          options={[
                            { value: "english", label: "English" },
                            { value: "hindi", label: "Hindi" },
                            { value: "sanskrit", label: "Sanskrit" },
                          ]}
                          {...formik.getFieldProps("language3")}
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
                        options={[
                          {
                            value: "1",
                            label: "Skill 1",
                          },
                          {
                            value: "2",
                            label: "Skill 2",
                          },
                          {
                            value: "3",
                            label: "Skill 3",
                          },
                        ]}
                        {...formik.getFieldProps("skill1")}
                      />
                      {formik.touched.skill1 && formik.errors.skill1 ? (
                        <ErrorMessage>{formik.errors.skill1}</ErrorMessage>
                      ) : null}
                    </Grid>
                    <Grid item xl={4} lg={4} xs={12}>
                      <SelectInput
                        defaultValue=""
                        placeholder="Select a Skill"
                        options={[
                          {
                            value: "1",
                            label: "Skill 1",
                          },
                          {
                            value: "2",
                            label: "Skill 2",
                          },
                          {
                            value: "3",
                            label: "Skill 3",
                          },
                        ]}
                        {...formik.getFieldProps("skill2")}
                      />
                    </Grid>
                    <Grid item xl={4} lg={4} xs={12}>
                      <SelectInput
                        defaultValue=""
                        placeholder="Select a Skill"
                        options={[
                          {
                            value: "1",
                            label: "Skill 1",
                          },
                          {
                            value: "2",
                            label: "Skill 2",
                          },
                          {
                            value: "3",
                            label: "Skill 3",
                          },
                        ]}
                        {...formik.getFieldProps("skill3")}
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

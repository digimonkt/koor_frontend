import { useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useFormik } from "formik";
import { createTenderAPI, updateTenderAPI } from "@api/employer";
import dayjs from "dayjs";
import { setSuccessToast, setErrorToast } from "@redux/slice/toast";
import { DATABASE_DATE_FORMAT } from "@utils/constants/constants";
import { ErrorMessage } from "@components/caption";
import {
  AttachmentDragNDropInput,
  LabeledInput,
  DateInput,
  SelectInput,
} from "@components/input";
import {
  getCountries,
  getJobCategories,
  getCities,
  getJobSubCategories,
  getTenderTags,
  getTenderSector,
} from "@redux/slice/choices";
import CurrencyInput from "@pages/jobs/postJobs/currencyInput";
import { FilledButton, OutlinedButton } from "@components/button";
import { PAY_PERIOD, ORGANIZATION_TYPE } from "@utils/enum";
import {
  Card,
  CardContent,
  Divider,
  Grid,
  IconButton,
  Stack,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { validateCreateTenderInput } from "@pages/jobs/validator";
const PostTender = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const [tenderId, setTenderId] = useState(null);
  const [searchParams] = useSearchParams();
  console.log(searchParams);
  const { countries, jobCategories, tags, cities, jobSubCategories, sectors } =
    useSelector((state) => state.choices);
  const formik = useFormik({
    initialValues: {
      title: "",
      budgetCurrency: "usd",
      budgetAmount: 0,
      budgetPayPeriod: PAY_PERIOD.month,
      description: "",
      country: "",
      city: "",
      jobCategories: "",
      jobSubCategory: "",
      sectors: "",
      jobType: "",
      tag: "",
      startDate: "",
      deadline: "",
      attachments: [],
      attachmentsRemove: [],
    },
    validationSchema: validateCreateTenderInput,
    onSubmit: async (values, { resetForm }) => {
      const payload = {
        title: values.title,
        budget_currency: values.budgetCurrency,
        budget_amount: values.budgetAmount,
        budget_pay_period: values.budgetPayPeriod,
        description: values.description,
        country: values.country,
        sector: values.sectors,
        tender_type: values.jobType,
        city: values.city,
        job_category: values.jobCategories,
        job_sub_category: values.jobSubCategory,
        deadline: dayjs(values.deadline).format(DATABASE_DATE_FORMAT),
        start_date: values.startDate
          ? dayjs(values.startDate).format(DATABASE_DATE_FORMAT)
          : "",
        attachments: values.attachments,
        attachments_remove: values.attachmentsRemove,
      };
      const newFormData = new FormData();
      for (const key in payload) {
        if (key === "attachments") {
          payload.attachments.forEach((attachment) => {
            if (!attachment.id) {
              newFormData.append(key, attachment);
            }
          });
        }
      }
      // Create tender
      const tenderId = null;
      let response;
      if (!tenderId) {
        response = await createTenderAPI(payload);
        if (response.remote === "success") {
          dispatch(setSuccessToast("Tender Deleted Successfully"));
          resetForm();
        } else {
          dispatch(setErrorToast("Something went wrong"));
          console.log(response.error);
        }
      } else {
        // Update tender

        response = await updateTenderAPI(tenderId, newFormData);
        if (response.remote === "success") {
          console.log(response.data);
        } else {
          console.log(response.error);
        }
      }
    },
  });

  useEffect(() => {
    if (!countries.data.length) {
      dispatch(getCountries());
    }
    if (!jobCategories.data.length) {
      dispatch(getJobCategories());
    }

    if (!tags.data.length) {
      dispatch(getTenderTags());
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
      formik.values.jobCategories &&
      !jobSubCategories.data[formik.values.jobCategories]?.length
    ) {
      dispatch(
        getJobSubCategories({ categoryId: formik.values.jobCategories })
      );
    }
  }, [formik.values.jobCategories]);

  useEffect(() => {
    if (formik.values.sectors && !sectors.data[formik.values.sectors]?.length) {
      dispatch(getJobSubCategories({ sectorId: formik.values.sectors }));
    }
  }, [formik.values.sectors]);

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
              Post a new tender
              <span className="right-pull">
                <IconButton onClick={() => navigate(-1)}>
                  <CloseIcon />
                </IconButton>
              </span>
            </h2>
            <div className="form-content">
              <form onSubmit={formik.handleSubmit}>
                <Grid container spacing={2}>
                  <Grid item xl={8} lg={8}>
                    <LabeledInput
                      title="Title of your tender"
                      className="add-form-control"
                      placeholder="Bed And Breakfast Temporary Accommodation"
                      required={true}
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
                  <Grid item xl={12} lg={12} xs={12}>
                    <label>Location</label>
                    <Grid container spacing={2}>
                      <Grid item xl={6} lg={6} sx={12}>
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

                  <Grid item xl={12} lg={12} xs={12}>
                    <label>Category (Maximum 2)</label>
                    <Grid container spacing={2}>
                      <Grid item xl={6} lg={6} xs={12}>
                        <SelectInput
                          defaultValue=""
                          placeholder="Select a Job category"
                          options={jobCategories.data.map((jobCategory) => ({
                            value: jobCategory.id,
                            label: jobCategory.title,
                          }))}
                          name={"jobCategories"}
                          value={formik.values.jobCategories || ""}
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
                      <Grid item xl={6} lg={6} sx={12}>
                        <SelectInput
                          defaultValue=""
                          placeholder={
                            formik.values.jobCategories
                              ? "Job Sub Category"
                              : "Select Category first"
                          }
                          options={(
                            jobSubCategories.data[
                              formik.values.jobCategories
                            ] || []
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
                    </Grid>
                  </Grid>
                  <Grid item xl={12} lg={12} xs={12}>
                    <Grid container spacing={2}>
                      <Grid item xl={4} lg={4} xs={12}>
                        <label>Sector</label>
                        <SelectInput
                          defaultValue=""
                          placeholder="Select a Sector"
                          options={sectors.data.map((sector) => ({
                            value: sector.id,
                            label: sector.title,
                          }))}
                          name="sectors"
                          value={formik.values.sectors || ""}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                        {formik.touched.sectors && formik.errors.sectors ? (
                          <ErrorMessage>{formik.errors.sectors}</ErrorMessage>
                        ) : null}
                      </Grid>
                      <Grid item xl={4} lg={4} xs={12}>
                        <label>Type</label>
                        <SelectInput
                          placeholder="Select Type"
                          defaultValue=""
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
                          {...formik.getFieldProps("jobType")}
                        />
                      </Grid>
                      <Grid item xl={4} lg={4} xs={12}>
                        <label>Tag</label>
                        <SelectInput
                          defaultValue=""
                          placeholder="Select a Tag"
                          options={tags.data.map((tag) => ({
                            value: tag.id,
                            label: tag.title,
                          }))}
                          name={"tag"}
                          value={formik.values.tag || ""}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                        {formik.touched.tag && formik.errors.tag ? (
                          <ErrorMessage>{formik.errors.tag}</ErrorMessage>
                        ) : null}
                      </Grid>
                      <Grid item xl={3} lg={3} xs={12} className="mt-2">
                        <div
                          style={{ display: "flex", flexDirection: "column" }}
                        >
                          <Stack
                            direction="row"
                            alignItems="center"
                            justifyContent="space-between"
                            className="mb-2"
                          >
                            <label className="mb-1 d-inline-block">
                              Start Date
                            </label>
                          </Stack>
                          <DateInput
                            onChange={(e) =>
                              formik.setFieldValue("startDate", e)
                            }
                            value={formik.values.startDate}
                            onBlur={formik.getFieldProps("startDate").onBlur}
                          />
                          {formik.touched.startDate &&
                          formik.errors.startDate ? (
                            <ErrorMessage>
                              {formik.errors.startDate}
                            </ErrorMessage>
                          ) : null}
                        </div>
                      </Grid>
                      <Grid item xl={3} lg={3} xs={12} className="mt-2">
                        <div
                          style={{ display: "flex", flexDirection: "column" }}
                        >
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
                            onChange={(e) =>
                              formik.setFieldValue("deadline", e)
                            }
                            value={formik.values.deadline}
                            onBlur={formik.getFieldProps("deadline").onBlur}
                          />
                          {formik.touched.deadline && formik.errors.deadline ? (
                            <ErrorMessage>
                              {formik.errors.deadline}
                            </ErrorMessage>
                          ) : null}
                        </div>
                      </Grid>
                    </Grid>
                  </Grid>

                  <Grid item xl={12} lg={12} xs={12}>
                    <Divider sx={{ borderColor: "#CACACA", opacity: "1" }} />
                  </Grid>
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
                    <FilledButton title="POST THE TENDER" type="submit" />
                  </Stack>
                </Grid>
              </form>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PostTender;

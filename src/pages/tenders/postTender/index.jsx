import { useState, useEffect, useCallback } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useFormik } from "formik";
import { createTenderAPI, updateTenderAPI } from "../../../api/employer";
import dayjs from "dayjs";
import { setSuccessToast, setErrorToast } from "../../../redux/slice/toast";
import { DATABASE_DATE_FORMAT } from "../../../utils/constants/constants";
import { ErrorMessage } from "../../../components/caption";
import {
  AttachmentDragNDropInput,
  LabeledInput,
  DateInput,
  SelectInput,
} from "../../../components/input";
import {
  getCountries,
  getCities,
  getTenderTags,
  getTenderSector,
  getTenderCategories,
  getTenderOpportunityType,
} from "../../../redux/slice/choices";
import CurrencyInput from "../../../pages/jobs/postJobs/currencyInput";
import { FilledButton, OutlinedButton } from "../../../components/button";
import { PAY_PERIOD, USER_ROLES } from "../../../utils/enum";
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
import { useDispatch, useSelector } from "react-redux";
import { validateCreateTenderInput } from "../../../pages/jobs/validator";
import { getTenderDetailsByIdAPI } from "../../../api/tender";
import DialogBox from "../../../components/dialogBox";
import { SVG } from "../../../assets/svg";
import styles from "./postTender.module.css";
import { useDebounce } from "usehooks-ts";
import { GetSuggestedAddressAPI } from "../../../api/user";
import urlcat from "urlcat";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
const PostTender = () => {
  const { currentUser } = useSelector(state => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const {
    countries,
    tenderCategories,
    tags,
    cities,
    sectors,
    opportunityTypes,
  } = useSelector(state => state.choices);
  const [tenderId, setTenderId] = useState(null);
  const [open, setOpen] = useState(false);
  const [isRedirect, setIsRedirect] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const debouncedSearchValue = useDebounce(searchValue, 500);
  const [suggestedAddress, setSuggestedAddress] = useState([]);
  const [descData, setDescData] = useState("");
  const [applicationInstructionData, setApplicationInstructionData] =
    useState("");
  const toolbarOptions = [
    ["bold", "italic", "underline", "strike"], // basic formatting
    ["blockquote", "code-block"], // blockquote and code block
    [{ header: 1 }, { header: 2 }], // headers
    [{ list: "ordered" }, { list: "bullet" }], // ordered and unordered lists
    [{ script: "sub" }, { script: "super" }], // subscript and superscript
    [{ indent: "-1" }, { indent: "+1" }], // outdent and indent
    [{ direction: "rtl" }], // text direction
    [{ size: ["small", false, "large", "huge"] }], // font size
    [{ color: [] }, { background: [] }], // text and background color
    [{ font: [] }], // font family
    [{ align: [] }], // text alignment
    ["link", "image", "video"], // link, image, and video
    ["clean"], // remove formatting
  ];
  const getSuggestedAddress = async search => {
    const res = await GetSuggestedAddressAPI(search);
    if (res.remote === "success") {
      setSuggestedAddress(res.data.predictions);
    }
  };
  const handleRedirect = () => {
    setOpen(close);
    setIsRedirect(true);
  };
  const handleClose = () => {
    setOpen(false);
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
      categories: [],
      sectors: "",
      opportunityType: "",
      tag: "",
      startDate: "",
      deadline: "",
      attachments: [],
      attachmentsRemove: [],
      isApplyThroughKoor: true,
      isApplyThroughEmail: false,
      isApplyThroughWebsite: false,
      websiteLink: "",
      applicationInstruction: "",
      contactEmail: "",
      cc1: "",
      cc2: "",
    },
    validationSchema: validateCreateTenderInput,
    onSubmit: async (values, { resetForm }) => {
      console.log("values in", values);
      const payload = {
        title: values.title || "",
        budget_currency: values.budgetCurrency,
        budget_amount: values.budgetAmount,
        budget_pay_period: values.budgetPayPeriod,
        description: values.description || "",
        country: values.country || "",
        sector: values.sectors || "",
        tender_type: values.opportunityType || "",
        city: values.city || "",
        tender_category: values.categories || [],
        deadline: dayjs(values.deadline).format(DATABASE_DATE_FORMAT),
        address: values.address || "",
        start_date: values.startDate
          ? dayjs(values.startDate).format(DATABASE_DATE_FORMAT)
          : "",
        attachments: values.attachments,
        attachments_remove: values.attachmentsRemove,
        tag: values.tag || "",
        apply_through_koor: values.isApplyThroughKoor || "false",
        apply_through_email: values.isApplyThroughEmail || "false",
        apply_through_website: values.isApplyThroughWebsite || "false",
        application_instruction: values.applicationInstruction || "",
        website_link: values.websiteLink || "",
        contact_email: values.isApplyThroughEmail ? values.contactEmail : "",
        cc1: values.cc1 || "",
        cc2: values.cc2 || "",
      };
      console.log({ payload });
      const newFormData = new FormData();
      for (const key in payload) {
        if (key === "attachments") {
          payload.attachments.forEach(attachment => {
            if (!attachment.id) {
              newFormData.append(key, attachment);
            }
          });
        } else if (payload[key].forEach) {
          payload[key].forEach(data => newFormData.append(key, data));
        } else if (payload[key]) {
          newFormData.append(key, payload[key]);
        }
      }
      // Create tender
      let response;
      if (!tenderId) {
        response = await createTenderAPI(newFormData);
        if (response.remote === "success") {
          dispatch(setSuccessToast("Tender Created Successfully"));
          resetForm();
        } else {
          dispatch(setErrorToast("Something went wrong"));
        }
      } else {
        // Update tender
        response = await updateTenderAPI(tenderId, newFormData);
        if (response.remote === "success") {
          dispatch(setSuccessToast("Tender Updated Successfully"));
        } else {
          dispatch(setErrorToast("Something went wrong"));
        }
      }
      if (response.remote === "success") {
        setOpen(true);
      }
    },
  });
  const handleEditorValue = content => {
    setDescData(content);
    formik.setFieldValue(
      "description",
      content !== "<p><br></p>" ? content : "",
    );
  };
  console.log({ formik });
  const getTenderDetailsById = useCallback(async tenderId => {
    const response = await getTenderDetailsByIdAPI({ tenderId });
    if (response.remote === "success") {
      const { data } = response;
      const payloadFormik = {
        title: data.title,
        budgetCurrency: data.budgetCurrency || "usd",
        budgetAmount: Number(data.budgetAmount) || 0,
        // budgetPayPeriod: data.budget,
        description: data.description || "",
        country: data.country.id,
        city: data.city.id,
        categories: data.categories.map(category => category.id),
        sectors: data.sector.id,
        opportunityType: data.type.id,
        tag: data.tag[0]?.id || "",
        startDate: data.startDate,
        deadline: data.deadline,
        attachments: data.attachments,
        address: data.address,
      };
      if (data.address) {
        setSearchValue(data.address);
      }
      for (const key in payloadFormik) {
        formik.setFieldValue(key, payloadFormik[key]);
      }
      formik.setFieldValue("contactEmail", data.contactEmail);
      formik.setFieldValue("cc1", data.cc1);
      formik.setFieldValue("cc2", data.cc2);
      formik.setFieldValue(
        "isApplyThroughKoor",
        Boolean(data.isApplyThroughKoor),
      );
      formik.setFieldValue(
        "isApplyThroughEmail",
        Boolean(data.isApplyThroughEmail),
      );
      formik.setFieldValue(
        "isApplyThroughWebsite",
        Boolean(data.isApplyThroughWebsite),
      );
      formik.setFieldValue(
        "applicationInstruction",
        data.applicationInstruction,
      );
      formik.setFieldValue("websiteLink", data.websiteLink);
    }
  }, []);
  const handleApplicationInstructionEditorValue = content => {
    setApplicationInstructionData(content);
    formik.setFieldValue(
      "applicationInstruction",
      content !== "<p><br></p>" ? content : "",
    );
  };
  useEffect(() => {
    if (
      debouncedSearchValue &&
      debouncedSearchValue !== formik.values.address
    ) {
      getSuggestedAddress(debouncedSearchValue);
    }
  }, [debouncedSearchValue]);

  useEffect(() => {
    if (!countries.data.length) {
      dispatch(getCountries());
    }
    if (!tenderCategories.data.length) {
      dispatch(getTenderCategories());
    }

    if (!tags.data.length) {
      dispatch(getTenderTags());
    }
    if (!sectors.data.length) {
      dispatch(getTenderSector());
    }
    if (!opportunityTypes.data.length) {
      dispatch(getTenderOpportunityType());
    }
  }, []);

  useEffect(() => {
    if (tenderId) {
      getTenderDetailsById(tenderId);
    }
  }, [tenderId]);

  useEffect(() => {
    if (isRedirect) {
      navigate(`/${USER_ROLES.employer}/manage-tenders`);
    }
  }, [isRedirect]);

  useEffect(() => {
    if (formik.values.country && !cities.data[formik.values.country]?.length) {
      dispatch(getCities({ countryId: formik.values.country }));
    }
  }, [formik.values.country]);
  useEffect(() => {
    const newTenderId = searchParams.get("tenderId");
    if (newTenderId && tenderId !== newTenderId) setTenderId(newTenderId);
  }, [searchParams.get("tenderId")]);
  useEffect(() => {
    if (!currentUser.profile.isVerified) {
      navigate(urlcat("../employer/manage-tenders"));
    }
  }, []);
  // console.log("formik_values", formik.values);
  return (
    <div className="job-application">
      <Card
        sx={{
          "&.MuiCard-root": {
            boxShadow: "0px 15px 40px rgba(0, 0, 0, 0.05)",
            borderRadius: "10px",
            mb: 3,
          },
        }}>
        <CardContent
          sx={{
            "&.MuiCardContent-root": {
              padding: "25px 25px 25px",
            },
          }}>
          <div className="job-content">
            <h2>
              {tenderId ? "Update tender" : "Post new tender"}
              <span className="right-pull">
                <IconButton
                  LinkComponent={Link}
                  to={"/employer/manage-tenders"}>
                  <CloseIcon />
                </IconButton>
              </span>
            </h2>
            <div className="form-content">
              <form onSubmit={formik.handleSubmit}>
                <Grid container spacing={2}>
                  <Grid item xl={8} lg={8} xs={12}>
                    <LabeledInput
                      title="Title of your tender"
                      className="add-form-control"
                      placeholder="Bed And Breakfast Temporary Accommodation"
                      required
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
                      type="number"
                      optionsValues={{
                        currency: formik.getFieldProps("budgetCurrency"),
                        input: formik.getFieldProps("budgetAmount"),
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
                    <Box sx={{ height: "270px" }}>
                      <label>
                        Description<span className="required-field">*</span>
                      </label>
                      {/* <textarea
                        className="form-control-area"
                        placeholder="Write more details to attract the right candidates."
                        {...formik.getFieldProps("description")}
                      ></textarea> */}
                      <ReactQuill
                        placeholder="Write more details to attract the right candidates."
                        theme="snow"
                        type="texteara"
                        value={descData || formik.values.description}
                        modules={{
                          toolbar: toolbarOptions,
                        }}
                        onChange={value => handleEditorValue(value)}
                        className="work-experience-text-editor"
                        style={{
                          width: "100%",
                          marginTop: "10px",
                          height: "170px",
                        }}
                      />
                    </Box>
                    <Box
                      style={{
                        width: "100%",
                        marginTop: "10px",
                      }}>
                      {formik.touched.description &&
                      formik.errors.description ? (
                        <ErrorMessage>{formik.errors.description}</ErrorMessage>
                      ) : null}
                    </Box>
                  </Grid>
                  <Grid item xl={4} lg={4} xs={12}>
                    <label>
                      Location <span className="required-field">*</span>
                    </label>
                    <SelectInput
                      placeholder="Country"
                      defaultValue=""
                      options={countries.data.map(country => ({
                        value: country.id,
                        label: country.title,
                      }))}
                      {...formik.getFieldProps("country")}
                    />
                    {formik.touched.country && formik.errors.country ? (
                      <ErrorMessage>{formik.errors.country}</ErrorMessage>
                    ) : null}
                  </Grid>
                  <Grid item xl={4} lg={4} sm={6} xs={12}>
                    <label>
                      City <span className="required-field">*</span>
                    </label>
                    <SelectInput
                      placeholder={
                        formik.values.country ? "City" : "Select Country first"
                      }
                      disabled={!formik.values.country}
                      options={(cities.data[formik.values.country] || []).map(
                        country => ({
                          value: country.id,
                          label: country.title,
                        }),
                      )}
                      {...formik.getFieldProps("city")}
                    />
                    {formik.touched.city && formik.errors.city ? (
                      <ErrorMessage>{formik.errors.city}</ErrorMessage>
                    ) : null}
                  </Grid>
                  <Grid item xl={4} lg={4} sm={12} xs={12}>
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
                        onChange={e => setSearchValue(e.target.value)}
                        value={searchValue}
                      />
                      {debouncedSearchValue &&
                        searchValue !== formik.values.address && (
                          <div className={styles.search_results_box}>
                            {suggestedAddress.map(address => {
                              return (
                                <div
                                  key={address.description}
                                  className={styles.search_results}
                                  onClick={() => {
                                    formik.setFieldValue(
                                      "address",
                                      address.description,
                                    );
                                    setSearchValue(address.description);
                                  }}>
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
                  <Grid item xl={12} lg={12} sm={12} xs={12}>
                    <label>
                      Category <span className="required-field">*</span>
                    </label>
                    <Grid container spacing={2}>
                      <Grid item xl={5} lg={5} sm={12} xs={12}>
                        <SelectInput
                          multiple
                          defaultValue=""
                          placeholder="Select a Job category"
                          options={tenderCategories.data.map(category => ({
                            value: category.id,
                            label: category.title,
                          }))}
                          name={"categories"}
                          value={formik.values.categories || []}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                        {formik.touched.categories &&
                        formik.errors.categories ? (
                          <ErrorMessage>
                            {formik.errors.categories}
                          </ErrorMessage>
                        ) : null}
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xl={12} lg={12} xs={12}>
                    <Grid container spacing={2}>
                      <Grid item xl={4} lg={4} sm={6} xs={12}>
                        <label>Sector</label>
                        <SelectInput
                          defaultValue=""
                          placeholder="Select a Sector"
                          options={sectors.data.map(sector => ({
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
                      <Grid item xl={4} lg={4} sm={6} xs={12}>
                        <label>Type</label>
                        <SelectInput
                          placeholder="Select a type of opportunity"
                          defaultValue=""
                          options={opportunityTypes.data.map(
                            opportunityType => ({
                              value: opportunityType.id,
                              label: opportunityType.title,
                            }),
                          )}
                          value={formik.values.opportunityType || ""}
                          {...formik.getFieldProps("opportunityType")}
                        />
                        {formik.touched.opportunityType &&
                        formik.errors.opportunityType ? (
                          <ErrorMessage>
                            {formik.errors.opportunityType}
                          </ErrorMessage>
                        ) : null}
                      </Grid>
                      <Grid item xl={4} lg={4} xs={12}>
                        <label>Tag</label>
                        <SelectInput
                          defaultValue=""
                          placeholder="Select a Tag"
                          options={tags.data.map(tag => ({
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
                          style={{ display: "flex", flexDirection: "column" }}>
                          <Stack
                            direction="row"
                            alignItems="center"
                            justifyContent="space-between"
                            className="mb-2">
                            <label className="mb-1 d-inline-block">
                              Start Date{" "}
                              <span className="required-field">*</span>
                            </label>
                          </Stack>
                          <DateInput
                            onChange={e => formik.setFieldValue("startDate", e)}
                            type="date"
                            value={formik.values.startDate}
                            onBlur={formik.getFieldProps("startDate").onBlur}
                            minDate={dayjs().format("YYYY-MM-DD")}
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
                          style={{ display: "flex", flexDirection: "column" }}>
                          <Stack
                            direction="row"
                            alignItems="center"
                            justifyContent="space-between"
                            className="mb-2">
                            <label className="mb-1 d-inline-block">
                              Deadline<span className="required-field">*</span>{" "}
                            </label>
                          </Stack>
                          <DateInput
                            onChange={e => formik.setFieldValue("deadline", e)}
                            type="date"
                            value={formik.values.deadline}
                            onBlur={formik.getFieldProps("deadline").onBlur}
                            minDate={
                              formik.values.startDate ||
                              dayjs().format("YYYY-MM-DD")
                            }
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
                  <Grid item xl={12} lg={12} xs={12}>
                    <h2 className="mt-3">Ways to apply</h2>
                  </Grid>
                  <Grid item xl={12} lg={12} sm={12} xs={12}>
                    <FormGroup>
                      <FormControlLabel
                        sx={{ width: "198px" }}
                        type="checkbox"
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
                        type="checkbox"
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
                    }}>
                    <input
                      className="add-form-control"
                      placeholder="CC email address"
                      type="email"
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
                    }}>
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
                    <Box sx={{ height: "245px" }}>
                      <label>
                        Application Instructions
                        <span className="required-field">*</span>
                      </label>
                      <ReactQuill
                        placeholder="Write a brief text overview of your application process. You can also include links, emails, etc."
                        type="texteara"
                        theme="snow"
                        value={
                          applicationInstructionData ||
                          formik.values.applicationInstruction
                        }
                        modules={{
                          toolbar: toolbarOptions,
                        }}
                        onChange={value =>
                          handleApplicationInstructionEditorValue(value)
                        }
                        className="work-experience-text-editor"
                        style={{
                          width: "100%",
                          marginTop: "10px",
                          height: "150px",
                        }}
                      />
                    </Box>
                    <Box
                      style={{
                        width: "100%",
                        marginTop: "10px",
                      }}>
                      {formik.touched.applicationInstruction &&
                      formik.errors.applicationInstruction ? (
                        <ErrorMessage>
                          {formik.errors.applicationInstruction}
                        </ErrorMessage>
                      ) : null}
                    </Box>
                  </Grid>
                  <Grid item xl={12} lg={12} xs={12}>
                    <FormGroup>
                      <FormControlLabel
                        sx={{ width: "255px" }}
                        type="checkbox"
                        control={<Switch />}
                        label="Apply through your website"
                        checked={formik.values.isApplyThroughWebsite}
                        {...formik.getFieldProps("isApplyThroughWebsite")}
                      />
                    </FormGroup>
                    <LabeledInput
                      title=""
                      type="url"
                      className="add-form-control"
                      placeholder="Paste a link to your website’s application form"
                      required
                      {...formik.getFieldProps("websiteLink")}
                    />
                    {formik.touched.websiteLink && formik.errors.websiteLink ? (
                      <ErrorMessage>{formik.errors.websiteLink}</ErrorMessage>
                    ) : null}
                  </Grid>
                  <Grid item xl={12} lg={12} xs={12}>
                    <Divider sx={{ borderColor: "#CACACA", opacity: "1" }} />
                  </Grid>
                </Grid>

                <Grid item xl={12} lg={12} xs={12}>
                  <h2 className="mt-2 mb-3">Attach files</h2>
                  {formik.errors?.attachments ? (
                    <ErrorMessage>{formik.errors?.attachments}</ErrorMessage>
                  ) : null}
                  <AttachmentDragNDropInput
                    files={formik.getFieldProps("attachments").value}
                    handleDrop={file => {
                      const currentAttachments = formik.values.attachments;
                      if (file.length + currentAttachments.length > 10) {
                        formik.setFieldError(
                          "attachments",
                          `Maximum 10 files allowed. you can upload only ${
                            10 - currentAttachments.length
                          } remaining`,
                        );
                      } else {
                        const filesTaken = file.slice(
                          0,
                          10 - currentAttachments.length,
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
                            attachment => attachment.path !== file.path,
                          ),
                        );
                      } else {
                        formik.setFieldValue(
                          "attachments",
                          formik.values.attachments.filter(
                            (attachment, i) => i !== index,
                          ),
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
                    style={{ flexWrap: "wrap" }}>
                    <OutlinedButton
                      title="Cancel"
                      sx={{
                        "&.MuiButton-outlined": {
                          borderRadius: "73px",
                          border: "0px",
                          color: "#848484 !important",
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
                          "@media (max-width: 480px)": {
                            fontSize: "14px !important",
                            marginBottom: "10px",
                            width: "100%",
                          },
                        },
                      }}
                      disabled={formik.isSubmitting}
                      onClick={() => navigate("/employer/manage-tenders")}
                    />
                    <FilledButton
                      sx={{
                        fontSize: "16px !important",
                        "@media (max-width: 480px)": {
                          fontSize: "14px !important",
                          width: "100%",
                        },
                      }}
                      title={
                        formik.isSubmitting
                          ? tenderId
                            ? "Updating..."
                            : "Posting..."
                          : tenderId
                            ? "Update the tender"
                            : "POST THE TENDER"
                      }
                      type="submit"
                      disabled={formik.isSubmitting}
                    />
                  </Stack>
                </Grid>
              </form>
            </div>
          </div>
        </CardContent>
      </Card>
      <DialogBox
        open={open}
        handleClose={handleClose}
        className="posting_tender_done_dailog_div">
        <Grid container spacing={2} className="post_tender_done_dailog">
          <Grid item lg={7} sm={7} xs={12}>
            <h1 className="mb-3">Done!</h1>
            <div className="posting_tender_done_icon_mobile_div">
              <SVG.JobPost className="posting_tender_done_icon" />
            </div>
            <p>
              {tenderId
                ? "Your tender post just updated. It will be reviewed and available on Koor shortly."
                : "Your new tender post just submitted. It will be reviewed and available on Koor shortly."}
            </p>
            <div className={`${styles.cancel_popup}`}>
              <OutlinedButton
                title="Go to my tenders"
                onClick={() => handleRedirect()}
              />
            </div>
          </Grid>
          <Grid item lg={5} sm={5} xs={12}>
            <div className="posting_tender_done_icon_div">
              <SVG.JobPost className="posting_tender_done_icon" />
            </div>
          </Grid>
        </Grid>
      </DialogBox>
    </div>
  );
};

export default PostTender;

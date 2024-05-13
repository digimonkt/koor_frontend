import React, { useState, useEffect } from "react";
import styles from "./applyForTender.module.css";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import {
  FilledButton,
  SearchButton,
  SolidButton,
} from "../../../components/button";
import {
  AttachmentDragNDropInput,
  LabeledInput,
} from "../../../components/input";
import { ErrorMessage } from "../../../components/caption";
import { Stack } from "@mui/material";
import { SVG } from "../../../assets/svg";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import {
  applyForTenderAPI,
  getTenderDetailsByIdAPI,
  updateAppliedTenderAPI,
} from "../../../api/tender";
import dayjs from "dayjs";
import { getColorByRemainingDays } from "@utils/generateColor";
import JobCostCard from "@pages/jobs/component/jobCostCard";
import { useFormik } from "formik";
import { setErrorToast, setSuccessToast } from "../../../redux/slice/toast";
import DialogBox from "../../../components/dialogBox";
import ApplySuccessfully from "./applySuccessfully";
import { useDispatch } from "react-redux";
import CancelApply from "../../../pages/tenders/applyForTender/cancelApply";
import { applyTenderValidationSchema } from "./validator";
import { getApplicationDetailsAPI } from "@api/vendor";
import { getJobAttachmentAPI } from "@api/job";
import { Capacitor } from "@capacitor/core";
import { downloadUrlCreator, fileTypeExtractor } from "@utils/fileUtils";
function ApplyForTender() {
  const platform = Capacitor.getPlatform();
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();

  const [isApplied, setIsApplied] = useState(false);
  const [details, setDetails] = useState({
    id: "",
    title: "",
    tenderId: "",
    budgetCurrency: "",
    budgetAmount: "",
    description: "",
    country: {},
    city: {},
    tag: [],
    categories: [],
    type: {},
    sector: {},
    expiredInDays: 46,
    startDate: "2023-05-19",
    user: {
      image: {},
      description: "",
      isBlacklisted: false,
    },
    attachments: [],
    createdAt: "",
    vendor: 0,
    isApplied: false,
    isSaved: false,
  });
  const [isCanceling, setIsCanceling] = useState(false);
  const [hide, setHide] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const getTenderDetails = async (tenderId) => {
    const res = await getTenderDetailsByIdAPI({ tenderId });
    if (res.remote === "success") {
      setDetails(res.data);
    }
  };

  const formik = useFormik({
    initialValues: {
      shortLetter: "",
      attachments: [],
      attachmentsRemove: [],
    },
    validationSchema: applyTenderValidationSchema,
    onSubmit: async (values) => {
      setIsSubmitting(true);
      const payload = new FormData();
      const newValues = {
        short_letter: values.shortLetter,
        attachments: values.attachments,
      };
      if (
        searchParams.get("applicationId") &&
        values.attachmentsRemove.length
      ) {
        newValues.attachments_remove = values.attachmentsRemove;
      }
      newValues.attachments = newValues.attachments.filter(
        (attachment) => !attachment.id,
      );
      for (const key in newValues) {
        if (newValues[key].forEach) {
          newValues[key].forEach((val) => {
            payload.append(key, val);
          });
        } else {
          payload.append(key, newValues[key]);
        }
      }

      if (searchParams.get("applicationId")) {
        await updateAppliedTender(payload);
      } else {
        await applyForTender(payload);
      }
      setIsSubmitting(false);
    },
  });
  const getApplicantDetails = async () => {
    const applicationId = searchParams.get("applicationId");
    const res = await getApplicationDetailsAPI(applicationId);
    if (res.remote === "success") {
      formik.setFieldValue("shortLetter", res.data.shortLetter);
      formik.setFieldValue("attachments", res.data.attachments);
    }
  };

  const applyForTender = async (data) => {
    const res = await applyForTenderAPI(details.id, data);
    if (res.remote === "success") {
      dispatch(setSuccessToast("Applied successfully"));
      setIsApplied(true);
    } else {
      dispatch(setErrorToast("Something went wrong"));
    }
  };

  const updateAppliedTender = async (data) => {
    const res = await updateAppliedTenderAPI(params.tenderId, data);
    if (res.remote === "success") {
      dispatch(setSuccessToast("Applied Tender Updated successfully"));
      setIsApplied(true);
    } else {
      dispatch(setErrorToast("Something went wrong"));
    }
  };

  const handleLoadImage = async (url) => {
    const fileType = fileTypeExtractor(url);

    const response = await getJobAttachmentAPI(url);
    if (response.remote === "success") {
      const base64String = response.data.base_image;
      downloadUrlCreator(fileType, base64String);
    }
  };
  useEffect(() => {
    getTenderDetails(params.tenderId);
  }, [params.tenderId]);
  useEffect(() => {
    if (searchParams.get("applicationId")) {
      getApplicantDetails();
    }
  }, [searchParams.get("applicationId")]);
  return (
    <div>
      <Container>
        <div
          className={`${styles.Jobcard}`}
          style={{
            margin:
              platform === "android" || platform === "ios"
                ? "15px 0px 130px 0px"
                : "110px 0px 130px 0px",
          }}
        >
          <div className={`${styles.grids}`}>
            <Grid container spacing={2}>
              <Grid item xs={11} lg={11}>
                <div className={`${styles.postJob}`}>
                  <span
                    style={{ cursor: "pointer" }}
                    onClick={() => navigate(-1)}
                  >
                    {<SVG.LeftArrow />}
                  </span>

                  <h1>Apply for the tender</h1>
                </div>
              </Grid>
              <Grid item xs={1} lg={1}>
                <span
                  style={{ cursor: "pointer" }}
                  onClick={() => navigate(-1)}
                  className={`${styles.crossed}`}
                >
                  {<SVG.Crossed />}
                </span>
              </Grid>
              <Grid item xs={12} lg={9} sm={7}>
                <p className="mb-0 ">{details.title}</p>
              </Grid>
              <Grid item xs={12} lg={3} className="ps-0" sm={5}>
                <div className={`${styles.clocs}`}>
                  <span>{<SVG.ClockIconSmall />}</span>
                  <p className="mb-0 mt-0">
                    <span>Posted:</span> {dayjs(details.startDate).format("ll")}
                  </p>
                  <SolidButton
                    title={
                      details.expiredInDays > 0
                        ? `${details.expiredInDays} Days`
                        : "Expired"
                    }
                    color={getColorByRemainingDays(
                      details.expiredInDays > 0 ? details.expiredInDays : 0,
                    )}
                    className="apply_dd_btn"
                  />
                </div>
              </Grid>
              <Grid
                item
                xs={12}
                sm={7}
                sx={{
                  borderRight: "1px solid #cacaca",
                  "@media (max-width:600px)": {
                    borderRight: "0px",
                  },
                }}
              >
                <div>
                  <h4>Details:</h4>
                  <div
                    className="details"
                    style={{ lineHeight: "20px", paddingRight: "10px" }}
                    dangerouslySetInnerHTML={{
                      __html: details.description,
                    }}
                  ></div>
                  <div className={`${styles.infomore}`}>
                    <h6 onClick={() => setHide(!hide)}>
                      More
                      <span className={`${hide ? styles.rotate : ""}`}>
                        {<SVG.Downarrow />}
                      </span>
                    </h6>
                  </div>
                  {hide ? (
                    <>
                      <p
                        className={styles.more_text_p}
                        style={{ marginBottom: "10px" }}
                      >
                        Please check out my attachements below.
                      </p>
                      {details.attachments.map((attachment) => {
                        return (
                          <div
                            className={styles.downloadtext}
                            key={attachment.id}
                          >
                            <span className="d-inline-flex">
                              {<SVG.OrangeIcon />}
                            </span>
                            <span
                              className="ms-3"
                              style={{ cursor: "pointer" }}
                              onClick={() => handleLoadImage(attachment.path)}
                            >
                              {attachment.title}
                            </span>
                          </div>
                        );
                      })}
                    </>
                  ) : null}
                </div>
                <div className={`${styles.iconbtn}`}>
                  <SearchButton
                    text={details?.country?.title}
                    leftIcon={<SVG.LocationIcon />}
                    className={`${styles.iconbutton}`}
                  />
                  <SearchButton
                    text={details?.sector?.title}
                    leftIcon={<SVG.CategoryIcon />}
                    className={`${styles.iconbutton}`}
                  />
                  <SearchButton
                    text={details?.type?.title}
                    leftIcon={<SVG.CategoryIcon />}
                    className={`${styles.iconbutton}`}
                  />
                  {(details.tag || []).map((tag, i) => {
                    return (
                      <SearchButton
                        key={i}
                        text={tag.title}
                        leftIcon={<SVG.SellIcon />}
                        className={`${styles.iconbutton}`}
                      />
                    );
                  })}
                </div>
                {/* {details.startDate && ( */}
                {/*   <div className={`${styles.datesatrt}`}> */}
                {/*     <span>{<SVG.StartDate />}</span> */}
                {/*     <p className="m-0 ms-2"> */}
                {/*       <span className={`${styles.startDate}`}>Start date:</span> */}
                {/*       <b className={`${styles.startB}`}> */}
                {/*         {details?.startDate */}
                {/*           ? dayjs(details.startDate).format("ll") */}
                {/*           : ""} */}
                {/*       </b> */}
                {/*     </p> */}
                {/*   </div> */}
                {/* )} */}
              </Grid>

              <Grid item xs={12} sm={5}>
                <JobCostCard
                  amount={details.budgetAmount}
                  payPeriod={details.budgetPayPeriod || "monthly"}
                  user={details.user}
                />
              </Grid>
            </Grid>
            <form onSubmit={formik.handleSubmit}>
              <div className={`${styles.shortLetter}`}>
                <h1 className="m-0 mb-3">Your short-letter</h1>
                <LabeledInput
                  type="textarea"
                  className={`${styles.textarea}`}
                  placeholder="Write a few words about yourself and why you think that you are a good fit for this particular tender."
                  value={formik.values.shortLetter}
                  {...formik.getFieldProps("shortLetter")}
                />
                {formik.touched.shortLetter && formik.errors.shortLetter && (
                  <ErrorMessage>{formik.errors.shortLetter}</ErrorMessage>
                )}
              </div>
              <Grid item xl={12} lg={12} xs={12} className="attachments">
                <h2
                  className="mt-4 mb-3"
                  style={{
                    fontSize: "28px",
                    "@media (max-width: 480px)": {
                      fontSize: "24px",
                    },
                  }}
                >
                  Attach files
                </h2>
                <AttachmentDragNDropInput
                  single
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
                      formik.setFieldValue("attachments", [
                        ...formik.values.attachments.filter(
                          (attachment) => attachment.id !== file.id,
                        ),
                      ]);
                    } else {
                      formik.setValues({
                        ...formik.values,
                        attachments: formik.values.attachments.filter(
                          (el) => el !== file,
                        ),
                      });
                    }
                  }}
                />
                {formik.touched.attachments && formik.errors.attachments && (
                  <ErrorMessage>{formik.errors.attachments}</ErrorMessage>
                )}
              </Grid>

              <Stack
                direction="row"
                spacing={2}
                className={`${styles.applybtns}`}
              >
                <SearchButton
                  text="Cancel"
                  className={`${styles.cancelbtn}`}
                  sx={{
                    "@media (max-width: 480px)": {
                      fontSize: "14px !important",
                    },
                  }}
                  onClick={() => setIsCanceling(true)}
                  disabled={isSubmitting}
                />
                <FilledButton
                  title={
                    isSubmitting
                      ? "Submitting..."
                      : searchParams.get("applicationId")
                        ? "Update"
                        : "Apply"
                  }
                  sx={{
                    "@media (max-width: 480px)": {
                      fontSize: "14px !important",
                    },
                  }}
                  className={`${styles.applybtn}`}
                  type="submit"
                  disabled={isSubmitting}
                />
              </Stack>
            </form>
          </div>
        </div>
      </Container>
      <DialogBox open={isCanceling} handleClose={() => console.log("close")}>
        <CancelApply handleClose={() => setIsCanceling(false)} />
      </DialogBox>
      <DialogBox
        open={isApplied}
        handleClose={() => console.log("close")}
        sx={{
          "& .MuiPaper-root": {
            maxWidth: "734px",
            width: "734px",
            height: "299px",
            overflow: "hidden",
          },
        }}
      >
        <ApplySuccessfully />
      </DialogBox>
    </div>
  );
}

export default ApplyForTender;

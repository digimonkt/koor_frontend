import styles from "./styles.module.css";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
// import TextareaAutosize from "@mui/material/TextareaAutosize";
import { SearchButton, SolidButton } from "../../../components/button";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { Stack } from "@mui/material";
import { SVG } from "../../../assets/svg";
import { useFormik } from "formik";
import { applyJobValidationSchema } from "./validator";
import {
  AttachmentDragNDropInput,
  LabeledInput,
} from "../../../components/input";
import { ErrorMessage } from "../../../components/caption";
import {
  applyForJobAPI,
  getJobAttachmentAPI,
  getJobDetailsByIdAPI,
  updateAppliedJobAPI,
} from "../../../api/job";
import dayjs from "dayjs";
import { getColorByRemainingDays } from "@utils/generateColor";
import { setErrorToast, setSuccessToast } from "@redux/slice/toast";
import { useDispatch } from "react-redux";
import JobRequirementCard from "../component/jobRequirementCard";
import JobCostCard from "../component/jobCostCard";
import DialogBox from "../../../components/dialogBox";
import CancelApply from "./cancelApply";
import ApplySuccessfully from "./applySuccessfully";
import { getApplicationDetailsAPI } from "../../../api/employer";
import urlcat from "urlcat";
import { Capacitor } from "@capacitor/core";
const ApplyForJob = () => {
  const dispatch = useDispatch();
  // navigate
  const navigate = useNavigate();
  const params = useParams();
  const [searchParams] = useSearchParams();
  // state management
  const [details, setDetails] = useState({
    id: "",
    title: "",
    description: "",
    budgetCurrency: "",
    budgetAmount: "",
    budgetPayPeriod: "",
    country: {
      id: "",
      title: "",
    },
    city: {
      id: "",
      title: "",
    },
    address: "",
    jobCategories: [],
    deadline: "",
    isFullTime: false,
    isPartTime: false,
    hasContract: false,
    contactEmail: "",
    contactPhone: "",
    contactWhatsapp: "",
    highestEducation: {
      id: "",
      title: "",
    },
    languages: [],
    skills: [],
    workingDays: "5",
    status: "active",
    applicant: 0,
    createdAt: "2023-02-23T05:44:36",
    expiredInDays: 37,
    user: {
      id: "",
      name: "",
      email: "",
      countryCode: "",
      mobileNumber: "",
      image: {
        id: "",
        title: "",
        path: "",
        type: "image",
      },
    },
    attachments: [],
  });
  const [isCanceling, setIsCanceling] = useState(false);
  const [hide, setHide] = useState(false);
  const [isApplied, setIsApplied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const maxLength = 200;
  const toggleShowMore = () => {
    setShowMore(!showMore);
  };
  const truncatedDescription = details.description.length > maxLength ? `${details.description.slice(0, maxLength)}...` : details.description;
  const formik = useFormik({
    initialValues: {
      shortLetter: "",
      attachments: [],
      attachmentsRemove: [],
    },
    validationSchema: applyJobValidationSchema,
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
        (attachment) => !attachment.id
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
        await updateAppliedJob(payload);
      } else {
        await applyForJob(payload);
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

  const applyForJob = async (data) => {
    const res = await applyForJobAPI(params.jobId, data);
    if (res.remote === "success") {
      dispatch(setSuccessToast("Applied successfully"));
      setIsApplied(true);
    } else {
      dispatch(setErrorToast(res.error.errors?.message));
    }
  };
  const updateAppliedJob = async (data) => {
    const res = await updateAppliedJobAPI(params.jobId, data);
    if (res.remote === "success") {
      dispatch(setSuccessToast("Applied Job Updated Successfully"));
      navigate(urlcat("/jobs/details/:jobId", { jobId: params.jobId }));
      setIsApplied(true);
    } else {
      dispatch(setErrorToast("Something went wrong"));
    }
  };

  const getJobDetails = async (jobId) => {
    const res = await getJobDetailsByIdAPI({ jobId });
    if (res.remote === "success") {
      setDetails(res.data);
    }
  };

  const handleLoadImage = async (url) => {
    const fileType = (url) => {
      const extension = "." + url.split(".").pop().toLowerCase();
      console.log({ extension });
      const mimeTypes = {
        ".jpg": "image/jpeg",
        ".jpeg": "image/jpeg",
        ".png": "image/png",
        ".gif": "image/gif",
        ".pdf": "application/pdf",
        // Add more extensions and corresponding MIME types as needed
      };

      return mimeTypes[extension] || "application/octet-stream"; // Default to binary if type is unknown
    };

    const fileName = "attachment";
    const response = await getJobAttachmentAPI(url);

    if (response.remote === "success") {
      const base64String = response.data.base_image;
      // Convert base64 string to Blob
      const byteCharacters = atob(base64String);
      const byteArrays = new Uint8Array(byteCharacters.length);

      for (let i = 0; i < byteCharacters.length; i++) {
        byteArrays[i] = byteCharacters.charCodeAt(i);
      }

      const blob = new Blob([byteArrays], {
        type: fileType(url) || "application/octet-stream",
      });

      // Create a download link
      const downloadUrl = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = downloadUrl;
      a.download = fileName || "file"; // Default filename is "file"

      // Append the link to the document and click it
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(downloadUrl);
    }
  };
  useEffect(() => {
    getJobDetails(params.jobId);
  }, [params.jobId]);
  useEffect(() => {
    if (searchParams.get("applicationId")) {
      getApplicantDetails();
    }
  }, [searchParams.get("applicationId")]);
  const platform = Capacitor.getPlatform();
  return (
    <div>
      <Container
        sx={{
          padding: platform === "android" || platform === "ios" ? "0px" : null,
        }}
      >
        <div
          className={`${styles.Jobcard}`}
          style={{
            margin: platform === "android" || platform === "ios" ? "0px" : null,
            borderRadius:
              platform === "android" || platform === "ios" ? "0px" : null,
          }}
        >
          <div className={`${styles.grids}`}>
            <Grid container spacing={2}>
              <Grid item xs={11} sm={11} lg={11}>
                <div className={`${styles.postJob}`}>
                  <span
                    style={{ cursor: "pointer" }}
                    onClick={() => navigate(-1)}
                  >
                    {<SVG.LeftArrow />}
                  </span>

                  <h1>Apply for the job</h1>
                </div>
              </Grid>
              <Grid item xs={1} sm={1} lg={1}>
                <span
                  style={{ cursor: "pointer" }}
                  onClick={() => navigate(-1)}
                  className={`${styles.crossed}`}
                >
                  {<SVG.Crossed />}
                </span>
              </Grid>
              <Grid item xs={12} lg={9} sm={8}>
                <p className="mb-0 ">{details.title}</p>
              </Grid>
              <Grid item xs={12} className="ps-0" lg={3} sm={4}>
                <div className={`${styles.clocs}`}>
                  <span>{<SVG.ClockIconSmall />}</span>
                  <p className="mb-0 mt-0">
                    <span>Posted:</span> {dayjs(details.createdAt).format("ll")}
                  </p>
                  <SolidButton
                    title={
                      details.expiredInDays > -1
                        ? `${details.expiredInDays} Days`
                        : "Expired"
                    }
                    color={getColorByRemainingDays(
                      details.expiredInDays > -1 ? details.expiredInDays : -1
                    )}
                    className="apply_dd_btn"
                  />
                </div>
              </Grid>
              <Grid item xs={12} lg={4} sm={4}>
                <div className={`${styles.contentJob}`}>
                  <h4>Details:</h4>
                  <p className="job-description" dangerouslySetInnerHTML={{ __html: showMore ? details.description : truncatedDescription }} />
                  {hide ? (
                    <>
                      <p>Please check out my attachements below..</p>
                      {details.attachments.map((attachment) => {
                        return (
                          <div
                            className={`${styles.downloadtext}`}
                            key={attachment.id}
                          >
                            <span className="d-inline-flex">
                              {<SVG.OrangeIcon />}
                            </span>
                            <span
                              onClick={() => handleLoadImage(attachment.path)}
                              style={{ cursor: "pointer" }}
                              className="m-0"
                            >
                              {attachment.title}
                            </span>
                          </div>
                        );
                      })}
                    </>
                  ) : null}
                  <div className={`${styles.infomore}`}>
                    <h6 onClick={() => { setHide(!hide); toggleShowMore(); }}>
                      {!hide ? "More" : "Less"}
                      <span className={`${hide ? styles.rotate : ""}`}>
                        {<SVG.Downarrow />}
                      </span>
                    </h6>
                  </div>
                </div>
                <div className={`${styles.iconbtn}`}>
                  <SearchButton
                    text="5-Day week"
                    leftIcon={<SVG.BagClock />}
                    className={`${styles.iconbutton}`}
                  />
                  <SearchButton
                    leftIcon={<SVG.HalfCircle />}
                    text="Full time"
                    className={`${styles.iconbutton}`}
                  />
                </div>
                <div className={`${styles.datesatrt}`}>
                  <span>{<SVG.StartDate />}</span>
                  <p className="m-0 ms-2">
                    <span className={`${styles.startDate}`}>Start date:</span>
                    <b className={`${styles.startB}`}>Septermber 13</b>
                  </p>
                </div>
              </Grid>
              <Grid item xs={12} lg={5} sm={5}>
                <div className={`${styles.requirement}`}>
                  <JobRequirementCard
                    highestEducation={details.highestEducation}
                    languages={details.languages}
                    skills={details.skills}
                  />
                </div>
              </Grid>
              <Grid item xs={12} lg={3} sm={3}>
                <JobCostCard
                  amount={details.budgetAmount}
                  payPeriod={details.budgetPayPeriod}
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
                  placeholder="Write a few words about yourself and why you think that you are a good fit for this particular job."
                  value={formik.values.shortLetter}
                  {...formik.getFieldProps("shortLetter")}
                />
                {formik.touched.shortLetter && formik.errors.shortLetter && (
                  <ErrorMessage>{formik.errors.shortLetter}</ErrorMessage>
                )}
              </div>
              <Grid
                item
                xl={12}
                lg={12}
                xs={12}
                className={`attachments ${styles.attachments_files}`}
              >
                <h2 className="mt-4 mb-3">Attach files</h2>
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
                          (attachment) => attachment.id !== file.id
                        ),
                      ]);
                    } else {
                      formik.setValues({
                        ...formik.values,
                        attachments: formik.values.attachments.filter(
                          (el) => el !== file
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
                direction={
                  platform === "android" || platform === "ios"
                    ? "column-reverse"
                    : "row"
                }
                spacing={2}
                className={`${styles.applybtns}`}
              >
                <SearchButton
                  text="Cancel"
                  className={`${styles.cancelbtn}`}
                  onClick={() => setIsCanceling(true)}
                  disabled={isSubmitting}
                />
                <SearchButton
                  text={
                    isSubmitting
                      ? "Submitting..."
                      : searchParams.get("applicationId")
                      ? "Update"
                      : "Apply"
                  }
                  className={`${styles.applybtn} ${platform === "android" || platform === "ios"
                    ? styles.applybtnapp
                    : ""
                    }`}
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
          },
        }}
      >
        <ApplySuccessfully />
      </DialogBox>
    </div>
  );
};
export default ApplyForJob;

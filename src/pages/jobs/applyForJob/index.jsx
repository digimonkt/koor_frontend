import styles from "./styles.module.css";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
// import TextareaAutosize from "@mui/material/TextareaAutosize";
import { SearchButton, SolidButton } from "@components/button";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { Stack } from "@mui/material";
import { SVG } from "@assets/svg";
import { useFormik } from "formik";
import { applyJobValidationSchema } from "./validator";
import { AttachmentDragNDropInput, LabeledInput } from "@components/input";
import { ErrorMessage } from "@components/caption";
import {
  applyForJobAPI,
  getJobDetailsByIdAPI,
  updateAppliedJobAPI,
} from "@api/job";
import dayjs from "dayjs";
import { getColorByRemainingDays } from "@utils/generateColor";
import { generateFileUrl } from "@utils/generateFileUrl";
import { setErrorToast, setSuccessToast } from "@redux/slice/toast";
import { useDispatch } from "react-redux";
import JobRequirementCard from "../component/jobRequirementCard";
import JobCostCard from "../component/jobCostCard";
import DialogBox from "@components/dialogBox";
import CancelApply from "./cancelApply";
import ApplySuccessfully from "./applySuccessfully";
import { getApplicationDetailsAPI } from "@api/employer";
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
      dispatch(setErrorToast("Something went wrong"));
    }
  };
  const updateAppliedJob = async (data) => {
    const res = await updateAppliedJobAPI(params.jobId, data);
    if (res.remote === "success") {
      dispatch(setSuccessToast("Applied successfully"));
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

  useEffect(() => {
    getJobDetails(params.jobId);
  }, [params.jobId]);
  useEffect(() => {
    getApplicantDetails();
  }, [searchParams.get("applicationId")]);
  return (
    <div>
      <Container>
        <div className={`${styles.Jobcard}`}>
          <div className={`${styles.grids}`}>
            <Grid container spacing={2}>
              <Grid item xs={11}>
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
              <Grid item xs={1}>
                <span
                  style={{ cursor: "pointer" }}
                  onClick={() => navigate(-1)}
                  className={`${styles.crossed}`}
                >
                  {<SVG.Crossed />}
                </span>
              </Grid>
              <Grid item xs={9}>
                <p className="mb-0 ">{details.title}</p>
              </Grid>
              <Grid item xs={3} className="ps-0">
                <div className={`${styles.clocs}`}>
                  <span>{<SVG.ClockIconSmall />}</span>
                  <p className="mb-0 mt-0">
                    <span>Posted:</span> {dayjs(details.createdAt).format("ll")}
                  </p>
                  <SolidButton
                    title={
                      details.expiredInDays > 0
                        ? `${details.expiredInDays} Days`
                        : "Expired"
                    }
                    color={getColorByRemainingDays(
                      details.expiredInDays > 0 ? details.expiredInDays : 0
                    )}
                    style={{ marginLeft: "20px" }}
                  />
                </div>
              </Grid>
              <Grid item xs={4}>
                <div className={`${styles.contentJob}`}>
                  <h4>Details:</h4>
                  <p className="job-description">{details.description}</p>

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
                            <a
                              href={generateFileUrl(attachment.path)}
                              target="_blank"
                              className="m-0"
                              rel="noreferrer"
                            >
                              {attachment.title}
                            </a>
                          </div>
                        );
                      })}
                    </>
                  ) : null}
                  <div className={`${styles.infomore}`}>
                    <h6 onClick={() => setHide(!hide)}>
                      More
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
              <Grid item xs={5}>
                <div className={`${styles.requirement}`}>
                  <JobRequirementCard
                    highestEducation={details.highestEducation}
                    languages={details.languages}
                    skills={details.skills}
                  />
                </div>
              </Grid>
              <Grid item xs={3}>
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
              <Grid item xl={12} lg={12} xs={12} className="attachments">
                <h2 className="mt-4 mb-3">Attach files</h2>
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
                direction="row"
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
          },
        }}
      >
        <ApplySuccessfully />
      </DialogBox>
    </div>
  );
};
export default ApplyForJob;

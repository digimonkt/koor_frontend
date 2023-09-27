import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { SVG } from "../../../assets/svg";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  getJobDetailsByIdAPI,
  getJobSuggestionAPI,
  withdrawJobApplicationAPI,
} from "../../../api/job";
import dayjs from "dayjs";
import {
  SolidButton,
  SearchButton,
  OutlinedButton,
  FilledButton,
} from "../../../components/button";
import { getColorByRemainingDays } from "../../../utils/generateColor";
import { generateFileUrl } from "../../../utils/generateFileUrl";
import urlcat from "urlcat";
import JobCostCard from "../component/jobCostCard";
import JobRequirementCard from "../component/jobRequirementCard";
import { saveJobAPI, unSaveJobAPI } from "../../../api/jobSeeker";
import { useDispatch, useSelector } from "react-redux";
import DialogBox from "../../../components/dialogBox";
import { USER_ROLES } from "../../../utils/enum";
import { getLetLongByAddressAPI } from "../../../api/user";
import { GoogleMapWrapper, GoogleMap } from "../../../components/googleMap";
import { Box, Stack } from "@mui/material";
import ShareJob from "../shareJob";
import { setErrorToast, setSuccessToast } from "../../../redux/slice/toast";

const JobDetails = () => {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { role, isLoggedIn } = useSelector((state) => state.auth);
  const [registrationWarning, setRegistrationWarning] = useState(false);
  const [suggestionJobs, setSuggestionJobs] = useState([]);
  const [isSharing, setIsSharing] = useState(false);
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
    jobCategories: {
      id: "",
      title: "",
    },
    jobSubCategory: {
      id: "",
      title: "",
    },
    deadline: "",
    isFullTime: false,
    isPartTime: false,
    isSaved: false,
    isApplied: false,
    hasContract: false,
    contactEmail: "",
    contactPhone: "",
    contactWhatsapp: "",
    highestEducation: {
      id: "",
      title: "",
    },
    application: {},
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
  const [addressGeoCode, setAddressGeoCode] = useState({});
  const getJobDetails = async (jobId) => {
    const res = await getJobDetailsByIdAPI({ jobId });
    if (res.remote === "success") {
      setDetails(res.data);
      const geoCode = await getLetLongByAddressAPI(res.data.address);
      if (geoCode.remote === "success") {
        setAddressGeoCode(geoCode.data.results[0]?.geometry.location || {});
      }
    }
  };
  const getJobSuggestions = async (jobId) => {
    const res = await getJobSuggestionAPI(jobId);
    if (res.remote === "success") {
      setSuggestionJobs(res.data.results);
    }
  };
  const handleWithdrawJobApplication = async () => {
    if (details.isEditable) {
      const res = await withdrawJobApplicationAPI({ jobId: params.jobId });
      if (res.remote === "success") {
        setDetails({
          ...details,
          isApplied: false,
        });
        dispatch(setSuccessToast("Withdraw successfully"));
      }
    } else {
      dispatch(setErrorToast("Cannot be withdraw"));
    }
  };

  function handleSendEmail() {
    const email = details.contactEmail;
    const ccEmail1 = details.cc1;
    const ccEmail2 = details.cc2;
    const subject = `Job Application for ${details.title}`;
    const body = `Here is the my job application for this job \n ${window.location.href}`;
    let link = `mailto:${email}?&subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
    if (ccEmail1) {
      link += `&cc=${ccEmail1}`;
    }
    if (ccEmail1 && ccEmail2) {
      link += `,${ccEmail2}`;
    }
    const tag = document.createElement("a");
    tag.href = link;
    tag.target = "_blank";
    document.body.appendChild(tag);
    tag.click();
    document.body.removeChild(tag);
  }

  useEffect(() => {
    getJobDetails(params.jobId);
    getJobSuggestions(params.jobId);
  }, [params.jobId]);
  const handleSaveJob = async (jobId) => {
    if (isLoggedIn) {
      setDetails((prevState) => ({
        ...prevState,
        isSaved: !prevState.isSaved,
      }));
      if (!details.isSaved) {
        const resp = await saveJobAPI(jobId);
        if (resp.remote === "success") {
          console.log("resp", resp);
        }
      } else {
        const resp = await unSaveJobAPI(jobId);
        if (resp.remote === "success") {
          console.log("resp", resp);
        }
      }
    } else {
      setRegistrationWarning(true);
    }
  };
  function toDataURL(url, callback) {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      const reader = new FileReader();
      reader.onloadend = function () {
        callback(reader.result);
      };
      reader.readAsDataURL(xhr.response);
    };
    xhr.open("GET", url);
    xhr.responseType = "blob";
    xhr.send();
  }
  async function loadImageToDataURL(url) {
    return new Promise((resolve, reject) => {
      toDataURL(url, (dataURL) => {
        resolve(dataURL);
      });
    });
  }
  const handleLoadImage = async (url) => {
    const base64 = await loadImageToDataURL(url);
    const element = document.createElement("a");
    element.href = base64;
    element.download = "Attachment";
    element.click();
  };
  return (
    <>
      <Container
        maxWidth={false}
        sx={{
          "@media(min-width:992px)": {
            paddingLeft: "100px",
            paddingRight: "100px",
          },
        }}
      >
        <div className={`${styles.Jobcard}`}>
          <div className={`${styles.grids}`}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={8} lg={8}>
                <div className={`${styles.postJob}`}>
                  {/* <Link to="/saved-jobs"> */}
                  <span
                    style={{ paddingTop: "5px", cursor: "pointer" }}
                    onClick={() => navigate(-1)}
                  >
                    {<SVG.LeftArrow />}
                  </span>
                  {/* </Link> */}
                  <p className="mb-0">{details.title}</p>
                </div>
              </Grid>
              <Grid item xs={12} sm={4} lg={4}>
                <div className={`${styles.clocs}`}>
                  {<SVG.ClockIconSmall />}
                  <p className="mb-0 mt-0 me-1">
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
                    style={{ marginLeft: "20px", cursor: "default " }}
                  />
                </div>
              </Grid>
            </Grid>
            <hr />
            <Grid container spacing={2}>
              <Grid item xs={12} lg={9}>
                <div className={`mb-4 ${styles.contentJob}`}>
                  <h4>Details :</h4>
                  <p className="job-description">{details.description}</p>
                </div>
                <Stack
                  direction={{ xs: "column", lg: "row" }}
                  alignItems={{ xs: "flex-start", lg: "center" }}
                  spacing={2}
                >
                  <SearchButton
                    text={details.country.title}
                    leftIcon={<SVG.LocationIcon />}
                    className={`${styles.iconbutton}`}
                  />
                  <SearchButton
                    text={`${details.workingDays || 2}-Day Week`}
                    leftIcon={<SVG.BagClock />}
                    className={`${styles.iconbutton}`}
                  />
                  {details.isFullTime && (
                    <SearchButton
                      text="Full Time"
                      leftIcon={<SVG.MoonCircle />}
                      className={`${styles.iconbutton}`}
                    />
                  )}
                  {details.isPartTime && (
                    <SearchButton
                      text="Part time"
                      leftIcon={<SVG.MoonCircle />}
                      className={`${styles.iconbutton}`}
                    />
                  )}
                  {details.hasContract && (
                    <SearchButton
                      text="Contract"
                      leftIcon={<SVG.MoonCircle />}
                      className={`${styles.iconbutton}`}
                    />
                  )}
                </Stack>
                {details.startDate && (
                  <div className={`${styles.datesatrt}`}>
                    <span>{<SVG.StartDate />}</span>
                    <p className="m-0 ms-2">
                      <span className={`${styles.startDate}`}>Start date:</span>{" "}
                      <b className={`${styles.startB}`}>
                        {dayjs(details.startDate).format("ll")}
                      </b>
                    </p>
                  </div>
                )}
                <div className={`${styles.downloadattachment}`}>
                  <h6>Download attachments </h6>
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
                          onClick={() =>
                            handleLoadImage(generateFileUrl(attachment.path))
                          }
                          // target="_blank"
                          style={{ cursor: "pointer" }}
                          className="m-0"
                          rel="noreferrer"
                        >
                          {attachment.title}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </Grid>
              <Grid item xs={12} lg={3}>
                <JobCostCard
                  amount={details.budgetAmount}
                  payPeriod={details.budgetPayPeriod}
                  user={details.user}
                />
                {role === USER_ROLES.jobSeeker || role === "" ? (
                  <div className={`${styles.jobpostbtn}`}>
                    <FilledButton
                      title={
                        details.isApplied
                          ? details.isEditable
                            ? "Edit"
                            : "Applied"
                          : "Apply for this job"
                      }
                      className={`${styles.enablebtn}`}
                      disabled={details.isApplied && !details.isEditable}
                      onClick={() => {
                        if (isLoggedIn) {
                          if (details.isEditable && details.isApplied) {
                            navigate(
                              urlcat("../job/apply/:jobId", {
                                jobId: params.jobId,
                                applicationId: details.application.id,
                              })
                            );
                          } else {
                            navigate(
                              urlcat("../job/apply/:jobId", {
                                jobId: params.jobId,
                              })
                            );
                          }
                        } else {
                          setRegistrationWarning(true);
                        }
                      }}
                    />
                    {details.isEditable && details.isApplied && isLoggedIn && (
                      <FilledButton
                        title="Withdraw"
                        className={`${styles.enablebtn}`}
                        disabled={!details.isEditable}
                        onClick={() => {
                          handleWithdrawJobApplication();
                        }}
                      />
                    )}
                    {!details.isApplied && details.contactEmail && (
                      <FilledButton
                        title="Apply via Mail"
                        className={`${styles.enablebtn}`}
                        onClick={() => {
                          handleSendEmail();
                        }}
                      />
                    )}
                    {/* <div className={styles.btnGroup}> */}
                    <Stack
                      direction="row"
                      spacing={{
                        xs: 1,
                        sm: 2,
                        lg: 2,
                      }}
                      alignItems="center"
                      justifyContent="center"
                    >
                      <OutlinedButton
                        title={details.isSaved ? "Saved" : "Save job"}
                        style={{ height: "44px" }}
                        jobSeeker
                        onClick={() => {
                          handleSaveJob(params.jobId);
                        }}
                      />
                      <OutlinedButton
                        title={<SVG.ShareIcon />}
                        jobSeeker
                        style={{ height: "44px" }}
                        onClick={() => {
                          setIsSharing(true);
                        }}
                      />
                    </Stack>
                    {/* </div> */}
                  </div>
                ) : null}
              </Grid>
            </Grid>
          </div>
          <div className={`${styles.secondDiv}`}>
            <Grid container spacing={2}>
              <Grid item xs={12} lg={7} sm={7}>
                <JobRequirementCard
                  highestEducation={details.highestEducation}
                  languages={details.languages}
                  skills={details.skills}
                />
              </Grid>
              <Grid item xs={12} lg={5} sm={5}>
                <div className={`${styles.location}`}>
                  <h3 className="mb-0">Location :</h3>
                  <p>{details.address}</p>
                  <Box
                    sx={{
                      height: "75%",
                      overflow: "hidden",
                      borderRadius: "5px",
                      "@media (max-width:992px)": {
                        height: "250px",
                      },
                    }}
                  >
                    <GoogleMapWrapper>
                      <GoogleMap center={addressGeoCode} zoom={15} />
                    </GoogleMapWrapper>
                  </Box>
                </div>
              </Grid>
            </Grid>
            <DialogBox
              open={registrationWarning}
              handleClose={() => setRegistrationWarning(false)}
            >
              <div>
                <h1 className="heading">Register as jobseeker</h1>
                <div className="form-content">
                  <p>
                    To apply for the job and have many other useful features to
                    find a job, please register on Koor.
                  </p>
                  <div style={{ textAlign: "center", lineHeight: "40px" }}>
                    <Link to="/register?role=job_seeker">
                      <OutlinedButton
                        title="Register as jobseeker"
                        jobSeeker
                        style={{
                          width: "100%",
                        }}
                      />
                    </Link>
                    <span>
                      Already have an account?{" "}
                      <Link
                        to={`/login?role=${USER_ROLES.jobSeeker}`}
                        style={{
                          textDecoration: "none",
                          color: "#EEA23D",
                          fontWeight: 600,
                        }}
                      >
                        Login
                      </Link>
                    </span>
                  </div>
                </div>
              </div>
            </DialogBox>
          </div>
          <div className={`${styles.LikeJob}`}>
            <h2>more jobs like this:</h2>
            {suggestionJobs.map((item, key) => {
              return (
                <p key={key}>
                  <Link to={urlcat("/jobs/details/:jobId", { jobId: item.id })}>
                    {item.title}
                  </Link>
                  <span>
                    – {item.city.title}, {item.country.title} $
                    {item.budgetAmount}{" "}
                  </span>
                </p>
              );
            })}
          </div>
        </div>
      </Container>
      <DialogBox
        open={isSharing}
        handleClose={() => setIsSharing(false)}
        title="Share"
        sx={{
          "& .MuiPaper-root": {
            width: "700px",
            maxWidth: "857px",
          },
        }}
      >
        <ShareJob />
      </DialogBox>
    </>
  );
};

export default JobDetails;

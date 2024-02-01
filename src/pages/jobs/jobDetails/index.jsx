import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { SVG } from "../../../assets/svg";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  getJobAttachmentAPI,
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
} from "@components/button";
import { getColorByRemainingDays } from "@utils/generateColor";
import urlcat from "urlcat";
import JobCostCard from "../component/jobCostCard";
import JobRequirementCard from "../component/jobRequirementCard";
import { saveJobAPI, unSaveJobAPI } from "../../../api/jobSeeker";
import { useDispatch, useSelector } from "react-redux";
import DialogBox, { ExpiredBox } from "../../../components/dialogBox";
import { USER_ROLES } from "../../../utils/enum";
import { getLetLongByAddressAPI } from "../../../api/user";
import { GoogleMapWrapper, GoogleMap } from "../../../components/googleMap";
import { Box, Divider, IconButton, Stack } from "@mui/material";
import ShareJob from "../shareJob";
import { setErrorToast, setSuccessToast } from "../../../redux/slice/toast";
import { showDay } from "@utils/constants/utility";
import { Capacitor } from "@capacitor/core";
import CreateCoverLetter from "../../../components/coverLetter";
import { fileTypeExtractor, downloadUrlCreator } from "@utils/filesUtils";
import { generateFileUrl } from "@utils/generateFileUrl";

const JobDetails = () => {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { role, isLoggedIn } = useSelector((state) => state.auth);
  const [registrationWarning, setRegistrationWarning] = useState(false);
  const [openCreateCoverLetter, setOpenCreateCoverLetter] = useState(false);
  const [expiredWarning, setExpiredWarning] = useState(false);
  const [suggestionJobs, setSuggestionJobs] = useState([]);
  const [isSharing, setIsSharing] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const platform = Capacitor.getPlatform();

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
  const hasData = (...values) =>
    values.some((value) => {
      if (Array.isArray(value)) {
        return value.length > 0;
      } else if (typeof value === "number") {
        return value !== 0;
      }
      return false;
    });

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

  function handleSendEmail(details) {
    const email = details.contactEmail;
    const ccEmail1 = details.cc1;
    const ccEmail2 = details.cc2;
    const subject = `Job Application for ${details.title}`;
    const body = `Here is the my job application for this job \n ${window.location.href}`;
    let link = `mailto:${email}?&subject=${encodeURIComponent(
      subject,
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
  // const getApplyJobByEmail = async (jobId) => {
  //   dispatch(setSuccessToast("Job apply by email successfully"));
  //   await getApplyJobByEmailAPI(jobId);
  // };
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
    } else if (details.expiredInDays <= 0) {
      setExpiredWarning(true);
    } else {
      setRegistrationWarning(true);
    }
  };

  const handleLoadImage = async (url, _) => {
    const fileType = fileTypeExtractor(url);
    const response = await getJobAttachmentAPI(url);

    if (response.remote === "success") {
      const base64String = response.data.base_image;
      const byteCharacters = atob(base64String);
      const byteArrays = new Uint8Array(byteCharacters.length);

      for (let i = 0; i < byteCharacters.length; i++) {
        byteArrays[i] = byteCharacters.charCodeAt(i);
      }

      const blob = new Blob([byteArrays], {
        type: fileType || "application/octet-stream",
      });

      if (platform === "android" || platform === "ios") {
        return "";
      } else {
        downloadUrlCreator(blob);
      }
    }
  };
  return (
    <>
      <Container
        maxWidth={false}
        sx={{
          padding: platform === "android" || platform === "ios" ? "0px" : null,
          "@media(min-width:992px)": {
            paddingLeft: "100px",
            paddingRight: "100px",
          },
        }}
      >
        <div
          className={`${styles.Jobcard}`}
          style={{
            margin:
              platform === "android" || platform === "ios"
                ? "0px 0px 130px 0px"
                : null,
            borderRadius:
              platform === "android" || platform === "ios" ? "0px" : null,
          }}
        >
          <div className={`${styles.grids}`}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={7} lg={8}>
                <div className={`${styles.postJob}`}>
                  {/* <Link to="/saved-jobs"> */}
                  <IconButton
                    disableRipple={true}
                    sx={{
                      paddingTop: "5px",
                      padding: "0px",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      if (window.history.length > 1) {
                        navigate(-1);
                      } else {
                        navigate("/");
                      }
                    }}
                  >
                    {<SVG.LeftArrow />}
                  </IconButton>

                  {/* </Link> */}
                  <p className="mb-0">{details.title}</p>
                </div>
              </Grid>
              <Grid item xs={12} sm={5} lg={4}>
                <div className={`${styles.clocs}`}>
                  {<SVG.ClockIconSmall />}
                  <p className="mb-0 mt-0 me-1">
                    <span>Posted:</span> {dayjs(details.createdAt).format("ll")}
                  </p>
                  <SolidButton
                    className={
                      details?.expiredInDays > 0
                        ? "btn_font_lower"
                        : "btn_font_capitalize"
                    }
                    title={
                      details?.expiredInDays > 0
                        ? showDay(details?.expiredInDays)
                        : "Expired"
                    }
                    color={getColorByRemainingDays(
                      details?.expiredInDays > 0 ? details?.expiredInDays : 0,
                    )}
                  />
                </div>
              </Grid>
            </Grid>
            <hr />
            <Grid container spacing={2}>
              <Grid item xs={12} lg={9} md={7} sm={7}>
                <Box className={styles.job_detail_description}>
                  {details?.description?.length > 350 && showMore ? (
                    <Box
                      dangerouslySetInnerHTML={{
                        __html: details?.description,
                      }}
                    ></Box>
                  ) : (
                    <Box
                      dangerouslySetInnerHTML={{
                        __html: details.description.substring(0, 350),
                      }}
                    ></Box>
                  )}
                  <button
                    onClick={() => setShowMore((prev) => !prev)}
                    style={{
                      textAlign: "center",
                      width: "100%",
                      border: "none",
                      cursor: "pointer",
                      marginBottom: "20px",
                      background: "none",
                      color:
                        role !== USER_ROLES.jobSeeker ? "#274593" : "#fe7f00",
                    }}
                  >
                    {showMore ? (
                      <>
                        Less <SVG.ArrowUpIcon />
                      </>
                    ) : (
                      <>
                        More <SVG.Downarrow />
                      </>
                    )}
                  </button>
                </Box>
                <Stack
                  direction={{ xs: "row", lg: "row", sm: "row" }}
                  alignItems={{ xs: "flex-start", lg: "center" }}
                  spacing={{ xs: 2, lg: 0 }}
                  flexWrap={"wrap"}
                  useFlexGap
                  sx={{
                    "@media (max-width:992px)": {
                      "& .MuiButtonBase-root": { margin: "0px !important" },
                    },
                  }}
                >
                  <SearchButton
                    text={details.country.title}
                    leftIcon={<SVG.LocationIcon />}
                    className={`${styles.iconbutton}`}
                  />
                  {details?.workingDays && (
                    <SearchButton
                      text={`${details.workingDays}`}
                      leftIcon={<SVG.BagClock />}
                      className={`${styles.iconbutton}`}
                    />
                  )}
                  {details?.duration && (
                    <SearchButton
                      text={`${details.duration} Months`}
                      leftIcon={<SVG.BagClock />}
                      className={`${styles.iconbutton}`}
                    />
                  )}
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
                      text="Consultant"
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
                {details.attachments.length > 0 && (
                  <div className={`${styles.downloadattachment}`}>
                    <h6>Download attachments </h6>
                    {details.attachments.map((attachment) => {
                      return (
                        <div
                          className={`${styles.downloadtext}`}
                          key={attachment.id}
                        >
                          <span className="d-inline-flex  me-2">
                            {<SVG.OrangeIcon />}
                          </span>
                          <a
                            className="m-0"
                            onClick={(_) => handleLoadImage(attachment.path)}
                            href={generateFileUrl(attachment.path)}
                            target="_blank"
                            rel="noreferrer"
                            style={{
                              color:
                                role === USER_ROLES.jobSeeker
                                  ? "#eea23d"
                                  : "#274593",
                              cursor: "pointer",
                              whiteSpace: "normal",
                              wordBreak: "break-all",
                            }}
                          >
                            {attachment.title}
                          </a>
                        </div>
                      );
                    })}
                  </div>
                )}
              </Grid>
              <Grid item xs={12} lg={3} md={5} sm={5}>
                <JobCostCard
                  amount={details.budgetAmount}
                  payPeriod={details.budgetPayPeriod}
                  user={details.user}
                />
                {role === USER_ROLES.jobSeeker || role === "" ? (
                  <div className={`${styles.jobpostbtn}`}>
                    {details.isApplyThroughKoor && (
                      <FilledButton
                        sx={{
                          "@media (min-width: 600px) and (max-width: 760px)": {
                            fontSize: "10px !important",
                          },
                        }}
                        title={
                          details.isApplied
                            ? details.isEditable
                              ? "Edit"
                              : "Applied"
                            : [
                                <>
                                  <SVG.Enable1 className="me-2" />
                                </>,
                                "Apply for this job",
                              ]
                        }
                        className={`${styles.enablebtn}`}
                        disabled={details.isApplied && !details.isEditable}
                        onClick={() => {
                          if (details.expiredInDays > 0) {
                            if (isLoggedIn) {
                              if (details.isEditable && details.isApplied) {
                                navigate(
                                  urlcat("../job/apply/:jobId", {
                                    jobId: params.jobId,
                                    applicationId: details.application.id,
                                  }),
                                );
                              } else {
                                navigate(
                                  urlcat("../job/apply/:jobId", {
                                    jobId: params.jobId,
                                  }),
                                );
                              }
                            } else {
                              setRegistrationWarning(true);
                            }
                          } else {
                            setExpiredWarning(true);
                          }
                        }}
                      />
                    )}
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
                    {/* {!details.isApplied && details.contactEmail && (
                      <FilledButton
                        title="Apply via Mail"
                        className={`${styles.enablebtn}`}
                        onClick={() => {
                          handleSendEmail();
                        }}
                      />
                    )} */}
                    {/* <div className={styles.btnGroup}> */}
                    <Stack
                      direction="column"
                      spacing={{
                        xs: 1,
                        sm: 2,
                        lg: 2,
                      }}
                      alignItems="center"
                      justifyContent="center"
                    >
                      <OutlinedButton
                        className={styles.width_wise_btn}
                        title={
                          details.isSaved
                            ? "Saved"
                            : [
                                <>
                                  <SVG.SaveIcon1 className="me-2" />
                                </>,
                                "Save job",
                              ]
                        }
                        style={{ height: "44px", width: "100%" }}
                        jobSeeker
                        onClick={() => {
                          if (details.expiredInDays > 0) {
                            if (isLoggedIn) {
                              handleSaveJob(params.jobId);
                            } else {
                              setRegistrationWarning(true);
                            }
                          } else {
                            setExpiredWarning(true);
                          }
                        }}
                      />
                      <OutlinedButton
                        title={[
                          <>
                            <SVG.ShareIcon className="me-2" />
                          </>,
                          "Share",
                        ]}
                        jobSeeker
                        sx={{
                          height: "44px",
                          border: "0px !important",
                          padding: "0px !important",
                          color: "#eea23d !important",
                          marginTop: "0px !important",
                          "&:hover": {
                            backgroundColor: "transparent !important",
                          },
                          "@media (min-width: 600px) and (max-width: 760px)": {
                            fontSize: "10px !important",
                          },
                        }}
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

          {(details.isApplyThroughEmail || details.isApplyThroughWebsite) && (
            <>
              <div className={`${styles.LikeJob}`}>
                <h2>Application Instructions:</h2>
                <div
                  dangerouslySetInnerHTML={{
                    __html: details.applicationInstruction,
                  }}
                ></div>
              </div>
              {role === USER_ROLES.jobSeeker || role === "" ? (
                <div className={`${styles.jobpostbtn} `}>
                  <Stack
                    direction={{ xs: "column", lg: "row" }}
                    spacing={2}
                    alignItems={{ xs: "flex-start", lg: "center" }}
                  >
                    <OutlinedButton
                      sx={{
                        color: "#eea23d !important",
                        borderColor: "#eea23d !important",
                        "@media (max-width: 480px)": {
                          fontSize: "14px !important",
                          width: "100%",
                        },
                        "@media (max-width: 320px)": {
                          fontSize: "10px !important",
                          padding: "10px 25px !important",
                          width: "100%",
                        },
                      }}
                      title={[
                        <>
                          <SVG.resumeIcon className="me-2" />
                        </>,
                        "Create a cover letter",
                      ]}
                      // className={${styles.enablebtn}}
                      disabled={!details.isEditable && details.isApplied}
                      onClick={() => {
                        if (details.expiredInDays <= 0) {
                          setExpiredWarning(true);
                        } else {
                          setOpenCreateCoverLetter(true);
                        }
                      }}
                    />
                    {!details.isApplied && details.isApplyThroughWebsite && (
                      <OutlinedButton
                        sx={{
                          color: "#eea23d !important",
                          borderColor: "#eea23d !important",
                          "@media (max-width: 480px)": {
                            fontSize: "14px !important",
                            width: "100%",
                          },
                          "@media (max-width: 320px)": {
                            fontSize: "10px !important",
                            padding: "10px 25px !important",
                            width: "100%",
                          },
                        }}
                        title={[
                          <>
                            <SVG.ArrowOutward className="me-2" />
                          </>,
                          "Apply on employer's website",
                        ]}
                        // className={${styles.enablebtn}}
                        disabled={details.isApplied && !details.isEditable}
                        onClick={() => {
                          if (details.expiredInDays <= 0) {
                            setExpiredWarning(true);
                          } else {
                            window.open(details.websiteLink, "_blank");
                          }
                        }}
                      />
                    )}
                    {!details.isApplied && details.isApplyThroughEmail && (
                      <OutlinedButton
                        sx={{
                          color: "#eea23d !important",
                          borderColor: "#eea23d !important",
                          "@media (max-width: 480px)": {
                            fontSize: "14px !important",
                            width: "100%",
                          },
                          "@media (max-width: 320px)": {
                            fontSize: "10px !important",
                            padding: "10px 30px !important",
                            width: "100%",
                          },
                        }}
                        title={[
                          <>
                            <SVG.ArrowOutward className="me-2" />
                          </>,
                          "Apply by email",
                        ]}
                        onClick={() => {
                          if (details.expiredInDays <= 0) {
                            setExpiredWarning(true);
                          } else {
                            handleSendEmail(details);
                          }
                        }}
                      />
                    )}
                  </Stack>
                </div>
              ) : null}
              <Divider />
            </>
          )}
          <div className={`${styles.secondDiv}`}>
            <Grid container spacing={2}>
              {hasData(
                details.highestEducation,
                details.languages,
                details.skills,
                details.experience,
              ) && (
                <Grid item xs={12} lg={7} sm={7}>
                  <JobRequirementCard
                    highestEducation={details.highestEducation}
                    languages={details.languages}
                    skills={details.skills}
                    experience={details.experience}
                  />
                </Grid>
              )}
              <Grid
                item
                xs={12}
                lg={
                  hasData(
                    details.highestEducation,
                    details.languages,
                    details.skills,
                    details.experience,
                  )
                    ? 5
                    : 6
                }
                sm={
                  hasData(
                    details.highestEducation,
                    details.languages,
                    details.skills,
                    details.experience,
                  )
                    ? 5
                    : 12
                }
              >
                <div className={`${styles.location}`}>
                  <h3 className="mb-0">Location :</h3>
                  <p>{details.address}</p>
                  <Box
                    sx={{
                      overflow: "hidden",
                      borderRadius: "5px",
                      position: "relative",
                      height: hasData(
                        details.highestEducation,
                        details.languages,
                        details.skills,
                        details.experience,
                      )
                        ? "75%"
                        : "250px",
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
                  <p className="jobs_dailog_content">
                    To apply for the job and have many other useful features to
                    find a job, please register on Koor.
                  </p>
                  <div style={{ textAlign: "center", lineHeight: "40px" }}>
                    <Link to="/register?role=job_seeker">
                      <OutlinedButton
                        title="Register"
                        jobSeeker
                        sx={{
                          width: "100%",
                          fontSize: "16px !important",
                          "@media (max-width: 992px)": {
                            fontSize: "16px !important",
                          },
                          "@media (max-width: 480px)": {
                            fontSize: "14px !important",
                          },
                        }}
                      />
                    </Link>
                    <span className="jobs_dailog_login_line">
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
          {/* {(details.isApplyThroughEmail || details.isApplyThroughWebsite) && (
            <>
              <div className={`${styles.LikeJob}`}>
                <h2>Application Instructions:</h2>
                {details.applicationInstruction}
              </div>
              {role === USER_ROLES.jobSeeker || role === "" ? (
                <div className={`${styles.jobpostbtn} `}>
                  <Box sx={{ textAlign: "start", display: "flex" }}>
                    {!details.isApplied && details.isApplyThroughWebsite && (
                      <OutlinedButton
                        sx={{
                          color: "#eea23d !important",
                          borderColor: "#eea23d !important",
                        }}
                        title={[
                          <>
                            <SVG.ArrowOutward className="me-2" />
                          </>,
                          "Apply on employer's website",
                        ]}
                        // className={`${styles.enablebtn}`}
                        disabled={details.isApplied && !details.isEditable}
                        onClick={() => {
                          if (isLoggedIn) {
                            window.open(details.websiteLink, "_blank");
                          } else {
                            setRegistrationWarning(true);
                          }
                        }}
                      />
                    )}
                    {!details.isApplied && details.isApplyThroughEmail && (
                      <OutlinedButton
                        sx={{
                          color: "#eea23d !important",
                          borderColor: "#eea23d !important",
                        }}
                        title={[
                          <>
                            <SVG.ArrowOutward className="me-2" />
                          </>,
                          "Apply by email",
                        ]}
                        className="ms-3"
                        onClick={() => {
                          handleSendEmail(details.id);
                        }}
                      />
                    )}
                  </Box>
                </div>
              ) : null}
              <Divider />
            </>
          )} */}
          <Box
            className={`${styles.LikeJob}`}
            sx={{
              "& p": {
                position: "relative",
                padding:
                  platform === "android" || platform === "ios"
                    ? "16px 30px 16px 0px"
                    : "",
                margin: platform === "android" || platform === "ios" ? "0" : "",
                borderBottom:
                  platform === "android" || platform === "ios"
                    ? "1px solid #ccc"
                    : "",
              },
              "& p:last-child": {
                borderBottom:
                  platform === "android" || platform === "ios" ? "0" : "",
              },
              "& p:first-child": {
                paddingTop:
                  platform === "android" || platform === "ios" ? "0px" : "",
              },
              "& span": {
                display:
                  platform === "android" || platform === "ios" ? "block" : "",
              },
            }}
          >
            <h2>more jobs like this:</h2>
            {suggestionJobs.map((item, key) => {
              return (
                <p key={key}>
                  <Link
                    style={{
                      color:
                        role === USER_ROLES.jobSeeker ? "#EEA23D" : "#274593",
                    }}
                    to={urlcat("/jobs/details/:jobId", { jobId: item.id })}
                  >
                    {item.title}
                  </Link>
                  <span>
                    – {item.city.title ? item.city.title + "," : ""}{" "}
                    {item.country.title}
                    {item.budgetAmount > 0 && ` $${item.budgetAmount}`}
                  </span>
                  {platform === "android" || platform === "ios" ? (
                    <b
                      style={{
                        position: "absolute",
                        right: "10px",
                        top: "37px",
                        transform: "translate(0%, -37%)",
                        color:
                          role === USER_ROLES.jobSeeker ? "#EEA23D" : "#274593",
                      }}
                    >
                      <SVG.ArrowAngle />
                    </b>
                  ) : (
                    ""
                  )}
                </p>
              );
            })}
          </Box>
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
      <DialogBox
        open={registrationWarning}
        handleClose={() => setRegistrationWarning(false)}
      >
        <div>
          <h1 className="heading">Register as jobseeker</h1>
          <div className="form-content">
            <p className="jobs_dailog_content">
              To apply for the job and have many other useful features to find a
              job, please register on Koor.
            </p>
            <div style={{ textAlign: "center", lineHeight: "40px" }}>
              <Link to="/register?role=job_seeker">
                <OutlinedButton
                  title="Register"
                  jobSeeker
                  sx={{
                    width: "100%",
                    fontSize: "16px !important",
                    "@media (max-width: 992px)": {
                      fontSize: "16px !important",
                    },
                    "@media (max-width: 480px)": {
                      fontSize: "14px !important",
                    },
                  }}
                />
              </Link>
              <span className="jobs_dailog_login_line">
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
      <DialogBox
        className="coverletter_dialog"
        open={openCreateCoverLetter}
        handleClose={() => setOpenCreateCoverLetter(false)}
      >
        <Box>
          <CreateCoverLetter />
        </Box>
      </DialogBox>
      <ExpiredBox
        open={expiredWarning}
        handleClose={() => setExpiredWarning(false)}
      />
    </>
  );
};

export default JobDetails;

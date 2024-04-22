import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import Grid from "@mui/material/Grid";
import { SVG } from "../../../assets/svg";
import { Link, useNavigate, useParams } from "react-router-dom";
import AttachmentIcon from "@mui/icons-material/Attachment";
import {
  // getApplyJobByEmailAPI,
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
import { NoRecordFoundAnimation } from "@components/animations";
import { getColorByRemainingDays, getColorByRole } from "@utils/generateColor";
import urlcat from "urlcat";
import JobCostCard from "../component/jobCostCard";
import JobRequirementCard from "../component/jobRequirementCard";
import { saveJobAPI, unSaveJobAPI } from "../../../api/jobSeeker";
import { useDispatch, useSelector } from "react-redux";
import DialogBox, { ExpiredBox } from "../../../components/dialogBox";
import { USER_ROLES } from "@utils/enum";
import { getLetLongByAddressAPI } from "../../../api/user";
import { GoogleMapWrapper, GoogleMap } from "../../../components/googleMap";
import {
  Box,
  Divider,
  IconButton,
  Stack,
  Container,
  alpha,
} from "@mui/material";
import ShareJob from "../shareJob";
import { setErrorToast, setSuccessToast } from "../../../redux/slice/toast";
import { showDay, formatCommaText } from "@utils/constants/utility";
import { cleanHtmlContent } from "@utils/fileUtils";
import { MAX_WORD_SIZE } from "@utils/constants/constants";
import { generateFileUrl } from "@utils/generateFileUrl";

const JobDetails = () => {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isMobileView } = useSelector(({ platform }) => platform);
  const { role, isLoggedIn } = useSelector(({ auth }) => auth);
  const [suggestionJobs, setSuggestionJobs] = useState([]);
  const [state, setState] = useState({
    expiredWarning: false,
    registrationWarning: false,
    isSharing: false,
    showMore: true,
    postExist: true,
  });

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
    } else {
      setState((prev) => ({ ...prev, postExist: false }));
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
        await saveJobAPI(jobId);
      } else {
        await unSaveJobAPI(jobId);
      }
    } else if (details.expiredInDays <= 0) {
      setState((prev) => ({ ...prev, expiredWarning: true }));
    } else {
      setState((prev) => ({ ...prev, registrationWarning: true }));
    }
  };

  return (
    <>
      <Container
        maxWidth={false}
        sx={{
          padding: isMobileView ? "0px" : null,
          "@media(min-width:992px)": {
            paddingLeft: "100px",
            paddingRight: "100px",
          },
        }}
      >
        <div
          className={`${styles.Jobcard}`}
          style={{
            margin: isMobileView ? "0px 0px 130px 0px" : null,
            borderRadius: isMobileView ? "0px" : null,
          }}
        >
          {state.postExist ? (
            <>
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
                        onClick={() => navigate("/search/jobs")}
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
                        <span>Posted:</span>{" "}
                        {dayjs(details.startDate).format("ll")}
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
                          details?.expiredInDays > 0
                            ? details?.expiredInDays
                            : 0,
                        )}
                      />
                    </div>
                  </Grid>
                </Grid>
                <hr />
                <Grid container spacing={2}>
                  <Grid item xs={12} lg={9} md={7} sm={7}>
                    <div className="mb-4">
                      <h4>Details :</h4>
                      {state.showMore ? (
                        <Box
                          className="details"
                          dangerouslySetInnerHTML={{
                            __html: details?.description,
                          }}
                        ></Box>
                      ) : (
                        <Box
                          className="details"
                          dangerouslySetInnerHTML={{
                            __html: details?.description?.substring(
                              0,
                              MAX_WORD_SIZE,
                            ),
                          }}
                        ></Box>
                      )}
                      {details?.description?.length > MAX_WORD_SIZE && (
                        <button
                          style={{
                            border: "none",
                            textAlign: "center",
                            width: "100%",
                            marginTop: "10px",
                            cursor: "pointer",
                            background: "none",
                            color:
                              role !== USER_ROLES.jobSeeker
                                ? "#274593"
                                : "#fe7f00",
                          }}
                          onClick={() =>
                            setState((prev) => ({
                              ...prev,
                              showMore: !prev.showMore,
                            }))
                          }
                        >
                          {!state.showMore ? "See More" : "See Less"}
                        </button>
                      )}
                    </div>
                    <Stack
                      direction={{ xs: "row", lg: "row", sm: "row" }}
                      alignItems={{ xs: "flex-start", lg: "center" }}
                      spacing={{ xs: 1, lg: 0 }}
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
                          text="Contract"
                          leftIcon={<SVG.MoonCircle />}
                          className={`${styles.iconbutton}`}
                        />
                      )}
                    </Stack>
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
                                <AttachmentIcon
                                  sx={{
                                    color: getColorByRole(
                                      role === "" ? USER_ROLES.employer : role,
                                    ),
                                    rotate: "45deg",
                                    background: alpha(
                                      getColorByRole(
                                        role === ""
                                          ? USER_ROLES.employer
                                          : role,
                                      ),
                                      0.3,
                                    ),
                                    padding: "3px",
                                    borderRadius: "50%",
                                  }}
                                />
                              </span>
                              <a
                                className="m-0"
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
                      color={getColorByRole(role)}
                      amount={details.budgetAmount}
                      payPeriod={details.budgetPayPeriod}
                      user={details.user}
                    />
                    {role === USER_ROLES.jobSeeker || role === "" ? (
                      <div className={`${styles.jobpostbtn}`}>
                        {details.isApplyThroughKoor && (
                          <FilledButton
                            sx={{
                              "@media (min-width: 600px) and (max-width: 760px)":
                                {
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
                                  setState((prev) => ({
                                    ...prev,
                                    registrationWarning: true,
                                  }));
                                }
                              } else {
                                setState((prev) => ({
                                  ...prev,
                                  expiredWarning: true,
                                }));
                              }
                            }}
                          />
                        )}
                        {details.isEditable &&
                          details.isApplied &&
                          isLoggedIn && (
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
                                  setState((prev) => ({
                                    ...prev,
                                    registrationWarning: true,
                                  }));
                                }
                              } else {
                                setState((prev) => ({
                                  ...prev,
                                  expiredWarning: true,
                                }));
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
                              "@media (min-width: 600px) and (max-width: 760px)":
                                {
                                  fontSize: "10px !important",
                                },
                            }}
                            onClick={() => {
                              setState((prev) => ({
                                ...prev,
                                isSharing: true,
                              }));
                            }}
                          />
                        </Stack>
                        {/* </div> */}
                      </div>
                    ) : null}
                  </Grid>
                </Grid>
              </div>

              {(details?.isApplyThroughEmail ||
                details?.isApplyThroughWebsite) && (
                <>
                  {details?.applicationInstruction &&
                    Boolean(
                      cleanHtmlContent(details?.applicationInstruction),
                    ) && (
                      <div className={`${styles.LikeJob}`}>
                        <h2>Application Instructions:</h2>
                        <div
                          className="details"
                          dangerouslySetInnerHTML={{
                            __html: details?.applicationInstruction,
                          }}
                        ></div>
                      </div>
                    )}
                  {role === USER_ROLES.jobSeeker || role === "" ? (
                    <div className={`${styles.jobpostbtn} `}>
                      <Stack
                        direction={{ xs: "column", lg: "row" }}
                        spacing={2}
                        alignItems={{ xs: "flex-start", lg: "center" }}

                        // sx={{
                        //   textAlign: "start",
                        //   display: "flex",

                        //   "@media (max-width: 480px)": {
                        //     justifyContent: "center",
                        //     flexDirection: "column",
                        //   },
                        // }}
                      >
                        {!details.isApplied &&
                          details.isApplyThroughWebsite && (
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
                              disabled={
                                details.isApplied && !details.isEditable
                              }
                              onClick={() => {
                                if (details.expiredInDays > 0) {
                                  window.open(details.websiteLink, "_blank");
                                } else {
                                  setState((prev) => ({
                                    ...prev,
                                    expiredWarning: true,
                                  }));
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
                              handleSendEmail(details);
                            }}
                          />
                        )}
                      </Stack>
                    </div>
                  ) : null}
                  {(details.isApplyThroughEmail ||
                    details.isApplyThroughWebsite ||
                    details.isApplyThroughWebsite ||
                    details.applicationInstruction) && <Divider />}
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
                  open={state.registrationWarning}
                  handleClose={() =>
                    setState((prev) => ({
                      ...prev,
                      registrationWarning: false,
                    }))
                  }
                >
                  <div>
                    <h1 className="heading">Register as jobseeker</h1>
                    <div className="form-content">
                      <p className="jobs_dailog_content">
                        To apply for the job and have many other useful features
                        to find a job, please register on Koor.
                      </p>
                      <div
                        style={{
                          textAlign: "center",
                          lineHeight: "40px",
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        <OutlinedButton
                          title="Register"
                          jobSeeker
                          component={Link}
                          to="/register?role=job_seeker"
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

              <Box
                className={`${styles.LikeJob}`}
                sx={{
                  "& p": {
                    position: "relative",
                    padding: isMobileView ? "16px 30px 16px 0px" : "",
                    margin: isMobileView ? "0" : "",
                    borderBottom: isMobileView ? "1px solid #ccc" : "",
                  },
                  "& p:last-child": {
                    borderBottom: isMobileView ? "0" : "",
                  },
                  "& p:first-child": {
                    paddingTop: isMobileView ? "0px" : "",
                  },
                  "& span": {
                    display: isMobileView ? "block" : "",
                  },
                }}
              >
                <h2>more jobs like this:</h2>
                {suggestionJobs.map((item, key) => {
                  return (
                    <p key={key}>
                      <Link
                        style={{
                          color: getColorByRole(role),
                        }}
                        to={urlcat("/jobs/details/:jobId", { jobId: item.id })}
                      >
                        {item.title}
                      </Link>
                      -
                      <span>
                        {" "}
                        {formatCommaText(item.city.title, item.country.title)}
                        {item.budgetAmount > 0 && ` $${item.budgetAmount}`}
                      </span>
                      {isMobileView ? (
                        <b
                          style={{
                            position: "absolute",
                            right: "10px",
                            top: "37px",
                            transform: "translate(0%, -37%)",
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
            </>
          ) : (
            <>
              <Box textAlign="center">
                <NoRecordFoundAnimation title="Job Not Exist, Anymore" />
                <FilledButton
                  title="Go Back to Browser Job"
                  onClick={() => navigate("/search/jobs")}
                />
              </Box>
            </>
          )}
        </div>
      </Container>
      <DialogBox
        open={state.isSharing}
        handleClose={() =>
          setState((prev) => ({
            ...prev,
            isSharing: false,
          }))
        }
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
      <ExpiredBox
        color={getColorByRole(role)}
        open={state.expiredWarning}
        handleClose={() =>
          setState((prev) => ({
            ...prev,
            expiredWarning: false,
          }))
        }
      />
    </>
  );
};

export default JobDetails;

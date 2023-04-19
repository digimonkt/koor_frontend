import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { SVG } from "@assets/svg";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getJobDetailsByIdAPI, getJobSuggestionAPI } from "@api/job";
import dayjs from "dayjs";
import { SolidButton, SearchButton, OutlinedButton } from "@components/button";
import { getColorByRemainingDays } from "@utils/generateColor";
import { generateFileUrl } from "@utils/generateFileUrl";
import urlcat from "urlcat";
import JobCostCard from "../component/jobCostCard";
import JobRequirementCard from "../component/jobRequirementCard";
import { saveJobAPI, unSaveJobAPI } from "@api/jobSeeker";
import { useSelector } from "react-redux";
import DialogBox from "@components/dialogBox";
import { USER_ROLES } from "@utils/enum";
import { getLetLongByAddressAPI } from "@api/user";
import { GoogleMapWrapper, GoogleMap } from "@components/googleMap";

const JobDetails = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { isLoggedIn } = useSelector((state) => state.auth);
  const [registrationWarning, setRegistrationWarning] = useState(false);
  const [suggestionJobs, setSuggestionJobs] = useState([]);
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
  useEffect(() => {
    getJobDetails(params.jobId);
    getJobSuggestions(params.jobId);
  }, [params.jobId]);
  // console.log("suggestionJobs_page", suggestionJobs);
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
  return (
    <>
      <Container>
        <div className={`${styles.Jobcard}`}>
          <div className={`${styles.grids}`}>
            <Grid container spacing={2}>
              <Grid item xs={8}>
                <div className={`${styles.postJob}`}>
                  {/* <Link to="/saved-jobs"> */}
                  <span onClick={() => navigate(-1)}>{<SVG.LeftArrow />}</span>
                  {/* </Link> */}
                  <p className="mb-0">{details.title}</p>
                </div>
              </Grid>
              <Grid item xs={4}>
                <div className={`${styles.clocs}`}>
                  {<SVG.ClockIconSmall />}
                  <p className="mb-0 mt-0 me-1">
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
            </Grid>
            <hr />
            <Grid container spacing={2}>
              <Grid item xs={12} lg={8}>
                <div className={`${styles.contentJob}`}>
                  <h4>Details :</h4>
                  <p className="job-description">{details.description}</p>
                </div>
                <div className={`${styles.iconbtn}`}>
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
                </div>
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
                  <h6>Download attachments</h6>
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
                </div>
              </Grid>
              <Grid item xs={12} lg={4}>
                <JobCostCard
                  amount={details.budgetAmount}
                  payPeriod={details.budgetPayPeriod}
                  user={details.user}
                />
                <div className={`${styles.jobpostbtn}`}>
                  <SearchButton
                    text={details.isApplied ? "Applied" : "Apply for this job"}
                    className={`${styles.enablebtn}`}
                    lefticon={<SVG.Enable />}
                    disabled={details.isApplied}
                    onClick={() => {
                      if (isLoggedIn) {
                        navigate(
                          urlcat("../job/apply/:jobId", { jobId: params.jobId })
                        );
                      } else {
                        setRegistrationWarning(true);
                      }
                    }}
                  />

                  <SearchButton
                    text={details.isSaved ? "Saved" : "Save job"}
                    lefticon={<SVG.BlueFlag />}
                    className={`${styles.outlinebtn}`}
                    onClick={() => {
                      handleSaveJob(params.jobId);
                    }}
                  />
                </div>
              </Grid>
            </Grid>
          </div>
          <div className={`${styles.secondDiv}`}>
            <Grid container spacing={2}>
              <Grid item xs={7}>
                <JobRequirementCard
                  jobCategories={details.jobCategories}
                  languages={details.languages}
                  skills={details.skills}
                />
              </Grid>
              <Grid item xs={5}>
                <div className={`${styles.location}`}>
                  <h3 className="mb-0">Location :</h3>
                  <p>{details.address}</p>
                  <div style={{ height: "100%" }}>
                    <GoogleMapWrapper>
                      <GoogleMap center={addressGeoCode} zoom={15} />
                    </GoogleMapWrapper>
                  </div>
                </div>
              </Grid>
            </Grid>
            <DialogBox open={registrationWarning} handleClose={() => {}}>
              <div>
                <h1 className="heading">Register as jobseeker</h1>
                <div className="form-content">
                  <p>
                    To apply for the job and have many other useful features to
                    find a job, please register on Koor.
                  </p>
                  <div style={{ textAlign: "center", lineHeight: "40px" }}>
                    <Link to="/register">
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
    </>
  );
};

export default JobDetails;

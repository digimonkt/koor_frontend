import { Container, Grid, Stack } from "@mui/material";
import React, { useState, useEffect } from "react";
import styles from "./tenderDetails.module.css";
import { SVG } from "@assets/svg";
import {
  FilledButton,
  OutlinedButton,
  SearchButton,
  SolidButton,
} from "@components/button";
import JobCostCard from "@pages/jobs/component/jobCostCard";
import { GoogleMapWrapper, GoogleMap } from "@components/googleMap";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  getTenderDetailsByIdAPI,
  getTenderSuggestionAPI,
  saveTenderAPI,
  unSaveTenderAPI,
  withdrawTenderApplicationAPI,
} from "@api/tender";
import dayjs from "dayjs";
import { generateFileUrl } from "@utils/generateFileUrl";
import urlcat from "urlcat";
import { useDispatch, useSelector } from "react-redux";
import { USER_ROLES } from "@utils/enum";
import DialogBox from "@components/dialogBox";
import { setErrorToast, setSuccessToast } from "@redux/slice/toast";
import { getLetLongByAddressAPI } from "@api/user";

function TenderDetailsComponent() {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
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
    isEditable: false,
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
  const { role, isLoggedIn } = useSelector((state) => state.auth);
  const [addressGeoCode, setAddressGeoCode] = useState({});
  const [registrationWarning, setRegistrationWarning] = useState(false);
  const [tenderSuggestion, setTenderSuggestion] = useState([]);
  const getTenderDetails = async (tenderId) => {
    const res = await getTenderDetailsByIdAPI({ tenderId });
    if (res.remote === "success") {
      setDetails(res.data);
      const geoCode = await getLetLongByAddressAPI(res.data.address);
      if (geoCode.remote === "success") {
        setAddressGeoCode(geoCode.data.results[0]?.geometry.location || {});
      }
    }
  };

  const getTenderSuggestion = async (tenderId) => {
    const res = await getTenderSuggestionAPI(tenderId);
    if (res.remote === "success") {
      setTenderSuggestion(res.data.results);
    }
  };
  const handleSaveTender = async (tenderId) => {
    if (isLoggedIn) {
      setDetails((prevState) => ({
        ...prevState,
        isSaved: !prevState.isSaved,
      }));
      if (!details.isSaved) {
        const resp = await saveTenderAPI(tenderId);
        if (resp.remote === "success") {
          console.log("resp", resp);
        }
      } else {
        const resp = await unSaveTenderAPI(tenderId);
        if (resp.remote === "success") {
          console.log("resp", resp);
        }
      }
    } else {
      setRegistrationWarning(true);
    }
  };
  const handleWithdrawTenderApplication = async () => {
    if (details.isEditable) {
      const res = await withdrawTenderApplicationAPI({
        tenderId: params.tenderId,
      });
      if (res.remote === "success") {
        setDetails({
          ...details,
          isApplied: false,
          isEditable: false,
        });
        dispatch(setSuccessToast("Withdraw successfully"));
      }
    } else {
      dispatch(setErrorToast("Cannot be withdraw"));
    }
  };
  useEffect(() => {
    getTenderDetails(params.tenderId);
    getTenderSuggestion(params.tenderId);
  }, [params.tenderId]);
  return (
    <>
      <Container
        maxWidth={false}
        sx={{
          "@media(min-width:600px)": {
            paddingLeft: "100px",
            paddingRight: "100px",
          },
        }}
      >
        <div className={`${styles.Jobcard}`}>
          <div className={`${styles.grids}`}>
            <Grid container spacing={2}>
              <Grid item xs={8}>
                <div className={`${styles.postJob}`}>
                  <span
                    style={{ paddingTop: "5px", cursor: "pointer" }}
                    onClick={() => navigate(-1)}
                  >
                    {<SVG.LeftArrow />}
                  </span>
                  <p className="mb-0">{details.title}</p>
                </div>
              </Grid>
              <Grid item xs={4}>
                <div className={`${styles.clocs}`}>
                  <SVG.ClockIconSmall />
                  <p className="mb-0 mt-0 me-1">
                    <span>Posted:</span> {dayjs(details.createdAt).format("ll")}
                  </p>
                  <SolidButton
                    title={
                      details.expiredInDays > 0
                        ? `${details.expiredInDays} Days`
                        : "Expired"
                    }
                    style={{ marginLeft: "20px" }}
                    color="green"
                  />
                </div>
              </Grid>
            </Grid>
            <hr />
            <Grid container spacing={2}>
              <Grid item xs={12} lg={9}>
                <div className={`mb-4 ${styles.contentJob}`}>
                  <h4>Details :</h4>
                  <p className="job-description">{details.description}. </p>
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
                <div className={`${styles.datesatrt}`}>
                  <span>{<SVG.StartDate />}</span>
                  <p className="m-0 ms-2">
                    <span className={`${styles.startDate}`}>Start date:</span>{" "}
                    <b className={`${styles.startB}`}>
                      {details?.startDate
                        ? dayjs(details.startDate).format("ll")
                        : ""}
                    </b>
                  </p>
                </div>
                <div className={`${styles.downloadattachment}`}>
                  <h6>Download attachments</h6>
                  {details.attachments.map((attachment, i) => {
                    return (
                      <div key={i} className={`${styles.downloadtext}`}>
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
              <Grid item xs={12} lg={3}>
                <JobCostCard
                  amount={details.budgetAmount}
                  user={details?.user}
                />
                {role === USER_ROLES.vendor || role === "" ? (
                  <div className={`${styles.jobpostbtn}`}>
                    <FilledButton
                      title={
                        details.isApplied
                          ? details.isEditable
                            ? "Edit"
                            : "Applied"
                          : "Apply for this Tender"
                      }
                      className={`${styles.enablebtn}`}
                      disabled={details.isApplied && !details.isEditable}
                      onClick={() => {
                        if (isLoggedIn) {
                          if (details.isEditable) {
                            navigate(
                              urlcat("../tender/apply/:tenderId", {
                                tenderId: params.tenderId,
                                applicationId: details.application.id,
                              })
                            );
                          } else {
                            navigate(
                              urlcat("../tender/apply/:tenderId", {
                                tenderId: params.tenderId,
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
                          handleWithdrawTenderApplication();
                        }}
                      />
                    )}
                    <Stack
                      direction="row"
                      spacing={{
                        xs: 1,
                        sm: 1,
                        lg: 1,
                      }}
                      alignItems="center"
                      justifyContent="center"
                    >
                      <OutlinedButton
                        title={details.isSaved ? "Saved" : "Save Tender"}
                        style={{ height: "44px" }}
                        vendor
                        onClick={() => {
                          handleSaveTender(params.tenderId);
                        }}
                      />
                    </Stack>
                  </div>
                ) : (
                  ""
                )}
              </Grid>
            </Grid>
          </div>
          <div className={`${styles.secondDiv}`}>
            <Grid container spacing={2}>
              <Grid item xs={7}>
                <div className={`${styles.location}`}>
                  <h3 className="mb-0">Location :</h3>
                  <p>{details.address}</p>
                  <div
                    style={{
                      height: "236px",
                      overflow: "hidden",
                      borderRadius: "5px",
                    }}
                  >
                    <GoogleMapWrapper>
                      <GoogleMap center={addressGeoCode} zoom={15} />
                    </GoogleMapWrapper>
                  </div>
                </div>
              </Grid>
            </Grid>
            <DialogBox open={registrationWarning} handleClose={() => {}}>
              <div>
                <h1 className="heading">Register as vendor</h1>
                <div className="form-content">
                  <p>
                    To apply for the vendor and have many other useful features
                    to find a tender, please register on Koor.
                  </p>
                  <div style={{ textAlign: "center", lineHeight: "40px" }}>
                    <Link to="/register">
                      <OutlinedButton
                        title="Register as vendor"
                        jobSeeker
                        style={{
                          width: "100%",
                        }}
                      />
                    </Link>
                    <span>
                      Already have an account?{" "}
                      <Link
                        to={`/login?role=${USER_ROLES.vendor}`}
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
            <h2>more tenders like this:</h2>
            {tenderSuggestion.map((item, key) => {
              return (
                <p key={key}>
                  <Link
                    to={urlcat("/tender/details/:tenderId", {
                      tenderId: item.id,
                    })}
                  >
                    {item?.title}
                  </Link>
                  <span>
                    – {item?.city}, {item?.country} ${item.budgetAmount}{" "}
                  </span>
                </p>
              );
            })}
          </div>
        </div>
      </Container>
    </>
  );
}

export default TenderDetailsComponent;

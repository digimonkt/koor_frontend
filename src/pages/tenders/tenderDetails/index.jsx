import {
  Box,
  Container,
  Divider,
  Grid,
  IconButton,
  Stack,
  Link as MuiLink,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import styles from "./tenderDetails.module.css";
import { SVG } from "../../../assets/svg";
import {
  FilledButton,
  OutlinedButton,
  SearchButton,
  SolidButton,
} from "../../../components/button";
import { cleanHtmlContent } from "@utils/fileUtils";
import JobCostCard from "../../../pages/jobs/component/jobCostCard";
import { GoogleMapWrapper, GoogleMap } from "../../../components/googleMap";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  getTenderDetailsByIdAPI,
  getTenderSuggestionAPI,
  saveTenderAPI,
  unSaveTenderAPI,
  withdrawTenderApplicationAPI,
} from "../../../api/tender";
import dayjs from "dayjs";
import urlcat from "urlcat";
import { useDispatch, useSelector } from "react-redux";
import { USER_ROLES } from "../../../utils/enum";
import DialogBox, { ExpiredBox } from "../../../components/dialogBox";
import { setErrorToast, setSuccessToast } from "../../../redux/slice/toast";
import { getLetLongByAddressAPI } from "../../../api/user";
import ShareTender from "../shareTenders";
import { getJobAttachmentAPI } from "@api/job";
import { getColorByRemainingDays, getColorByRole } from "@utils/generateColor";

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
  const [expiredWarning, setExpiredWarning] = useState(false);
  const [tenderSuggestion, setTenderSuggestion] = useState([]);
  const [isSharing, setIsSharing] = useState(false);
  const [numLines, setNumLines] = useState(details?.description?.length);
  const textWrapperStyle = {
    display: "-webkit-box",
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
    textAlign: "justify",
    WebkitLineClamp: numLines,
  };

  const handleSeeMoreClick = () => {
    setNumLines((prevNumLines) =>
      prevNumLines === 3 ? details?.description?.length : 3,
    );
  };
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
    } else if (details.expiredInDays <= 0) {
      setExpiredWarning(true);
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
  const handleLoadImage = async (url) => {
    const fileType = (url) => {
      const extension = "." + url.split(".").pop().toLowerCase();
      const mimeTypes = {
        ".jpg": "image/jpeg",
        ".jpeg": "image/jpeg",
        ".png": "image/png",
        ".gif": "image/gif",
        ".pdf": "application/pdf",
      };

      return mimeTypes[extension] || "application/octet-stream";
    };

    const fileName = "attachment";
    const response = await getJobAttachmentAPI(url);

    if (response.remote === "success") {
      const base64String = response.data.base_image;
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
      a.download = fileName || "file";

      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(downloadUrl);
    }
  };
  function handleSendEmail(details) {
    const email = details.contactEmail;
    const ccEmail1 = details.cc1;
    const ccEmail2 = details.cc2;
    const subject = `Tender Application for ${details.title}`;
    const body = `Here is the my tender application for this tender \n ${window.location.href}`;
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
    getTenderDetails(params.tenderId);
    getTenderSuggestion(params.tenderId);
  }, [params.tenderId]);
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
              <Grid item xs={12} sm={6}>
                <div className={`${styles.postJob}`}>
                  <IconButton
                    disableRipple={true}
                    style={{
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
                  <p className="mb-0">{details.title}</p>
                </div>
              </Grid>
              <Grid item xs={12} sm={6}>
                <div className={`${styles.clocs}`}>
                  <SVG.ClockIconSmall />
                  <p className="mb-0 mt-0 me-1">
                    <span>Posted:</span> {dayjs(details.startDate).format("ll")}
                  </p>
                  <SolidButton
                    title={
                      details.expiredInDays > 0
                        ? `${details.expiredInDays} Days`
                        : "Expired"
                    }
                    style={{
                      marginLeft: "20px",
                      cursor: "default",
                    }}
                    color={getColorByRemainingDays(
                      details?.expiredInDays > -1 ? details?.expiredInDays : 0,
                    )}
                  />
                </div>
              </Grid>
            </Grid>
            <hr />
            <Grid container spacing={2}>
              <Grid item xs={12} lg={9} sm={7}>
                <Box className={`mb-4 ${styles.contentJob}`}>
                  <div className={`mb-4 ${styles.contentJob}`}>
                    <h4>Details :</h4>
                    <Box
                      className="job-description"
                      sx={textWrapperStyle}
                      dangerouslySetInnerHTML={{
                        __html: details?.description,
                      }}
                    ></Box>
                  </div>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {details?.description?.length > 350 && (
                      <button
                        style={{
                          border: "none",
                          cursor: "pointer",
                          background: "none",
                          color: getColorByRole(
                            !role ? USER_ROLES.employer : role,
                          ),
                        }}
                        onClick={handleSeeMoreClick}
                      >
                        {numLines === 3 ? (
                          <>
                            More <SVG.arrowDown />
                          </>
                        ) : (
                          <>
                            Less <SVG.ArrowUpIcon />
                          </>
                        )}
                      </button>
                    )}
                  </Box>
                </Box>
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
                {/* <div className={`${styles.datesatrt}`}> */}
                {/*   <span>{<SVG.StartDate />}</span> */}
                {/*   <p className="m-0 ms-2"> */}
                {/*     <span className={`${styles.startDate}`}>Start date:</span>{" "} */}
                {/*     <b className={`${styles.startB}`}> */}
                {/*       {details?.startDate */}
                {/*         ? dayjs(details.startDate).format("ll") */}
                {/*         : ""} */}
                {/*     </b> */}
                {/*   </p> */}
                {/* </div> */}
                {details.attachments.length > 0 && (
                  <div className={`${styles.downloadattachment}`}>
                    <h6>Download attachments </h6>
                    {details.attachments.map((attachment, i) => {
                      return (
                        <div key={i} className={`${styles.downloadtext}`}>
                          <span className="d-inline-flex me-2">
                            {<SVG.BlueAttach />}
                          </span>
                          <span
                            onClick={() => handleLoadImage(attachment.path)}
                            className="m-0"
                            style={{
                              cursor: "pointer",
                              whiteSpace: "normal",
                              wordBreak: "break-all",
                            }}
                          >
                            {attachment.title}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                )}
              </Grid>
              <Grid item xs={12} lg={3} sm={5}>
                <JobCostCard
                  color={getColorByRole(
                    role === "" ? USER_ROLES.employer : role,
                  )}
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
                          : [
                              <>
                                <SVG.Enable1 className="me-2" />
                              </>,
                              "Apply for the Tender",
                            ]
                      }
                      sx={{
                        padding: "10px 0px !important",
                        width: "100% !important",
                        marginBottom: "20px",
                        "@media (max-width: 480px)": {
                          fontSize: "14px !important",
                        },
                      }}
                      // className={`${styles.enablebtn}`}
                      disabled={details.isApplied && !details.isEditable}
                      onClick={() => {
                        if (details.expiredInDays > 0) {
                          if (isLoggedIn) {
                            if (details.isEditable) {
                              navigate(
                                urlcat("../tender/apply/:tenderId", {
                                  tenderId: params.tenderId,
                                  applicationId: details.application.id,
                                }),
                              );
                            } else {
                              navigate(
                                urlcat("../tender/apply/:tenderId", {
                                  tenderId: params.tenderId,
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

                    {details.isEditable && details.isApplied && isLoggedIn && (
                      <FilledButton
                        sx={{ width: "100%", marginBottom: "20px" }}
                        title="Withdraw"
                        // className={`${styles.enablebtn}`}
                        disabled={!details.isEditable}
                        onClick={() => {
                          handleWithdrawTenderApplication();
                        }}
                      />
                    )}
                    <Stack
                      direction="column"
                      spacing={{
                        xs: 1,
                        sm: 1,
                        lg: 1,
                      }}
                      alignItems="center"
                      justifyContent="center"
                    >
                      <OutlinedButton
                        title={
                          details.isSaved
                            ? "Saved"
                            : [
                                <>
                                  <SVG.BlueSaveIcon className="me-2" />
                                </>,
                                "Save Tender",
                              ]
                        }
                        sx={{
                          height: "44px",
                          width: "100%",
                        }}
                        vendor
                        onClick={() => {
                          if (details.expiredInDays > 0) {
                            if (isLoggedIn) {
                              handleSaveTender(params.tenderId);
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
                        sx={{
                          height: "44px",
                          color: getColorByRole(role),
                          border: `2px solid ${getColorByRole(role)}`,
                        }}
                        onClick={() => {
                          setIsSharing(true);
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
          {(details.isApplyThroughEmail || details.isApplyThroughWebsite) && (
            <>
              {cleanHtmlContent(details?.applicationInstruction) && (
                <div className={`${styles.LikeJob}`}>
                  <h2>Application Instructions:</h2>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: details.applicationInstruction,
                    }}
                  ></div>
                </div>
              )}
              {role === USER_ROLES.vendor || role === "" ? (
                <div className={`${styles.jobpostbtn} `}>
                  <Box
                    sx={{
                      textAlign: "start",
                      display: "flex",
                      "@media (max-width: 480px)": {
                        display: "block",
                      },
                    }}
                  >
                    {!details.isApplied && details.isApplyThroughWebsite && (
                      <OutlinedButton
                        sx={{
                          color: `${getColorByRole(
                            role === "" ? USER_ROLES.employer : role,
                          )} !important`,
                          borderColor: `${getColorByRole(
                            role === "" ? USER_ROLES.employer : role,
                          )} !important`,
                          "@media (max-width: 480px)": {
                            fontSize: "14px !important",
                            padding: "10px 22px !important",
                          },
                          "@media (max-width: 320px)": {
                            fontSize: "10px !important",
                            padding: "10px 25px !important",
                          },
                        }}
                        title={[
                          <>
                            <SVG.ArrowOutward className="me-2" />
                          </>,
                          "Apply on employer's website",
                        ]}
                        onClick={() => {
                          if (details.expiredInDays > 0) {
                            if (isLoggedIn) {
                              window.open(details.websiteLink, "_blank");
                            } else {
                              setRegistrationWarning(true);
                            }
                          } else {
                            setExpiredWarning(true);
                          }
                        }}
                      />
                    )}
                    {!details.isApplied && details.isApplyThroughEmail && (
                      <OutlinedButton
                        sx={{
                          color: `${getColorByRole(
                            role === "" ? USER_ROLES.employer : role,
                          )} !important`,
                          borderColor: `${getColorByRole(
                            role === "" ? USER_ROLES.employer : role,
                          )} !important`,
                          "@media (max-width: 480px)": {
                            fontSize: "14px !important",
                            marginTop: "20px",
                            marginLeft: "0px !important",
                          },
                          "@media (max-width: 320px)": {
                            fontSize: "10px !important",
                            padding: "10px 30px !important",
                          },
                        }}
                        title={[
                          <>
                            <SVG.ArrowOutward className="me-2" />
                          </>,
                          "Apply by email",
                        ]}
                        className="ms-3"
                        onClick={() => {
                          if (details.expiredInDays > 0) {
                            if (isLoggedIn) {
                              handleSendEmail(details);
                            } else {
                              setRegistrationWarning(true);
                            }
                          } else {
                            setExpiredWarning(true);
                          }
                        }}
                      />
                    )}
                  </Box>
                </div>
              ) : null}
              <Divider />
            </>
          )}
          <div className={`${styles.secondDiv}`}>
            <Grid container spacing={2}>
              <Grid item xs={12} lg={7} md={7}>
                <div className={`${styles.location}`}>
                  <h3 className="mb-0">Location :</h3>
                  <p>{details.address}</p>
                  <div
                    style={{
                      height: "236px",
                      overflow: "hidden",
                      borderRadius: "5px",
                      position: "relative",
                    }}
                  >
                    <GoogleMapWrapper>
                      <GoogleMap center={addressGeoCode} zoom={15} />
                    </GoogleMapWrapper>
                  </div>
                </div>
              </Grid>
            </Grid>
            <DialogBox
              open={registrationWarning}
              handleClose={() => setRegistrationWarning(false)}
            >
              <div>
                <h1 className="heading">Register as vendor</h1>
                <div className="form-content">
                  <p className="jobs_dailog_content">
                    To apply for the vendor and have many other useful features
                    to find a tender, please register on Koor.
                  </p>
                  <div
                    style={{
                      textAlign: "center",
                      lineHeight: "40px",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      width: "100%",
                    }}
                  >
                    <OutlinedButton
                      title="Register"
                      component={Link}
                      to="/register?role=vendor"
                      sx={{
                        width: "100% !important",
                        color: getColorByRole(role ?? USER_ROLES.employer),
                        fontSize: "16px !important",
                        "@media (max-width: 992px)": {
                          fontSize: "16px !important",
                        },
                        "@media (max-width: 480px)": {
                          fontSize: "14px !important",
                        },
                      }}
                    />
                    <span
                      className="jobs_dailog_login_line"
                      style={{
                        display: "flex",
                        flexdirection: "column",
                        gap: "10px",
                        justifyContent: "center",
                        width: "100%",
                      }}
                    >
                      Already have an account?{" "}
                      <MuiLink
                        component={Link}
                        to={`/login?role=${USER_ROLES.jobSeeker}`}
                        sx={{
                          textDecoration: "none",
                          color: getColorByRole(
                            !role ? USER_ROLES.employer : role,
                          ),
                          fontWeight: 600,
                        }}
                      >
                        Login
                      </MuiLink>
                    </span>
                  </div>
                </div>
              </div>
            </DialogBox>

            <ExpiredBox
              open={expiredWarning}
              handleClose={() => setExpiredWarning(false)}
            />
          </div>
          <div className={`${styles.LikeJob}`}>
            <h2>more tenders like this:</h2>
            {tenderSuggestion.map((item, key) => {
              return (
                <p key={key}>
                  <Link
                    style={{
                      color: getColorByRole(!role ? USER_ROLES.employer : role),
                    }}
                    to={urlcat("/tender/details/:tenderId", {
                      tenderId: item.id,
                    })}
                  >
                    {item?.title}
                  </Link>
                  <span>
                    {item?.city ? "- " + item.city + "," : ""}{" "}
                    {item?.city ? item?.country : "- " + item?.country}
                    {item.budgetAmount > 0 && ` $${item.budgetAmount}`}
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
        <ShareTender />
      </DialogBox>
    </>
  );
}

export default TenderDetailsComponent;

import { Avatar, Box, Chip, Grid, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { SVG } from "../../assets/svg";
import { OutlinedButton, SolidButton } from "../button";
import { ChipBox } from "./style";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import urlcat from "urlcat";
import { getColorByRemainingDays } from "../../utils/generateColor";
import { generateFileUrl } from "../../utils/generateFileUrl";
import { saveJobAPI, unSaveJobAPI } from "../../api/jobSeeker";
import { updateEmployerJobStatusAPI } from "../../api/employer";
import useMediaQuery from "@mui/material/useMediaQuery";
import { showDay } from "@utils/constants/utility";
import { USER_ROLES } from "@utils/enum";
import DialogBox from "@components/dialogBox";
function JobCard({ logo, selfJob, applied, jobDetails }) {
  const { isLoggedIn, role } = useSelector(state => state.auth);
  const navigate = useNavigate();
  const [registrationWarning, setRegistrationWarning] = useState(false);
  const [gridProps, setGridProps] = useState({});
  const [isSaved, setIsSaved] = useState(false);
  const [isStart, setIsStart] = useState(jobDetails?.status);
  const [applicationStatus, setApplicationStatus] = useState("applied");
  const handleToggleSave = async () => {
    if (isLoggedIn) {
      setIsSaved(!isSaved);
      if (!isSaved) {
        await saveJobAPI(jobDetails.id);
      } else {
        await unSaveJobAPI(jobDetails.id);
      }
    } else {
      setRegistrationWarning(true);
    }
  };
  const matches = useMediaQuery("(max-width:600px)");
  const handleStartPause = async () => {
    setIsStart(isStart === "active" ? "inactive" : "active");
    updateJob(jobDetails.id);
  };
  const updateJob = async jobId => {
    const res = await updateEmployerJobStatusAPI(jobId);
    if (res.remote === "success") {
      console.log(res);
    }
  };
  useEffect(() => {
    if (jobDetails) setIsSaved(jobDetails.isSaved);
  }, [jobDetails]);
  useEffect(() => {
    if (logo) {
      setGridProps({
        alignItems: "center",
        sx: { my: 3 },
      });
    }
  }, [logo]);
  useEffect(() => {
    if (jobDetails.isShortlisted) {
      setApplicationStatus("Shortlisted");
    }
    if (jobDetails.isRejected) {
      setApplicationStatus("Rejected");
    }
    if (jobDetails.isPlannedInterview) {
      setApplicationStatus(
        "Interview planned on " +
          dayjs(jobDetails.isPlannedInterview).format(
            "MMMM D, YYYY [at] h:mm A",
          ),
      );
    }
  }, [jobDetails]);
  return (
    <div className="job_card">
      <Grid container spacing={1.875} {...gridProps}>
        {logo && (
          <Grid
            item
            xs={12}
            sm={2}
            sx={{
              "@media (min-width: 1200px)": {
                maxWidth: "11%",
                flexBasis: "11%",
              },
            }}>
            <Stack
              direction={"row"}
              spacing={2}
              alignItems={"center"}
              justifyContent={"space-between"}>
              <div className="squer-width">
                <Avatar
                  sx={{
                    width: "100%",
                    height: "100%",
                    margin: "auto",
                    color: "#CACACA",
                    borderRadius: "0px",
                    "&.MuiAvatar-colorDefault": {
                      background: "#F0F0F0",
                    },
                  }}
                  src={generateFileUrl(jobDetails?.user?.image?.path || "")}>
                  <SVG.SuitcaseJob />
                </Avatar>
              </div>
              {matches ? (
                <Stack
                  direction="row"
                  spacing={2}
                  justifyContent={{ xs: "center", lg: "end" }}
                  alignItems="center"
                  // divider={<hr orientation="vertical" className="job_card_hr" />}
                  sx={{ minHeight: "87%" }}>
                  <div className="pricebox py-3 me-lg-4">
                    {jobDetails?.budgetAmount ? (
                      <>
                        <span className="d-block">UP TO</span>
                        <h4>
                          <small>{"$"}</small>
                          {jobDetails?.budgetAmount || "3,500"}
                        </h4>
                        <span>{jobDetails?.budgetPayPeriod}</span>
                      </>
                    ) : (
                      <h3></h3>
                    )}
                  </div>
                  {selfJob ? (
                    <div className="job-button-card">
                      <button
                        onClick={() => {
                          handleStartPause();
                        }}>
                        {isStart === "active" ? (
                          <>
                            <SVG.PauseIcon />
                            <span className="d-block">Hold</span>
                          </>
                        ) : (
                          <>
                            <SVG.StartIcon />
                            <span className="d-block">Start</span>
                          </>
                        )}
                      </button>
                      <button
                        onClick={() => {
                          if (jobDetails?.id) {
                            navigate(
                              urlcat("/employer/jobs/post", {
                                jobId: jobDetails?.id,
                              }),
                            );
                          }
                        }}>
                        {<SVG.Edit1 />}
                        <span className="d-block">Edit</span>
                      </button>
                    </div>
                  ) : isLoggedIn && role === USER_ROLES.jobSeeker ? (
                    <React.Fragment>
                      {!applied ? (
                        <div
                          onClick={handleToggleSave}
                          style={{ marginLeft: "6px", cursor: "pointer" }}>
                          <div
                            className="bookmark"
                            style={{ width: matches ? "auto" : "" }}>
                            {isSaved ? (
                              <>
                                <SVG.SaveIcon />
                                <span>Saved</span>
                              </>
                            ) : (
                              <>
                                <SVG.UnSave style={{ color: "#848484" }} />
                                <span style={{ color: "#848484" }}>Save</span>
                              </>
                            )}
                          </div>
                        </div>
                      ) : null}
                    </React.Fragment>
                  ) : (
                    ""
                  )}
                </Stack>
              ) : (
                ""
              )}
            </Stack>
          </Grid>
        )}
        <Grid
          item
          // lg={logo ? 8 : 9}
          xs={12}
          sm={7}
          sx={{
            "@media (min-width: 1200px)": {
              maxWidth: "64%",
              flexBasis: "64%",
            },
          }}>
          <div className="my-jobs">
            <h2>
              <Link to={`/jobs/details/${jobDetails?.id || "jobId"}`}>
                {jobDetails?.title}
              </Link>
              {jobDetails.isApplied ? (
                <Chip
                  color={jobDetails.isRejected ? "error" : "success"}
                  size="small"
                  label={applicationStatus}
                  sx={{
                    marginLeft: "5px",
                    textTransform: "capitalize",
                  }}
                />
              ) : null}
            </h2>
            <Box
              className="job-description card-description mt-1 mb-3"
              dangerouslySetInnerHTML={{
                __html: jobDetails.description,
              }}></Box>
            <Stack
              direction="row"
              flexWrap="wrap"
              spacing={{ xs: 2, sm: 1, md: 1 }}
              useFlexGap
              sx={{
                width: "100%",

                "@media (max-width: 992px)": {
                  overflow: "hidden",
                  overflowX: "auto",
                },
                "@media (max-width: 480px)": {
                  "& .MuiChip-root": { marginRight: "5px" },
                },
              }}
              className="job_card_chip">
              <ChipBox
                sx={{ px: 1.5 }}
                label={jobDetails?.country.title || "Dusseldorf"}
                icon={<>{<SVG.LocationIcon />}</>}
              />
              {jobDetails?.duration ? (
                <ChipBox
                  sx={{
                    "@media (max-width: 992px)": {
                      paddingLeft: "12px !important",
                      paddingRight: "12px !important",
                    },
                  }}
                  label={`${jobDetails?.duration} Months`}
                  icon={<>{<SVG.BegClock />}</>}
                />
              ) : (
                ""
              )}
              {jobDetails?.isFullTime && (
                <ChipBox
                  sx={{ marginBottom: "10px !important" }}
                  label={"Full Time"}
                  icon={<>{<SVG.MoonCircle />}</>}
                />
              )}
              {jobDetails?.isPartTime && (
                <ChipBox
                  sx={{ marginBottom: "10px !important" }}
                  label={"Part time"}
                  icon={<>{<SVG.MoonCircle />}</>}
                />
              )}
              {jobDetails?.hasContract && (
                <ChipBox label={"Contract"} icon={<>{<SVG.MoonCircle />}</>} />
              )}
            </Stack>
            <Stack
              direction="row"
              spacing={2}
              className="mt-3"
              sx={{
                "@media(max-width: 480px)": {
                  display: "block",
                },
              }}>
              {!selfJob && (
                <Stack direction="row" spacing={1}>
                  <span>
                    <SVG.BriefcaseIcon />
                  </span>{" "}
                  <div className="textdes">
                    {jobDetails.company === null &&
                    jobDetails.companyLogo === null
                      ? "Company:"
                      : "Posted By"}
                    <span>
                      {jobDetails.company === null &&
                      jobDetails.companyLogo === null
                        ? jobDetails.user.name
                        : " Koor"}
                    </span>
                  </div>
                </Stack>
              )}
              <Stack
                direction="row"
                spacing={1}
                sx={{
                  borderLeft: "1px solid #ccc",
                  paddingLeft: "15px",
                  "@media(max-width: 480px)": {
                    borderLeft: "0px",
                    paddingLeft: "0px",
                    marginLeft: "0px !important",
                    marginTop: "10px !important",
                  },
                }}>
                <span>
                  <SVG.ClockIconSmall />
                </span>{" "}
                <div className="textdes">
                  Posted At:{" "}
                  <span>{dayjs(jobDetails?.createdAt).format("ll")}</span>
                </div>
              </Stack>
            </Stack>
          </div>
        </Grid>
        <Grid
          item
          lg={logo ? 2 : 3}
          xs={12}
          sm={3}
          sx={{
            "@media (min-width: 1200px)": {
              maxWidth: "25%",
              flexBasis: "25%",
            },
          }}>
          <Box
            sx={{ display: "flex", justifyContent: "end" }}
            className="text-start text-lg-end text-sm-end mb-0 mb-lg-4">
            <SolidButton
              className={
                jobDetails?.expiredInDays > 0
                  ? "btn_font_lower"
                  : "btn_font_capitalize"
              }
              title={
                jobDetails?.expiredInDays > 0
                  ? showDay(jobDetails?.expiredInDays)
                  : "Closed"
              }
              color={getColorByRemainingDays(
                jobDetails?.expiredInDays > 0 ? jobDetails?.expiredInDays : 0,
              )}
            />
          </Box>
          <Stack
            direction="row"
            spacing={1}
            justifyContent={{ xs: "center", lg: "end", sm: "flex-end" }}
            alignItems="center"
            // divider={<hr orientation="vertical" className="job_card_hr" />}
            sx={{
              minHeight: "87%",
              "@media (max-width:768px)": {
                marginTop: "58px",
                "& .bookmark": { width: "auto", marginLeft: "0px" },
              },
              "@media (max-width:480px)": {
                marginTop: "0px",
                minHeight: "0%",
                marginBottom: "10px",
              },
            }}>
            <div className="pricebox py-3 upto-slide">
              {jobDetails?.budgetAmount ? (
                <>
                  <span className="d-block">UP TO</span>
                  <h4>
                    <small>{"$"}</small>
                    {jobDetails?.budgetAmount || "3,500"}
                  </h4>
                  <span>{jobDetails?.budgetPayPeriod}</span>
                </>
              ) : (
                ""
              )}
            </div>
            {Boolean(jobDetails?.budgetAmount) && selfJob && (
              <Box sx={{ width: "2px !important" }}>
                <Box className="hr-border"></Box>
              </Box>
            )}
            {selfJob ? (
              <Box
                className="job-button-card"
                sx={{ display: "flex", alignItems: "center" }}>
                <button
                  onClick={() => {
                    handleStartPause();
                  }}>
                  {isStart === "active" ? (
                    <>
                      <SVG.PauseIcon />
                      <span className="d-block">Hold</span>
                    </>
                  ) : (
                    <>
                      <SVG.StartIcon />
                      <span className="d-block">Start</span>
                    </>
                  )}
                </button>
                <button
                  onClick={() => {
                    if (jobDetails?.id) {
                      navigate(
                        urlcat("/employer/jobs/post", {
                          jobId: jobDetails?.id,
                        }),
                      );
                    }
                  }}>
                  {<SVG.Edit1 />}
                  <span className="d-block">Edit</span>
                </button>
              </Box>
            ) : role === USER_ROLES.jobSeeker ? (
              <React.Fragment>
                <div onClick={handleToggleSave} style={{ cursor: "pointer" }}>
                  <div className="bookmark">
                    {isSaved ? (
                      <>
                        <SVG.SaveIcon />
                        <span>Saved</span>
                      </>
                    ) : (
                      <>
                        <SVG.UnSave style={{ color: "#848484" }} />
                        <span style={{ color: "#848484" }}>Save</span>
                      </>
                    )}
                  </div>
                </div>
              </React.Fragment>
            ) : (
              ""
            )}
          </Stack>
        </Grid>
      </Grid>
      <DialogBox
        open={registrationWarning}
        handleClose={() => setRegistrationWarning(false)}>
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
                  }}>
                  Login
                </Link>
              </span>
            </div>
          </div>
        </div>
      </DialogBox>
    </div>
  );
}

export default JobCard;

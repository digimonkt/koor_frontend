import { Box, Chip, Grid, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate, Link, useLocation, useParams } from "react-router-dom";
import { SVG } from "../../assets/svg";
import { SolidButton } from "../button";
import Dialog from "./dialog";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import urlcat from "urlcat";
import { saveJobAPI, unSaveJobAPI } from "../../api/jobSeeker";
import { updateEmployerJobStatusAPI } from "../../api/employer";
import { showDay } from "@utils/constants/utility";
import { getColorByRemainingDays } from "@utils/generateColor";
import { USER_ROLES } from "@utils/enum";
import JobBadges from "./badges";
import JobButtons from "./jobButtons";
import ApplicantList from "@pages/employer/manageJobs/component/applicantList";
import Budget from "./budget";
import { ShowLessText } from "../../components/common";

function JobCard({ logo, selfJob, applied, jobDetails }) {
  const { isLoggedIn, role } = useSelector((state) => state.auth);
  const { isMobileView } = useSelector(({ platform }) => platform);
  const location = useLocation();
  const path = location.pathname;
  const pathParts = path.split("/");
  const endRouter = pathParts[pathParts.length - 1];
  const navigate = useNavigate();
  const params = useParams();
  const showingBottomDetails =
    params.type !== "jobs" &&
    params !== "job_seeker/job-feed" &&
    role !== USER_ROLES.jobSeeker &&
    params["*"] === "employer/manage-jobs";
  const [state, setState] = useState({
    searchValue: "",
    isStart: jobDetails?.status,
    applicationStatus: "applied",
    isSaved: false,
    registrationWarning: false,
  });
  const handleToggleSave = async () => {
    if (isLoggedIn) {
      setState((prev) => ({
        ...prev,
        isSaved: !prev.isSaved,
      }));
      if (!state.isSaved) {
        await saveJobAPI(jobDetails.id);
      } else {
        await unSaveJobAPI(jobDetails.id);
      }
    } else {
      setState((prev) => ({
        ...prev,
        registrationWarning: true,
      }));
    }
  };

  const handleStartPause = async () => {
    setState((prev) => ({
      ...prev,
      isStart: prev.isStart === "active" ? "inactive" : "active",
    }));
    updateJob(jobDetails.id);
  };
  const updateJob = async (jobId) => {
    await updateEmployerJobStatusAPI(jobId);
  };
  useEffect(() => {
    if (jobDetails) {
      setState((prev) => ({
        ...prev,
        isSaved: jobDetails.isSaved,
      }));
    }
  }, [jobDetails]);

  useEffect(() => {
    if (jobDetails.isShortlisted) {
      setState((prev) => ({
        ...prev,
        applicationStatus: "Shortlisted",
      }));
    }
    if (jobDetails.isRejected) {
      setState((prev) => ({
        ...prev,
        applicationStatus: "Rejected",
      }));
    }
    if (jobDetails.isPlannedInterview) {
      setState((prev) => ({
        ...prev,
        applicationStatus:
          "Interview planned on " +
          dayjs(jobDetails.isPlannedInterview).format(
            "MMMM D, YYYY [at] h:mm A"
          ),
      }));
    }
  }, [jobDetails]);
  useEffect(() => {
    setState((prev) => ({
      ...prev,
      setSearchValue: endRouter,
    }));
  }, [endRouter]);
  return (
    <div className="job_card ">
      <Grid
        justifyContent="space-between"
        sx={{ alignItems: "flex-start" }}
        container
        spacing={1.875}
      >
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
            }}
          >
            <Box
              sx={{
                display: "none",

                "@media (max-width: 480px)": {
                  display: "block",
                  "& .btn_font_lower": {
                    display: "inline-block !important",
                  },
                },
              }}
              className="text-start text-end mb-0 mb-lg-4"
            >
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
                  jobDetails?.expiredInDays > 0 ? jobDetails?.expiredInDays : 0
                )}
              />
            </Box>
            <JobButtons
              jobDetails={jobDetails}
              isStart={state.isStart}
              selfJob={selfJob}
              isLoggedIn={isLoggedIn}
              isSaved={state.isSaved}
              isApplied={applied}
              handleSave={handleToggleSave}
            />
          </Grid>
        )}
        <Grid
          item
          lg={logo ? 8 : 7}
          xs={12}
          sm={7}
          sx={{
            "@media (min-width: 1200px)": {
              maxWidth: "64%",
              flexBasis: "64%",
            },
          }}
        >
          <div className="my-jobs">
            <h2 style={{ marginBottom: "8px" }}>
              <Link to={`/jobs/details/${jobDetails?.slug}`}>
                {jobDetails?.title}
              </Link>
              {jobDetails.isApplied ? (
                <Chip
                  color={jobDetails.isRejected ? "error" : "success"}
                  size="small"
                  label={state.applicationStatus}
                  sx={{
                    marginLeft: "5px",
                    textTransform: "capitalize",
                    "@media (max-width: 480px)": {
                      marginLeft: "2px",
                    },
                  }}
                />
              ) : null}
            </h2>
            <Box>
              <ShowLessText item={jobDetails.description} />
            </Box>
            <JobBadges jobDetails={jobDetails} />
            <Stack
              direction="row"
              spacing={2}
              className="mt-3"
              sx={{
                "@media(max-width: 480px)": {
                  display: "block",
                },
              }}
            >
              {!selfJob && (
                <Stack direction="row" spacing={1}>
                  <span>
                    <SVG.BriefcaseIcon />
                  </span>{" "}
                  <div className="textdes">
                    Institution:{" "}
                    <span>
                      {!jobDetails.company
                        ? jobDetails.user.name
                        : jobDetails.company}
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
                }}
              >
                <span>
                  <SVG.ClockIconSmall />
                </span>{" "}
                <div className="textdes">
                  Posted At:{" "}
                  <span>{dayjs(jobDetails?.startDate).format("ll")}</span>
                </div>
              </Stack>
            </Stack>
          </div>
        </Grid>
        <Grid
          item
          lg={logo ? 2 : 5}
          xs={12}
          sm={logo ? 3 : 5}
          sx={{
            "@media (min-width: 1200px)": {
              maxWidth: "25%",
              flexBasis: "25%",
            },
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "end",
              "@media (max-width: 480px)": { display: "none" },
            }}
            className="text-start text-lg-end text-sm-end mb-0 mb-lg-4"
          >
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
                jobDetails?.expiredInDays > 0 ? jobDetails?.expiredInDays : 0
              )}
            />
          </Box>
          <Stack
            direction="row"
            spacing={1}
            justifyContent={{ xs: "center", lg: "end", sm: "end" }}
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
            }}
          >
            {showingBottomDetails && (
              <Box className="pricebox py-3 upto-slide">
                <Budget
                  budgetAmount={jobDetails?.budgetAmount}
                  budgetPayPeriod={jobDetails?.budgetPayPeriod}
                />
              </Box>
            )}
            {isMobileView && showingBottomDetails && (
              <ApplicantList
                jobId={jobDetails.id}
                totalApplications={jobDetails.applicantCount}
              />
            )}
            {Boolean(jobDetails?.budgetAmount) && selfJob && (
              <Box sx={{ width: "2px !important" }}>
                <Box className="hr-border"></Box>
              </Box>
            )}
            {selfJob ? (
              <Box
                className="job-button-card"
                sx={{ display: "flex", alignItems: "center" }}
              >
                <button
                  onClick={() => {
                    handleStartPause();
                  }}
                >
                  {state.isStart === "active" ? (
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
                        })
                      );
                    }
                  }}
                >
                  {<SVG.Edit1 />}
                  <span className="d-block">Edit</span>
                </button>
              </Box>
            ) : isLoggedIn && role === USER_ROLES.jobSeeker ? (
              <React.Fragment>
                <div onClick={handleToggleSave} style={{ cursor: "pointer" }}>
                  <Box
                    className="bookmark"
                    sx={{ "@media (max-width: 480px)": { display: "none" } }}
                  >
                    {state.isSaved ? (
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
                  </Box>
                </div>
              </React.Fragment>
            ) : (
              ""
            )}
          </Stack>
        </Grid>
      </Grid>
      <Dialog open={state.registrationWarning} setOpen={setState} />
    </div>
  );
}

export default JobCard;

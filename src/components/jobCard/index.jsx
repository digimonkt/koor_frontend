import { Avatar, Chip, Grid, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { SVG } from "@assets/svg";
import { SolidButton } from "../button";
import { ChipBox } from "./style";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import urlcat from "urlcat";
import { getColorByRemainingDays } from "@utils/generateColor";
import { generateFileUrl } from "@utils/generateFileUrl";
import { saveJobAPI, unSaveJobAPI } from "@api/jobSeeker";
import { updateEmployerJobStatusAPI } from "@api/employer";
function JobCard({ logo, selfJob, applied, jobDetails }) {
  const { isLoggedIn, role } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [gridProps, setGridProps] = useState({});
  const [isSaved, setIsSaved] = useState(false);
  const [isStart, setIsStart] = useState(jobDetails?.status);
  const [applicationStatus, setApplicationStatus] = useState("applied");
  const handleToggleSave = async () => {
    setIsSaved(!isSaved);
    if (!isSaved) {
      await saveJobAPI(jobDetails.id);
    } else {
      await unSaveJobAPI(jobDetails.id);
    }
  };

  const handleStartPause = async () => {
    setIsStart(isStart === "active" ? "inactive" : "active");
    updateJob(jobDetails.id);
  };
  const updateJob = async (jobId) => {
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
            "MMMM D, YYYY [at] h:mm A"
          )
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
                maxWidth: "10.555%",
                flexBasis: "10.555%",
              },
            }}
          >
            <div className="squer-width">
              <Avatar
                sx={{
                  width: "100%",
                  height: "100%",
                  margin: "auto",
                  color: "#CACACA",
                  "&.MuiAvatar-colorDefault": {
                    background: "#F0F0F0",
                  },
                }}
                src={generateFileUrl(jobDetails?.user?.image?.path || "")}
              >
                <SVG.SuitcaseJob />
              </Avatar>
            </div>
          </Grid>
        )}
        <Grid
          item
          // lg={logo ? 8 : 9}
          xs={12}
          sm={8}
          sx={{
            "@media (min-width: 1200px)": {
              maxWidth: "72%",
              flexBasis: "72%",
            },
          }}
        >
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
            <p className="job-description card-description mt-1 mb-3">
              {jobDetails?.description}
            </p>
            <Stack
              direction="row"
              spacing={{ xs: 1, sm: 1, md: 1 }}
              sx={{
                width: "100%",
                "@media (max-width: 992px)": {
                  flexWrap: "wrap",
                },
                "@media (max-width: 480px)": {
                  flexWrap: "wrap",
                },
              }}
              className="job_card_chip"
            >
              <ChipBox
                sx={{ marginBottom: "10px" }}
                label={jobDetails?.country.title || "Dusseldorf"}
                icon={<>{<SVG.LocationIcon />}</>}
              />
              {jobDetails?.duration ? (
                <ChipBox
                  sx={{ marginBottom: "10px !important" }}
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
              }}
            >
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
                }}
              >
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
        <Grid item lg={logo ? 2 : 3} xs={12} sm={4}>
          <div className="text-end mb-4 text-start">
            <SolidButton
              style={{ textTransform: "lowercase", cursor: "default" }}
              title={
                jobDetails?.expiredInDays > -1
                  ? `${jobDetails?.expiredInDays} days left`
                  : "Expired"
              }
              color={getColorByRemainingDays(
                jobDetails?.expiredInDays > -1 ? jobDetails?.expiredInDays : -1
              )}
            />
          </div>
          <Stack
            direction="row"
            spacing={2}
            justifyContent={{ xs: "center", lg: "end" }}
            alignItems="center"
            divider={<hr orientation="vertical" className="job_card_hr" />}
            sx={{ minHeight: "87%" }}
          >
            <div className="pricebox py-3 me-4">
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
                <h3>-</h3>
              )}
            </div>
            {selfJob ? (
              <div className="job-button-card">
                <button
                  onClick={() => {
                    handleStartPause();
                  }}
                >
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
                        urlcat("/employer/jobs/post", { jobId: jobDetails?.id })
                      );
                    }
                  }}
                >
                  {<SVG.Edit1 />}
                  <span className="d-block">Edit</span>
                </button>
              </div>
            ) : isLoggedIn && role === "job_seeker" ? (
              <React.Fragment>
                {!applied ? (
                  <div
                    onClick={handleToggleSave}
                    style={{ marginLeft: "6px", cursor: "pointer" }}
                  >
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
                ) : null}
              </React.Fragment>
            ) : (
              ""
            )}
          </Stack>
        </Grid>
      </Grid>
    </div>
  );
}

export default JobCard;

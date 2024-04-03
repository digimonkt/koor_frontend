import { getConversationIdByUserIdAPI } from "../../api/chat";
import { changeApplicationStatusAPI } from "../../api/employer";
import { changeTenderApplicationStatusAPI } from "../../api/tender";
import { SVG } from "../../assets/svg";
import { FilledButton, OutlinedButton } from "../../components/button";
import DialogBox from "../../components/dialogBox";
import { LabeledInput } from "../../components/input";
import LabeledRadioInputComponent from "../../components/input/labeledRadioInput";
import Loader from "../../components/loader";
import { Avatar, Box, Button, Grid } from "@mui/material";
import {
  setTotalApplicationsByJob,
  setTotalApplicationsByTender,
  setTotalBlacklist,
} from "../../redux/slice/employer";
import { setErrorToast, setSuccessToast } from "../../redux/slice/toast";
import { BLACKLIST_REASON_LIST } from "../../utils/constants/constants";
import { JOB_APPLICATION_OPTIONS, USER_ROLES } from "../../utils/enum";
import { generateFileUrl } from "../../utils/generateFileUrl";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import urlcat from "urlcat";
import "./style.css";
import dayjs from "dayjs";
function ApplicationOptions({
  details,
  interviewPlanned,
  shortlist,
  reject,
  blacklist,
  view,
  message,
  applicationList,
  handleOpenList,
  isApplicationSelect,
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [param] = useSearchParams();
  const conversionId = param.get("conversion");
  const { totalBlacklist, totalApplicationsByJob, totalApplicationsByTender } =
    useSelector((state) => state.employer);
  const {
    auth: { role },
  } = useSelector((state) => state);
  const [isInterviewPlanned, setIsInterviewPlanned] = useState(false);
  const [isBlacklisted, setIsBlacklisted] = useState(false);
  const [isRejected, setIsRejected] = useState(false);
  const [isShortlisted, setIsShortlisted] = useState(false);

  const [blackListReason, setBlackListReason] = useState("");
  const [invalidPlannedInterviewAlert, setInvalidPlannedInterviewAlert] =
    useState("");
  const [isInterviewPlanning, setIsInterviewPlanning] = useState(false);
  const [interviewTime, setInterviewTime] = useState("");
  const [isBlacklisting, setIsBlacklisting] = useState(false);
  const [loading, setLoading] = useState(false);
  const [applicationShortlistStatus, setApplicationShortlistStatus] = useState(
    details.shortlistedAt,
  );
  const handleMessageClick = async () => {
    const res = await getConversationIdByUserIdAPI({
      userId: details?.user?.id,
    });
    if (res.remote === "success") {
      const conversationId = res.data.conversation_id;
      navigate(
        urlcat("/employer/chat", {
          conversion: conversationId,
          userId: details?.user?.id,
        }),
      );
    }
  };
  const handlerChangeApplicationStatus = async (action) => {
    const data = { reason: blackListReason, interview_at: interviewTime };
    for (const key in data) {
      if (!data[key]) {
        delete data[key];
      }
    }

    let applicationStatus = {};
    const applicationsStatusCount = details?.job
      ? totalApplicationsByJob?.data
        ? totalApplicationsByJob?.data[details?.job?.id]
        : ""
      : totalApplicationsByTender?.data[details?.tender?.id];
    switch (action) {
      case JOB_APPLICATION_OPTIONS.blacklisted:
        // setIsBlacklisted(true);
        break;
      case JOB_APPLICATION_OPTIONS.plannedInterviews:
        setIsInterviewPlanned(true);
        applicationStatus = {
          shortlisted: applicationShortlistStatus
            ? applicationsStatusCount.shortlisted - 1
            : applicationsStatusCount.shortlisted,
          rejected: applicationsStatusCount.rejected,
          plannedInterview: applicationsStatusCount.plannedInterview + 1,
        };
        break;
      case JOB_APPLICATION_OPTIONS.rejected:
        setIsRejected(true);
        applicationStatus = {
          shortlisted: applicationsStatusCount.shortlisted,
          rejected: applicationsStatusCount.rejected + 1,
          plannedInterview: applicationsStatusCount.plannedInterview,
        };
        break;
      case JOB_APPLICATION_OPTIONS.shortlisted:
        setIsShortlisted(true);
        setApplicationShortlistStatus(
          !details.shortlistedAt ? true : details.shortlistedAt,
        );
        applicationStatus = {
          shortlisted: applicationsStatusCount.shortlisted + 1,
          rejected: applicationsStatusCount.rejected,
          plannedInterview: applicationsStatusCount.plannedInterview,
        };
        break;
      default:
        return;
    }
    if (details.job && action !== JOB_APPLICATION_OPTIONS.blacklisted) {
      dispatch(
        setTotalApplicationsByJob({
          jobId: details.job.id,
          data: applicationStatus,
        }),
      );
    } else if (
      details.tender &&
      action !== JOB_APPLICATION_OPTIONS.blacklisted
    ) {
      dispatch(
        setTotalApplicationsByTender({
          tenderId: details.tender.id,
          data: applicationStatus,
        }),
      );
    }
    setLoading(true);
    let res;
    if (details.job) {
      res = await changeApplicationStatusAPI({
        action,
        applicationId: details.id,
        data,
      });
    } else {
      res = await changeTenderApplicationStatusAPI({
        action,
        applicationId: details.id,
        data,
      });
    }
    if (res.remote === "success") {
      dispatch(setSuccessToast("Status updated successfully"));
      setLoading(false);
      if (action === JOB_APPLICATION_OPTIONS.blacklisted) {
        dispatch(setTotalBlacklist(totalBlacklist + 1));
        setIsBlacklisting(false);
        setIsBlacklisted(true);
      }
    } else {
      dispatch(setErrorToast(res.error.errors.message));
    }
    setIsInterviewPlanning(false);
  };

  useEffect(() => {
    setIsInterviewPlanned(!!details.interviewAt);
    setIsBlacklisted(!!details.user.isBlacklisted);
    setIsRejected(!!details.rejectedAt);
    setIsShortlisted(!!details.shortlistedAt);
  }, [details]);
  return (
    <Box sx={{ width: "100%" }}>
      <Grid
        container
        spacing={0}
        flexWrap={{ xs: "wrap", lg: "nowrap" }}
        useflexgap="true"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: { xs: "center", lg: "end" },
        }}
      >
        {applicationList &&
          applicationList.length > 1 &&
          role === USER_ROLES.employer && (
            <>
              <Grid item className="me-0 me-lg-3">
                <Button
                  className="buttonbox"
                  sx={{ minWidth: "auto" }}
                  fullWidth
                  onClick={() => handleOpenList(true)}
                  style={{
                    fontWeight: 700,
                  }}
                >
                  <div>
                    <SVG.HamburgerMenu className="application-option-icon" />
                    <span>{"Applications"}</span>
                  </div>
                </Button>
              </Grid>
              <Grid item>
                <Button
                  className="buttonbox"
                  sx={{ minWidth: "auto" }}
                  fullWidth
                  disabled={
                    (isInterviewPlanned && !isApplicationSelect) ||
                    isBlacklisted ||
                    isRejected
                  }
                  style={{
                    fontWeight: isInterviewPlanned ? 700 : "",
                  }}
                  onClick={() => {
                    if (
                      !isApplicationSelect &&
                      applicationList &&
                      applicationList.length > 1
                    ) {
                      handleOpenList(true);
                    } else if (details.id) {
                      setInvalidPlannedInterviewAlert("");
                      setIsInterviewPlanning(true);
                    } else {
                      dispatch(setErrorToast("No Application Found"));
                    }
                  }}
                >
                  <div>
                    <SVG.EventIcon className="application-option-icon" />
                    <span>
                      {!isInterviewPlanned
                        ? "Plan Interview"
                        : "Interview Planned"}
                    </span>
                  </div>
                </Button>
              </Grid>
              <Grid item className="me-0 me-lg-3">
                <Button
                  className="buttonbox"
                  sx={{ minWidth: "auto" }}
                  disabled={
                    isInterviewPlanned ||
                    isBlacklisted ||
                    isRejected ||
                    isShortlisted
                  }
                  style={{
                    fontWeight: isShortlisted ? 700 : "",
                  }}
                  onClick={() => {
                    if (details.id) {
                      handlerChangeApplicationStatus(
                        JOB_APPLICATION_OPTIONS.shortlisted,
                      );
                    } else {
                      dispatch(setErrorToast("No Application Found"));
                    }
                  }}
                >
                  <div>
                    <SVG.StarIcon className="application-option-icon" />
                    <span>{!isShortlisted ? "Shortlist" : "Shortlisted"}</span>
                  </div>
                </Button>
              </Grid>
            </>
          )}

        {!conversionId && interviewPlanned && !details.tender && (
          <Grid item>
            <Button
              className="buttonbox"
              sx={{ minWidth: "auto" }}
              fullWidth
              disabled={
                (isInterviewPlanned && !isApplicationSelect) ||
                isBlacklisted ||
                isRejected
              }
              style={{
                fontWeight: isInterviewPlanned ? 700 : "",
              }}
              onClick={() => {
                if (
                  !isApplicationSelect &&
                  applicationList &&
                  applicationList.length > 1
                ) {
                  handleOpenList(true);
                } else if (details.id) {
                  setInvalidPlannedInterviewAlert("");
                  setIsInterviewPlanning(true);
                } else {
                  dispatch(setErrorToast("No Application Found"));
                }
              }}
            >
              <div>
                <SVG.EventIcon className="application-option-icon" />
                <span>
                  {!isInterviewPlanned ? "Plan Interview" : "Interview Planned"}
                </span>
              </div>
            </Button>
          </Grid>
        )}
        {!conversionId && shortlist && (
          <Grid item className="me-0 me-lg-3">
            <Button
              className="buttonbox"
              sx={{ minWidth: "auto" }}
              disabled={
                isInterviewPlanned ||
                isBlacklisted ||
                isRejected ||
                isShortlisted
              }
              style={{
                fontWeight: isShortlisted ? 700 : "",
              }}
              onClick={() => {
                if (details.id) {
                  handlerChangeApplicationStatus(
                    JOB_APPLICATION_OPTIONS.shortlisted,
                  );
                } else {
                  dispatch(setErrorToast("No Application Found"));
                }
              }}
            >
              <div>
                <SVG.StarIcon className="application-option-icon" />
                <span>{!isShortlisted ? "Shortlist" : "Shortlisted"}</span>
              </div>
            </Button>
          </Grid>
        )}
        {reject && (
          <Grid item className="me-0 me-lg-3">
            <Button
              sx={{ minWidth: "auto" }}
              className="buttonbox"
              variant="link"
              disabled={
                isInterviewPlanned ||
                isBlacklisted ||
                isRejected ||
                isShortlisted
              }
              style={{
                fontWeight: isRejected ? 700 : "",
              }}
              onClick={() =>
                handlerChangeApplicationStatus(JOB_APPLICATION_OPTIONS.rejected)
              }
            >
              <div>
                <SVG.RejectIcon className="application-option-icon" />
                <span> {!isRejected ? "Reject" : "Rejected"}</span>
              </div>
            </Button>
          </Grid>
        )}
        {blacklist && (
          <Grid item className="me-0 me-lg-3">
            <Button
              className="buttonbox"
              sx={{
                minWidth: "auto",
                "& svg": { width: "20px", height: "20px" },
              }}
              variant="link"
              disabled={
                isInterviewPlanned ||
                isBlacklisted ||
                isRejected ||
                isShortlisted
              }
              style={{
                fontWeight: isBlacklisted ? 700 : "",
              }}
              onClick={() => {
                setIsBlacklisting(true);
                // handlerChangeApplicationStatus(JOB_APPLICATION_OPTIONS.blacklisted);
              }}
            >
              <div>
                <SVG.BlockedIcon className="application-option-icon" />
                <span>{!isBlacklisted ? "Blacklist" : "Blacklisted"}</span>
              </div>
            </Button>
          </Grid>
        )}
        {view && (
          <Grid item className="me-0 me-lg-3">
            <Button
              className="buttonbox"
              sx={{
                color: role === USER_ROLES.jobSeeker ? "#eea23d" : "#274593",
                minWidth: "auto",
                "& svg": { width: "20px", height: "20px" },
              }}
              variant="link"
              onClick={() => {
                if (details.job) {
                  navigate(
                    urlcat(
                      "/:role/manage-jobs/:jobId/applicant-details/:applicationId",
                      {
                        applicationId: details.id,
                        role: USER_ROLES.employer,
                        jobId: details.job.id,
                      },
                    ),
                  );
                } else if (details.tender) {
                  navigate(
                    urlcat(
                      "/:role/manage-tenders/:tenderId/applicant-details/:applicationId",
                      {
                        applicationId: details.id,
                        role: USER_ROLES.employer,
                        tenderId: details.tender.id,
                      },
                    ),
                  );
                } else {
                  navigate(
                    urlcat("/:role/:userId/profile", {
                      userId: details.user.id,
                      role: details.user.role.replace("_", "-"),
                    }),
                  );
                }
              }}
            >
              <div>
                <SVG.OpenNewIcon className="application-option-icon" />
                <span>View</span>
              </div>
            </Button>
          </Grid>
        )}
        {message && (
          <Grid item className="me-0 me-lg-3">
            <OutlinedButton
              style={{
                display: "flex",
                gap: "8px",
                padding: "20px !important",
              }}
              title={
                <>
                  <SVG.MessageIcon
                    style={{ color: "#274593" }}
                    className="application-option-icon"
                  />
                  <span style={{ fontSize: "12px", marginLeft: "10px" }}>
                    Message
                  </span>
                </>
              }
              variant="link"
              onClick={handleMessageClick}
            />
          </Grid>
        )}
      </Grid>
      <DialogBox
        open={isBlacklisting}
        handleClose={() => setIsBlacklisting(false)}
      >
        <Box className="manage_job_black_pop">
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "28px",
              fontWeight: 600,
              color: "#121212",
              "@media (max-width: 992px)": {
                fontSize: "24px",
              },
              "@media (max-width: 480px)": {
                fontSize: "20px",
              },
            }}
          >
            <div
              style={{
                marginRight: "15px",
              }}
            >
              Blacklist{" "}
            </div>
            <div>
              <Avatar
                src={generateFileUrl(details.user?.image?.path || "")}
                sx={{
                  width: "40px",
                  height: "40px",
                  position: "relative",
                  background: "white",
                }}
              />{" "}
            </div>
            <div
              style={{
                marginLeft: "15px",
                wordBreak: "break-all",
              }}
            >
              {details.user.name || details.user.email}
            </div>
          </Box>

          <p>
            Are you sure you want to blacklist{" "}
            {details.user.name || details.user.email}? They will not be able to
            apply for your jobs anymore until you un-blacklist them.
          </p>
          <div className="dialog-reason">
            <LabeledRadioInputComponent
              title="Select reason: "
              options={BLACKLIST_REASON_LIST}
              onChange={(e) => setBlackListReason(e.target.value)}
              value={blackListReason}
              sx={{
                "& .MuiFormControlLabel-root .Mui-checked ~ .MuiTypography-root":
                  { fontWeight: 500 },
                display: "flex",
                flexDirection: "column",
                color: "black",
                fontWeight: "500",
              }}
            />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <OutlinedButton
              title="Block the user"
              onClick={() =>
                handlerChangeApplicationStatus(
                  JOB_APPLICATION_OPTIONS.blacklisted,
                )
              }
            />
          </div>
        </Box>
      </DialogBox>
      <DialogBox
        open={isInterviewPlanning}
        handleClose={() => setIsInterviewPlanning(false)}
      >
        <div>
          <h3>Plan this Interview</h3>
          <div className="dialog-reason dialog-reason-plan-inter">
            <LabeledInput
              type="datetime-local"
              onChange={(e) => {
                setInterviewTime(e.target.value);
                setInvalidPlannedInterviewAlert("");
              }}
              value={interviewTime}
              min={dayjs().format("YYYY-MM-DDTHH:mm")}
            />
          </div>
          <div style={{ color: "red" }}>{invalidPlannedInterviewAlert}</div>
          <div className="dialog-reverse">
            <FilledButton
              title={loading ? <Loader loading={loading} /> : "submit"}
              disabled={loading}
              onClick={() => {
                if (interviewTime) {
                  setInvalidPlannedInterviewAlert("");
                  handlerChangeApplicationStatus(
                    JOB_APPLICATION_OPTIONS.plannedInterviews,
                  );
                } else {
                  setInvalidPlannedInterviewAlert(
                    "Please select date and time",
                  );
                }
              }}
              sx={{ marginTop: "20px" }}
            />
          </div>
        </div>
      </DialogBox>
    </Box>
  );
}

export default ApplicationOptions;

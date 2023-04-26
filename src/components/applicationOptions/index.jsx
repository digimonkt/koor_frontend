import { changeApplicationStatusAPI } from "@api/employer";
import { SVG } from "@assets/svg";
import { Button } from "@mui/material";
import { JOB_APPLICATION_OPTIONS, USER_ROLES } from "@utils/enum";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import urlcat from "urlcat";
import "./style.css";
import DialogBox from "@components/dialogBox";
import { LabeledInput } from "@components/input";
import { FilledButton } from "@components/button";
import { setSuccessToast } from "@redux/slice/toast";
import { useDispatch } from "react-redux";
function ApplicationOptions({
  allOptions,
  applicationId,
  isShortlisted,
  jobId,
  isRejected,
  isBlacklisted,
  isInterviewPlanned,
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [shortlist, setShortlist] = useState(false);
  const [rejected, setRejected] = useState(false);
  const [blacklisted, setBlacklisted] = useState(false);
  const [interviewPlanned, setInterviewPlanned] = useState(false);
  const [isBlacklisting, setIsBlacklisting] = useState(false);
  const [blackListReason, setBlackListReason] = useState("");
  const [isInterviewPlanning, setIsInterviewPlanning] = useState(false);
  const [interviewTime, setInterviewTime] = useState("");
  useEffect(() => {
    setShortlist(!!isShortlisted);
    setRejected(!!isRejected);
    setBlacklisted(!!isBlacklisted);
    setInterviewPlanned(!!isInterviewPlanned);
  }, [isShortlisted]);
  const handlerChangeApplicationStatus = async (action, applicationId) => {
    const data = { reason: blackListReason, interview_at: interviewTime };
    for (const key in data) {
      if (!data[key]) {
        delete data[key];
      }
    }
    const res = await changeApplicationStatusAPI({
      action,
      applicationId,
      data,
    });
    if (res.remote === "success") {
      dispatch(setSuccessToast("Status updated successfully"));
      setShortlist(true);
      setIsInterviewPlanning(false);
      if (action === "blacklisted") {
        setIsBlacklisting(false);
      }
    }
  };
  return (
    <>
      {allOptions && (
        <Button
          disabled={shortlist || rejected || blacklisted || interviewPlanned}
          variant="link"
          onClick={() => {
            setIsInterviewPlanning(true);
          }}
        >
          {<SVG.EventIcon className="application-option-icon" />}{" "}
          <span>Interview planned</span>
        </Button>
      )}
      <Button
        disabled={shortlist || rejected || blacklisted || interviewPlanned}
        variant="link"
        onClick={() =>
          handlerChangeApplicationStatus(
            JOB_APPLICATION_OPTIONS.shortlisted,
            applicationId
          )
        }
      >
        {<SVG.StarIcon className="application-option-icon" />}{" "}
        <span>{shortlist ? "Shortlisted" : "Shortlist"}</span>
      </Button>
      {allOptions && (
        <>
          <Button
            variant="link"
            disabled={shortlist || rejected || blacklisted || interviewPlanned}
            onClick={() =>
              handlerChangeApplicationStatus(
                JOB_APPLICATION_OPTIONS.rejected,
                applicationId
              )
            }
          >
            {<SVG.RejectIcon className="application-option-icon" />}{" "}
            <span>{rejected ? "Rejected" : "Reject"}</span>
          </Button>
          <Button
            variant="link"
            disabled={shortlist || rejected || blacklisted || interviewPlanned}
            className="application-option-btn"
            onClick={() => {
              setIsBlacklisting(true);
              // handlerChangeApplicationStatus(
              //   JOB_APPLICATION_OPTIONS.blacklisted,
              //   applicationId
              // );
            }}
          >
            {<SVG.BlockedIcon className="application-option-icon" />}{" "}
            <span>{blacklisted ? "Blacklisted" : "Blacklist"}</span>
          </Button>
        </>
      )}
      {location.pathname.includes("applicant") ? null : (
        <Button
          variant="link"
          onClick={() => {
            navigate(
              urlcat(
                "/:role/manage-jobs/:jobId/applicant-details/:applicationId",
                {
                  applicationId: applicationId || "applicationId",
                  role: USER_ROLES.employer,
                  jobId: jobId || "jobId",
                }
              )
            );
          }}
        >
          <SVG.OpenNewIcon className="application-option-icon" />
          <span>View</span>
        </Button>
      )}
      {allOptions && (
        <Button variant="link">
          {
            <SVG.MessageIcon
              style={{ color: "#274593" }}
              className="application-option-icon"
            />
          }{" "}
          <span>Message</span>
        </Button>
      )}
      <DialogBox
        open={isBlacklisting}
        handleClose={() => setIsBlacklisting(false)}
      >
        <div>
          <h3>Are you sure you want to blacklist this applicant?</h3>
          <div className="dialog-reason">
            <LabeledInput
              type="textarea"
              placeholder="Enter your reason"
              limit={250}
              onChange={(e) => setBlackListReason(e.target.value)}
              value={blackListReason}
            />
          </div>
          <div className="dialog-reverse">
            <FilledButton
              title="Blacklist"
              onClick={() =>
                handlerChangeApplicationStatus(
                  JOB_APPLICATION_OPTIONS.blacklisted,
                  applicationId
                )
              }
            />
          </div>
        </div>
      </DialogBox>
      <DialogBox
        open={isInterviewPlanning}
        handleClose={() => setIsInterviewPlanning(false)}
      >
        <div>
          <h3>Plan this Interview</h3>
          <div className="dialog-reason">
            <LabeledInput
              type="datetime-local"
              onChange={(e) => setInterviewTime(e.target.value)}
              value={interviewTime}
            />
          </div>
          <div className="dialog-reverse">
            <FilledButton
              title="submit"
              onClick={() =>
                handlerChangeApplicationStatus(
                  JOB_APPLICATION_OPTIONS.plannedInterviews,
                  applicationId
                )
              }
            />
          </div>
        </div>
      </DialogBox>
    </>
  );
}

export default ApplicationOptions;

import { changeApplicationStatusAPI } from "@api/employer";
import { SVG } from "@assets/svg";
import { Avatar, Box, Button } from "@mui/material";
import { JOB_APPLICATION_OPTIONS, USER_ROLES } from "@utils/enum";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import urlcat from "urlcat";
import "./style.css";
import DialogBox from "@components/dialogBox";
import { LabeledInput } from "@components/input";
import { FilledButton, OutlinedButton } from "@components/button";
import { setSuccessToast } from "@redux/slice/toast";
import { useDispatch, useSelector } from "react-redux";
import Loader from "@components/loader";
import LabeledRadioInputComponent from "@components/input/labeledRadioInput";
import { generateFileUrl } from "@utils/generateFileUrl";
import { BLACKLIST_REASON_LIST } from "@utils/constants/constants";
import { setTotalBlacklist } from "@redux/slice/employer";

function ApplicationOptions({
  allOptions,
  applicationId,
  isShortlisted,
  jobId,
  tenderId,
  isRejected,
  isBlacklisted,
  isInterviewPlanned,
  userImage,
  userName,
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
  const [loading, setLoading] = useState(false);
  const { totalBlacklist } = useSelector((state) => state.employer);
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
    setLoading(true);
    const res = await changeApplicationStatusAPI({
      action,
      applicationId,
      data,
    });
    if (res.remote === "success") {
      dispatch(setSuccessToast("Status updated successfully"));
      setShortlist(true);
      setLoading(false);
      setIsInterviewPlanning(false);
      if (action === "blacklisted") {
        dispatch(setTotalBlacklist(totalBlacklist + 1));
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
            if (tenderId) {
              navigate(
                urlcat(
                  "/:role/manage-tender/:tenderId/applicant-details/:applicationId",
                  {
                    applicationId: applicationId || "applicationId",
                    role: USER_ROLES.employer,
                    tenderId: tenderId || "tenderId",
                  }
                )
              );
            } else {
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
            }
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
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "28px",
              fontWeight: 700,
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
                src={generateFileUrl(userImage)}
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
              }}
            >
              {userName}
            </div>
          </Box>

          <p>
            Are you sure you want to blacklist {userName}? They will not be able
            to apply for your jobs anymore until you un-blacklist them.
          </p>
          <div className="dialog-reason">
            <LabeledRadioInputComponent
              title="Select Reason: "
              options={BLACKLIST_REASON_LIST}
              onChange={(e) => setBlackListReason(e.target.value)}
              value={blackListReason}
              style={{
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
              title={loading ? <Loader loading={loading} /> : "submit"}
              disabled={loading}
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

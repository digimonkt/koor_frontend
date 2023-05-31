import { changeApplicationStatusAPI } from "@api/employer";
import { changeTenderApplicationStatusAPI } from "@api/tender";
import { SVG } from "@assets/svg";
import { FilledButton, OutlinedButton } from "@components/button";
import DialogBox from "@components/dialogBox";
import { LabeledInput } from "@components/input";
import LabeledRadioInputComponent from "@components/input/labeledRadioInput";
import Loader from "@components/loader";
import { Avatar, Box, Button } from "@mui/material";
import { setTotalBlacklist } from "@redux/slice/employer";
import { setSuccessToast } from "@redux/slice/toast";
import { BLACKLIST_REASON_LIST } from "@utils/constants/constants";
import { JOB_APPLICATION_OPTIONS, USER_ROLES } from "@utils/enum";
import { generateFileUrl } from "@utils/generateFileUrl";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import urlcat from "urlcat";

function ApplicationOptions({
  details,
  interviewPlanned,
  shortlist,
  reject,
  blacklist,
  view,
  message,
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { totalBlacklist } = useSelector((state) => state.employer);
  const [isDisabledActions, setIsDisabledActions] = useState(false);
  const [isInterviewPlanned, setIsInterviewPlanned] = useState(false);
  const [isBlacklisted, setIsBlacklisted] = useState(false);
  const [isRejected, setIsRejected] = useState(false);
  const [isShortlisted, setIsShortlisted] = useState(false);

  const [blackListReason, setBlackListReason] = useState("");
  const [isInterviewPlanning, setIsInterviewPlanning] = useState(false);
  const [interviewTime, setInterviewTime] = useState("");
  const [isBlacklisting, setIsBlacklisting] = useState(false);
  const [loading, setLoading] = useState(false);

  const handlerChangeApplicationStatus = async (action) => {
    const data = { reason: blackListReason, interview_at: interviewTime };
    for (const key in data) {
      if (!data[key]) {
        delete data[key];
      }
    }
    switch (action) {
      case JOB_APPLICATION_OPTIONS.blacklisted:
        setIsBlacklisted(true);
        break;
      case JOB_APPLICATION_OPTIONS.plannedInterviews:
        setIsInterviewPlanned(true);
        break;
      case JOB_APPLICATION_OPTIONS.rejected:
        setIsRejected(true);
        break;
      case JOB_APPLICATION_OPTIONS.shortlisted:
        setIsShortlisted(true);
        break;
      default:
        return;
    }
    setLoading(true);
    let res;
    if (details.tender) {
      res = await changeTenderApplicationStatusAPI({
        action,
        applicationId: details.id,
        data,
      });
    } else {
      res = await changeApplicationStatusAPI({
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
      }
    }
    setIsInterviewPlanning(false);
  };

  useEffect(() => {
    setIsInterviewPlanned(!!details.interviewAt);
    setIsBlacklisted(!!details.user.isBlacklisted);
    setIsRejected(!!details.rejectedAt);
    setIsShortlisted(!!details.shortlistedAt);
  }, [details]);
  useEffect(() => {
    setIsDisabledActions(
      isInterviewPlanned || isBlacklisted || isRejected || isShortlisted
    );
  }, [isInterviewPlanned, isBlacklisted, isRejected, isShortlisted]);
  return (
    <>
      {(interviewPlanned && !details.tender) && (
        <Button
          disabled={isDisabledActions}
          style={{
            fontWeight: isInterviewPlanned ? 900 : "",
          }}
          onClick={() => setIsInterviewPlanning(true)}
        >
          <SVG.EventIcon className="application-option-icon" />
          <span>
            {!isInterviewPlanned ? "Plan Interview" : "Interview Planned"}
          </span>
        </Button>
      )}
      {shortlist && (
        <Button
          disabled={isDisabledActions}
          style={{
            fontWeight: isShortlisted ? 900 : "",
          }}
          onClick={() =>
            handlerChangeApplicationStatus(JOB_APPLICATION_OPTIONS.shortlisted)
          }
        >
          <SVG.StarIcon className="application-option-icon" />
          <span>{!isShortlisted ? "Shortlist" : "Shortlisted"}</span>
        </Button>
      )}
      {reject && (
        <Button
          variant="link"
          disabled={isDisabledActions}
          style={{
            fontWeight: isRejected ? 900 : "",
          }}
          onClick={() =>
            handlerChangeApplicationStatus(JOB_APPLICATION_OPTIONS.rejected)
          }
        >
          <SVG.RejectIcon className="application-option-icon" />
          <span> {!isRejected ? "Reject" : "Rejected"}</span>
        </Button>
      )}
      {blacklist && (
        <Button
          variant="link"
          disabled={isDisabledActions}
          style={{
            fontWeight: isBlacklisted ? 900 : "",
          }}
          onClick={() => {
            setIsBlacklisting(true);
            // handlerChangeApplicationStatus(JOB_APPLICATION_OPTIONS.blacklisted);
          }}
        >
          <SVG.BlockedIcon className="application-option-icon" />
          <span>{!isBlacklisted ? "Blacklist" : "Blacklisted"}</span>
        </Button>
      )}
      {view && (
        <Button
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
                  }
                )
              );
            } else {
              navigate(
                urlcat(
                  "/:role/manage-tenders/:tenderId/applicant-details/:applicationId",
                  {
                    applicationId: details.id,
                    role: USER_ROLES.employer,
                    tenderId: details.tender.id,
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
      {message && (
        <Button variant="link">
          <SVG.MessageIcon
            style={{ color: "#274593" }}
            className="application-option-icon"
          />

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
                src={generateFileUrl(details.user.image?.path || "")}
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
                  JOB_APPLICATION_OPTIONS.blacklisted
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
              onClick={() => {
                if (interviewTime) {
                  handlerChangeApplicationStatus(
                    JOB_APPLICATION_OPTIONS.plannedInterviews
                  );
                }
              }}
            />
          </div>
        </div>
      </DialogBox>
    </>
  );
}

export default ApplicationOptions;

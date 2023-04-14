import { changeApplicationStatusAPI } from "@api/employer";
import { SVG } from "@assets/svg";
import { Button } from "@mui/material";
import { JOB_APPLICATION_OPTIONS, USER_ROLES } from "@utils/enum";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import urlcat from "urlcat";
import "./style.css";
function ApplicationOptions({
  allOptions,
  applicationId,
  isShortlisted,
  jobId,
  isRejected,
}) {
  const navigate = useNavigate();
  const [shortlist, setShortlist] = useState(false);
  const [rejected, setRejected] = useState(false);
  useEffect(() => {
    setShortlist(!!isShortlisted);
    setRejected(!!isRejected);
  }, [isShortlisted]);
  const handlerChangeApplicationStatus = async (action, applicationId) => {
    const res = await changeApplicationStatusAPI({ action, applicationId });
    if (res.remote === "success") {
      setShortlist(true);
    }
  };
  return (
    <>
      {allOptions && (
        <Button variant="link">
          {<SVG.EventIcon className="application-option-icon" />}{" "}
          <span>Interview planned</span>
        </Button>
      )}
      <Button
        disabled={shortlist || rejected}
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
            disabled={shortlist || rejected}
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
            disabled={shortlist || rejected}
            className="application-option-btn"
            onClick={() =>
              handlerChangeApplicationStatus(
                JOB_APPLICATION_OPTIONS.blacklisted,
                applicationId
              )
            }
          >
            {<SVG.BlockedIcon className="application-option-icon" />}{" "}
            <span>Blacklist</span>
          </Button>
        </>
      )}
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
    </>
  );
}

export default ApplicationOptions;

import { changeApplicationStatusAPI } from "@api/employer";
import { SVG } from "@assets/svg";
import { Button } from "@mui/material";
import { JOB_APPLICATION_OPTIONS, USER_ROLES } from "@utils/enum";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import urlcat from "urlcat";
function ApplicationOptions({
  allOptions,
  applicationId,
  isShortlisted,
  jobId,
  isMessageAble,
}) {
  const [shortlist, setShortlist] = useState(false);
  useEffect(() => {
    setShortlist(!!isShortlisted);
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
          {<SVG.EventIcon />} <span>Interview planned</span>
        </Button>
      )}
      <Button
        disabled={shortlist}
        variant="link"
        onClick={() =>
          handlerChangeApplicationStatus(
            JOB_APPLICATION_OPTIONS.shortlisted,
            applicationId
          )
        }
      >
        {<SVG.StarIcon />}{" "}
        <span>{shortlist ? "Shortlisted" : "Shortlist"}</span>
      </Button>
      {allOptions && (
        <>
          <Button variant="link" disabled={shortlist}>
            {<SVG.RejectIcon />} <span>Reject</span>
          </Button>
          <Button variant="link">
            {<SVG.BlockedIcon />} <span>Blacklist</span>
          </Button>
        </>
      )}
      <Button
        LinkComponent={Link}
        to={urlcat(
          "/:role/manage-jobs/:jobId/applicant-details/:applicationId",
          {
            applicationId: applicationId || "applicationId",
            role: USER_ROLES.employer,
            jobId: jobId || "jobId",
          }
        )}
        sx={{
          color: "#274593",
          flexDirection: "column",
          textTransform: "capitalize",
        }}
      >
        {<SVG.OpenNewIcon />} <span>View</span>
      </Button>
      {allOptions && (
        <Button variant="link">
          {<SVG.MessageIcon style={{ color: "#274593" }} />}{" "}
          <span>Message</span>
        </Button>
      )}
    </>
  );
}

export default ApplicationOptions;

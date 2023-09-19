import React from "react";
import styles from "./notification.module.css";
import { Avatar } from "@mui/material";
import { SVG } from "@assets/svg";
import { timeAgoFromNow } from "@utils/timeAgo";
import { Link } from "react-router-dom";
import urlcat from "urlcat";
import { USER_ROLES } from "@utils/enum";
function ShortlistedUserCard({ handleClose, application, tender, tenderApplication, createdAt, role }) {
  const jobId = application?.job?.id;
  const tenderId = tender?.id;
  let newUrl = "#";
  let applicationFor = "";
  let applicationOriginName = "";
  if (jobId) {
    newUrl = urlcat("/jobs/details/:jobId", { jobId });
    if (role === USER_ROLES.employer) {
      newUrl = urlcat("/:role/manage-jobs/:jobId/applicant-details/:applicationId",
        {
          applicationId: application.id,
          role: USER_ROLES.employer,
          jobId,
        });
    };

    applicationFor = "Job";
    applicationOriginName = application.job?.title;
  } else if (tenderId) {
    newUrl = urlcat("/tender/details/:tenderId", { tenderId });
    applicationFor = "Tender";
    applicationOriginName = tenderApplication?.tender?.title;
  }
  return (
    <Link onClick={() => handleClose()} to={newUrl}>
      <div className={`${styles.content_div}`}>
        <div>
          <Avatar
            sx={{
              width: 50,
              height: 50,
              margin: "auto",
              color: "#CACACA",
              "&.MuiAvatar-colorDefault": {
                background: "#F0F0F0",
              },
            }}
            src={SVG.KoorShortLogo}
          >
            <SVG.KoorShortLogo />
          </Avatar>
        </div>
        <div className={styles.title_text_div}>
          <h2 className={styles.title}>
            Congratulations! You've Been Shortlisted for the {applicationFor}
            <strong> "{applicationOriginName}"</strong>
          </h2>
          <p style={{ marginTop: "5px" }} className={styles.duration}>
            {timeAgoFromNow(createdAt)}
          </p>
        </div>
      </div>
    </Link>
  );
}

export default ShortlistedUserCard;

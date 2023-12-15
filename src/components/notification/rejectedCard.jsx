import React from "react";
import styles from "./notification.module.css";
import { Avatar } from "@mui/material";
import { SVG } from "../../assets/svg";
import { timeAgoFromNow } from "../../utils/timeAgo";
import { Link } from "react-router-dom";
import urlcat from "urlcat";
import { generateFileUrl } from "@utils/generateFileUrl";
function RejectedCard({
  job,
  handleClose,
  tender,
  tenderApplication,
  createdAt,
  application,
}) {
    const jobId = application?.job?.id;
  const tenderId = tender?.id;
  let newUrl = "#";
  let applicationFor = "";
  let applicationOriginName = "";
  if (jobId) {
    newUrl = urlcat("/jobs/details/:jobId", { jobId });
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
            src={generateFileUrl(job.user.image) || SVG.KoorShortLogo}>
            <SVG.KoorShortLogo />
          </Avatar>
        </div>
        <div className={styles.title_text_div}>
          <h2 className={styles.title}>
            You've been Rejected for the {applicationFor}
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

export default RejectedCard;

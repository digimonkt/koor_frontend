import React from "react";
import styles from "./notification.module.css";
import { Avatar } from "@mui/material";
import { SVG } from "../../assets/svg";
import { timeAgoFromNow } from "../../utils/timeAgo";
import urlcat from "urlcat";
import { generateFileUrl } from "@utils/generateFileUrl";

function PlannedInterviewCard({
  id,
  seen,
  job,
  handleClose,
  application,
  createdAt,
  handleSeen,
}) {
  const url = application?.job
    ? urlcat("/jobs/details/:jobId", { jobId: application?.job?.id })
    : "#";

  return (
    <div
      style={{ background: seen ? "#f0ecec" : "" }}
      onClick={() => {
        handleClose();
        handleSeen(id, url);
      }}
    >
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
            src={generateFileUrl(job.user.image) || SVG.KoorShortLogo}
          >
            <SVG.KoorShortLogo />
          </Avatar>
        </div>
        <div className={styles.title_text_div}>
          <h2 className={styles.title}>
            Congratulations! You have been scheduled for an interview for the
            job
            <strong>"{application.job?.title}"</strong>
          </h2>
          <p style={{ marginTop: "5px" }} className={styles.duration}>
            {timeAgoFromNow(createdAt)}
          </p>
        </div>
      </div>
    </div>
  );
}

export default PlannedInterviewCard;

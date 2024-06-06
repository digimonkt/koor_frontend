import { SVG } from "../../assets/svg";
import { Avatar } from "@mui/material";
import { generateFileUrl } from "../../utils/generateFileUrl";
import { Link } from "react-router-dom";
import { timeAgoFromNow } from "../../utils/timeAgo";
import React from "react";
import styles from "./notification.module.css";
import urlcat from "urlcat";

function ExpiredJobCard({ id, seen, job, createdAt, handleClose, handleSeen }) {
  const jobId = job?.id;
  const url = jobId ? urlcat("/jobs/details/:jobId", { jobId }) : "#";
  return (
    <Link
      onClick={() => {
        handleClose();
        handleSeen(id, url);
      }}
      style={{ background: seen ? "#f0ecec" : "" }}
    >
      <div
        className={`${styles.content_div}`}
        //   style={{ background: item.color }}
      >
        <div>
          {" "}
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
            src={generateFileUrl(job?.user.image)}
          >
            <SVG.UserIcon />
          </Avatar>
        </div>
        <div className={styles.title_text_div}>
          <h2 className={styles.title}>
            Your saved job "{job?.title}" was closed.
          </h2>
          <p
            className={`${styles.text}`}
            //   style={{ background: jobDetails.background }}
          >
            Go ahead and search for your dream job
          </p>
          <p className={styles.duration}>{timeAgoFromNow(createdAt)}</p>
        </div>
      </div>
    </Link>
  );
}

export default ExpiredJobCard;

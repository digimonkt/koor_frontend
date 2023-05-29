import { SVG } from "@assets/svg";
import { Avatar } from "@mui/material";
import { generateFileUrl } from "@utils/generateFileUrl";
import { timeAgoFromNow } from "@utils/timeAgo";
import React from "react";
import styles from "./notification.module.css";

function ExpiredJobCard({ job, createdAt }) {
  return (
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
  );
}

export default ExpiredJobCard;

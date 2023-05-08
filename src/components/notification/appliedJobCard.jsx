import React from "react";
import styles from "./notification.module.css";
import { Avatar } from "@mui/material";
import { SVG } from "@assets/svg";
import { generateFileUrl } from "@utils/generateFileUrl";
import { timeAgoFromNow } from "@utils/timeAgo";

function AppliedJobCard(props) {
  return (
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
          src={generateFileUrl(props.application.user?.image)}
        >
          <SVG.UserIcon />
        </Avatar>
      </div>
      <div className={styles.title_text_div}>
        <h2 className={styles.title}>
          <strong>
            {props.application.user?.name || props.application.user?.email}
          </strong>{" "}
          applied to your job post{" "}
          <strong>"{props.application.job?.title}"</strong>
        </h2>
        <p style={{ marginTop: "5px" }} className={styles.duration}>
          {timeAgoFromNow(props.createdAt)}
        </p>
      </div>
    </div>
  );
}

export default AppliedJobCard;

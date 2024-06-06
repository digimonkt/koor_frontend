import { SVG } from "../../assets/svg";
import { Avatar } from "@mui/material";
import { generateFileUrl } from "../../utils/generateFileUrl";
import { timeAgoFromNow } from "../../utils/timeAgo";
import React from "react";
import styles from "./notification.module.css";

function UpdatePassword({
  handleClose,
  receiver,
  id,
  createdAt,
  seen,
  handleSeen,
}) {
  return (
    <div
      style={{ background: seen ? "#f0ecec" : "" }}
      onClick={() => {
        handleSeen(id, null);
        handleClose();
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
              cursor: "pointer",
              "&.MuiAvatar-colorDefault": {
                background: "#F0F0F0",
              },
            }}
            src={generateFileUrl(receiver.image)}
          >
            <SVG.UserIcon />
          </Avatar>
        </div>
        <div className={styles.title_text_div}>
          <h2 className={styles.title}>
            <strong>{receiver.name || receiver.email} </strong>Your password has
            been updated{" "}
          </h2>
          <p style={{ marginTop: "5px" }} className={styles.duration}>
            {timeAgoFromNow(createdAt)}
          </p>
        </div>
      </div>
    </div>
  );
}

export default UpdatePassword;

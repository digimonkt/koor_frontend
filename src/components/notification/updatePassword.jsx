import { SVG } from "../../assets/svg";
import { Avatar } from "@mui/material";
import { generateFileUrl } from "../../utils/generateFileUrl";
import { timeAgoFromNow } from "../../utils/timeAgo";
import React from "react";
import styles from "./notification.module.css";
import { updateNotificationReadAPI } from "../../api/user";
import { useDispatch } from "react-redux";
import { updateNotificationCount } from "@redux/slice/user";

function UpdatePassword({
  handleClose,
  receiver,
  id,
  job,
  jobFilter,
  createdAt,
  seen,
}) {
  const dispatch = useDispatch();
  const handleSeen = async (id) => {
    const res = await updateNotificationReadAPI(id);
    if (res.remote === "success") {
      dispatch(updateNotificationCount(res.data.notification_count));
    }
  };
  return (
    <div
      style={{ background: seen ? "#f0ecec" : "" }}
      onClick={() => {
        handleSeen(id);
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

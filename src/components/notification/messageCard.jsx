import { SVG } from "../../assets/svg";
import { Avatar, Box, IconButton } from "@mui/material";
import { generateFileUrl } from "../../utils/generateFileUrl";
import { timeAgoFromNow } from "../../utils/timeAgo";
import React from "react";
import { Link } from "react-router-dom";
import urlcat from "urlcat";
import styles from "./notification.module.css";
import Close from "@mui/icons-material/Close";
function MessageNotificationCard({
  message,
  messageId,
  createdAt,
  handleClose,
  role,
  conversion,
  userId,
}) {
  // + `#${messageId}`
  return (
    <Link
      onClick={() => handleClose()}
      to={urlcat(`/${role}/chat`, { conversion, userId })}
    >
      <div
        className={`${styles.content_div}`}
        //   style={{ background: item.color }}
      >
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
            src={generateFileUrl(null)}
          >
            <SVG.UserIcon />
          </Avatar>
        </div>
        <Box
          className={styles.title_text_div}
          sx={{
            position: "relative",
            "&:hover .MuiIconButton-root": {
              display: "inline-flex",
            },
          }}
        >
          <IconButton
            sx={{
              width: "15px",
              height: "15px",
              fontSize: "15px",
              position: "absolute",
              top: "0",
              right: "0",
              display: "none",
            }}
            onClick={() => handleClose()}
          >
            <Close fontSize="inherit" />
          </IconButton>
          <h2 className={styles.title}>New message received.</h2>
          <p className={`${styles.text}`}>
            <div dangerouslySetInnerHTML={{ __html: message }} />
          </p>
          <p style={{ marginTop: "5px" }} className={styles.duration}>
            {timeAgoFromNow(createdAt)}
          </p>
        </Box>
      </div>
    </Link>
  );
}

export default MessageNotificationCard;

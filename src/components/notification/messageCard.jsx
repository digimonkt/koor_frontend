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
  sender,
  message,
  messageId,
  createdAt,
  handleClose,
  role,
  conversion,
  userId,
}) {
  return (
    <Link
      onClick={() => handleClose()}
      to={urlcat(`/${role}/chat`, { conversion, userId }) + `#${messageId}`}>
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
            src={generateFileUrl(sender?.image) || <SVG.UserIcon />}>
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
          }}>
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
            onClick={() => handleClose()}>
            <Close fontSize="inherit" />
          </IconButton>
          <h2 className={styles.title}>
            <b style={{ textTransform: "capitalize" }}>{sender?.name}</b> sent
            you a message
          </h2>
          <p className={`${styles.text}`}>
            <div
              style={{
                background: "#f0f0f0",
                padding: "1rem",
                borderRadius: "5px",
              }}
              dangerouslySetInnerHTML={{ __html: message }}
            />
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

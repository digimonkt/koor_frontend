import { SVG } from "../../assets/svg";
import { Avatar, Box } from "@mui/material";
import { generateFileUrl } from "../../utils/generateFileUrl";
import { timeAgoFromNow } from "../../utils/timeAgo";
import React from "react";
import { useNavigate } from "react-router-dom";
import urlcat from "urlcat";
import styles from "./notification.module.css";
import { updateNotificationReadAPI } from "../../api/user";
import { useDispatch } from "react-redux";
import { updateNotificationCount } from "../../redux/slice/user";

function MessageNotificationCard({
  sender,
  message,
  messageId,
  createdAt,
  handleClose,
  role,
  conversion,
  userId,
  id,
  seen,
  // handleRemoveMessages,
}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSeen = async (id) => {
    const res = await updateNotificationReadAPI(id);
    console.log(res.data, "sdfd");

    if (res.remote === "success") {
      dispatch(updateNotificationCount(res.data.notification_count));
      navigate(
        urlcat(`/${role}/chat`, { conversion, userId }) + `#${messageId}`
      );
    }
  };
  return (
    <div
      style={{ background: seen ? "#f0ecec" : "" }}
      onClick={() => {
        handleClose();
        handleSeen(id);
      }}
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
            src={generateFileUrl(sender?.image) || <SVG.UserIcon />}
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
          {/* <IconButton */}
          {/*   sx={{ */}
          {/*     width: "15px", */}
          {/*     height: "15px", */}
          {/*     fontSize: "15px", */}
          {/*     position: "absolute", */}
          {/*     top: "0", */}
          {/*     right: "0", */}
          {/*     display: "none", */}
          {/*   }} */}
          {/*   onClick={() => handleRemoveMessages(messageId)} */}
          {/* > */}
          {/*   <Close fontSize="inherit" /> */}
          {/* </IconButton> */}
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
    </div>
  );
}

export default MessageNotificationCard;

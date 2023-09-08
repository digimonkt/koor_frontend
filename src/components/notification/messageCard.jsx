import { SVG } from "@assets/svg";
import { Avatar } from "@mui/material";
import { generateFileUrl } from "@utils/generateFileUrl";
import { timeAgoFromNow } from "@utils/timeAgo";
import React from "react";
import { Link } from "react-router-dom";
import urlcat from "urlcat";
import styles from "./notification.module.css";
function MessageNotificationCard({ message, createdAt, handleClose, role, conversion, userId }) {
    return (
        <Link onClick={() => handleClose()} to={urlcat(`/${role}/chat`, { conversion, userId })}>
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
                <div className={styles.title_text_div}>
                    <h2 className={styles.title}>New message received.</h2>
                    <p
                        className={`${styles.text}`}
                    //   style={{ background: jobDetails.background }}
                    >
                        {message}
                    </p>
                    <p style={{ marginTop: "5px" }} className={styles.duration}>
                        {timeAgoFromNow(createdAt)}
                    </p>
                </div>
            </div>
        </Link>
    );
}

export default MessageNotificationCard;

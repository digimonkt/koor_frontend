import React from "react";
import styles from "./notification.module.css";
import { Avatar } from "@mui/material";
import { SVG } from "@assets/svg";
import { timeAgoFromNow } from "@utils/timeAgo";
import { Link } from "react-router-dom";
import urlcat from "urlcat";

function PlannedInterviewCard(props, handleClose) {
    return (
        <Link onClick={() => handleClose()} to={props?.job ? urlcat("/jobs/details/:jobId", { jobId: props?.job?.id }) : "#"}>
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
                        src={SVG.KoorShortLogo}
                    >
                        <SVG.KoorShortLogo />
                    </Avatar>
                </div>
                <div className={styles.title_text_div}>
                    <h2 className={styles.title}>
                        Congratulations! You have been scheduled for an interview for the job
                        <strong>"{props.application.job?.title}"</strong>
                    </h2>
                    <p style={{ marginTop: "5px" }} className={styles.duration}>
                        {timeAgoFromNow(props.createdAt)}
                    </p>
                </div>
            </div>
        </Link>
    );
}

export default PlannedInterviewCard;

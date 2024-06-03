import React from "react";
import styles from "./notification.module.css";
import { Avatar } from "@mui/material";
import { SVG } from "../../assets/svg";
import { timeAgoFromNow } from "../../utils/timeAgo";
import { useNavigate } from "react-router-dom";
import urlcat from "urlcat";
import { generateFileUrl } from "@utils/generateFileUrl";
import { updateNotificationReadAPI } from "../../api/user";
import { useDispatch } from "react-redux";
import { updateNotificationCount } from "@redux/slice/user";

function RejectedCard({
  id,
  job,
  seen,
  handleClose,
  tender,
  tenderApplication,
  createdAt,
  application,
}) {
  const jobId = application?.job?.id;
  const tenderId = tender?.id;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let newUrl = "#";
  let applicationFor = "";
  let applicationOriginName = "";
  if (jobId) {
    newUrl = urlcat("/jobs/details/:jobId", { jobId });
    applicationFor = "Job";
    applicationOriginName = application.job?.title;
  } else if (tenderId) {
    newUrl = urlcat("/tender/details/:tenderId", { tenderId });
    applicationFor = "Tender";
    applicationOriginName = tenderApplication?.tender?.title;
  }

  const handleSeen = async (id) => {
    const res = await updateNotificationReadAPI(id);
    if (res.remote === "success") {
      dispatch(updateNotificationCount(res.data.notification_count));
      navigate(newUrl);
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
            src={generateFileUrl(job.user.image) || SVG.KoorShortLogo}
          >
            <SVG.KoorShortLogo />
          </Avatar>
        </div>
        <div className={styles.title_text_div}>
          <h2 className={styles.title}>
            You've been Rejected for the {applicationFor}
            <strong> "{applicationOriginName}"</strong>
          </h2>
          <p style={{ marginTop: "5px" }} className={styles.duration}>
            {timeAgoFromNow(createdAt)}
          </p>
        </div>
      </div>
    </div>
  );
}

export default RejectedCard;

import React from "react";
import styles from "./notification.module.css";
import { Avatar } from "@mui/material";
import { SVG } from "../../assets/svg";
import { generateFileUrl } from "../../utils/generateFileUrl";
import { timeAgoFromNow } from "../../utils/timeAgo";
import { useNavigate } from "react-router-dom";
import urlcat from "urlcat";
import { USER_ROLES } from "../../utils/enum";

function AppliedJobCard({
  application,
  createdAt,
  handleClose,
  role,
  conversion,
  userId,
}) {
  const navigate = useNavigate();
  const handleLinks = () => {
    if (role === USER_ROLES.employer && application.job?.id) {
      navigate(
        urlcat("/:role/manage-jobs/:jobId/applicant-details/:applicationId", {
          applicationId: application.id,
          role: USER_ROLES.employer,
          jobId: application.job.id,
        })
      );
    } else if (role === USER_ROLES.jobSeeker) {
      navigate(
        urlcat("/jobs/details/:jobId", {
          jobId: application.job.id,
        })
      );
    }
  };
  return (
    <div
      className={`${styles.content_div}`}
      onClick={() => {
        handleClose();
        handleLinks();
      }}
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
          src={generateFileUrl(application.user?.image)}
        >
          <SVG.UserIcon />
        </Avatar>
      </div>
      <div className={styles.title_text_div}>
        <h2 className={styles.title}>
          <strong>{application.user?.name || application.user?.email}</strong>{" "}
          applied to your job post <strong>"{application.job?.title}"</strong>
        </h2>
        <p style={{ marginTop: "5px" }} className={styles.duration}>
          {timeAgoFromNow(createdAt)}
        </p>
      </div>
    </div>
    // </Link >
  );
}

export default AppliedJobCard;

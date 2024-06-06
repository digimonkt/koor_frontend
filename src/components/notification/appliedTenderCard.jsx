import React from "react";
import styles from "./notification.module.css";
import { Avatar, Box } from "@mui/material";
import { SVG } from "../../assets/svg";
import { generateFileUrl } from "../../utils/generateFileUrl";
import { timeAgoFromNow } from "../../utils/timeAgo";

function AppliedTenderCard({
  tenderApplication,
  tender,
  createdAt,
  handleClose,
  id,
  seen,
  handleSeen,
}) {
  const url = `/employer/manage-tenders/${tenderApplication?.tender?.id}/applicant-details/${tenderApplication?.id}`;
  return (
    <Box
      sx={{
        cursor: "pointer",
        background: seen ? "#f0ecec" : "",
      }}
      className={`${styles.content_div}`}
      onClick={() => {
        handleClose();
        handleSeen(id, url);
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
          src={generateFileUrl(tenderApplication.user?.image?.path)}
        >
          <SVG.UserIcon />
        </Avatar>
      </div>
      <div className={styles.title_text_div}>
        <h2 className={styles.title}>
          <strong>
            {tenderApplication.user?.name || tenderApplication.user?.email}
          </strong>{" "}
          applied to your Tender post <strong>"{tender?.title}"</strong>
        </h2>
        <p style={{ marginTop: "5px" }} className={styles.duration}>
          {timeAgoFromNow(createdAt)}
        </p>
      </div>
    </Box>
  );
}

export default AppliedTenderCard;

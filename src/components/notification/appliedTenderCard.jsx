import React from "react";
import styles from "./notification.module.css";
import { Avatar, Box } from "@mui/material";
import { SVG } from "../../assets/svg";
import { generateFileUrl } from "../../utils/generateFileUrl";
import { timeAgoFromNow } from "../../utils/timeAgo";
import { useNavigate } from "react-router-dom";
import { updateNotificationReadAPI } from "../../api/user";
import { useDispatch } from "react-redux";
import { updateNotificationCount } from "@redux/slice/user";

function AppliedTenderCard({
  tenderApplication,
  tender,
  createdAt,
  handleClose,
  role,
  conversion,
  userId,
  id,
  seen,
}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  console.log(tenderApplication);
  const handleLinks = async () => {
    const res = await updateNotificationReadAPI(id);
    if (res.remote === "success") {
      console.log(res.data);
      dispatch(updateNotificationCount(res.data.notification_count));

      navigate(
        `/employer/manage-tenders/${tenderApplication.tender.id}/applicant-details/${tenderApplication.id}`
      );
    }
  };
  return (
    <Box
      sx={{
        cursor: "pointer",
        background: seen ? "#f0ecec" : "",
      }}
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

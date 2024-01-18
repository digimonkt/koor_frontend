import NotificationContent from "../../components/notification";
import { Container, IconButton } from "@mui/material";
import React from "react";
import styles from "./notification.module.css";
import { SVG } from "@assets/svg";
import { Capacitor } from "@capacitor/core";
import { useNavigate } from "react-router-dom";

function Notification() {
  const navigate = useNavigate();
  const platform = Capacitor.getPlatform();
  return (
    <div
      style={{
        paddingTop:
          platform === "android" || platform === "ios" ? "0px !important" : "",
      }}
    >
      <Container
        sx={{
          padding:
            platform === "android" || platform === "ios"
              ? "0px ! important"
              : "",
        }}
        // sx={{
        //   "@media(min-width:992px)": {
        //     maxWidth: "1240px",
        //   },
        // }}
      >
        <div
          style={{
            margin:
              platform === "android" || platform === "ios"
                ? "0px 0px 80px 0px"
                : "130px 0 0 0px",
          }}
          className={`${styles.content} ${
            platform === "android" || platform === "ios"
              ? styles.contentapp
              : ""
          }`}
        >
          <h3 className={`${styles.content_heading}`}>
            {platform === "android" || platform === "ios" ? (
              <IconButton onClick={() => navigate(-1)}>
                <SVG.BackArrow />
              </IconButton>
            ) : (
              ""
            )}
            Notifications
          </h3>
          <div className={styles.content_tabs} style={{ marginTop: "15px" }}>
            <div className="content_notifi">
              <NotificationContent header handleClose={() => {}} />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default Notification;

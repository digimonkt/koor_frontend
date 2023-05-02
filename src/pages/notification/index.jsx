import NotificationContent from "@components/notification";
import { Container } from "@mui/material";
import React from "react";
import styles from "./notification.module.css";

function Notification() {
  return (
    <div className={styles.notification}>
      <Container>
        <div className={styles.content}>
          <h3 className={`${styles.content_heading}`}>Notifications</h3>
          <div className={styles.content_tabs} style={{ marginTop: "15px" }}>
            <div className="content_notifi">
              <NotificationContent header />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default Notification;

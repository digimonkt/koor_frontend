import { GetNotificationAPI } from "@api/user";
import { TabContext, TabList } from "@mui/lab";
import { Box, Button, Stack, Tab } from "@mui/material";
import React, { useEffect, useState } from "react";
import Loader from "@components/loader";
import { Link } from "react-router-dom";
import { getNotificationCardByType } from ".";
import styles from "./notification.module.css";
import { USER_ROLES } from "@utils/enum";
import { useSelector } from "react-redux";
import { DateInput } from "@components/input";
import { SVG } from "@assets/svg";

function NotificationContentComponent({ footer, header, handleClose }) {
  const { role } = useSelector((state) => state.auth);

  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState([]);
  const [section, setSection] = useState("all");
  const handleChangeSection = (event, newValue) => {
    setSection(newValue);
  };
  const getNotifications = async () => {
    setLoading(true);
    const res = await GetNotificationAPI();
    if (res.remote === "success") {
      setNotification(res.data.results);
    }
    setLoading(false);
  };
  useEffect(() => {
    getNotifications();
  }, []);
  return (
    <div style={{ width: "100%" }}>
      <Box sx={{ width: "100%", typography: "body1" }}>
        <TabContext value={section}>
          <Box
            sx={{ borderBottom: 1, borderColor: "divider" }}
            className={`pe-4 ${styles.tabs_box}`}
          >
            <TabList className="tab_list" onChange={handleChangeSection}>
              <Tab label="All" className={styles.tabs_btn} value="all" />
              <Tab label="Jobs" className={styles.tabs_btn} value="jobs" />
              <Tab
                label="Message"
                className={styles.tabs_btn}
                value="message"
              />
            </TabList>
            {header && (
              <Stack direction={"row"} spacing={2} className={styles.btn_div}>
                <DateInput onChange={() => {}} />

                <Button
                  sx={{ color: "#EEA23D", textTransform: "capitalize" }}
                  onClick={() => setNotification([])}
                  className={styles.clear_btn}
                >
                  Clear All
                </Button>
              </Stack>
            )}
          </Box>
          <div className={footer ? `pe-3 ${styles.scrollbarNotification}` : ""}>
            {loading ? (
              <Loader loading={loading} />
            ) : (
              <div style={{ marginBottom: "16px" }}>
                {notification.length ? (
                  notification.map((item, index) => (
                    <>
                      <hr
                        style={{ borderColor: "#F0F0F0 !important" }}
                        className="p-0 mb-2"
                      />
                      <div
                        key={index}
                        className={`${styles.notification_card} ${
                          role === USER_ROLES.jobSeeker
                            ? styles.notification_card_job_seeker
                            : styles.notification_card_user
                        }`}
                      >
                        {getNotificationCardByType(item)}
                      </div>
                    </>
                  ))
                ) : (
                  <div className="text-center">
                    <SVG.Bell />
                    <p className={styles.text}>
                      You don’t have any notifications yet
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
          {footer ? (
            <div className={`pe-4 border-top pt-3 ${styles.view_div}`}>
              <Link
                to="/notification"
                className={styles.view_all}
                onClick={() => {
                  if (handleClose) {
                    handleClose();
                  }
                }}
              >
                View All Notification
              </Link>
              <Link to="#/" className={styles.settings}>
                Settings
              </Link>
            </div>
          ) : (
            ""
          )}
        </TabContext>
      </Box>
    </div>
  );
}

export default NotificationContentComponent;

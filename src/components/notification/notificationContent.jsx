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
import DialogBox from "@components/dialogBox";
import Settings from "./settings";
import dayjs from "dayjs";

function NotificationContentComponent({ footer, header, handleClose, ref }) {
  const { role } = useSelector((state) => state.auth);

  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [section, setSection] = useState("all");
  const [settings, setSetting] = useState(false);
  const [filterByDate, setFilterByDate] = useState(
    dayjs().format("YYYY-MM-DD")
  );
  const handleChangeSection = (event, newValue) => {
    const filterNotification = (type) => {
      const notificationData = [...notification];
      let notificationResult = "";
      if (newValue === "message") {
        notificationResult = notificationData.filter(
          (notification) => notification.notificationType === "message"
        );
      } else {
        notificationResult = notificationData.filter(
          (notification) => notification.notificationType !== "message"
        );
      }
      if (role === USER_ROLES.employer) {
        notificationResult = notificationResult.filter(
          (notification) => notification.notificationType !== "applied_tender"
        );
      }
      setFilterData(notificationResult);
    };
    setSection(newValue);
    switch (newValue) {
      case "all":
        setFilterData(notification);
        break;
      case "jobs":
        filterNotification("jobs");
        break;
      case "tenders":
        filterNotification("tenders");
        break;
      case "message":
        filterNotification("message");
        break;
      case "clear":
        setFilterData(notification);
        break;
      default:
        break;
    }
  };

  const getNotifications = async () => {
    setLoading(true);
    const data = {
      type: section,
      created: filterByDate,
    };
    const res = await GetNotificationAPI(data);
    if (res.remote === "success") {
      setNotification(res.data.results);
      setFilterData(res.data.results);
    }
    setLoading(false);
  };
  useEffect(() => {
    getNotifications();
  }, [filterByDate]);
  return (
    <div style={{ width: "100%" }}>
      <Box sx={{ width: "100%", typography: "body1" }}>
        <TabContext value={section}>
          <Stack
            direction={{ xs: "column", sm: "row", lg: "row" }}
            spacing={{ xs: 1, lg: 2 }}
            justifyContent={{
              xs: "flex-start",
              sm: "space-between",
              lg: "space-between",
            }}
            sx={{
              borderBottom: 1,
              borderColor: "divider",
              pe: 4,
              cursor: "default",
              "@media(max-width:600px)": { pe: 0 },
            }}
          >
            <TabList className="tab_list" onChange={handleChangeSection}>
              <Tab label="All" className={styles.tabs_btn} value="all" />
              <Tab
                label={role === "vendor" ? "Tenders" : "Jobs"}
                className={styles.tabs_btn}
                value={role === "vendor" ? "tenders" : "jobs"}
              />
              <Tab
                label="Message"
                className={styles.tabs_btn}
                value="message"
              />
            </TabList>
            {header && (
              <Stack direction={"row"} spacing={2} className={styles.btn_div}>
                <DateInput
                  value={filterByDate}
                  maxDate={dayjs().format("YYYY-MM-DD")}
                  onChange={(value) =>
                    setFilterByDate(dayjs(value).format("YYYY-MM-DD"))
                  }
                />

                <Button
                  sx={{ color: "#EEA23D", textTransform: "capitalize" }}
                  onClick={() => {
                    setSection("all");
                    setFilterData(notification);
                    setFilterByDate(dayjs().format("YYYY-MM-DD"));
                  }}
                  className={styles.clear_btn}
                >
                  Clear All
                </Button>
              </Stack>
            )}
          </Stack>
          <div className={footer ? `pe-3 ${styles.scrollbarNotification}` : ""}>
            {loading ? (
              <Loader loading={loading} />
            ) : (
              <div style={{ marginBottom: "16px" }}>
                {filterData.length ? (
                  filterData.map((item, index) => (
                    <>
                      <div
                        key={index}
                        className={`${styles.notification_card} ${
                          role === USER_ROLES.jobSeeker
                            ? styles.notification_card_job_seeker
                            : styles.notification_card_user
                        }`}
                      >
                        {getNotificationCardByType(item, handleClose, role)}
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
              <div
                onClick={() => setSetting(true)}
                className={styles.notification_setting}
              >
                Settings
              </div>
            </div>
          ) : (
            ""
          )}
        </TabContext>
      </Box>
      {/* don't remove `notification-settings` id from the bottom div it is preventing the
      popup to stay open even after clicking outside the notification content box */}
      <div id="notification-settings">
        <DialogBox open={settings} handleClose={() => setSetting(false)}>
          <Settings />
        </DialogBox>
      </div>
    </div>
  );
}

export default NotificationContentComponent;

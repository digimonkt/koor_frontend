import { GetNotificationAPI } from "../../api/user";
import { TabContext, TabList } from "@mui/lab";
import { Box, Button, Stack, Tab, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Loader from "../../components/loader";
import { Link } from "react-router-dom";
import { getNotificationCardByType } from ".";
import styles from "./notification.module.css";
import { USER_ROLES } from "../../utils/enum";
import { useSelector } from "react-redux";
import { DateInput } from "../../components/input";
import { SVG } from "../../assets/svg";
import DialogBox from "../../components/dialogBox";
import Settings from "./settings";
import dayjs from "dayjs";
import { Capacitor } from "@capacitor/core";
function NotificationContentComponent({ footer, header, handleClose }) {
  const { role } = useSelector((state) => state.auth);
  const platform = Capacitor.getPlatform();
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [section, setSection] = useState("all");
  const [settings, setSetting] = useState(false);
  const [filterByDate, setFilterByDate] = useState(
    // dayjs().format("YYYY-MM-DD")
    null
  );
  const handleChangeSection = (_, newValue) => {
    const filterNotification = (_) => {
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

  const handleRemoveMessages = (id) => {
    const updatedNotifications = notification.filter(
      (item) => item.messageId !== id
    );
    setNotification(updatedNotifications);
  };

  const getNotifications = async () => {
    setLoading(true);
    let data = {
      type: section,
      created: filterByDate,
    };
    if (header) {
      data = {
        type: section,
        exactDate: filterByDate,
      };
    }
    const res = await GetNotificationAPI(data);
    if (res.remote === "success") {
      setNotification(res.data.results);
      setFilterData(res.data.results);
    }
    setLoading(false);
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return "Today";
    } else if (date.toDateString() === yesterday.toDateString()) {
      return "Yesterday";
    } else {
      const options = { month: "long", day: "numeric" };
      return date.toLocaleDateString("en-US", options);
    }
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
              mx: 2,
              cursor: "default",
              "@media(max-width:600px)": { pe: 0 },
            }}
          >
            {notification.length > 1 && (
              <TabList
                className="tab_list"
                onChange={handleChangeSection}
                sx={{
                  "&.tab_list .MuiTabs-scroller": {
                    marginBottom:
                      platform === "android" || platform === "ios"
                        ? "24px"
                        : "0px",
                  },
                  "&.tab_list .MuiTabs-flexContainer": {
                    marginBottom:
                      platform === "android" || platform === "ios"
                        ? "0px !important"
                        : "15px",
                  },
                  "&.tab_list .MuiTabs-indicator": {
                    display:
                      platform === "android" || platform === "ios"
                        ? "inherit !important"
                        : null,
                    background: "#EEA23D",
                    height: "3px",
                    borderRadius: "8px 12px 0px 0px",
                  },
                }}
              >
                <Tab
                  label="All"
                  className={
                    platform === "android" || platform === "ios"
                      ? ""
                      : styles.tabs_btn
                  }
                  value="all"
                  sx={{
                    "&.MuiButtonBase-root.MuiTab-root": { color: "#848484" },
                    "&.MuiButtonBase-root.MuiTab-root.Mui-selected": {
                      background:
                        platform === "android" || platform === "ios"
                          ? "#fff !important"
                          : "",
                      color:
                        platform === "android" || platform === "ios"
                          ? "#121212 !important"
                          : "",
                      opacity:
                        platform === "android" || platform === "ios"
                          ? "1 !important"
                          : "",
                    },
                  }}
                />
                <Tab
                  label={role === "vendor" ? "Tenders" : "Jobs"}
                  className={
                    platform === "android" || platform === "ios"
                      ? ""
                      : styles.tabs_btn
                  }
                  value={role === "vendor" ? "tenders" : "jobs"}
                  sx={{
                    "&.MuiButtonBase-root.MuiTab-root": { color: "#848484" },
                    "&.MuiButtonBase-root.MuiTab-root.Mui-selected": {
                      background:
                        platform === "android" || platform === "ios"
                          ? "#fff !important"
                          : "",
                      color:
                        platform === "android" || platform === "ios"
                          ? "#121212 !important"
                          : "",
                      opacity:
                        platform === "android" || platform === "ios"
                          ? "1 !important"
                          : "",
                    },
                  }}
                />
                <Tab
                  label="Message"
                  className={
                    platform === "android" || platform === "ios"
                      ? ""
                      : styles.tabs_btn
                  }
                  value="message"
                  sx={{
                    "&.MuiButtonBase-root.MuiTab-root": { color: "#848484" },
                    "&.MuiButtonBase-root.MuiTab-root.Mui-selected": {
                      background:
                        platform === "android" || platform === "ios"
                          ? "#fff !important"
                          : "",
                      color:
                        platform === "android" || platform === "ios"
                          ? "#121212 !important"
                          : "",
                      opacity:
                        platform === "android" || platform === "ios"
                          ? "1 !important"
                          : "",
                    },
                  }}
                />
              </TabList>
            )}
            {/* {notification.length > 1 && (
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
            )} */}
            {header && notification.length > 1 && (
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
          <div className={footer ? `${styles.scrollbarNotification}` : ""}>
            {loading ? (
              <Loader loading={loading} />
            ) : (
              <Box sx={{ marginBottom: "16px", mx: 2 }}>
                {filterData.length ? (
                  filterData.map((item, index) => (
                    <>
                      <Typography sx={{ padding: "10px", fontWeight: "500" }}>
                        {formatDate(item.createdAt)}
                      </Typography>
                      <div
                        key={index}
                        className={`${styles.notification_card} ${
                          role === USER_ROLES.jobSeeker
                            ? styles.notification_card_job_seeker
                            : styles.notification_card_user
                        }`}
                      >
                        {getNotificationCardByType(
                          item,
                          handleClose,
                          role,
                          handleRemoveMessages
                        )}
                      </div>
                    </>
                  ))
                ) : (
                  <Box
                    sx={{
                      padding: "20px",
                      alignItems: "center",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <div className="text-center">
                      <SVG.Bell className={styles.no_notification_bell_icon} />
                      <p className={styles.no_notification_text}>
                        You don’t have any notifications yet
                      </p>
                    </div>
                  </Box>
                )}
              </Box>
            )}
          </div>
          {footer ? (
            <div className={`px-3 border-top pt-3 ${styles.view_div}`}>
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

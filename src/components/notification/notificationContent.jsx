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

function NotificationContentComponent({ footer, header, handleClose, ref }) {
  const { role } = useSelector((state) => state.auth);

  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [section, setSection] = useState("all");
  const [settings, setSetting] = useState(false);
  const handleChangeSection = (event, newValue) => {
    const filterNotification = (type) => {
      const notificationData = [...notification];
      const FilterData = notificationData.filter((notification) => notification.notificationType === type);
      setFilterData(FilterData);
    };
    setSection(newValue);
    switch (newValue) {
      case "all":
        setFilterData(notification);
        break;
      case "jobs":
        filterNotification("applied");
        break;
      case "message":
        filterNotification("message");
        break;
      default:
        break;
    }
  };
  const getNotifications = async () => {
    setLoading(true);
    const res = await GetNotificationAPI();
    if (res.remote === "success") {
      setNotification(res.data.results);
      setFilterData(res.data.results);
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
          <Stack
            direction={{ xs: "column", lg: "row" }}
            spacing={{ xs: 1, lg: 2 }}
            justifyContent={{ xs: "flex-start", lg: "space-between" }}
            sx={{
              borderBottom: 1,
              borderColor: "divider",
              pe: 4,
              "@media(max-width:600px)": { pe: 0 },
            }}
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
                <DateInput onChange={() => { }} />

                <Button
                  sx={{ color: "#EEA23D", textTransform: "capitalize" }}
                  onClick={() => setNotification([])}
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
                      {/* <hr
                        style={{ borderColor: "#F0F0F0 !important" }}
                        className="p-0 mb-2"
                      /> */}
                      <div
                        key={index}
                        className={`${styles.notification_card} ${role === USER_ROLES.jobSeeker
                          ? styles.notification_card_job_seeker
                          : styles.notification_card_user
                          }`}
                      >
                        {getNotificationCardByType(item, handleClose)}
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
              <div onClick={() => setSetting(true)}>Settings</div>
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

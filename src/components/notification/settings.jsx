import React, { useState, useEffect } from "react";
import { Switch } from "@mui/material";
import { getSettingUpdateAPI, settingUpdateAPI } from "@api/user";

function Settings() {
  const [notification, setNotification] = useState(false);
  const [email, setEmail] = useState(false);
  const settingUpdate = async (notificationType) => {
    await settingUpdateAPI(notificationType);
  };
  const getNotificationSetting = async () => {
    const res = await getSettingUpdateAPI();
    if (res.remote === "success") {
      setEmail(res.data.email);
      setNotification(res.data.notification);
    }
  };
  const handelEmailNotification = (e) => {
    setEmail(e.target.checked);
    settingUpdate("email");
  };
  const handelNotification = (e) => {
    setNotification(e.target.checked);
    settingUpdate("notification");
  };
  useEffect(() => {
    getNotificationSetting();
  }, []);
  return (
    <div>
      <div>
        <h3>Notifications Settings</h3>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>Notification</div>
        <div>
          <Switch checked={notification} onChange={(e) => handelNotification(e)} />
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>Email</div>
        <div>
          <Switch checked={email} onChange={(e) => handelEmailNotification(e)} />
        </div>
      </div>
    </div>
  );
}

export default Settings;

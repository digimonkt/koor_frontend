import { Switch } from "@mui/material";
import React from "react";

function Settings() {
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
          <Switch />
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
          <Switch />
        </div>
      </div>
    </div>
  );
}

export default Settings;

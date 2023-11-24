import { Stack } from "@mui/material";
import React from "react";
import DateInputComponent from "../dateInput";
import { Capacitor } from "@capacitor/core";

function HorizontalDateInputComponent({ label, ...rest }) {
  const platform = Capacitor.getPlatform();
  return (
    <>
      {platform === "android" || platform === "ios" ? (
        <Stack
          direction={{ xs: "row", lg: "row" }}
          spacing={{ xs: 2, lg: 2 }}
          alignItems={{ xs: "center", lg: "center" }}
          className="mb-3"
        >
          <label style={{ width: "30%" }}>{label}</label>
          <div style={{ width: "70%" }}>
            <DateInputComponent {...rest} />
            {/* label={label} */}
          </div>
        </Stack>
      ) : (
        <Stack
          direction={{ xs: "column", lg: "row" }}
          spacing={{ xs: 2, lg: 2 }}
          alignItems={{ xs: "start", lg: "center" }}
          className="mb-3"
        >
          <label className="w-30">{label}</label>
          <div className="w-70">
            <DateInputComponent {...rest} />
            {/* label={label} */}
          </div>
        </Stack>
      )}
    </>
  );
}

export default HorizontalDateInputComponent;

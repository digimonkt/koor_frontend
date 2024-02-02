import { Capacitor } from "@capacitor/core";
import PhoneNumberInputComponent from "../../../components/phoneNumberInput";
import { Stack } from "@mui/material";
import React from "react";

function HorizontalPhoneInputComponent({ label, ...rest }) {
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
          {Boolean(label) && <label className="w-30">{label}</label>}
          <div style={{ width: label ? "70%" : "100%" }}>
            <div className="showpassword">
              <PhoneNumberInputComponent
                className="add-form-control"
                {...rest}
              />
            </div>
          </div>
        </Stack>
      ) : (
        <Stack
          direction={{ xs: "column", lg: "row" }}
          spacing={{ xs: 2, lg: 2 }}
          alignItems={{ xs: "start", lg: "center" }}
          className="mb-3"
        >
          {Boolean(label) && <label className="w-30">{label}</label>}
          <div className={label ? "w-70" : "w-100"}>
            <div className="showpassword">
              <PhoneNumberInputComponent
                className="add-form-control"
                {...rest}
              />
            </div>
          </div>
        </Stack>
      )}
    </>
  );
}

export default HorizontalPhoneInputComponent;

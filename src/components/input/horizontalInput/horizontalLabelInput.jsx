import { Stack } from "@mui/material";
import React from "react";
import SelectInputComponent from "../selectInput";
import { Capacitor } from "@capacitor/core";

/**
 *
 * @param {label} param0 string
 * @params {type} param1 select
 * @returns
 */
function HorizontalLabelInputComponent({
  label,
  type,
  options,
  endplaceholder,
  ...rest
}) {
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
          <div className="horizontal_input_width">
            {type === "select" ? (
              <SelectInputComponent options={options || []} {...rest} />
            ) : type === "textarea" ? (
              <>
                <textarea className="form-control-area" {...rest}></textarea>
              </>
            ) : (
              <div className="showpassword">
                <input className="add-form-control" {...rest} />
              </div>
            )}
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
          <div className="horizontal_input_width">
            {type === "select" ? (
              <SelectInputComponent options={options || []} {...rest} />
            ) : type === "textarea" ? (
              <div style={{ display: "flex", position: "relative" }}>
                <textarea className="form-control-area" {...rest}></textarea>
                {Boolean(endplaceholder) && (
                  <div
                    className="password_svg"
                    style={{
                      opacity: 0.2,
                      color: "#121212",
                      position: "absolute",
                      right: "10px", // Adjust the right value as needed
                      bottom: "10px", // Adjust the
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    {endplaceholder}
                  </div>
                )}
              </div>
            ) : (
              <div className="showpassword">
                <input className="add-form-control" {...rest} />
              </div>
            )}
          </div>
        </Stack>
      )}
    </>
  );
}

export default HorizontalLabelInputComponent;

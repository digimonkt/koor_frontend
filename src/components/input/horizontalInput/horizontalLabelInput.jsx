import { Stack } from "@mui/material";
import React from "react";
import SelectInputComponent from "../selectInput";

function HorizontalLabelInputComponent({
  label,
  type,
  options,
  endplaceholder,
  ...rest
}) {
  return (
    <>
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
    </>
  );
}

export default HorizontalLabelInputComponent;

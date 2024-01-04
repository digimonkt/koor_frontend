import { IconButton, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import { SVG } from "../../assets/svg";

function LabeledInputComponent({
  title,
  subtitle,
  type,
  labelWeight,
  icon,
  required,
  limit,
  width,
  zIndex,
  endplaceholder = "",
  ...rest
}) {
  const [isVisiblePassword, setIsVisiblePassword] = useState(false);
  const handleChangePasswordVisibility = () => {
    setIsVisiblePassword(!isVisiblePassword);
  };
  useEffect(() => {
    if (rest.type === "password") {
      setIsVisiblePassword(false);
    }
  }, [rest.type]);
  return (
    <>
      {title || subtitle ? (
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          className="mb-2"
        >
          {title ? (
            <label
              className="mb-1 d-inline-block"
              style={{
                fontWeight: labelWeight,
              }}
            >
              {title}
              {required ? <span className="required-field">*</span> : ""}
            </label>
          ) : (
            ""
          )}
          {subtitle ? (
            <Stack direction="row" spacing={1} alignItems="center">
              <span className="text-gray">{subtitle}</span>
            </Stack>
          ) : (
            ""
          )}
        </Stack>
      ) : (
        ""
      )}
      {type === "textarea" ? (
        <>
          <textarea
            className="form-control-area"
            {...rest}
            onChange={(e) => {
              if (rest.onChange) {
                if (limit) {
                  if (e.target.value.length <= limit) {
                    rest.onChange(e);
                  }
                } else {
                  rest.onChange(e);
                }
              }
            }}
          ></textarea>
          {limit ? (
            <span>
              {rest.value?.length || 0}/{limit}
            </span>
          ) : (
            ""
          )}
        </>
      ) : (
        <div className="showpassword" style={{ width, zIndex }}>
          {/* className={rest.pageName !== "userLogin" ? "showpassword" : "loginshowpassword"} */}
          <input
            className="form-control"
            type={
              type === "password"
                ? isVisiblePassword
                  ? "text"
                  : "password"
                : type
            }
            value={rest?.value}
            style={{ width, zIndex }}
            {...rest}
          />
          {icon && <div>{icon}</div>}
          {type === "password" ? (
            <IconButton
              disableRipple={true}
              onClick={handleChangePasswordVisibility}
              className="password_svg"
            >
              {!isVisiblePassword ? (
                <IconButton size="small" disableRipple={true} sx={{ p: 0 }}>
                  <SVG.EyeOpen />
                </IconButton>
              ) : (
                <IconButton size="small" disableRipple={true} sx={{ p: 0 }}>
                  <SVG.EyeOff />
                </IconButton>
              )}
            </IconButton>
          ) : (
            ""
          )}
          {endplaceholder && (
            <div
              className="password_svg"
              style={{
                padding: "3px 40px 0px 0",
                opacity: 0.2,
                color: "#121212",
              }}
            >
              {endplaceholder}
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default LabeledInputComponent;

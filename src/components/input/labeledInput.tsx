import { Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import { SVG } from "src/assets/svg";
import { IInput } from "src/components/input";

function LabeledInputComponent({ password, title, subtitle, ...rest }: IInput) {
  const [isVisiblePassword, setIsVisiblePassword] = useState(false);
  const handleChangePasswordVisibility = () => {
    setIsVisiblePassword(!isVisiblePassword);
  };
  useEffect(() => {
    if (password) {
      setIsVisiblePassword(true);
    }
  }, [password]);
  return (
    <>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        className="mb-2"
      >
        {title ? <label className="mb-1 d-inline-block">{title}</label> : ""}
        {subtitle ? (
          <Stack direction="row" spacing={1} alignItems="center">
            <span className="text-gray">{subtitle}</span>
          </Stack>
        ) : (
          ""
        )}
      </Stack>
      <div className="showpassword">
        <input
          className="form-control"
          type={isVisiblePassword ? "text" : "password"}
          {...rest}
        />
        {password ? (
          <div onClick={handleChangePasswordVisibility}>
            {!isVisiblePassword ? <SVG.EyeOpen /> : <SVG.EyeOff />}
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
}

export default LabeledInputComponent;

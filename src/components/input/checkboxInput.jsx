import { Checkbox } from "@mui/material";
import React from "react";
import { SVG } from "../../assets/svg";
import { useSelector } from "react-redux";
import { USER_ROLES } from "../../utils/enum";
import { Capacitor } from "@capacitor/core";

function CheckboxInputComponent({ sx, ...rest }) {
  const platform = Capacitor.getPlatform();
  const { role } = useSelector((state) => state.auth);
  return (
    <Checkbox
      disableRipple
      icon={<SVG.UncheckIcon />}
      checkedIcon={<SVG.CheckBoxIcon />}
      sx={
        role === USER_ROLES.jobSeeker
          ? {
              color: "#CACACA",
              transition: "all 0.5s ease-out",
              padding:
                platform === "android" || platform === "ios"
                  ? "2px 8px"
                  : "2px 10px",
              "&.Mui-checked": {
                color: "#EEA23D",
                transition: "all 0.5s ease-out",
              },
              ...(sx || {}),
            }
          : {
              transition: "all 0.5s ease-out",
              padding: "9px 9px",
              color: "#CACACA",
              "&.Mui-checked": {
                color: "#274593",
                transition: "all 0.5s ease-out",
              },
              ...(sx || {}),
            }
      }
      {...rest}
    />
  );
}

export default CheckboxInputComponent;

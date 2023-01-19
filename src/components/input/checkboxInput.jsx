import { Checkbox } from "@mui/material";
import React from "react";
import { SVG } from "../../assets/svg";

function CheckboxInputComponent({ ...rest }) {
  return (
    <Checkbox
      disableRipple
      icon={<SVG.UncheckIcon />}
      checkedIcon={<SVG.CheckBoxIcon />}
      sx={{
        color: "#CACACA",
        transition: "all 0.5s ease-out",
        padding: "9px 5px",
        "&.Mui-checked": {
          color: "#274593",
          transition: "all 0.5s ease-out",
        },
      }}
      {...rest}
    />
  );
}

export default CheckboxInputComponent;

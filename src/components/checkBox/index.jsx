import { SVG } from "@assets/svg";
import styled from "@emotion/styled";
import { Checkbox, FormControlLabel } from "@mui/material";
import React from "react";

export const JobFormControl = styled(FormControlLabel)`
  & .MuiFormControlLabel-label {
    font-family: "Poppins";
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    letter-spacing: 0.02em;
    color: #121212;
  }
`;

const CustomCheckBox = ({ label, checked, handleChecked }) => {
  return (
    <JobFormControl
      checked={checked}
      onChange={(e) => handleChecked(e.target.checked)}
      control={
        <Checkbox
          icon={<SVG.UncheckIcon />}
          checkedIcon={<SVG.CheckBoxIcon />}
          sx={{
            color: "#CACACA",
            transition: "all 0.5s ease-out",
            "&.Mui-checked": {
              color: "#EEA23D",
              transition: "all 0.5s ease-out",
            },
          }}
        />
      }
      label={label}
    />
  );
};

export default CustomCheckBox;

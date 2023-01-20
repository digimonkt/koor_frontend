import styled from "@emotion/styled";
import { FormControl, MenuItem, Select } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import React from "react";
export const SelectBox = styled(Select)`
  & .MuiSelect-select {
    background: #f0f0f0;
    border-radius: 10px;
    color: "#121212";
  }
  &.MuiInputBase-root {
    border-radius: 0px;
    font-family: "Poppins";
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 22px;

    letter-spacing: 0.02em;

    color: #121212;
  }
  & fieldset {
    display: none;
  }
`;
function SelectInputComponent({ options, className, ...rest }) {
  return (
    <FormControl
      className={`iconsize-select ${className}`}
      sx={{
        "&.MuiSelect-select": {
          fontFamily: "Poppins",
          fontSize: "12px",
        },
      }}
      size="small"
      fullWidth
    >
      <SelectBox
        inputProps={{ "aria-label": "Without label" }}
        IconComponent={KeyboardArrowDownIcon}
        displayEmpty
        {...rest}
      >
        {options.map((option) => {
          return (
            <MenuItem value={option.value} key={option.value}>
              {option.label}
            </MenuItem>
          );
        })}
      </SelectBox>
    </FormControl>
  );
}

export default SelectInputComponent;

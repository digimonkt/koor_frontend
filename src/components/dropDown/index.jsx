import { FormControl, MenuItem } from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import React from "react";
import { SelectBox } from "./style";

const CustomDropDown = ({
  optionData,
  value = "",
  onChange,
  placeholder = "",
}) => {
  return (
    <FormControl fullWidth size="small">
      <SelectBox
        value={value}
        onChange={(e) => onChange(e.target.value)}
        displayEmpty
        inputProps={{ "aria-label": "Without label" }}
        IconComponent={KeyboardArrowUpIcon}
      >
        <MenuItem value="" disabled>
          <em
            style={{
              color: "#848484",
              fontStyle: "normal",
              fontWeight: 400,
            }}
          >
            {placeholder}
          </em>
        </MenuItem>
        {optionData.map((item) => (
          <MenuItem key={item.id} value={item.value}>
            {item.title}
          </MenuItem>
        ))}
      </SelectBox>
    </FormControl>
  );
};

export default CustomDropDown;

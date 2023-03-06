import React from "react";
import Box from "@mui/material/Box";
// import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import styles from "./selectinput.module.css";

const SelectInput = ({
  label,
  className,
  options,
  value,
  placeholder,
  handleChange,
  ...rest
}) => {
  return (
    <>
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          {/* <InputLabel id="demo-simple-select-label">{label}</InputLabel> */}
          <Select
            className={`${styles.selectinput} ${className}`}
            {...rest}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={value}
            label={label}
            onChange={(e) => handleChange(e.target.value)}
            placeholder={placeholder}
          >
            {options?.map((option) => (
              <MenuItem value={option.value} key={option}>
                {option.title}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    </>
  );
};

export default SelectInput;

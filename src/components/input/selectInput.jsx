import styled from "@emotion/styled";
import { FormControl, MenuItem, Select } from "@mui/material";
// import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import React from "react";
import styles from "./input.module.css";
import { SVG } from "@assets/svg";

export const SelectBox = styled(Select)`
  & .MuiSelect-select {
    background: #f0f0f0;
    border-radius: 10px;
    color: #121212;
    font-size: 12px;
    font-family: "Poppins";
    font-weight: 400;
  }
  & .Mui-disabled {
    color: #121212;
    -webkit-text-fill-color: #121212;
  }

  & .MuiInputBase-root {
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
  & .MuiSelect-icon {
    top: calc(50% - 0.2em);
    right: 11px;
  }
`;

function SelectInputComponent({
  title,
  labelWeight,
  options,
  className,
  value,
  placeholder,
  style,
  ...rest
}) {
  return (
    <>
      {title ? (
        <label
          className="mb-1 d-inline-block"
          style={{
            fontWeight: labelWeight,
          }}
        >
          {title}
        </label>
      ) : (
        ""
      )}
      <FormControl
        className={`iconsize-select ${className} `}
        sx={{
          "&.MuiSelect-select": {
            fontFamily: "Poppins",
            fontSize: "12px",
            color: "#121212",
          },
        }}
        size="small"
        fullWidth
        style={style || {}}
      >
        <SelectBox
          inputProps={{ "aria-label": "Without label" }}
          IconComponent={SVG.arrowDown}
          value={value}
          displayEmpty
          renderValue={
            value && value.length !== 0
              ? undefined
              : () => <div className={styles.placeholder}>{placeholder}</div>
          }
          {...rest}
        >
          {options.map((option) => {
            return (
              <MenuItem
                value={option.value}
                key={option.value}
                sx={{
                  fontSize: "16px",
                  fontFamily: "Poppins",
                  color: "#121212",
                }}
              >
                {option.label}
              </MenuItem>
            );
          })}
        </SelectBox>
      </FormControl>
    </>
  );
}

export default SelectInputComponent;

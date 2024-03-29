import { TextField, styled } from "@mui/material";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import styles from "./style.module.css";
import React from "react";
import { DATE_FORMAT } from "../../utils/constants/constants";

import { SVG } from "@assets/svg";

export const DateFiled = styled("div")(() => ({
  "& .MuiTextField-root": {
    width: "100%",
  },
  "& .MuiInputBase-root": {
    borderRadius: "50px",
    background: "#f0f0f0",
  },
  "& fieldset": {
    display: "none",
  },
  "& .MuiOutlinedInput-input": {
    padding: "8.5px 14px",
    "@media (max-width: 480px)": {
      padding: "8.5px 8px",
      fontSize: "14px",
    },
  },
  "& .MuiInputLabel-formControl": {
    transform: "translate(14px, 9px) scale(1)",
  },
  "& .MuiInputLabel-shrink": {
    transform: "translate(14px, -7px) scale(1)",
    fontSize: "12px",
  },
  "& input": {
    "&::placeholder": {
      fontSize: "14px",
    },
  },
}));

function DateInputComponent({ renderInput, ...rest }) {
  const props = {};
  if (rest.views) {
    props.views = rest.views;
  } else {
    props.inputFormat = DATE_FORMAT;
  }
  return (
    <DateFiled>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DesktopDatePicker
          className={styles.date_picker_error}
          renderInput={(params) => <TextField {...params} />}
          {...props}
          {...rest}
          components={{
            OpenPickerIcon: SVG.arrowDown,
          }}
        />
      </LocalizationProvider>
    </DateFiled>
  );
}

export default DateInputComponent;

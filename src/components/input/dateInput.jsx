import { TextField } from "@mui/material";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import styles from "./style.module.css";
import React from "react";

function DateInputComponent({ renderInput, ...rest }) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DesktopDatePicker
        className={styles.date_picker_error}
        renderInput={(params) => <TextField {...params} />}
        inputFormat="YYYY/MM/DD"
        {...rest}
      />
    </LocalizationProvider>
  );
}

export default DateInputComponent;

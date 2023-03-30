import { TextField } from "@mui/material";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import styles from "./style.module.css";
import React from "react";
import { DATE_FORMAT } from "@utils/constants/constants";

function DateInputComponent({ renderInput, ...rest }) {
  const props = {};
  if (rest.views) {
    props.views = rest.views;
  } else {
    props.inputFormat = DATE_FORMAT;
  }
  return (
    <div className="date_input">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DesktopDatePicker
          className={styles.date_picker_error}
          renderInput={(params) => <TextField {...params} />}
          {...props}
          {...rest}
        />
      </LocalizationProvider>
    </div>
  );
}

export default DateInputComponent;

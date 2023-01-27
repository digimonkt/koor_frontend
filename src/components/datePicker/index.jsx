import React from "react";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const CustomDatePicker = ({
  dateValue,
  handleDateValue,
  placeholder,
  isDisabled,
}) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        disabled={isDisabled}
        className="date-picker-style"
        label={placeholder}
        value={dateValue}
        onChange={(newValue) => {
          handleDateValue(new Date(newValue));
        }}
        renderInput={(params) => (
          <TextField
            size="small"
            sx={{
              "& .MuiInputLabel-root": {
                color: isDisabled ? "#B2B2B2 !important" : "#757575 !important",
              },
              "& fieldset": {
                display: "none",
              },
            }}
            {...params}
          />
        )}
      />
    </LocalizationProvider>
  );
};

export default CustomDatePicker;

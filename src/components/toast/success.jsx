import { Alert, Snackbar } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";

function SuccessToastComponent({
  message,
  duration,
  open,
  handleClose,
  vertical,
  horizontal,
}) {
  const { stateBar } = useSelector(({ platform }) => platform);
  return (
    <Snackbar
      anchorOrigin={{
        vertical: vertical || "top",
        horizontal: horizontal || "center",
      }}
      open={open}
      autoHideDuration={duration || 2000}
      onClose={handleClose}
    >
      <Alert
        onClose={handleClose}
        severity="success"
        sx={{ width: "100%", marginTop: stateBar + "px" }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
}

export default SuccessToastComponent;

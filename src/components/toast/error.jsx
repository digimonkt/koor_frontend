import { Alert, Snackbar } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";

function ErrorToastComponent({
  message,
  duration,
  open,
  handleClose,
  vertical,
  horizontal,
}) {
  const { stateBar, platform } = useSelector(({ platform }) => platform);
  const ios = platform === "ios";
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
        severity="error"
        sx={{ width: "100%", marginTop: ios ? stateBar + "px" : "0px" }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
}

export default ErrorToastComponent;

import React from "react";
import Dialog from "@mui/material/Dialog";

const DialogBox = ({ open, handleClose, className, children }) => {
  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        ariaLabelledBy="responsive-dialog-title"
        className={`modal-box ${className}`}
        fullWidth="300px"
        maxWidth="sm"
      >
        <div>{children}</div>
      </Dialog>
    </>
  );
};
export default DialogBox;

import React from "react";
import Dialog from "@mui/material/Dialog";

const ModalView = (props) => {
  return (
    <>
      <Dialog
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="responsive-dialog-title"
        className={`modal-box ${props.modalclass}`}
        fullWidth="300px"
        maxWidth="sm"
      >
        <div>{props.content}</div>
      </Dialog>
    </>
  );
};
export default ModalView;

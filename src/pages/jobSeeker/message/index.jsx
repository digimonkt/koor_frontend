import { OutlinedButton } from "@components/button";
import { IconButton, Stack } from "@mui/material";
import React from "react";

const UpdateMessage = ({
  title,
  description,
  buttonHover,
  color,
  bgcolor,
  handleClose,
  buttontext,
  icon,
}) => {
  return (
    <>
      <h1 className="heading">{title}</h1>
      <Stack direction="row" spacing={2}>
        <IconButton
          sx={{
            "&.MuiIconButton-root": {
              backgroundColor: bgcolor,
              width: "101px",
              height: "101px",
              color: { color },
            },
          }}
        >
          {icon}
        </IconButton>
        <div className="description">{description}</div>
      </Stack>
      <div className="text-center mt-3">
        <OutlinedButton
          title={buttontext}
          sx={{
            "&.MuiButton-outlined": {
              border: `1px solid ${color} !important`,
              color: `${color} !important`,
              fontWeight: "500",
              fontSize: "16px",
              padding: "10px 30px",
              "&:hover": { background: buttonHover },
            },
          }}
          onClick={handleClose}
        />
      </div>
    </>
  );
};
export default UpdateMessage;

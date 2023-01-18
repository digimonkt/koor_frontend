import { IconButton, Stack } from "@mui/material";
import React from "react";
import { Cbutton } from "../../../../../components/button";

const UpdateInfo = ({
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
      <h1 className="headding">{title}</h1>
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
        <Cbutton
          variant="outlined"
          sx={{
            "&.MuiButton-outlined": {
              borderRadius: "73px",
              border: `1px solid ${color}`,
              color: { color },
              fontWeight: "500",
              fontSize: "16px",
              fontFamily: "Bahnschrift",
              padding: "10px 30px",

              "&:hover": { background: buttonHover },
            },
          }}
          onClick={handleClose}
        >
          {buttontext}
        </Cbutton>
      </div>
    </>
  );
};
export default UpdateInfo;

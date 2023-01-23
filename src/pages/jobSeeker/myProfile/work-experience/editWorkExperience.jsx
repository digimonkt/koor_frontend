import { IconButton, Stack } from "@mui/material";
import React from "react";
import { SVG } from "../../../../assets/svg";
import { OutlinedButton } from "../../../../components/button";
const color = "#EEA23D";
const bgcolor = "#FEEFD3";
const buttonHover = "#eea23d14";
function EditWorkExperience() {
  return (
    <div>
      <>
        <h1 className="headding">Education</h1>
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
            <SVG.WorkIcon />
          </IconButton>
          <div className="description">
            <input type="text" placeholder="degree" name="degree" />
            <input type="text" placeholder="location" name="location" />
            <input type="text" placeholder="description" name="description" />
          </div>
        </Stack>
        <div className="text-center mt-3">
          <OutlinedButton
            title={
              <>
                <span className="me-3 d-inline-flex">
                  <SVG.PlushIcon />
                </span>{" "}
                Add Work Experience
              </>
            }
            sx={{
              "&.MuiButtonBase-root": {
                border: `1px solid ${color} !important`,
                color: `${color} !important`,
                "&:hover": { background: buttonHover },
              },
            }}
          />
        </div>
      </>
    </div>
  );
}

export default EditWorkExperience;

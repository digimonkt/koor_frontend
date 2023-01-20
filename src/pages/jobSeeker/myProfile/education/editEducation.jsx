import { IconButton, Stack } from "@mui/material";
import React, { useState } from "react";
import { SVG } from "../../../../assets/svg";
import { OutlinedButton } from "../../../../components/button";

const color = "#EEA23D";
const bgcolor = "#FEEFD3";
const buttonHover = "#eea23d14";
function EditEducation({ handleSubmit }) {
  const [formValues, setFormValues] = useState({
    degree: "",
    location: "",
    description: "",
  });
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormValues({ ...formValues, [name]: value });
  };
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
            <SVG.EducationIcon />
          </IconButton>
          <div className="description">
            <input
              type="text"
              placeholder="degree"
              name="degree"
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder="location"
              name="location"
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder="description"
              name="description"
              onChange={handleChange}
            />
          </div>
        </Stack>
        <div className="text-center mt-3">
          <OutlinedButton
            title={
              <>
                <span className="me-3 d-inline-flex">
                  <SVG.PlushIcon />
                </span>{" "}
                Add education
              </>
            }
            sx={{
              "&.MuiButtonBase-root": {
                border: `1px solid ${color} !important`,
                color: `${color} !important`,
                "&:hover": { background: buttonHover },
              },
            }}
            onClick={handleSubmit}
          />
        </div>
      </>
    </div>
  );
}

export default EditEducation;

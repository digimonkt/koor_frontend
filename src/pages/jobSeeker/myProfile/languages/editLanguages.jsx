import { IconButton, Stack } from "@mui/material";
import React, { useState } from "react";
import { SVG } from "@assets/svg";
import { OutlinedButton } from "@components/button";

const color = "#EEA23D";
const bgcolor = "#FEEFD3";
const buttonHover = "#eea23d14";

function EditLanguages({ handleSubmit }) {
  const [formValues, setFormValues] = useState({
    name: "",
    spoken: "",
    written: "",
  });
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormValues({ ...formValues, [name]: value });
  };
  return (
    <div>
      <>
        <h1 className="headding">Languages</h1>
        <Stack
          direction="row"
          spacing={2}
          alignItems={{ xs: "start", lg: "center" }}
          className="mb-3"
        >
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
            <SVG.LanguageIcon />
          </IconButton>
          <div className="description">
            <Stack
              direction={{ xs: "column", lg: "row" }}
              spacing={{ xs: 2, lg: 2 }}
              alignItems={{ xs: "start", lg: "center" }}
              className="mb-3"
            >
              <input
                type="text"
                placeholder="Name"
                name="name"
                className="add-form-control"
                onChange={handleChange}
              />
            </Stack>
            <Stack
              direction={{ xs: "column", lg: "row" }}
              spacing={{ xs: 2, lg: 2 }}
              alignItems={{ xs: "start", lg: "center" }}
              className="mb-3"
            >
              <input
                type="text"
                placeholder="Spoken"
                name="spoken"
                className="add-form-control"
                onChange={handleChange}
              />
            </Stack>
            <Stack
              direction={{ xs: "column", lg: "row" }}
              spacing={{ xs: 2, lg: 2 }}
              alignItems={{ xs: "start", lg: "center" }}
              className="mb-3"
            >
              <input
                type="text"
                placeholder="Written"
                name="written"
                className="add-form-control"
                onChange={handleChange}
              />
            </Stack>
          </div>
        </Stack>
        <div className="text-center mt-3">
          <OutlinedButton
            title={
              <>
                <span className="me-3 d-inline-flex">
                  <SVG.PlushIcon />
                </span>{" "}
                Add Language
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

export default EditLanguages;

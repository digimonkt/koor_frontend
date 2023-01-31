import { IconButton, Stack } from "@mui/material";
import React, { useState } from "react";
import { SVG } from "@assets/svg";
import { OutlinedButton } from "@components/button";

const color = "#EEA23D";
const bgcolor = "#FEEFD3";
const buttonHover = "#eea23d14";

const CreateLanguages = ({ saveTask }) => {
  const [language, setLanguage] = useState("");
  const [spoken, setSpoken] = useState("");
  const [written, setWritten] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "language") {
      setLanguage(value);
    } else if (name === "spoken") {
      setSpoken(value);
    } else if (name === "written") {
      setWritten(value);
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    const taskObj = {};
    taskObj.language = language;
    taskObj.spoken = spoken;
    taskObj.written = written;
    saveTask(taskObj);
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
                placeholder="Language"
                name="language"
                value={language}
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
                value={spoken}
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
                value={written}
                className="add-form-control"
                onChange={handleChange}
              />
            </Stack>
          </div>
        </Stack>
        <div className="text-center mt-3">
          <OutlinedButton
            onClick={handleSave}
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
          />
        </div>
      </>
    </div>
  );
};

export default CreateLanguages;

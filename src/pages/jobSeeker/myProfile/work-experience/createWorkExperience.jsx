import { IconButton, Stack } from "@mui/material";
import React, { useState } from "react";
import { SVG } from "@assets/svg";
import { OutlinedButton } from "@components/button";

const color = "#EEA23D";
const bgcolor = "#FEEFD3";
const buttonHover = "#eea23d14";

const CreateWorkExperience = ({ saveTask }) => {
  const [role, setRole] = useState("");
  const [description, setDescription] = useState("");
  const [date, seDate] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "role") {
      setRole(value);
    } else if (name === "description") {
      setDescription(value);
    } else if (name === "date") {
      seDate(value);
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    const taskObj = {};
    taskObj.role = role;
    taskObj.description = description;
    taskObj.date = date;
    saveTask(taskObj);
  };

  return (
    <div>
      <>
        <h1 className="headding">Work Experience</h1>
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
                placeholder="Role"
                name="role"
                value={role}
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
                placeholder="Description"
                name="description"
                value={description}
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
                placeholder="Date"
                name="date"
                value={date}
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
};

export default CreateWorkExperience;

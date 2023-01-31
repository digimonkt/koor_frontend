import { Stack } from "@mui/material";
import React from "react";
import { SVG } from "@assets/svg";
import { OutlinedButton } from "@components/button";
import { LANGUAGE_PROFICIENCY } from "@utils/enum";
import CustomDropDown from "@components/dropDown";

const color = "#EEA23D";
// const bgcolor = "#FEEFD3";
const buttonHover = "#eea23d14";

// language proficiency data
const languageProficiencyData = [
  {
    id: 1,
    title: "Basic",
    value: LANGUAGE_PROFICIENCY.basic,
  },
  {
    id: 2,
    title: "Conversational",
    value: LANGUAGE_PROFICIENCY.conversational,
  },
  {
    id: 3,
    title: "Fluent",
    value: LANGUAGE_PROFICIENCY.fluent,
  },
];

// language data
const languageData = [
  {
    id: 1,
    title: "Hindi",
    value: "hindi",
  },
  {
    id: 2,
    title: "English",
    value: "english",
  },
  {
    id: 3,
    title: "Spanish",
    value: "spanish",
  },
];

function EditLanguages({ handleSubmit }) {
  // formik values and validation

  return (
    <div>
      <>
        <h1 className="headding">Add Languages</h1>
        <Stack
          direction="row"
          spacing={2}
          alignItems={{ xs: "start", lg: "center" }}
          className="mb-3"
        >
          {/* <IconButton
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
          </IconButton> */}
          <div style={{ width: "100%" }} className="description">
            <Stack
              direction={{ xs: "column", lg: "row" }}
              spacing={{ xs: 2, lg: 2, md: 2 }}
              alignItems={{ xs: "start", lg: "center" }}
              className="mb-3"
            >
              <label
                style={{ fontWeight: 700, fontSize: "14px" }}
                className="w-40"
              >
                Language
              </label>
              <div style={{ width: "60%" }}>
                <CustomDropDown
                  optionData={languageData}
                  placeholder="Select your language"
                />
              </div>
            </Stack>
            <Stack
              direction={{ xs: "column", lg: "row" }}
              spacing={{ xs: 2, lg: 4.5, md: 2 }}
              alignItems={{ xs: "start", lg: "center" }}
              className="mb-3"
            >
              <label
                style={{ fontWeight: 700, fontSize: "14px" }}
                className="w-40"
              >
                Spoken
              </label>
              <div style={{ width: "60%" }}>
                <CustomDropDown
                  optionData={languageProficiencyData}
                  placeholder="Select your proficiency"
                />
              </div>
            </Stack>
            <Stack
              direction={{ xs: "column", lg: "row" }}
              spacing={{ xs: 2, lg: 4.5, md: 2 }}
              alignItems={{ xs: "start", lg: "center" }}
              className="mb-3"
            >
              <label
                style={{ fontWeight: 700, fontSize: "14px" }}
                className="w-40"
              >
                Written
              </label>
              <div style={{ width: "60%" }}>
                <CustomDropDown
                  optionData={languageProficiencyData}
                  placeholder="Select your proficiency"
                />
              </div>
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

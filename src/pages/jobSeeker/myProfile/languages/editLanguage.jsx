import { Stack } from "@mui/material";
import React, { useEffect } from "react";
import { SVG } from "@assets/svg";
import { OutlinedButton } from "@components/button";
import { LANGUAGE_PROFICIENCY } from "@utils/enum";
import CustomDropDown from "@components/dropDown";
import { useFormik } from "formik/dist";
import { languageValidationSchema } from "./validation";
import { ErrorMessage } from "@components/caption";

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

function EditLanguages({ handleSubmit, updateData }) {
  // formik values and validation
  const formik = useFormik({
    initialValues: {
      id: "",
      language: "",
      spoken: "",
      written: "",
    },
    validationSchema: languageValidationSchema,
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  useEffect(() => {
    formik.setValues({
      ...formik.values,
      id: updateData.id,
      language: updateData.language,
      spoken: updateData.spoken,
      written: updateData.written,
    });
  }, []);

  return (
    <div>
      <>
        <h1 className="headding">Edit Languages</h1>
        <Stack
          direction="row"
          spacing={2}
          alignItems={{ xs: "start", lg: "center" }}
          className="mb-3"
        >
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
                  value={formik.values.language}
                  onChange={(vl) =>
                    formik.setValues({ ...formik.values, language: vl })
                  }
                />
                {formik.touched.language && formik.errors.language ? (
                  <ErrorMessage>{formik.errors.language}</ErrorMessage>
                ) : null}
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
                  value={formik.values.spoken}
                  onChange={(vl) =>
                    formik.setValues({ ...formik.values, spoken: vl })
                  }
                />
                {formik.touched.spoken && formik.errors.spoken ? (
                  <ErrorMessage>{formik.errors.spoken}</ErrorMessage>
                ) : null}
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
                  value={formik.values.written}
                  onChange={(vl) =>
                    formik.setValues({ ...formik.values, written: vl })
                  }
                />
                {formik.touched.written && formik.errors.written ? (
                  <ErrorMessage>{formik.errors.written}</ErrorMessage>
                ) : null}
              </div>
            </Stack>
          </div>
        </Stack>
        <div className="text-center mt-3">
          <OutlinedButton
            onClick={formik.handleSubmit}
            title={
              <>
                <span className="me-3 d-inline-flex">
                  <SVG.PlushIcon />
                </span>
                Update Language
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

export default EditLanguages;

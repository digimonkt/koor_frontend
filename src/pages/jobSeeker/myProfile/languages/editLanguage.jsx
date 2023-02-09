import { Stack } from "@mui/material";
import React, { useEffect } from "react";
import { SVG } from "@assets/svg";
import { OutlinedButton } from "@components/button";
import { LANGUAGE_PROFICIENCY } from "@utils/enum";
import { useFormik } from "formik/dist";
import { languageValidationSchema } from "./validation";
import { ErrorMessage } from "@components/caption";
import SelectInputComponent from "@components/input/selectInput";
import { useDispatch, useSelector } from "react-redux";
import { setLanguages } from "@redux/slice/user";

const color = "#EEA23D";
// const bgcolor = "#FEEFD3";
const buttonHover = "#eea23d14";

// language proficiency data
const languageProficiencyData = [
  {
    id: 1,
    label: "Basic",
    value: LANGUAGE_PROFICIENCY.basic,
  },
  {
    id: 2,
    label: "Conversational",
    value: LANGUAGE_PROFICIENCY.conversational,
  },
  {
    id: 3,
    label: "Fluent",
    value: LANGUAGE_PROFICIENCY.fluent,
  },
];

// language data
const languageData = [
  {
    id: 1,
    label: "Hindi",
    value: "hindi",
  },
  {
    id: 2,
    label: "English",
    value: "english",
  },
  {
    id: 3,
    label: "Spanish",
    value: "spanish",
  },
];

function EditLanguages({ handleClose, updateData, buttonTitle, modalTitle }) {
  // redux dispatcher and selector
  const dispatch = useDispatch();
  const languagesData = useSelector(
    (state) => state.auth.currentUser.languages
  );

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

  // handle submit language
  const handleCreate = (value) => {
    const result = [...languagesData] || [];
    dispatch(setLanguages([...result, value]));
    handleClose();
  };

  // handle submit edited data
  const handleSubmitEditedData = (data) => {
    const result = languagesData.map((item) =>
      item.id === data.id ? data : item
    );
    dispatch(setLanguages(result));
    handleClose();
  };

  const handleSubmit = (values) => {
    if (updateData) {
      handleSubmitEditedData(values);
    } else {
      handleCreate(values);
    }
  };

  useEffect(() => {
    formik.setValues({
      ...formik.values,
      id: updateData?.id ? updateData?.id : "",
      language: updateData?.language ? updateData?.language : "",
      spoken: updateData?.spoken ? updateData?.spoken : "",
      written: updateData?.written ? updateData?.written : "",
    });
  }, []);

  return (
    <div>
      <>
        <h1 className="headding">{modalTitle}</h1>
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
                <SelectInputComponent
                  options={languageData}
                  placeholder="Select your language"
                  value={formik.values.language}
                  handleChange={(vl) =>
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
                <SelectInputComponent
                  options={languageProficiencyData}
                  placeholder="Select your proficiency"
                  value={formik.values.spoken}
                  handleChange={(vl) =>
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
                <SelectInputComponent
                  options={languageProficiencyData}
                  placeholder="Select your proficiency"
                  value={formik.values.written}
                  handleChange={(vl) =>
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
                {buttonTitle}
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

import React from "react";
import { SVG } from "@assets/svg";
import { OutlinedButton } from "@components/button";
import { CheckboxInput, DateInput, LabeledInput } from "@components/input";
import { Grid } from "@mui/material";
import { useFormik } from "formik";
import { FormControlReminder } from "@components/style";
import { validateEditEducation } from "../validator";

const color = "#EEA23D";
const buttonHover = "#eea23d14";

function EditEducation({ handleSubmit }) {
  const formik = useFormik({
    initialValues: {
      title: "",
      institute: "",
      educationLevel: "",
      startDate: "",
      endDate: "",
      isPresent: false,
    },
    validationSchema: validateEditEducation,
    onSubmit: (values) => {
      console.log({ values });
    },
  });
  console.log(formik.errors);
  return (
    <div>
      <>
        <h1 className="headding">Education</h1>
        <div className="form-content">
          <form onSubmit={formik.handleSubmit}>
            <div className="form-group mb-3">
              <LabeledInput
                placeholder="Select"
                title="Education Level"
                labelWeight={500}
                className="add-form-control"
                {...formik.getFieldProps("educationLevel")}
              />
            </div>
            <div className="form-group mb-3">
              <LabeledInput
                placeholder="Ex: Certificate in Electronics"
                title="Diploma / certificate / degree"
                labelWeight={500}
                className="add-form-control"
                {...formik.getFieldProps("title")}
              />
            </div>
            <div className="form-group mb-3">
              <LabeledInput
                placeholder="Ex: Singapore Polytechnic"
                title="School /institute"
                labelWeight={500}
                className="add-form-control"
                {...formik.getFieldProps("institute")}
              />
            </div>
            <label
              className="mb-1 d-inline-block"
              style={{
                fontWeight: 500,
              }}
            >
              School period
            </label>
            <Grid container spacing={2}>
              <Grid item lg={6} xs={12}>
                <DateInput
                  label="Start"
                  onChange={(e) => formik.setFieldValue("startDate", e)}
                  value={formik.values.startDate}
                  onBlur={formik.getFieldProps("startDate").onBlur}
                />
              </Grid>
              <Grid item lg={6} xs={12}>
                <DateInput
                  label="End"
                  onChange={(e) => formik.setFieldValue("endDate", e)}
                  value={formik.values.endDate}
                  onBlur={formik.getFieldProps("endDate").onBlur}
                />
              </Grid>
            </Grid>
            <FormControlReminder
              control={
                <CheckboxInput
                  sx={{
                    color: "#CACACA",
                    transition: "all 0.5s ease-out",
                    "&.Mui-checked": {
                      color: "#EEA23D",
                      transition: "all 0.5s ease-out",
                    },
                  }}
                />
              }
              label="I am currently studying"
              onChange={(e) =>
                formik.setFieldValue("isPresent", e.target.checked)
              }
              checked={formik.values.isPresent || false}
            />
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
                type="submit"
              />
            </div>
          </form>
        </div>
      </>
    </div>
  );
}

export default EditEducation;

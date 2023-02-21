import React from "react";
import { SVG } from "@assets/svg";
import { OutlinedButton } from "@components/button";
import {
  CheckboxInput,
  DateInput,
  LabeledInput,
  SelectInput,
} from "@components/input";
import { Grid } from "@mui/material";
import { useFormik } from "formik";
import { FormControlReminder } from "@components/style";
import { validateEditEducation } from "../validator";
import { ErrorMessage } from "@components/caption";
import dayjs from "dayjs";
import { DATE_FORMATE } from "@utils/constants/constants";
import { useSelector } from "react-redux";

const color = "#EEA23D";
const buttonHover = "#eea23d14";

function EditEducation({ handleSubmit }) {
  const { educationLevels } = useSelector((state) => state.choices);
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
      const payload = {
        title: values.title,
        institute: values.institute,
        education_level: values.educationLevel,
        start_date: dayjs(values.startDate).format(DATE_FORMATE),
        end_date: values.isPresent
          ? null
          : dayjs(values.endDate).format(DATE_FORMATE),
      };
      console.log({ payload });
    },
  });
  return (
    <div>
      <>
        <h1 className="headding">Education</h1>
        <div className="form-content">
          <form onSubmit={formik.handleSubmit}>
            <div className="form-group mb-3">
              <SelectInput
                placeholder="Select"
                title="Education Level"
                labelWeight={500}
                className="add-form-control"
                options={educationLevels.data.map((education) => ({
                  label: education.title,
                  value: education.id,
                }))}
                {...formik.getFieldProps("educationLevel")}
              />
              {formik.touched.educationLevel && formik.errors.educationLevel ? (
                <ErrorMessage>{formik.errors.educationLevel}</ErrorMessage>
              ) : null}
            </div>
            <div className="form-group mb-3">
              <LabeledInput
                placeholder="Ex: Certificate in Electronics"
                title="Diploma / certificate / degree"
                labelWeight={500}
                className="add-form-control"
                {...formik.getFieldProps("title")}
              />
              {formik.touched.title && formik.errors.title ? (
                <ErrorMessage>{formik.errors.title}</ErrorMessage>
              ) : null}
            </div>
            <div className="form-group mb-3">
              <LabeledInput
                placeholder="Ex: Singapore Polytechnic"
                title="School / institute"
                labelWeight={500}
                className="add-form-control"
                {...formik.getFieldProps("institute")}
              />
              {formik.touched.institute && formik.errors.institute ? (
                <ErrorMessage>{formik.errors.institute}</ErrorMessage>
              ) : null}
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
                {formik.touched.startDate && formik.errors.startDate ? (
                  <ErrorMessage>{formik.errors.startDate}</ErrorMessage>
                ) : null}
              </Grid>
              <Grid item lg={6} xs={12}>
                <DateInput
                  label="End"
                  onChange={(e) => formik.setFieldValue("endDate", e)}
                  value={formik.values.endDate}
                  onBlur={formik.getFieldProps("endDate").onBlur}
                />
                {formik.touched.endDate && formik.errors.endDate ? (
                  <ErrorMessage>{formik.errors.endDate}</ErrorMessage>
                ) : null}
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

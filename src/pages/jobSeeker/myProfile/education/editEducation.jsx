import React, { useEffect, useState } from "react";
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
import { DATABASE_DATE_FORMAT, DATE_FORMAT } from "@utils/constants/constants";
import { useDispatch, useSelector } from "react-redux";
import {
  addEducationDetailsAPI,
  updateEducationDetailsAPI,
} from "@api/jobSeeker";
import { setSuccessToast } from "@redux/slice/toast";
import Loader from "@components/loader";
import { addEducationRecord, updateEducationRecord } from "@redux/slice/user";

const color = "#EEA23D";
const buttonHover = "#eea23d14";
function EditEducation({ handleSubmit, currentSelected, handleClose }) {
  const dispatch = useDispatch();
  const { educationLevels } = useSelector((state) => state.choices);
  const [loading, setLoading] = useState(false);
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
    onSubmit: async (values) => {
      setLoading(true);
      const payload = {
        title: values.title,
        institute: values.institute,
        education_level: values.educationLevel,
        start_date: dayjs(values.startDate).format(DATABASE_DATE_FORMAT),
        end_date: values.isPresent
          ? null
          : dayjs(values.endDate).format(DATABASE_DATE_FORMAT),
      };
      if (!currentSelected) {
        const res = await addEducationDetailsAPI(payload);
        if (res.remote === "success") {
          const { data } = res.data;
          dispatch(setSuccessToast("Added Successfully"));
          dispatch(
            addEducationRecord({
              id: data.id,
              title: data.title,
              institute: data.institute,
              educationLevel: educationLevels.data.find(
                (record) => record.id === data.education_level
              ),
              startDate: dayjs(data.start_date).format(DATE_FORMAT),
              endDate: !data.end_date
                ? null
                : dayjs(data.end_date).format(DATE_FORMAT),
              present: !data.end_date,
            })
          );
          handleSubmit();
        }
      } else {
        const res = await updateEducationDetailsAPI(
          currentSelected.id,
          payload
        );
        if (res.remote === "success") {
          dispatch(setSuccessToast("Updated Successfully"));
          dispatch(
            updateEducationRecord({
              id: currentSelected.id,
              title: values.title,
              institute: values.institute,
              educationLevel: educationLevels.data.find(
                (record) => record.id === values.educationLevel
              ),
              startDate: dayjs(values.startDate).format(DATE_FORMAT),
              endDate: values.isPresent
                ? null
                : dayjs(values.endDate).format(DATE_FORMAT),
              present: values.isPresent,
            })
          );
          handleSubmit();
        }
      }
      setLoading(false);
    },
  });
  useEffect(() => {
    if (currentSelected) {
      const payload = {
        title: currentSelected.title,
        institute: currentSelected.institute,
        educationLevel: currentSelected.educationLevel.id,
        startDate: dayjs(currentSelected.startDate),
        endDate: dayjs(currentSelected.endDate),
        isPresent: !currentSelected.endDate,
      };
      for (const key in payload) {
        formik.setFieldValue(key, payload[key]);
      }
    }
  }, [currentSelected]);
  return (
    <div>
      <div className="heading-div">
        <h1 className="heading">Add education</h1>
        <SVG.CrossCircle className="cross-circle" onClick={handleClose} />
      </div>
      <div className="form-content">
        <form onSubmit={formik.handleSubmit}>
          <div className="form-group mb-4 mt-3 ">
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
          <div className="form-group mb-4">
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
          <div className="form-group mb-4">
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
            className=" d-inline-block mb-3"
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
                views={["year"]}
                onChange={(e) => formik.setFieldValue("startDate", e)}
                maxDate={dayjs()}
                value={formik.values.startDate}
                onBlur={formik.getFieldProps("startDate").onBlur}
                inputProps={{
                  placeholder: "Select year"
                }}
              />
              {formik.touched.startDate && formik.errors.startDate ? (
                <ErrorMessage>{formik.errors.startDate}</ErrorMessage>
              ) : null}
            </Grid>
            <Grid item lg={6} xs={12}>
              <DateInput
                label="End"
                views={["year"]}
                placeholder={"Slect year"}
                onChange={(e) => formik.setFieldValue("endDate", e)}
                value={formik.values.endDate}
                minDate={formik.values.startDate}
                maxDate={dayjs().year(dayjs().year())}
                onBlur={formik.getFieldProps("endDate").onBlur}
                inputProps={{
                  placeholder: "Select year"
                }}
                disabled={formik.values.isPresent || !formik.values.startDate}
              />
              {formik.touched.endDate && formik.errors.endDate ? (
                <ErrorMessage>{formik.errors.endDate}</ErrorMessage>
              ) : null}
            </Grid>
          </Grid>
          <FormControlReminder
            sx={{ mt: 2 }}
            className="studying"
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
                  {loading ? (
                    <Loader loading={loading} style={{ color: "#EEA23D" }} />
                  ) : (
                    <>
                      <span className="me-3 d-inline-flex">
                        <SVG.SaveFile />
                      </span>{" "}
                      {currentSelected ? "Update education" : "Save education"}
                    </>
                  )}
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
              disabled={loading}
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditEducation;

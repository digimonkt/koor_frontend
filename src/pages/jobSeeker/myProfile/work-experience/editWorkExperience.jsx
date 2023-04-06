import {
  addWorkExperienceDetailsAPI,
  updateWorkExperienceDetailsAPI,
} from "@api/jobSeeker";
import { SVG } from "@assets/svg";
import { OutlinedButton } from "@components/button";
import { ErrorMessage } from "@components/caption";
import { CheckboxInput, DateInput, LabeledInput } from "@components/input";
import Loader from "@components/loader";
import { FormControlReminder } from "@components/style";
import { Grid } from "@mui/material";
import { setSuccessToast } from "@redux/slice/toast";
import {
  addWorkExperienceRecord,
  updateWorkExperienceRecord,
} from "@redux/slice/user";
import { DATABASE_DATE_FORMAT, DATE_FORMAT } from "@utils/constants/constants";
import dayjs from "dayjs";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { validateWorkExperience } from "../validator";

const color = "#EEA23D";
const buttonHover = "#eea23d14";

function EditWorkExperience({ handleSubmit, currentSelected }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const formik = useFormik({
    initialValues: {
      title: "",
      companyName: "",
      startDate: "",
      endDate: "",
      isPresent: false,
      description: "",
    },
    validationSchema: validateWorkExperience,
    onSubmit: async (values) => {
      setLoading(true);
      const payload = {
        title: values.title,
        organization: values.companyName,
        start_date: dayjs(values.startDate).format(DATABASE_DATE_FORMAT),
        end_date: values.isPresent
          ? null
          : dayjs(values.endDate).format(DATABASE_DATE_FORMAT),
        description: values.description,
      };
      if (!currentSelected) {
        const res = await addWorkExperienceDetailsAPI(payload);
        if (res.remote === "success") {
          dispatch(setSuccessToast("Added Work Experience Successfully"));
          dispatch(
            addWorkExperienceRecord({
              id: res.data.data.id,
              title: res.data.data.title,
              startDate: res.data.data.startDate,
              endDate: res.data.data.endDate,
              present: values.isPresent,
              organization: res.data.data.organization,
              description: res.data.data.description,
            })
          );
          handleSubmit();
        }
      } else {
        const res = await updateWorkExperienceDetailsAPI({
          ...payload,
          id: currentSelected.id,
        });
        if (res.remote === "success") {
          dispatch(setSuccessToast("Updated Work Experience Successfully"));
          dispatch(
            updateWorkExperienceRecord({
              id: currentSelected.id,
              title: values.title,
              organization: values.companyName,
              startDate: dayjs(values.startDate).format(DATE_FORMAT),
              endDate: values.isPresent
                ? null
                : dayjs(values.endDate).format(DATE_FORMAT),
              present: values.isPresent,
              description: values.description,
            })
          );
        }
      }
      setLoading(false);
      handleSubmit();
    },
  });
  useEffect(() => {
    if (currentSelected) {
      const payload = {
        title: currentSelected.title,
        companyName: currentSelected.organization,
        startDate: dayjs(currentSelected.startDate),
        endDate: dayjs(currentSelected.endDate),
        isPresent: !currentSelected.endDate,
        description: currentSelected.description,
      };
      for (const key in payload) {
        formik.setFieldValue(key, payload[key]);
      }
    }
  }, [currentSelected]);
  return (
    <div>
      <h1 className="heading">Work Experience</h1>
      <div className="form-content">
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            <Grid item lg={6} xs={12}>
              <div className="form-group mb-3">
                <LabeledInput
                  placeholder="Your job title"
                  title="Job title"
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
                  placeholder="Company name"
                  title="Your company name"
                  labelWeight={500}
                  className="add-form-control"
                  {...formik.getFieldProps("companyName")}
                />
                {formik.touched.companyName && formik.errors.companyName ? (
                  <ErrorMessage>{formik.errors.companyName}</ErrorMessage>
                ) : null}
              </div>
              <label
                className="mb-3 d-inline-block"
                style={{
                  fontWeight: 500,
                }}
              >
                Working period
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
                  />
                  {formik.touched.startDate && formik.errors.startDate ? (
                    <ErrorMessage>{formik.errors.startDate}</ErrorMessage>
                  ) : null}
                </Grid>
                <Grid item lg={6} xs={12}>
                  <DateInput
                    label="End"
                    views={["year"]}
                    onChange={(e) => formik.setFieldValue("endDate", e)}
                    value={formik.values.endDate}
                    minDate={formik.values.startDate}
                    onBlur={formik.getFieldProps("endDate").onBlur}
                    disabled={
                      formik.values.isPresent || !formik.values.startDate
                    }
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
            </Grid>
            <Grid item lg={6} xs={12}>
              <div className="form-group mb-3">
                <LabeledInput
                  placeholder="Job key responsibilities"
                  title="Write more about your responsibilities at this role"
                  labelWeight={500}
                  className="add-form-control"
                  type="textarea"
                  style={{ height: "120px" }}
                  {...formik.getFieldProps("description")}
                />
                {formik.touched.description && formik.errors.description ? (
                  <ErrorMessage>{formik.errors.description}</ErrorMessage>
                ) : null}
              </div>
            </Grid>
          </Grid>
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
                      {currentSelected
                        ? "Update work experience"
                        : "Save work experience"}
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

export default EditWorkExperience;

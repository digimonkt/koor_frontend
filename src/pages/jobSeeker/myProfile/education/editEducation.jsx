import { Stack } from "@mui/material";
import React, { useEffect } from "react";
import { SVG } from "@assets/svg";
import { OutlinedButton } from "@components/button";
import CustomDatePicker from "@components/datePicker";
import CustomCheckBox from "@components/checkBox";
import { useFormik } from "formik";
import { educationValidationSchema } from "./validation";
import { ErrorMessage } from "@components/caption";
import { useDispatch, useSelector } from "react-redux";
import { setEducationRecord } from "@redux/slice/user";
import { setModalOpen } from "@redux/slice/modal";

const color = "#EEA23D";
// const bgcolor = "#FEEFD3";
const buttonHover = "#eea23d14";

const EditEducation = ({ editData, buttonTitle, modalTitle, handleClose }) => {
  // redux dispatch and selector
  const dispatch = useDispatch();
  const educationData = useSelector(
    (state) => state.auth.currentUser.educationRecord
  );

  // formik validation and values setup

  const formik = useFormik({
    initialValues: {
      id: "",
      organization: "",
      degree: "",
      startDate: "",
      endDate: "",
      description: "",
      isPresent: false,
    },
    validationSchema: educationValidationSchema,
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  // handle submit
  const handleCreate = (value) => {
    const result = [...educationData] || [];
    dispatch(setEducationRecord([...result, value]));
    handleClose();
  };

  // handle submit edited data
  const handleSubmitEditedData = (data) => {
    const result = educationData.map((item) =>
      item.id === data.id ? data : item
    );

    dispatch(setEducationRecord(result));
    dispatch(setModalOpen(""));
  };

  const handleSubmit = (values) => {
    if (editData) {
      handleSubmitEditedData(values);
    } else {
      handleCreate(values);
    }
  };

  useEffect(() => {
    formik.setValues({
      ...formik.values,
      id: editData?.id ? editData?.id : "",
      organization: editData?.organization ? editData?.organization : "",
      degree: editData?.degree ? editData?.degree : "",
      startDate: editData?.startDate ? editData?.startDate : "",
      endDate: editData?.endDate ? editData?.endDate : "",
      description: editData?.description ? editData?.description : "",
      isPresent: editData?.isPresent ? editData?.isPresent : false,
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
          <div className="description">
            <Stack
              direction={{ xs: "column", lg: "row" }}
              spacing={{ xs: 2, lg: 2 }}
              alignItems={{ xs: "start", lg: "center" }}
              className="mb-3"
            >
              <div>
                <input
                  type="text"
                  placeholder="Organinzation"
                  className="add-form-control"
                  {...formik.getFieldProps("organization")}
                />
                {formik.touched.organization && formik.errors.organization ? (
                  <ErrorMessage>{formik.errors.organization}</ErrorMessage>
                ) : null}
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Degree"
                  className="add-form-control"
                  {...formik.getFieldProps("degree")}
                />
                {formik.touched.degree && formik.errors.degree ? (
                  <ErrorMessage>{formik.errors.degree}</ErrorMessage>
                ) : null}
              </div>
            </Stack>
            <Stack
              direction={{ xs: "column", lg: "row" }}
              spacing={{ xs: 2, lg: 2 }}
              alignItems={{ xs: "start", lg: "center" }}
              className="mb-3"
            >
              <div>
                <CustomDatePicker
                  placeholder="start date"
                  dateValue={formik.values.startDate}
                  handleDateValue={(vl) =>
                    formik.setValues({ ...formik.values, startDate: vl })
                  }
                />
                {formik.touched.startDate && formik.errors.startDate ? (
                  <ErrorMessage>{formik.errors.startDate}</ErrorMessage>
                ) : null}
              </div>
              <div>
                <CustomDatePicker
                  isDisabled={formik.values.isPresent}
                  placeholder="end date"
                  dateValue={formik.values.endDate}
                  handleDateValue={(vl) =>
                    formik.setValues({ ...formik.values, endDate: vl })
                  }
                />
                {formik.touched.endDate && formik.errors.endDate ? (
                  <ErrorMessage>{formik.errors.endDate}</ErrorMessage>
                ) : null}
              </div>
            </Stack>
            <Stack
              direction={{ xs: "column", lg: "row" }}
              spacing={{ xs: 2, lg: 2 }}
              className="mb-3"
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
              }}
            >
              <CustomCheckBox
                checked={formik.values.isPresent}
                handleChecked={(vl) =>
                  formik.setValues({ ...formik.values, isPresent: vl })
                }
                label="Present"
              />
            </Stack>

            <Stack
              direction={{ xs: "column", lg: "row" }}
              spacing={{ xs: 2, lg: 2 }}
              alignItems={{ xs: "start", lg: "center" }}
              className="mb-3"
            >
              <div>
                <textarea
                  type="text"
                  placeholder="Description"
                  className="add-form-control-textarea"
                  rows="4"
                  cols="50"
                  {...formik.getFieldProps("description")}
                />
                {formik.touched.description && formik.errors.description ? (
                  <ErrorMessage>{formik.errors.description}</ErrorMessage>
                ) : null}
              </div>
            </Stack>
          </div>
        </Stack>
        <div className="text-center mt-3">
          <OutlinedButton
            title={
              <>
                <span className="me-3 d-inline-flex">
                  <SVG.EditIcon />
                </span>{" "}
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
            onClick={formik.handleSubmit}
          />
        </div>
      </>
    </div>
  );
};

export default EditEducation;

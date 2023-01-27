import { Stack } from "@mui/material";
import React, { useState } from "react";
import { SVG } from "@assets/svg";
import { OutlinedButton } from "@components/button";
import CustomDatePicker from "@components/datePicker";
import CustomCheckBox from "@components/checkBox";
import { generateRandomId } from "@utils/fakeData";

const color = "#EEA23D";
// const bgcolor = "#FEEFD3";
const buttonHover = "#eea23d14";

function AddEducation({ handleSubmit }) {
  const [educationData, setEducationData] = useState({
    id: generateRandomId(7),
    organization: "",
    degree: "",
    startDate: "",
    endDate: "",
    description: "",
    isPresent: false,
  });
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setEducationData({ ...educationData, [name]: value });
  };

  return (
    <div>
      <>
        <h1 className="headding">Add Education</h1>
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
            <SVG.EducationIcon />
          </IconButton> */}
          <div className="description">
            <Stack
              direction={{ xs: "column", lg: "row" }}
              spacing={{ xs: 2, lg: 2 }}
              alignItems={{ xs: "start", lg: "center" }}
              className="mb-3"
            >
              <input
                type="text"
                placeholder="Organinzation"
                className="add-form-control"
                name="organization"
                onChange={handleChange}
              />
              <input
                type="text"
                placeholder="Degree"
                className="add-form-control"
                name="degree"
                onChange={handleChange}
              />
            </Stack>
            <Stack
              direction={{ xs: "column", lg: "row" }}
              spacing={{ xs: 2, lg: 2 }}
              alignItems={{ xs: "start", lg: "center" }}
              className="mb-3"
            >
              <CustomDatePicker
                placeholder="start date"
                dateValue={educationData.startDate}
                handleDateValue={(vl) =>
                  setEducationData((prev) => ({
                    ...prev,
                    startDate: vl,
                  }))
                }
              />
              <CustomDatePicker
                isDisabled={educationData.isPresent}
                placeholder="end date"
                dateValue={educationData.endDate}
                handleDateValue={(vl) =>
                  setEducationData((prev) => ({
                    ...prev,
                    endDate: vl,
                  }))
                }
              />
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
                checked={educationData.isPresent}
                handleChecked={(vl) =>
                  setEducationData((prev) => ({ ...prev, isPresent: vl }))
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
              <textarea
                type="text"
                placeholder="Description"
                className="add-form-control-textarea"
                name="description"
                rows="4"
                cols="50"
                onChange={handleChange}
              />
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
            onClick={() => handleSubmit(educationData)}
          />
        </div>
      </>
    </div>
  );
}

export default AddEducation;

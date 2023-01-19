import {
  Card,
  CardContent,
  Checkbox,
  FormControl,
  FormGroup,
  MenuItem,
  Radio,
  RadioGroup,
  Stack,
} from "@mui/material";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { SVG } from "../../../assets/svg";
import { Cbutton } from "../../../components/button";
import { FormControlReminder, FormLabelBox, SelectBox } from "./style";

const AddInfoProfileUpdate = (props) => {
  const [age, setAge] = useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };
  const [startDate, setStartDate] = useState(new Date());
  const [city, setCity] = useState("");
  const handleCity = (event) => {
    setCity(event.target.value);
  };
  return (
    <>
      <Card
        sx={{
          "&.MuiCard-root": {
            boxShadow: "0px 15px 40px rgba(0, 0, 0, 0.05)",
            borderRadius: "10px",
          },
        }}
      >
        <CardContent
          sx={{
            "&.MuiCardContent-root": {
              padding: "30px",
            },
          }}
        >
          <div className="add-content">
            <h2 className="mb-4">About Me</h2>
            <form>
              <Stack
                direction={{ xs: "column", lg: "row" }}
                spacing={{ xs: 2, lg: 2 }}
                alignItems={{ xs: "start", lg: "center" }}
                className="mb-3"
              >
                <label className="w-30">Email</label>
                <div className="w-70">
                  <input
                    type="text"
                    placeholder="Vlad Blyshchyk"
                    className="add-form-control"
                    value="Vlad Blyshchyk"
                  />
                </div>
              </Stack>
              <Stack
                direction={{ xs: "column", lg: "row" }}
                spacing={{ xs: 2, lg: 2 }}
                alignItems={{ xs: "start", lg: "center" }}
                className="mb-3"
              >
                <label className="w-30">Mobile number (optional)</label>
                <div className="w-70">
                  <input
                    type="text"
                    placeholder="599268290"
                    className="add-form-control"
                    value="599268290"
                  />
                </div>
              </Stack>
              <Stack
                direction={{ xs: "column", lg: "row" }}
                spacing={{ xs: 2, lg: 2, md: 2 }}
                alignItems={{ xs: "start", lg: "center" }}
                className="mb-3"
              >
                <label className="w-30">Gender</label>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                >
                  <FormLabelBox
                    value="male"
                    control={
                      <Radio
                        sx={{
                          color: "#CACACA",
                          "&.Mui-checked": {
                            color: "#EEA23D",
                          },
                        }}
                      />
                    }
                    label="Male"
                  />
                  <FormLabelBox
                    value="female"
                    control={
                      <Radio
                        sx={{
                          color: "#CACACA",
                          "&.Mui-checked": {
                            color: "#EEA23D",
                          },
                        }}
                      />
                    }
                    label="Female"
                  />
                </RadioGroup>
              </Stack>
              <Stack
                direction={{ xs: "column", lg: "row" }}
                spacing={{ xs: 2, lg: 2, md: 2 }}
                alignItems={{ xs: "start", lg: "center" }}
                className="mb-3"
              >
                <label className="w-30">Birth date</label>
                <div className="w-70">
                  <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    className="add-form-control"
                  />
                </div>
              </Stack>
              <Stack
                direction={{ xs: "column", lg: "row" }}
                spacing={{ xs: 2, lg: 2, md: 2 }}
                alignItems={{ xs: "start", lg: "center" }}
                className="mb-3"
              >
                <label className="w-30">Employment status</label>
                <div className="w-70">
                  <FormControl fullWidth size="small">
                    <SelectBox
                      value={age}
                      onChange={handleChange}
                      displayEmpty
                      inputProps={{ "aria-label": "Without label" }}
                      IconComponent={KeyboardArrowUpIcon}
                    >
                      <MenuItem value="">
                        <em
                          style={{
                            color: "#848484",
                            fontStyle: "normal",
                            fontWeight: 400,
                          }}
                        >
                          {" "}
                          Select your status
                        </em>
                      </MenuItem>
                      <MenuItem value={10}>Select your status</MenuItem>
                    </SelectBox>
                  </FormControl>
                </div>
              </Stack>
              <Stack
                direction={{ xs: "column", lg: "row" }}
                spacing={{ xs: 2, lg: 2, md: 2 }}
                alignItems={{ xs: "start", lg: "center" }}
                className="mb-3"
              >
                <label className="w-30">Highest education (optional)</label>
                <div className="w-70">
                  <FormControl fullWidth size="small">
                    <SelectBox
                      value={city}
                      onChange={handleCity}
                      displayEmpty
                      inputProps={{ "aria-label": "Without label" }}
                      IconComponent={KeyboardArrowUpIcon}
                    >
                      <MenuItem value="">Art diretor</MenuItem>
                      <MenuItem value={10}>Art diretor 1 </MenuItem>
                      <MenuItem value={11}>Art diretor 2</MenuItem>
                    </SelectBox>
                  </FormControl>
                </div>
              </Stack>
              <Stack
                direction={{ xs: "column", lg: "row" }}
                spacing={{ xs: 2, lg: 2, md: 2 }}
                className="mb-3"
              >
                <label className="w-30">Introduce yourself (optional)</label>
                <div className="w-70">
                  <textarea
                    className="form-control-area"
                    placeholder="Write a few words about yourself"
                  ></textarea>
                </div>
              </Stack>
              <FormGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
              >
                <FormControlReminder
                  value="wish"
                  control={
                    <Checkbox
                      icon={<SVG.UncheckIcon />}
                      checkedIcon={<SVG.CheckBoxIcon />}
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
                  label=" I wish to receive Job Application Notifications and other Job-related information from Koor "
                />
                <FormControlReminder
                  value="receive"
                  control={
                    <Checkbox
                      icon={<SVG.UncheckIcon />}
                      checkedIcon={<SVG.CheckBoxIcon />}
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
                  label="I wish to receive marketing information from Koor and/or service providers on products or services offered by Koor or other parties."
                />
              </FormGroup>
              <div className="text-center mt-5">
                <Cbutton
                  onClick={props.handleClickOpen}
                  variant="outlined"
                  sx={{
                    "&.MuiButton-outlined": {
                      borderRadius: "73px",
                      border: "1px solid #EEA23D",
                      color: "#EEA23D",
                      fontWeight: "500",
                      fontSize: "16px",
                      fontFamily: "Bahnschrift",
                      padding: "10px 30px",
                      "&:hover": { background: "rgba(255, 165, 0, 0.1)" },
                      "@media (max-width: 992px)": {
                        padding: "10px 16px",
                        fontSize: "14px",
                      },
                    },
                  }}
                >
                  <span className="me-2 d-inline-flex">
                    <SVG.CheckIcon />
                  </span>{" "}
                  update info
                </Cbutton>
              </div>
            </form>
          </div>
        </CardContent>
      </Card>
    </>
  );
};
export default AddInfoProfileUpdate;

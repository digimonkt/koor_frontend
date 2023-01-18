import {
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
  MenuItem,
  Select,
  Stack,
} from "@mui/material";
import React, { useState } from "react";
import { SVG } from "../../../../assets/svg";
import styled from "@emotion/styled";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Cbutton } from "../../../../components/button";

export const SelectBox = styled(Select)`
  & .MuiSelect-select {
    background: #f0f0f0;
    border-radius: 10px;
  }
  &.MuiInputBase-root {
    border-radius: 0px;
    font-family: "Poppins";
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 22px;

    letter-spacing: 0.02em;
    opacity: 0.5;
    color: #121212;
  }
  & fieldset {
    display: none;
  }
`;
export const JobFormControl = styled(FormControlLabel)`
  & .MuiFormControlLabel-label {
    font-family: "Poppins";
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    letter-spacing: 0.02em;
    color: #121212;
  }
`;
const JobPreferences = () => {
  const [isSelect, setIsSelect] = useState("");
  const handleChange = (event) => {
    setIsSelect(event.target.value);
  };
  return (
    <>
      <div className="add-content">
        <h2>Job preferences</h2>
        <Stack
          direction={{ xs: "column", lg: "row" }}
          spacing={{ xs: 2, lg: 2, md: 2 }}
          alignItems={{ xs: "start", lg: "center" }}
        >
          <label className="w-25">Availability:</label>
          <div className="w-75">
            <FormGroup row>
              <JobFormControl
                control={
                  <Checkbox
                    icon={<SVG.UncheckICon />}
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
                label="I’m available right now"
              />
            </FormGroup>
          </div>
        </Stack>
        <div className="job-text mb-4">
          This will automatically turned OFF every week. Remember to turn it ON
          to keep employer informed of your availability.
        </div>
        <Stack
          direction={{ xs: "column", lg: "row" }}
          spacing={{ xs: 2, lg: 2, md: 2 }}
          alignItems={{ xs: "start", lg: "center" }}
        >
          <label className="w-25">Search visibility:</label>
          <div className="w-75">
            <FormGroup row>
              <JobFormControl
                control={
                  <Checkbox
                    icon={<SVG.UncheckICon />}
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
                label="Display my profile in Talents search"
              />
            </FormGroup>
          </div>
        </Stack>
        <Stack
          direction={{ xs: "column", lg: "row" }}
          spacing={{ xs: 2, lg: 2, md: 2 }}
          alignItems={{ xs: "start", lg: "center" }}
        >
          <label className="w-25">Job type:</label>
          <div className="w-75">
            <FormGroup row>
              <JobFormControl
                control={
                  <Checkbox
                    icon={<SVG.UncheckICon />}
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
                label="Part Time"
              />
              <JobFormControl
                control={
                  <Checkbox
                    icon={<SVG.UncheckICon />}
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
                label="Full Time"
              />
              <JobFormControl
                control={
                  <Checkbox
                    icon={<SVG.UncheckICon />}
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
                label="Contract"
              />
            </FormGroup>
          </div>
        </Stack>

        <Stack
          direction={{ xs: "column", lg: "row" }}
          spacing={{ xs: 2, lg: 2, md: 2 }}
          alignItems={{ xs: "start", lg: "start" }}
          className="mt-3"
        >
          <label className="w-25">Expected salary:</label>
          <div className="w-75">
            <Stack
              direction="row"
              spacing={0}
              alignItems="center"
              className="usd-bg"
            >
              <div className="usd">USD</div>
              <input className="usdinput" />
              <Divider orientation="vertical" variant="middle" flexItem />
              <FormControl
                sx={{
                  "&.MuiSelect-select": {
                    fontFamily: "Poppins",
                    fontSize: "12px",
                  },
                }}
                size="small"
              >
                <SelectBox
                  value={isSelect}
                  onChange={handleChange}
                  inputProps={{ "aria-label": "Without label" }}
                  IconComponent={KeyboardArrowUpIcon}
                  displayEmpty
                >
                  <MenuItem value="">Per month</MenuItem>
                </SelectBox>
              </FormControl>
            </Stack>
            <div className="mt-4">
              <Cbutton
                variant="outlined"
                sx={{
                  "&.MuiButton-outlined": {
                    borderRadius: "73px",
                    border: "1px solid #EEA23D",
                    color: "#EEA23D",
                    fontWeight: "500",
                    fontSize: "16px",
                    fontFamily: "Bahnschrift",
                    padding: "6px 30px",

                    "&:hover": { background: "#eea23d14" },
                    "@media (max-width: 992px)": {
                      padding: "10px 16px",
                      fontSize: "14px",
                    },
                  },
                }}
              >
                <span className="me-2 d-inline-flex">
                  <SVG.SaveIcon />
                </span>
                Save preferences
              </Cbutton>
            </div>
          </div>
        </Stack>
      </div>
    </>
  );
};
export default JobPreferences;

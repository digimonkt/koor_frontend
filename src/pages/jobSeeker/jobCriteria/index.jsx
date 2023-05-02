import {
  Card,
  CardContent,
  FormControlLabel,
  Select,
  StepConnector,
} from "@mui/material";
import React, { useState } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { styled } from "@mui/material/styles";
import { SVG } from "@assets/svg";
import JobCategory from "./jobCategory";
import AdditionalParameter from "./additionalParameter";

// styles

export const SelectBox = styled(Select)`
  & .MuiSelect-select {
    background: #f0f0f0;
    border-radius: 10px;
    font-family: "Poppins";
    font-weight: 500;
  }
  &.MuiInputBase-root {
    border-radius: 10px;
  }
  & fieldset {
    display: none;
  }
`;
export const FormLabelBox = styled(FormControlLabel)`
  & .MuiFormControlLabel-label {
    font-family: "Poppins";
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 21px;

    letter-spacing: 0.02em;

    color: #121212;
  }
`;

const JobCriteria = () => {
  // state management
  const [activeStep, setActiveStep] = useState(0);
  const [city, setCity] = useState("");
  const [age, setAge] = useState("");

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleChange = (ageVl) => {
    setAge(ageVl);
  };

  const handleCity = (cityVl) => {
    setCity(cityVl);
  };

  return (
    <>
      <div>
        <h1 className="heading my-4">Select your desired job criterias</h1>
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
                paddingBottom: "16px",
              },
            }}
          >
            <Box sx={{ width: "100%" }}>
              {/* --------------- stepper slider ----------- */}
              <Stepper activeStep={activeStep} className="step-continer">
                <Step>
                  <StepLabel icon={<SVG.OneIcon />}>Categories</StepLabel>
                </Step>
                <Step>
                  <StepLabel>Additional parameters</StepLabel>
                </Step>
                <StepConnector />
              </Stepper>

              {/* -------------- main content ---------- */}
              {activeStep === 0 ? (
                <JobCategory handleNext={() => handleNext()} />
              ) : activeStep === 1 ? (
                <AdditionalParameter
                  age={age}
                  city={city}
                  handleChange={(vl) => handleChange(vl)}
                  handleCity={(vl) => handleCity(vl)}
                />
              ) : null}
            </Box>
          </CardContent>
        </Card>
      </div>
    </>
  );
};
export default JobCriteria;

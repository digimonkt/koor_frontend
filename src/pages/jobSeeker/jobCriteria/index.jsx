import {
  Card,
  CardContent,
  FormControlLabel,
  Select,
  Stack,
  StepConnector,
  Typography,
} from "@mui/material";

import React, { useState } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { styled } from "@mui/material/styles";
import { SVG } from "../../../assets/svg";
import JobCategory from "./jobCategory";
import AdditionalParameter from "./additionalParameter";
import { Capacitor } from "@capacitor/core";

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
  const platform = Capacitor.getPlatform();
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

  React.useEffect(() => {
    console.log({ activeStep });
  }, [activeStep]);
  return (
    <>
      <div>
        <h1 className="heading mb-4">Select your desired job criterias</h1>
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
              {platform === "android" || platform === "ios" ? (
                <>
                  <Stack
                    direction={"row"}
                    component={Typography}
                    alignItems={"center"}
                    spacing={1}
                    variant="h2"
                    sx={{
                      fontWeight: "600",
                      fontSize: "18px",
                      fontFamily: "Bahnschrift",
                    }}
                  >
                    <Box
                      component={"span"}
                      sx={{
                        width: "35px",
                        height: "35px",
                        borderRadius: "100%",
                        background: "#FEEFD3",
                        display: "inline-flex",
                        justifyContent: "center",
                        alignItems: "center",
                        fontSize: "14px",
                        fontWeight: "600",
                        fontFamily: "Bahnschrift",
                        collor: "#121212",
                      }}
                    >
                      1
                    </Box>{" "}
                    <Box component={"span"}>Categories</Box>
                  </Stack>
                  <JobCategory />
                  <Stack
                    direction={"row"}
                    component={Typography}
                    alignItems={"center"}
                    spacing={1}
                    variant="h2"
                    sx={{
                      fontWeight: "600",
                      fontSize: "18px",
                      fontFamily: "Bahnschrift",
                    }}
                  >
                    <Box
                      component={"span"}
                      sx={{
                        width: "35px",
                        height: "35px",
                        borderRadius: "100%",
                        background: "#FEEFD3",
                        display: "inline-flex",
                        justifyContent: "center",
                        alignItems: "center",
                        fontSize: "14px",
                        fontWeight: "600",
                        fontFamily: "Bahnschrift",
                        collor: "#121212",
                      }}
                    >
                      2
                    </Box>
                    <Box component={"span"}>Additional parameters</Box>
                  </Stack>

                  <AdditionalParameter
                    age={age}
                    city={city}
                    handleChange={(vl) => handleChange(vl)}
                    handleCity={(vl) => handleCity(vl)}
                  />
                </>
              ) : (
                <>
                  <Stepper
                    activeStep={activeStep}
                    connector={() => {
                      <></>;
                    }}
                    className="step-continer"
                  >
                    <Step className="sub-step-continer">
                      <StepLabel icon={<SVG.OneIcon />}>Categories</StepLabel>
                    </Step>
                    <StepConnector className="Mui-active" />
                    <Step index={1} className="sub-step-continer">
                      <StepLabel>Additional parameters</StepLabel>
                    </Step>
                    <StepConnector
                      className={activeStep === 1 && "Mui-active"}
                    />
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
                </>
              )}
            </Box>
          </CardContent>
        </Card>
      </div>
    </>
  );
};
export default JobCriteria;

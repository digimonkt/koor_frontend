import React from "react";
import { Step, Stepper } from "react-form-stepper";
function Steps({ activeStep }) {
  return (
    <div>
      <Stepper activeStep={activeStep + 1}>
        <Step label="Categories" /> <Step label="Additional parameters" />
        <Step id="third_step" />
      </Stepper>
    </div>
  );
}

export default Steps;

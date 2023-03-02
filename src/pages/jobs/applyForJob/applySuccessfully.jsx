import { SVG } from "@assets/svg";
import { OutlinedButton } from "@components/button";
import { Grid } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./styles.module.css";

function ApplySuccessfully() {
  const navigate = useNavigate();
  return (
    <Grid container spacing={2}>
      <Grid item lg={7}>
        <h1>Done!</h1>
        <p>
          Your application was submitted. The employer will reach out to you if
          they will find you suitable for the job. Stay tuned.
        </p>
        <div className={`${styles.cancel_popup}`}>
          <OutlinedButton
            title="Back to jobs search"
            jobSeeker
            onClick={() => navigate("/job-search")}
          />
        </div>
      </Grid>
      <Grid item lg={5}>
        <SVG.AppliedJob />
      </Grid>
    </Grid>
  );
}

export default ApplySuccessfully;

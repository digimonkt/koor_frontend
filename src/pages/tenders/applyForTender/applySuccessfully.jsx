import { SVG } from "@assets/svg";
import { OutlinedButton } from "@components/button";
import { Grid } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./applyForTender.module.css";

function ApplySuccessfully() {
  const navigate = useNavigate();
  return (
    <Grid container spacing={2}>
      <Grid item lg={7}>
        <h1 className="mb-3">Done!</h1>
        <p>
          Your application was submitted. The employer will reach out to you if
          they will find you suitable for the tender. Stay tuned.
        </p>
        <div className={`${styles.cancel_popup}`}>
          <OutlinedButton
            title="Back to tender search"
            jobSeeker
            onClick={() => navigate("/search/tenders")}
          />
        </div>
      </Grid>
      <Grid item lg={5}>
        <SVG.AppliedJob className="w-100" />
      </Grid>
    </Grid>
  );
}

export default ApplySuccessfully;

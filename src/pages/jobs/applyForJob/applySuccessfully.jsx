import { SVG } from "../../../assets/svg";
import { OutlinedButton } from "../../../components/button";
import { Grid } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./styles.module.css";

function ApplySuccessfully() {
  const navigate = useNavigate();
  return (
    <Grid container spacing={2}>
      <Grid item lg={7} sm={6}>
        <h1 className={`mb-3 ${styles.job_done}`}>Done!</h1>
        <span
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "20px",
          }}
        >
          <SVG.AppliedJob className={styles.job_apply_top_icon} />
        </span>
        <p className={styles.job_done_desc}>
          Your application was submitted. The employer will reach out to you if
          they will find you suitable for the job. Stay tuned.
        </p>
        <div className={`${styles.cancel_popup}`}>
          <OutlinedButton
            title="Back to jobs search"
            jobSeeker
            onClick={() => navigate("/search/jobs")}
          />
        </div>
      </Grid>
      <Grid
        item
        lg={5}
        sm={6}
        style={{
          textAlign: "end",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
        }}
      >
        <SVG.AppliedJob className={styles.job_apply_icon} />
      </Grid>
    </Grid>
  );
}

export default ApplySuccessfully;

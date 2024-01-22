import { Box, Button, Divider, Grid } from "@mui/material";
import React from "react";
import styles from "./createResume.module.css";
import { LabeledInput } from "@components/input";
import { SVG } from "@assets/svg";

const CreateResume = () => {
  return (
    <>
      <Box className={styles.CreateResume_Page}>
        <h1 className={styles.heading}>Create a resume</h1>
        <Box className={styles.CreateResume_input_box}>
          <h5>Main info</h5>
          <p>
            Please, enter some key info for your resume. The rest will be
            generated based on your profile data, so make sure that it’s
            up-to-date.
          </p>
          <Box sx={{ marginBottom: "10px" }}>
            <LabeledInput
              title=""
              className="add-form-control"
              placeholder="Job title, e.g “Graphic designer”"
              required
            />
          </Box>
          <Box sx={{ marginBottom: "10px" }}>
            <LabeledInput
              title=""
              className="add-form-control"
              placeholder="A short summary about you"
              required
            />
          </Box>
        </Box>
        <Divider
          sx={{
            margin: "10px 0px 30px 0px",
            borderColor: "#F0F0F0 !important",
          }}
        />
        <Box className={styles.CreateResume_input_box}>
          <h5>Additional contact info</h5>
          <p>Add more ways to contact you.</p>
          <Box sx={{ marginBottom: "10px" }}>
            <LabeledInput
              title=""
              className="add-form-control"
              placeholder="Home address"
              required
            />
          </Box>
          <Box sx={{ marginBottom: "10px" }}>
            <LabeledInput
              title=""
              className="add-form-control"
              placeholder="Personal website"
              required
            />
          </Box>
        </Box>
        <Divider
          sx={{
            margin: "10px 0px 30px 0px",
            borderColor: "#F0F0F0 !important",
          }}
        />
        <Box className={styles.CreateResume_input_box}>
          <h5>References</h5>
          <p>
            Add contact info of your previous employer(s), who can recommend you
            to others.
          </p>
          <Grid container spacing={2}>
            <Grid item lg={4} xs={12}>
              <Box sx={{ marginBottom: "10px" }}>
                <LabeledInput
                  title=""
                  className="add-form-control"
                  placeholder="Home address"
                  required
                />
              </Box>
            </Grid>
            <Grid item lg={4} xs={12}>
              <Box sx={{ marginBottom: "10px" }}>
                <LabeledInput
                  title=""
                  className="add-form-control"
                  placeholder="Name"
                  required
                />
              </Box>
            </Grid>
            <Grid item lg={4} xs={12}>
              <Box sx={{ marginBottom: "10px" }}>
                <LabeledInput
                  title=""
                  className="add-form-control"
                  placeholder="Email address"
                  required
                />
              </Box>
            </Grid>
          </Grid>
          <Box className={styles.plus_more_box}>
            <span>+ Add one more reference</span>
          </Box>
        </Box>
        <Box sx={{ textAlign: "center", marginTop: "20px" }}>
          <Button className={styles.resume_outlined_button}>
            <SVG.resumeIcon style={{ marginRight: "5px" }} /> Generate resume
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default CreateResume;

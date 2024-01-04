import { Avatar, Box, Divider, Grid, Typography } from "@mui/material";
import React from "react";
import styles from "./coverLetter.module.css";
import { HorizontalLabelInput, LabeledInput } from "@components/input";
import { OutlinedButton } from "@components/button";
import { SVG } from "@assets/svg";
import { IMAGES } from "@assets/images";

const CreateCoverLetter = () => {
  return (
    <>
      <Box className={styles.createCoverLetter_box}>
        <h1 className={styles.heading}>Create a cover letter</h1>
        <Typography className={styles.letter_desc}>
          Create a personalized conver letter and then click “Generate”. You can
          attach it to your application to make it stand out more.
        </Typography>
      </Box>

      <Box className={styles.Createcover_letter_input_box}>
        <h5>Main text</h5>
        <Typography className={styles.letter_desc}>
          Please, enter some key info for your resume. The rest will be
          generated based on your profile data, so make sure that it’s
          up-to-date.
        </Typography>
        <Grid container spacing={2}>
          <Grid item lg={6} xs={12}>
            <Box sx={{ marginBottom: "10px" }} className="coverLetter_input">
              <LabeledInput
                title=""
                className="add-form-control"
                placeholder="Your preferred job title, e.g “Graphic designer”"
                required
              />
            </Box>
            <Box sx={{ marginBottom: "10px" }} className="coverLetter_input">
              <LabeledInput
                title=""
                className="add-form-control"
                placeholder="Name or addressee (person or a company)"
                required
              />
            </Box>
          </Grid>
          <Grid item lg={6} xs={12}>
            <Box className="coverletter_textarea_box">
              <HorizontalLabelInput
                type="textarea"
                placeholder="Cover letter"
              />
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Divider
        sx={{
          borderBottom: "1px solid #f0f0f0 !important",
          margin: "0px 0px 20px 0px",
          paddingTop: "0px",
        }}
      />
      <Box className={styles.Createcover_letter_input_box}>
        <h5>Your signature</h5>
        <Typography className={styles.letter_desc}>
          This is optional, but we recommend to add it.
        </Typography>
        <Box>
          <Grid container spacing={2} sx={{ alignItems: "center" }}>
            <Grid item lg={1.1} md={1.2} sm={1.6} xs={4}>
              <Avatar
                src={IMAGES.CoverLetterImg}
                className={styles.coverletter_avatar}
              />
            </Grid>
            <Grid item lg={10.9} md={10.8} sm={10.4} xs={8}>
              <Box className={styles.coverletter_drag_box}>
                <Typography className={styles.coverletter_drag}>
                  Drag here or <span>upload a signature</span>
                </Typography>
                <Typography className={styles.coverletter_drag_drop}>
                  PNG, JPEN and PDF files are supported
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
        <Box sx={{ textAlign: "center", marginTop: "26px" }}>
          <OutlinedButton
            title={[
              <>
                <SVG.resumeIcon className="me-2" />
              </>,
              "Generate cover letter",
            ]}
          />
        </Box>
      </Box>
    </>
  );
};

export default CreateCoverLetter;

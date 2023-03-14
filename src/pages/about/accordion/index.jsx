import React from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import styles from "./accordion.module.css";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Grid,
  Typography,
} from "@mui/material";

const Accordian = () => {
  return (
    <>
      <div>
        <Grid container spacing={3}>
          <Grid item lg={6}>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography className={styles.accordion_heading}>
                  What is Koor? Why should I use Koor?
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography className={styles.accordion_text}>
                  <span className={styles.accordion_koor_text}>Koor</span> is an
                  award-winning mobile app which connects non-executive job
                  seekers to reliable employers quickly & easily. With just a
                  tap, applicants can apply for jobs offered by thousands of
                  trusted employers in Singapore, across all sectors! Get access
                  to exciting job openings across full-time, part-time, and
                  contract roles! New candidates can easily register for an
                  account and create a professional resume with the app.
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion className="mt-3">
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography className={styles.accordion_heading}>
                  I can’t apply for an account. What can I do?
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography className={styles.accordion_text}>
                  Get access to exciting job openings across full-time,
                  part-time, and contract roles! New candidates can easily
                  register for an account and create a professional resume with
                  the app.
                </Typography>
              </AccordionDetails>
            </Accordion>
          </Grid>
          <Grid item lg={6}>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography className={styles.accordion_heading}>
                  Where can I download the App?
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography className={styles.accordion_text}>
                  <span className={styles.accordion_koor_text}>Koor</span> is an
                  award-winning mobile app which connects non-executive job
                  seekers to reliable employers quickly & easily. With just a
                  tap, applicants can apply for jobs offered by thousands of
                  trusted employers in Singapore, across all sectors! Get access
                  to exciting job openings across full-time, part-time, and
                  contract roles! New candidates can easily register for an
                  account and create a professional resume with the app.
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion className="mt-3">
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography className={styles.accordion_heading}>
                  What benefits/features does the app provide?
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography className={styles.accordion_text}>
                  Get access to exciting job openings across full-time,
                  part-time, and contract roles! New candidates can easily
                  register for an account and create a professional resume with
                  the app.
                </Typography>
              </AccordionDetails>
            </Accordion>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default Accordian;

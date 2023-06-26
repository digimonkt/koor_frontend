import React from "react";
import styles from "./accordion.module.css";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Grid,
  Typography,
} from "@mui/material";
import { Add, Minimize } from "@mui/icons-material";
import { useSelector } from "react-redux";

const Accordian = ({ faqCategory }) => {
  const [expanded, setExpanded] = React.useState("panel-0");
  const { faqQuestions } = useSelector((state) => state.faq);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <>
      <Grid container spacing={{ xs: 0, lg: 3, sm: 3, md: 3 }}>
        {(faqQuestions.data.result || []).map((faq, index) => (
          <Grid key={index} item lg={6} sm={6} xs={12}>
            <div className={styles.accordion_border}>
              <Accordion
                expanded={expanded === `panel-${index}`}
                onChange={handleChange(`panel-${index}`)}
                className={styles.accordion_first}
              >
                <AccordionSummary
                  expandIcon={expanded === `panel-${index}` ? <Minimize /> : <Add />}
                  aria-controls={`panel-content-${index}`}
                  id={`panel-header-${index}`}
                >
                  <Typography className={styles.accordion_heading}>
                    {faq.question}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography className={styles.accordion_text}>
                    <div dangerouslySetInnerHTML={{ __html: faq.answer }}></div>
                  </Typography>
                </AccordionDetails>
              </Accordion>
            </div>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default Accordian;

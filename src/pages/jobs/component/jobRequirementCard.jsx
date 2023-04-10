import { SearchButton } from "@components/button";
import { Grid } from "@mui/material";
import React from "react";
import styles from "./styles.module.css";

function JobRequirementCard({ jobCategories, languages, skills }) {
  return (
    <div className={`${styles.requirement}`}>
      <h5>Requirements:</h5>
      <div className={`${styles.required}`}>
        <h6>Education</h6>
        {jobCategories.map((category) => {
          return (
            <div className={`${styles.educations}`} key={category.id}>
              <span></span>
              <p className="m-0">{category.title}</p>
            </div>
          );
        })}
      </div>
      <div className={`${styles.language}`}>
        <h6 className="mb-0 mt-3">Languages</h6>
        <Grid container spacing={2}>
          {languages.map((language) => {
            return (
              <Grid item xs={4} key={language.id}>
                <div className={`${styles.english}`}>
                  <span className={`${styles.dots}`}></span>
                  <div
                    className={`${styles.englishtext}`}
                    style={{ textTransform: "capitalize" }}
                  >
                    <h6 className="mb-0">{language.language.title}</h6>
                    <span>Spoken: {language.spoken}</span> <br />
                    <span>Written: {language.written}</span>
                  </div>
                </div>
              </Grid>
            );
          })}
        </Grid>
        <div className={`${styles.skills}`}>
          <h6 className="mb-1">Skills</h6>
          <div className={`${styles.skilssbtn}`}>
            {skills.map((skill) => {
              return (
                <SearchButton
                  key={skill.id}
                  text={skill.title}
                  className={`${styles.grybtn}`}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default JobRequirementCard;

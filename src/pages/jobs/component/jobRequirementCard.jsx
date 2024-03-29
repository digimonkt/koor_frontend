import { SearchButton } from "../../../components/button";
import React from "react";
import styles from "./styles.module.css";
import { Box, Stack } from "@mui/material";

function JobRequirementCard({
  highestEducation,
  languages,
  skills,
  experience,
}) {
  return (
    <div className={`${styles.requirement} mb-0 mt-3`}>
      <h5>Requirements:</h5>
      {experience && (
        <div className={`${styles.required}`}>
          <h6>Experience</h6>
          <div className={`${styles.educations}`}>
            <span></span>
            <p className="m-0">{experience} years</p>
          </div>
        </div>
      )}
      {highestEducation.id && (
        <div className={`${styles.required} mb-0 mt-3`}>
          <h6>Education</h6>
          <div className={`${styles.educations}`}>
            <span></span>
            <p className="m-0">{highestEducation.title}</p>
          </div>
        </div>
      )}
      <div className={`${styles.required}`}>
        {languages.length > 0 && <h6 className="mb-0 mt-3">Languages</h6>}
        {languages.map((language) => {
          return (
            <div className={`${styles.educations}`} key={language.id}>
              <span></span>
              <p className="m-0">{language.language.title}</p>
            </div>
          );
        })}
      </div>
      <div className={`${styles.required}`}>
        <div className={`${styles.skills}`}>
          {skills.length > 0 && <h6 className="mb-2  mt-3">Skills</h6>}
          <Box sx={{ overflow: "auto" }}>
            <Stack
              direction={"row"}
              spacing={2}
              alignItems={"center"}
              flexWrap={"wrap"}
              useFlexGap
            >
              {skills.map((skill) => {
                return (
                  <>
                    <div style={{ marginTop: "10px" }}>
                      <SearchButton
                        key={skill.id}
                        text={skill.title}
                        className={`${styles.grybtn}`}
                        sx={{ minWidth: "100%", whiteSpace: "nowrap" }}
                      />
                    </div>
                  </>
                );
              })}
            </Stack>
          </Box>
        </div>
      </div>
    </div>
  );
}

export default JobRequirementCard;

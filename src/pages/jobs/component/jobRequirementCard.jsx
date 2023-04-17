import { SearchButton } from "@components/button";
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
      <div className={`${styles.required}`}>
        <h6 className="mb-0 mt-3">Languages</h6>
        {languages.map((language) => {
          return (
            <div className={`${styles.educations}`} key={language.id}>
              <span></span>
              <p className="m-0">{language.language.title}</p>
            </div>
          );
        })}
        <div className={`${styles.skills}`}>
          <h6 className="mb-1  mt-3">Skills</h6>
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

import { YEAR_FORMAT } from "@utils/constants/constants";
import dayjs from "dayjs";
import React from "react";
import { formatPhoneNumberIntl } from "react-phone-number-input";
import { useSelector } from "react-redux";
import "./style.css";
function ResumeTemplate() {
  const { currentUser } = useSelector((state) => state.auth);
  return (
    <>
      <div className="container" id="div-to-pdf">
        <div className="header">
          <div className="full-name">
            <h4>CURICULUM VITAE (CV)</h4>
            <div>
              <span className="first-name">{currentUser.name}</span>
            </div>
            {/* <h4>Bondhere District</h4> */}
            {/* <h4>Mogadishu-Somalia</h4> */}
          </div>
          <div className="contact-info">
            <span className="phone">Phone : </span>
            <span className="phone-val">
              {currentUser.countryCode && currentUser.mobileNumber
                ? formatPhoneNumberIntl(
                    currentUser.countryCode + currentUser.mobileNumber
                  )
                : ""}
            </span>
            <br />
            <span className="email">Email : </span>
            <a
              href={`mailto: ${currentUser.email}`}
              target="_blank"
              className="email-val"
              rel="noreferrer"
            >
              {currentUser.email}
            </a>
          </div>
        </div>

        <div className="about">
          <p className="position">PROFILE SUMMARY</p>
          <span className="desc">{currentUser.profile.description}</span>
        </div>

        <div className="knowledge">
          <p className="title">Skills</p>
          <ul>
            {currentUser.skills.map((skill) => (
              <li key={skill.id}>{skill.skill.title}</li>
            ))}
          </ul>
        </div>

        <div className="education">
          <p className="title">Education</p>
          <ul>
            {currentUser.educationRecord.map((education) => {
              return (
                <li key={education.id}>
                  {dayjs(education.startDate).format(YEAR_FORMAT)} -{" "}
                  {education.present
                    ? "Present"
                    : dayjs(education.endDate).format(YEAR_FORMAT)}{" "}
                  {education.title}, {education.institute}
                </li>
              );
            })}
          </ul>
        </div>
        <div className="summary">
          <p className="title">Employment Summary</p>
          {currentUser.workExperiences.map((experience) => {
            return (
              <React.Fragment key={experience.id}>
                <span className="title">{experience.title}</span>
                <p className="responsibility">{experience.organization}</p>
                <span>
                  {dayjs(experience.startDate).format(YEAR_FORMAT)} -{" "}
                  {experience.present
                    ? "Present"
                    : dayjs(experience.endDate).format(YEAR_FORMAT)}
                </span>
                <p>{experience.description}</p>
              </React.Fragment>
            );
          })}
        </div>
        <div className="qualification">
          <p className="title">Languages</p>
          <ul>
            {currentUser.languages.map((language) => (
              <li key={language.id}>
                <h4>{language.language.title}</h4>
                <span>Spoken: {language.spoken}</span> <br />
                <span>Written: {language.written}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default ResumeTemplate;

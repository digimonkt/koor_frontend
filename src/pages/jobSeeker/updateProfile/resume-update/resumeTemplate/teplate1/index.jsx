import { DATE_FORMAT, YEAR_FORMAT } from "@utils/constants/constants";
import { generateFileUrl } from "@utils/generateFileUrl";
import dayjs from "dayjs";
import React from "react";
import { formatPhoneNumberIntl } from "react-phone-number-input";
import { useSelector } from "react-redux";
import "./style.css";
function ResumeTemplate() {
  const { currentUser } = useSelector((state) => state.auth);
  console.log({ currentUser });
  return (
    <>
      <div className="container" id="div-to-pdf">
        <div className="header">
          <div className="avatar_div">
            {currentUser.profileImage ? (
              <div>
                <img
                  className="avatar"
                  src={generateFileUrl(currentUser.profileImage)}
                  alt="profile-image"
                />
              </div>
            ) : (
              ""
            )}
            <div>
              <div className="full-name">
                <div>
                  <span className="first-name">{currentUser.name}</span>
                </div>
              </div>
              <div className="contact-info">
                <span className="email">Email: </span>
                <span className="email-val">{currentUser.email}</span>
                <span className="separator"></span>
                <span className="phone">Phone: </span>
                <span className="phone-val">
                  {currentUser.mobileNumber &&
                    formatPhoneNumberIntl(
                      currentUser.countryCode + currentUser.mobileNumber
                    )}
                </span>
              </div>
            </div>
          </div>

          <div className="about">
            <span className="position">
              {currentUser.profile.highestEducation.title}{" "}
            </span>
            <span className="desc">{currentUser.profile.description}</span>
          </div>
        </div>
        <div className="details">
          <div className="section">
            <div className="section__title">About Me</div>
            <div className="section__list">
              <div className="section__list-item">
                <div className="left">
                  <div>
                    <div className="name_about">
                      Gender :{" "}
                      <span className="text">{currentUser.profile.gender}</span>
                    </div>
                    <div className="name_about">
                      Birth Date :{" "}
                      <span className="text">
                        {dayjs(currentUser.profile.dob).format(DATE_FORMAT)}
                      </span>
                    </div>
                    <div className="name_about">
                      Employee Status :{" "}
                      <span className="text">
                        {currentUser.profile.employmentStatus}
                      </span>
                    </div>
                    <div className="name_about">
                      Highest Education :{" "}
                      <span className="text">
                        {currentUser.profile.highestEducation.title}
                      </span>
                    </div>
                  </div>
                  {currentUser.workExperiences.length ? (
                    <div className="work_div">
                      <div className="section__title">Work experience</div>
                      <div className="section__list">
                        <div className="section__list-item">
                          <div>
                            {currentUser.workExperiences.map((experience) => (
                              <React.Fragment key={experience.id}>
                                <div className="name">{experience.title}</div>
                                <p className="up_work">
                                  {experience.organization}
                                </p>
                                <span className="work_span">
                                  {experience.description}
                                </span>
                                <p className="date_p">
                                  {dayjs(experience.startDate).format(
                                    YEAR_FORMAT
                                  )}{" "}
                                  -{" "}
                                  {!experience.endDate
                                    ? "Present"
                                    : dayjs(experience.endDate).format(
                                        YEAR_FORMAT
                                      )}
                                </p>
                                <br />
                              </React.Fragment>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                  {currentUser.educationRecord.length ? (
                    <>
                      <div className="work_div">
                        <div className="section__title">Education</div>
                        <div className="section__list">
                          <div className="section__list-item">
                            <div>
                              {currentUser.educationRecord.map((education) => (
                                <React.Fragment key={education.id}>
                                  <div className="name">{education.title}</div>
                                  <p className="up_work">
                                    {education.organization}
                                  </p>
                                  <span className="work_span">
                                    {education.educationLevel.title}
                                  </span>
                                  <p className="date_p">
                                    {dayjs(education.startDate).format(
                                      YEAR_FORMAT
                                    )}{" "}
                                    -{" "}
                                    {!education.endDate
                                      ? "Present"
                                      : dayjs(education.endDate).format(
                                          YEAR_FORMAT
                                        )}
                                  </p>
                                  <br />
                                </React.Fragment>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    ""
                  )}
                </div>
                <div className="right">
                  <div className="right_div">
                    <div className="section">
                      <div className="section__title">Skills</div>
                      <p className="date_p">
                        {currentUser.skills.length} skills
                      </p>
                      <br />
                      <div className="section__list">
                        <div className="section__list-item">
                          {currentUser.skills.map((skill) => (
                            <div className="name" key={skill.id}>
                              {skill.skill.title}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="section">
                      <div className="section__title">Job preferences</div>
                      <div className="section__list">
                        <div className="section__list-item">
                          <div className="name">
                            English :{" "}
                            <span className="text">available right now</span>
                          </div>
                          <div className="name">
                            Search visibility :{" "}
                            <span className="text">display my profle</span>
                          </div>
                          <div className="name">
                            Job type : <span className="text">full time</span>
                          </div>
                          <div className="name">
                            Expected salary :{" "}
                            <span className="text">12000</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {currentUser.languages.length ? (
                      <div className="section">
                        <div className="section__title">Language</div>
                        <div className="section__list">
                          <div className="section__list-item">
                            {currentUser.languages.map((language) => (
                              <div className="language__card" key={language.id}>
                                <div className="name">
                                  {language.language.title}
                                </div>
                                <p className="language_p">
                                  Spoken : {language.spoken}
                                </p>
                                <p className="language_p">
                                  Written : {language.written}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    ) : (
                      ""
                    )}
                    <br />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>{" "}
    </>
  );
}

export default ResumeTemplate;

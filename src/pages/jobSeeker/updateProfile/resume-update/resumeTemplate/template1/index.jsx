import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./style.css";

// import {
//   Box,
//   Chip,
//   Divider,
//   Grid,
//   Typography,
//   Stack,
//   Avatar,
// } from "@mui/material";
// import LanguageCard from "@components/languageCard";
// import EducationCard from "@components/educationCard";
// import WorkExperienceCard from "@components/workExperienceCard";
// import { SVG } from "@assets/svg";
// import { Link } from "react-router-dom";
// import urlcat from "urlcat";
import { generateFileUrl } from "@utils/generateFileUrl";
import { SVG } from "@assets/svg";
import CoverLetter from "../cover-letter";
import { YEAR_FORMAT } from "@utils/constants/constants";
import dayjs from "dayjs";

function ResumeTemplate({ user }) {
  const { currentUser } = useSelector((state) => state.auth);
  const applicantDetails = user || currentUser;

  const [, setBase64Image] = useState("");
  console.log({ applicantDetails });
  useEffect(() => {
    const convertImageToBase64 = async () => {
      try {
        const response = await fetch(
          generateFileUrl(applicantDetails?.profileImage)
        );
        const blob = await response.blob();
        const reader = new FileReader();

        reader.onloadend = () => {
          const base64String = reader.result;
          setBase64Image(base64String);
        };

        reader.readAsDataURL(blob);
      } catch (error) {
        console.error("Error converting image to base64:", error);
      }
    };

    convertImageToBase64();
  }, []);

  return (
    <div className="job-application" id="div-to-pdf">
      {/* <Divider /> */}
      {/* -------------- applicant basic info ---------- */}
      {/* <Grid container spacing={2} sx={{ margin: "4px 5px 4px 5px" }}>
        <Grid item xl={6} lg={6} xs={6} sm={6}>
          <Stack direction="row" spacing={2} alignItems="center">
            <Avatar
              id="profile-avatar"
              src={base64Image}
              sx={{
                width: "70px",
                height: "70px",
              }}
            />
            <div className="user-application">
              <Link
                to={urlcat("/job-seeker/:userId/profile", {
                  userId: applicantDetails?.profile?.id || "a",
                })}
              >
                <h4>{applicantDetails?.name}</h4>
              </Link>
              {applicantDetails?.profile?.country?.title ? (
                <Stack direction="row" spacing={1} alignItems="center">
                  <span>{<SVG.LocationIcon />}</span>{" "}
                  <span>
                    {applicantDetails?.profile?.country?.title},{" "}
                    {applicantDetails?.profile?.city?.title}
                  </span>
                </Stack>
              ) : (
                ""
              )}
            </div>
          </Stack>
        </Grid>
      </Grid>
      <Stack direction={{ xs: "column", lg: "row", sm: "row" }} spacing={3}>
        <Box>
          <Typography
            sx={{
              wordBreak: "break-word",
              paddingRight: "10px",
              textAlign: "justify",
              fontFamily: "Poppins",
              fontSize: "12px",
            }}
            dangerouslySetInnerHTML={{
              __html:
                applicantDetails?.shortLetter ||
                applicantDetails?.profile?.description,
            }}
          />
        </Box>
      </Stack> */}

      {/* ---------------- education, experience and skills -------- */}

      {/* <div className="user-skills">
        <Grid container spacing={2}>
          <Grid item xl={6} lg={6} xs={6} md={6} sm={6}>
            <div className="skills-card">
              <h3>Work experience</h3>
              <ul>
                {applicantDetails?.workExperiences?.length &&
                  applicantDetails?.workExperiences?.map((item, index) => (
                    <li key={index}>
                      <div className="list-content">
                        <WorkExperienceCard isResumeTemp {...item} />
                      </div>
                    </li>
                  ))}
              </ul>
            </div>
          </Grid>
          <Grid item xl={6} lg={6} xs={6} md={6} sm={6}>
            <div className="skills-card">
              <h3>Education</h3>
              <ul>
                {applicantDetails?.educationRecord?.length &&
                  applicantDetails?.educationRecord.map((item, index) => (
                    <li key={index}>
                      <EducationCard
                        isResumeTemp
                        {...item}
                        // handleEdit={() => handleEdit(item)}
                      />
                    </li>
                  ))}
              </ul>
            </div>
          </Grid>
        </Grid>
      </div>
      <div className="user-skills pb-3">
        <Grid container spacing={2}>
          <Grid item xl={6} lg={6} xs={6} md={6} sm={6}>
            <div className="skills-card">
              <h3>Skills</h3>
              <Stack direction="row" spacing={0} flexWrap="wrap">
                {applicantDetails?.skills?.length &&
                  applicantDetails?.skills.map((item, index) => (
                    <Chip
                      key={index}
                      label={item.skill.title}
                      sx={{
                        fontSize: "12px",
                        fontFamily: "Poppins",
                        color: "#121212",
                        fontWeight: "400",
                        margin: "0px 8px 8px 0px",
                      }}
                    />
                  ))}
              </Stack>
            </div>
          </Grid>
          <Grid item xl={6} lg={6} xs={6} md={6} sm={6}>
            <div className="skills-card">
              <h3>Languages</h3>
              <ul className="list-content">
                {applicantDetails?.languages?.length &&
                  applicantDetails?.languages.map((item, index) => (
                    <li key={index}>
                      <LanguageCard isResumeTemp {...item} />
                    </li>
                  ))}
              </ul>
            </div>
          </Grid>
        </Grid>
      </div> */}
      <div className="container">
        <div className="heading">
          <h1>{applicantDetails.name}</h1>
          {/* <h5>UI/UX and Product Designer</h5> */}
        </div>

        <div className="cv_first_div">
          <div style={{ width: "44%", padding: "20px 15px 20px 0px" }}>
            <div className="top_div">
              <ul>
                {
                  applicantDetails.mobileNumber &&
                  <li>
                    {" "}
                    <SVG.callTrik style={{ marginRight: "5px" }} />
                    {applicantDetails.countryCode + " " + applicantDetails.mobileNumber}
                  </li>
                }
                {
                  applicantDetails.email &&
                  <li>
                    <SVG.mailTrik style={{ marginRight: "5px" }} />
                    {applicantDetails.email}
                  </li>
                }
                {applicantDetails?.profile?.website &&
                  <li>
                    <SVG.languageTrik style={{ marginRight: "5px" }} />
                    {applicantDetails?.profile.website}
                  </li>
                }
                {
                  applicantDetails.profile?.country?.title &&
                  <li>
                    <SVG.locationTrik style={{ marginRight: "5px" }} />
                    {applicantDetails.profile?.city && applicantDetails.profile?.city.title + ", "}
                    {applicantDetails.profile?.country?.title}
                  </li>
                }
              </ul>
            </div>
            <hr className="horizontal_line" />
            {applicantDetails.skills.length &&
              <>
                <div className="skills_div">
                  <h2>SKILLS</h2>
                  {
                    applicantDetails.skills.map((item, index) => (
                      <button key={index} className="skills_btn">{item.skill.title}</button>
                    ))
                  }
                </div>
                <hr />
              </>
            }
            {applicantDetails.educationRecord.length &&
              <>
                <div className="education">
                  <h2>EDUCATION</h2>
                  {applicantDetails.educationRecord.map((item, index) => (
                    <div key={index} className="education_div">
                      <p>{dayjs(item.startDate).format(YEAR_FORMAT)} -{" "}
                        {item.present ? "Present" : dayjs(item.endDate).format(YEAR_FORMAT)}</p>
                      <span>{item.educationLevel.title}</span>
                      <h3>{item.institute}</h3>
                      <h6>{item?.description}</h6>
                    </div>
                  ))}
                </div>
                <hr />
              </>
            }
            {/* <div className="education">
              <h2>Expertise</h2>
              <div className="education_div">
                <h3>My expertise area</h3>
                <h6>
                  Maecenas bibendum at mattis gravida pellentesque dolor nibh
                  amet. At sem vitae leo maecenas tincidunt orci ut. Arcu in
                  vestibulum phasellus eu. Semper nunc eget varius diam habitant
                  id lacus.
                </h6>
              </div>
              <div style={{ margin: "20px 0px" }}></div>
              <div className="education_div">
                <h3>Product development</h3>
                <h6>
                  Maecenas bibendum at mattis gravida pellentesque dolor nibh
                  amet. At sem vitae leo maecenas tincidunt orci ut.{" "}
                </h6>
              </div>
              <div style={{ margin: "20px 0px" }}></div>
              <div className="education_div">
                <h3>Digital product development and team management</h3>
                <h6>
                  Maecenas bibendum at mattis gravida pellentesque dolor nibh
                  amet. At sem vitae leo maecenas tincidunt orci ut. Maecenas
                  bibendum at mattis gravida pellentesque dolor nibh amet. At
                  sem vitae leo maecenas tincidunt orci ut. Maecenas bibendum at
                  mattis gravida pellentesque dolor nibh amet. At sem vitae leo
                  maecenas tincidunt orci ut.{" "}
                </h6>
              </div>
            </div>
            <hr /> */}
            {/* <div className="refrence">
              <h2>Refrence</h2>
              <h3 style={{ marginBottom: "5px" }}>Abdimajid Omar</h3>
              <span>
                <SVG.callTrik style={{ marginRight: "5px" }} />
                023-105-61-9018
              </span>
              <span>
                <SVG.mailTrik style={{ marginRight: "5px" }} />
                023-105-61-9018
              </span>
              <h3 style={{ marginBottom: "5px", marginTop: "10px" }}>
                Second reference name
              </h3>
              <span>
                <SVG.callTrik style={{ marginRight: "5px" }} />
                023-105-61-9018
              </span>
              <span>
                <SVG.mailTrik style={{ marginRight: "5px" }} />
                023-105-61-9018
              </span>
            </div>
            <hr /> */}
            {/* <div className="certification">
              <h2>CERTIFICATION</h2>
              <div className="certification_div">
                <p>2016-2018</p>
                <span>Credly</span>
                <h3>User research and user experience</h3>
              </div>
            </div>
            <hr /> */}
            {applicantDetails.languages.length &&
              <div className="language">
                <h2>LANGUAGE</h2>
                <div className="language_div">
                  {applicantDetails.languages.map((item, index) => (
                    <div key={index} style={{ marginRight: "40px" }}>
                      <h6>{item.language.title}</h6>
                      <p>Spoken: {item?.spoken}</p>
                      <p>Written: {item?.written}</p>
                    </div>
                  ))}
                </div>
              </div>
            }
          </div>
          <div style={{ width: "2px", backgroundColor: "#cacaca" }}></div>
          <div style={{ width: "54%", padding: "20px 0px 20px 15px" }}>
            <div className="profile">
              <h2>PROFILE</h2>
              <p>
                {applicantDetails.profile.description}
              </p>
            </div>
            <hr />
            {applicantDetails.workExperiences.length &&
              <div className="work_experiance">
                <h2>Work Experience</h2>
                {
                  applicantDetails.workExperiences.map((item, index) => (
                    <div className="job_position" key={index} style={{ marginTop: "25px" }}>
                      <span>{item.title}</span>
                      <div className="work_experiance_div">
                        <h3>{item.organization}</h3>
                        <h3>{dayjs(item.startDate).format(YEAR_FORMAT)} -{" "}
                          {item.present ? "Present" : dayjs(item.endDate).format(YEAR_FORMAT)}</h3>
                      </div>
                      {item?.description && (
                        <p
                          dangerouslySetInnerHTML={{
                            __html: item?.description,
                          }}
                          style={{
                            wordBreak: "break-all",
                          }}
                        />
                      )}
                    </div>
                  ))}
              </div>
            }
          </div>
        </div>
        <CoverLetter />
        <div className="footer">
          <p>This resume is generated with</p>
          <SVG.logoHorizontalTrik style={{ marginRight: "5px" }} />
        </div>
      </div>
    </div>
  );
}

export default ResumeTemplate;

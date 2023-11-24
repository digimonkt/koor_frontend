import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import LanguageCard from "@components/languageCard";
import {
  Box,
  Chip,
  Divider,
  Grid,
  Typography,
  Stack,
  Avatar,
} from "@mui/material";
import EducationCard from "@components/educationCard";
import WorkExperienceCard from "@components/workExperienceCard";
import { SVG } from "@assets/svg";
import { Link } from "react-router-dom";
import urlcat from "urlcat";
import { generateFileUrl } from "@utils/generateFileUrl";

function ResumeTemplate({ user }) {
  const { currentUser } = useSelector((state) => state.auth);
  const applicantDetails = user || currentUser;

  const [base64Image, setBase64Image] = useState("");

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
      <Divider />
      {/* -------------- applicant basic info ---------- */}
      <Grid container spacing={2} sx={{ margin: "4px 5px 4px 5px" }}>
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
                    {applicantDetails?.profile?.country?.title},
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
            }}
            dangerouslySetInnerHTML={{
              __html:
                applicantDetails?.shortLetter ||
                applicantDetails?.profile?.description,
            }}
          />
        </Box>
      </Stack>

      {/* ---------------- education, experience and skills -------- */}

      <div className="user-skills">
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
      </div>
    </div>
  );
}

export default ResumeTemplate;

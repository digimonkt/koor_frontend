import {
  Avatar,
  Box,
  Card,
  CardContent,
  Chip,
  Divider,
  Grid,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { SVG } from "../../../assets/svg";
import { getApplicationDetailsAPI } from "../../../api/employer";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import EducationCard from "../../../components/educationCard";
import WorkExperienceCard from "../../../components/workExperienceCard";
import LanguageCard from "../../../components/languageCard";
import ApplicationOptions from "../../../components/applicationOptions";
import { generateFileUrl } from "../../../utils/generateFileUrl";
import { NoRecordFoundAnimation } from "../../../components/animations";
import urlcat from "urlcat";
import { FilledButton } from "@components/button";
import { pdfDownloader } from "@utils/filesUtils";
import ResumeTemplate from "@pages/jobSeeker/updateProfile/resume-update/resumeTemplate/template1";
import { GetUserDetailsAPI } from "@api/user";
import { useDispatch } from "react-redux";

dayjs.extend(relativeTime);

const ApplicantDetails = () => {
  // navigate
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const [isDownloadingPDF, setIsDownloadingPDF] = useState(false);
  const [applicantDetails, setApplicantsDetails] = useState({
    user: {
      profile: {},
    },
    job: {},
    attachments: [],
  });
  const [userDetails, setUserDetails] = useState({
    educationRecord: [],
    jobPreferences: {},
    languages: [],
    profile: {
      city: {},
      country: {},
      highestEducation: {},
    },
    resume: [],
    skills: [],
    workExperiences: [],
  });

  const downloadPDF = async () => {
    pdfDownloader(applicantDetails?.name, setIsDownloadingPDF, dispatch);
  };

  const getApplicantDetails = async () => {
    const res = await getApplicationDetailsAPI(params.applicationId);
    if (res.remote === "success") {
      setApplicantsDetails(res.data);
    }
  };
  const getUserDetails = async (userId) => {
    const res = await GetUserDetailsAPI({ userId });
    if (res.remote === "success") {
      setUserDetails(res.data);
    }
  };
  useEffect(() => {
    getUserDetails(applicantDetails.user.id);
  }, [applicantDetails.user.id]);
  useEffect(() => {
    getApplicantDetails();
  }, [params.applicationId]);
  return (
    <>
      <div className="job-application">
        <Card
          sx={{
            "&.MuiCard-root": {
              boxShadow: "0px 15px 40px rgba(0, 0, 0, 0.05)",
              borderRadius: "10px",
              mb: 3,
            },
          }}
        >
          <CardContent
            sx={{
              "&.MuiCardContent-root": {
                padding: "25px 25px 25px",
              },
            }}
          >
            {/* -------------- header  ------------ */}

            <Stack
              direction="row"
              spacing={2}
              alignItems={{ xs: "start", lg: "center" }}
              className="recent-content job-border pb-2 mb-3"
            >
              <IconButton
                LinkComponent={Link}
                onClick={() => navigate(-1)}
                style={{ padding: "0px" }}
              >
                <ArrowBackIcon />
              </IconButton>
              <Stack
                direction={{ xs: "column", lg: "row", sm: "row" }}
                alignItems={{ xs: "start", lg: "center" }}
                spacing={2}
              >
                <h4>{applicantDetails.user.name}</h4>
                <div
                  className="recent-research"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    flexWrap: "wrap",
                  }}
                >
                  <span>
                    Applied {dayjs(applicantDetails.createdAt).fromNow()} to:{" "}
                  </span>
                  <div>{applicantDetails.job.title}</div>
                </div>
              </Stack>
            </Stack>

            {/* -------------- applicant basic info ---------- */}

            <Grid container spacing={2} sx={{ mb: 4 }}>
              <Grid item xl={6} lg={6} xs={12} sm={6}>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Avatar
                    src={applicantDetails.user.profileImage}
                    sx={{ width: "70px", height: "70px" }}
                  />
                  <div className="user-application">
                    <Link
                      to={urlcat("/job-seeker/:userId/profile", {
                        userId: applicantDetails.user.id || "a",
                      })}
                    >
                      <h4>{applicantDetails.user.name}</h4>
                    </Link>
                    {applicantDetails.user.profile?.country ? (
                      <Stack direction="row" spacing={1} alignItems="center">
                        <span>{<SVG.LocationIcon />}</span>{" "}
                        <span>
                          {applicantDetails.user.profile?.country},
                          {applicantDetails.user.profile?.city}
                        </span>
                      </Stack>
                    ) : (
                      ""
                    )}
                  </div>
                </Stack>
              </Grid>
              <Grid item xl={6} lg={6} xs={12} sm={6}>
                <Stack
                  direction="row"
                  spacing={0}
                  className="edit-button"
                  alignItems="center"
                >
                  <ApplicationOptions
                    details={applicantDetails}
                    interviewPlanned
                    shortlist
                    reject
                    blacklist
                    message
                  />
                </Stack>
              </Grid>
            </Grid>
            <Stack
              direction={{ xs: "column", lg: "row", sm: "row" }}
              spacing={3}
            >
              <Box className="user-descrition">
                <Typography
                  sx={{
                    wordBreak: "break-word",
                    paddingRight: "10px",
                    textAlign: "justify",
                  }}
                  dangerouslySetInnerHTML={{
                    __html:
                      applicantDetails.shortLetter ||
                      applicantDetails.user.profile.description,
                  }}
                />
              </Box>
              <Box sx={{ display: "contents" }}>
                {
                  <Divider
                    orientation="vertical"
                    flexItem
                    sx={{
                      height: "162px !important",
                      width: "1px",
                      backgroundColor: "#CACACA",
                    }}
                  />
                }
              </Box>
              <Box className="attachment-box">
                {applicantDetails.attachments.length ? (
                  <h2>Attachments</h2>
                ) : (
                  ""
                )}
                {applicantDetails.attachments.map((attachment) => {
                  return (
                    <Stack
                      direction={"row"}
                      alignItems={"center"}
                      spacing={1}
                      key={attachment.id}
                    >
                      <span className="d-inline-flex">
                        {<SVG.BlueAttach className="blue_attach_icon" />}
                      </span>
                      <a
                        href={generateFileUrl(attachment.path)}
                        target="_blank"
                        rel="noreferrer"
                        className="applicant_attack_anchor"
                      >
                        {attachment.title}
                      </a>
                    </Stack>
                  );
                })}
              </Box>
            </Stack>

            {/* ---------------- education, experience and skills -------- */}

            <div className="user-skills">
              <Grid container spacing={2}>
                <Grid item xl={6} lg={6} xs={12} md={6} sm={6}>
                  <div className="skills-card">
                    <h3>Work experience</h3>
                    <ul>
                      {!applicantDetails.user.workExperiences?.length ? (
                        <NoRecordFoundAnimation title="Applicant has no work experience on record." />
                      ) : (
                        applicantDetails.user.workExperiences.map(
                          (item, index) => (
                            <li key={index}>
                              <div className="list-content">
                                <WorkExperienceCard {...item} />
                              </div>
                            </li>
                          ),
                        )
                      )}
                    </ul>
                  </div>
                </Grid>
                <Grid item xl={6} lg={6} xs={12} md={6} sm={6}>
                  <div className="skills-card">
                    <h3>Education</h3>
                    <ul>
                      {!applicantDetails.user.educationRecord?.length ? (
                        <NoRecordFoundAnimation title="We could not locate any educational history for the applicant." />
                      ) : (
                        applicantDetails.user.educationRecord.map(
                          (item, index) => (
                            <li key={index}>
                              <EducationCard
                                {...item}
                                // handleEdit={() => handleEdit(item)}
                              />
                            </li>
                          ),
                        )
                      )}
                    </ul>
                  </div>
                </Grid>
              </Grid>
            </div>
            <div className="user-skills pb-3">
              <Grid container spacing={2}>
                <Grid item xl={6} lg={6} xs={12} md={6} sm={6}>
                  <div className="skills-card">
                    <h3>Skills</h3>
                    <Stack direction="row" spacing={0} flexWrap="wrap">
                      {!applicantDetails.user.skills?.length ? (
                        <NoRecordFoundAnimation title="No skills have been added by the applicant." />
                      ) : (
                        applicantDetails.user.skills.map((item, index) => (
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
                        ))
                      )}
                    </Stack>
                  </div>
                </Grid>
                <Grid item xl={6} lg={6} xs={12} md={6} sm={6}>
                  <div className="skills-card">
                    <h3>Languages</h3>
                    <ul className="list-content">
                      {!applicantDetails.user.languages?.length ? (
                        <NoRecordFoundAnimation title="There are no languages added by the applicant." />
                      ) : (
                        applicantDetails.user.languages.map((item, index) => (
                          <li key={index}>
                            <LanguageCard {...item} />
                          </li>
                        ))
                      )}
                    </ul>
                  </div>
                </Grid>
              </Grid>
            </div>
            {applicantDetails.shortLetter && (
              <div>
                <Divider sx={{ borderColor: "#ccc", my: 2 }} />
                <Box>
                  <Typography
                    variant="h6"
                    sx={{
                      fontSize: "26px",
                      fontFamily: "Bahnschrift",
                      fontWeight: "600",
                    }}
                  >
                    Download resume
                  </Typography>
                  <Typography>
                    <FilledButton
                      title={
                        isDownloadingPDF ? "Downloading PDF..." : "Download PDF"
                      }
                      onClick={downloadPDF}
                      style={{ marginBottom: "10px" }}
                      disabled={isDownloadingPDF}
                    />
                    <div style={{ display: "none" }}>
                      <ResumeTemplate
                        user={userDetails}
                        appliedJob={applicantDetails.shortLetter}
                      />
                    </div>
                  </Typography>
                </Box>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  );
};
export default ApplicantDetails;

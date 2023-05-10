import { GetUserDetailsAPI } from "@api/user";
import { SVG } from "@assets/svg";
import {
  Box,
  CardContent,
  Container,
  Card,
  Grid,
  Stack,
  Avatar,
  Typography,
  Divider,
  Chip,
} from "@mui/material";
import { generateFileUrl } from "@utils/generateFileUrl";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import WorkExperienceCard from "@components/workExperienceCard";
import { NoRecordFoundAnimation } from "@components/animations";
import EducationCard from "@components/educationCard";
import { formatPhoneNumberIntl } from "react-phone-number-input";
import LanguageCard from "@components/languageCard";
import ResumeTemplate from "../updateProfile/resume-update/resumeTemplate/template1";
import { FilledButton } from "@components/button";
import html2pdf from "html2pdf.js";
import PublicProfileSkeletonLoading from "./publicProfileSkeletonLoading";

export default function PublicProfileComponent() {
  const params = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [isDownloadingPDF, setIsDownloadingPDF] = useState(false);
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
    setIsDownloadingPDF(true);
    const element = document.getElementById("div-to-pdf");
    const options = {
      margin: [10, 10],
      filename: `${userDetails.name || "Resume"}.pdf`,
      image: { type: "jpeg", quality: 1 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    };
    await html2pdf().set(options).from(element).save();
    setIsDownloadingPDF(false);
  };
  const getUserDetails = async (userId) => {
    setIsLoading(true);
    const res = await GetUserDetailsAPI({ userId });
    if (res.remote === "success") {
      setUserDetails(res.data);
    }
    setIsLoading(false);
  };
  useEffect(() => {
    const userId = params.userId;
    getUserDetails(userId);
  }, []);
  return (
    <Box sx={{ marginTop: "67px", py: 3 }}>
      {isLoading ? (
        <PublicProfileSkeletonLoading />
      ) : (
        <Container>
          <Card
            sx={{
              boxShadow: "0px 15px 40px rgba(0, 0, 0, 0.05)",
              borderRadius: "20px",
            }}
          >
            <CardContent
              sx={{
                "&.MuiCardContent-root": {
                  padding: "30px",
                },
              }}
            >
              <Grid container spacing={2}>
                <Grid
                  item
                  lg={8}
                  xs={12}
                  sx={{
                    borderRight: "1px solid #CACACA",

                    "@media (max-width:992px)": {
                      borderRight: "0",
                    },
                  }}
                >
                  <Box sx={{ paddingRight: "45px" }}>
                    <Stack
                      direction={{ xs: "column", lg: "row" }}
                      spacing={{ xs: 1, lg: 2 }}
                      justifyContent={{ xs: "start", lg: "space-between" }}
                      alignItems={"center"}
                    >
                      <Stack direction={"row"} spacing={2}>
                        <Avatar
                          src={generateFileUrl(userDetails.profileImage || "")}
                          sx={{
                            width: "88px",
                            height: "88px",
                            boxShadow: "0px 5px 25px rgba(0, 0, 0, 0.25)",
                          }}
                        />
                        <Box>
                          <Typography
                            variant="h4"
                            sx={{
                              fontFamily: "Bahnschrift",
                              fontSize: "24px",
                              fontWeight: "700",
                              letterSpacing: "0.03em",
                              mb: 0,
                            }}
                          >
                            {userDetails.name || userDetails.email}
                          </Typography>
                          <Typography
                            sx={{
                              color: "rgb(18 18 18 / 50%)",
                              margin: "3px 0px",
                              fontFamily: "Poppins",
                            }}
                          >
                            {userDetails.profile.highestEducation?.title}
                          </Typography>
                          {userDetails.profile.country?.title ? (
                            <Stack
                              direction={"row"}
                              spacing={1}
                              alignItems={"center"}
                            >
                              <SVG.LocationIcon />
                              <Box
                                component={"span"}
                                sx={{
                                  color: "rgb(18 18 18 / 50%)",
                                  fontFamily: "Poppins",
                                }}
                              >
                                {userDetails.profile.city?.title},{" "}
                                {userDetails.profile.country?.title}
                              </Box>
                            </Stack>
                          ) : (
                            ""
                          )}
                        </Box>
                      </Stack>
                      {userDetails.profile.experience ? (
                        <Stack
                          direction={"row"}
                          spacing={1}
                          alignItems={"center"}
                          sx={{
                            border: "1px solid #CACACA",
                            borderRadius: "5px",
                            p: 1,
                          }}
                        >
                          <SVG.ClockIconSmall />{" "}
                          <Box>
                            <Typography
                              variant="h6"
                              sx={{
                                fontWeight: "500",
                                mb: 0,
                                fontSize: "14px",
                                fontFamily: "Poppins",
                                lineHeight: "12px",
                              }}
                            >
                              {userDetails.profile.experience} Years
                            </Typography>
                            <Box
                              component={"span"}
                              sx={{ fontSize: "10px", color: "#848484" }}
                            >
                              Experience
                            </Box>
                          </Box>
                        </Stack>
                      ) : null}
                    </Stack>
                    <Box sx={{ mt: 3 }}>
                      <Typography
                        variant="h6"
                        sx={{
                          fontSize: "26px",
                          fontFamily: "Bahnschrift",
                          fontWeight: "600",
                        }}
                      >
                        About
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: "14px",
                          fontFamily: "Poppins",
                          whiteSpace: "pre-line",
                        }}
                      >
                        {userDetails.profile.description}
                      </Typography>
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
                          Work experience
                        </Typography>
                        <ul className="listitems">
                          {userDetails.workExperiences.length ? (
                            userDetails.workExperiences.map((item, index) => (
                              <li
                                key={index}
                                style={{
                                  borderBottom:
                                    index !==
                                    userDetails.workExperiences.length - 1
                                      ? "1px solid #cacaca"
                                      : "",
                                }}
                              >
                                <WorkExperienceCard {...item} noOptions />
                              </li>
                            ))
                          ) : (
                            <div>
                              <NoRecordFoundAnimation title="No Work Experiences have been added by the user." />
                            </div>
                          )}
                        </ul>
                      </Box>
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
                          Education
                        </Typography>
                        {userDetails.educationRecord.length ? (
                          <ul className="listitems">
                            {userDetails.educationRecord.map((item, index) => (
                              <li
                                key={index}
                                style={{
                                  borderBottom:
                                    index !==
                                    userDetails.educationRecord.length - 1
                                      ? "1px solid #cacaca"
                                      : "",
                                }}
                              >
                                <EducationCard {...item} noOptions />
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <>
                            <div>
                              <NoRecordFoundAnimation title="No Education have been added by the user." />
                            </div>
                          </>
                        )}
                      </Box>
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
                              isDownloadingPDF
                                ? "Downloading PDF..."
                                : "Download PDF"
                            }
                            onClick={downloadPDF}
                            style={{ marginBottom: "10px" }}
                            disabled={isDownloadingPDF}
                          />
                          <div style={{ display: "none" }}>
                            <ResumeTemplate user={userDetails} />
                          </div>
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Grid>
                <Grid item lg={4} xs={12}>
                  <Box>
                    <Stack direction={"column"} spacing={2}>
                      <Typography
                        variant="h6"
                        sx={{
                          fontSize: "26px",
                          fontFamily: "Bahnschrift",
                          fontWeight: "600",
                          mb: 2,
                        }}
                      >
                        Contact info
                      </Typography>
                      {userDetails.countryCode && userDetails.mobileNumber ? (
                        <Stack
                          direction={"row"}
                          spacing={2}
                          alignItems={"center"}
                        >
                          <Box
                            sx={{
                              background: "#FEEFD3",
                              borderRadius: "5px",
                              p: 1,
                              color: "#EEA23D",
                              width: "40px",
                              height: "40px",
                              display: "inline-flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <SVG.Phone />
                          </Box>
                          <Box>
                            <Typography
                              variant="h6"
                              sx={{
                                fontSize: "16px",
                                fontFamily: "Poppins",
                                fontWeight: "600",
                              }}
                            >
                              {formatPhoneNumberIntl(
                                userDetails.countryCode +
                                  userDetails.mobileNumber
                              )}
                            </Typography>
                            <Typography
                              sx={{
                                color: "#848484",
                                fontFamily: "Poppins",
                                fontSize: "12px",
                              }}
                            >
                              Mobile
                            </Typography>
                          </Box>
                        </Stack>
                      ) : null}
                      <Stack
                        direction={"row"}
                        spacing={2}
                        alignItems={"center"}
                      >
                        <Box
                          sx={{
                            background: "#FEEFD3",
                            borderRadius: "5px",
                            p: 1,
                            color: "#EEA23D",
                            width: "40px",
                            height: "40px",
                            display: "inline-flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <SVG.Mail />
                        </Box>
                        <Box>
                          <Typography
                            variant="h6"
                            sx={{
                              fontSize: "16px",
                              fontFamily: "Poppins",
                              fontWeight: "600",
                            }}
                          >
                            {userDetails.email}
                          </Typography>
                          <Typography
                            sx={{
                              color: "#848484",
                              fontFamily: "Poppins",
                              fontSize: "12px",
                            }}
                          >
                            Email
                          </Typography>
                        </Box>
                      </Stack>
                      <Divider sx={{ borderColor: "#cacaca" }} />
                      <Typography
                        variant="h6"
                        sx={{
                          fontSize: "26px",
                          fontFamily: "Bahnschrift",
                          fontWeight: "600",
                          mb: 2,
                        }}
                      >
                        Skills
                      </Typography>
                      <Box>
                        <Stack direction="row" spacing={0} flexWrap="wrap">
                          {userDetails.skills.length ? (
                            userDetails.skills.map((item, index) => (
                              <Chip
                                key={index}
                                label={item.skill.title}
                                sx={{
                                  fontSize: "12px",
                                  fontFamily: "Poppins",
                                  color: "#121212",
                                  fontWeight: "400",
                                  // padding: "5px 10px 5px 20px",
                                  margin: "0px 8px 8px 0px",
                                }}
                              />
                            ))
                          ) : (
                            <div>
                              <NoRecordFoundAnimation title="No Skill have been added by the user." />
                            </div>
                          )}
                        </Stack>
                      </Box>
                      <Divider sx={{ borderColor: "#cacaca" }} />
                      <Typography
                        variant="h6"
                        sx={{
                          fontSize: "26px",
                          fontFamily: "Bahnschrift",
                          fontWeight: "600",
                          mb: 2,
                        }}
                      >
                        Languages
                      </Typography>
                      <Box>
                        <ul className="listitems">
                          {userDetails.languages.length ? (
                            userDetails.languages.map((item, index) => (
                              <li
                                key={index}
                                style={{
                                  borderBottom:
                                    index !== userDetails.languages.length - 1
                                      ? "1px solid #cacaca"
                                      : "",
                                }}
                              >
                                <LanguageCard {...item} />
                              </li>
                            ))
                          ) : (
                            <div>
                              <NoRecordFoundAnimation title="No Language have been added by the user." />
                            </div>
                          )}
                        </ul>
                      </Box>
                      <Box
                        sx={{
                          background: "#F2F2F2",
                          height: "300px",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        ADVETRISEMENT
                      </Box>
                    </Stack>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Container>
      )}
    </Box>
  );
}

import { GetUserDetailsAPI, storeProfileAnalyticsAPI } from "../../../api/user";
import { SVG } from "../../../assets/svg";
import {
  Box,
  Container,
  Grid,
  Stack,
  Avatar,
  Typography,
  Divider,
  Chip,
  useMediaQuery,
} from "@mui/material";
import { generateFileUrl } from "../../../utils/generateFileUrl";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import WorkExperienceCard from "../../../components/workExperienceCard";
import { NoRecordFoundAnimation } from "../../../components/animations";
import EducationCard from "../../../components/educationCard";
import { formatPhoneNumberIntl } from "react-phone-number-input";
import LanguageCard from "../../../components/languageCard";
import ResumeTemplate from "../updateProfile/resume-update/resumeTemplate/template1";
import { FilledButton } from "../../../components/button";
import html2pdf from "html2pdf.js";
import PublicProfileSkeletonLoading from "./publicProfileSkeletonLoading";
import { useSelector } from "react-redux";
import { getCVAccessAPI, requestCVAccessAPI } from "@api/employer";

export default function PublicProfileComponent() {
  const params = useParams();
  const tablet = useMediaQuery("(min-width: 900px)");
  const mobile = useMediaQuery("(max-width: 600px)");
  const [isLoading, setIsLoading] = useState(true);
  const [authorizedCV, setAuthorizedCV] = useState(false);
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
  const downloadButtonTitle = () => {
    if (!authorizedCV) return "Request CV";
    if (authorizedCV && !isDownloadingPDF) return "Download CV";
    return "Downloading CV...";
  };

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
  const CVisAuthorized = async () => {
    const res = getCVAccessAPI({ userId: params.userId });
    res.then(
      (data) => data.data.message === "Found results" && setAuthorizedCV(true)
    );
  };
  const getUserDetails = async (userId) => {
    setIsLoading(true);
    const res = await GetUserDetailsAPI({ userId });
    if (res.remote === "success") {
      setUserDetails(res.data);
    }
    setIsLoading(false);
  };
  const storeProfileAnalytics = async (userId) => {
    await storeProfileAnalyticsAPI({ user_id: userId });
  };
  useEffect(() => {
    const userId = params.userId;
    storeProfileAnalytics(userId);
  }, []);
  useEffect(() => {
    const userId = params.userId;
    getUserDetails(userId);
  }, []);
  useEffect(() => {
    CVisAuthorized();
  }, []);
  const { isMobileView } = useSelector((state) => state.platform);
  return (
    <Box
      sx={{
        background: "#fdfdfd",
        marginTop: isMobileView ? "0px" : "67px",
        py: 3,
        pb: isMobileView ? 15 : null,
      }}
    >
      {isLoading ? (
        <PublicProfileSkeletonLoading />
      ) : (
        <Container
          maxWidth={false}
          disableGutters
          sx={{
            padding: "115px 100px",
            "@media screen and (max-width: 900px)": {
              padding: "100px 36px",
            },
            "@media screen and (max-width: 600px)": {
              padding: "44px 20px",
            },
          }}
        >
          <Grid container spacing={2}>
            <Grid item xl={8} lg={12} md={12} sm={12} xs={12}>
              <Grid item sx={{ padding: "16px 0 0 16px" }}>
                <Box
                  sx={{
                    paddingRight: "45px",
                    "@media (max-width:900px)": {
                      paddingRight: "0px",
                    },
                  }}
                >
                  <Stack
                    direction={{ xs: "column", lg: "row" }}
                    spacing={{ xs: 1, lg: 2 }}
                    justifyContent={{ xs: "start", lg: "space-between" }}
                    alignItems={{ xs: "start", lg: "center" }}
                  >
                    <Stack
                      direction={"row"}
                      spacing={2}
                      alignItems={"center"}
                      sx={{ width: "100%" }}
                    >
                      <Avatar
                        src={generateFileUrl(userDetails.profileImage || "")}
                        sx={{
                          height: "100px",
                          width: "100px",
                          borderRadius: "10%",
                          boxShadow: "0px 5px 25px rgba(0, 0, 0, 0.25)",
                        }}
                      />
                      <Box
                        sx={{
                          flex: "1 1 0%",
                        }}
                      >
                        <Typography
                          variant="h4"
                          sx={{
                            fontFamily: "Bahnschrift",
                            fontSize: "24px",
                            fontWeight: "700",
                            letterSpacing: "0.03em",
                            mb: 0,
                            color: "#121212  !important",
                            "@media (max-width: 900px)": {
                              fontSize: "20px",
                            },
                            "@media (max-width: 600px)": {
                              fontSize: "16px",
                            },
                          }}
                        >
                          {userDetails.name || userDetails.email}
                        </Typography>
                        {userDetails.profile.country?.title ? (
                          <Stack
                            direction={"row"}
                            spacing={1}
                            alignItems={"center"}
                            sx={{
                              marginTop: "6px",
                              marginBottom: mobile ? "16px" : "21px",
                            }}
                          >
                            <SVG.LocationIcon width={13} color="#939393" />
                            <Box
                              component={"span"}
                              sx={{
                                color: "rgb(18 18 18 / 50%)",
                                fontFamily: "Poppins",
                                fontSize: "12px  !important",
                                "@media screen and (max-width: 600px)": {
                                  fontSize: "10px",
                                },
                              }}
                            >
                              {userDetails.profile.city?.title},{" "}
                              {userDetails.profile.country?.title}
                            </Box>
                          </Stack>
                        ) : (
                          ""
                        )}
                        {userDetails.countryCode && userDetails.mobileNumber ? (
                          <Stack
                            direction={mobile ? "column" : "row"}
                            spacing={mobile ? 1 : 3}
                            alignItems={mobile ? "flex-start" : "center"}
                          >
                            <Stack
                              direction="row"
                              spacing={1}
                              alignItems="center"
                            >
                              <SVG.Phone width={13} color="#274593" />
                              <Typography
                                component={Link}
                                to={`tel:${formatPhoneNumberIntl(
                                  userDetails.countryCode +
                                    userDetails.mobileNumber
                                )}`}
                                variant="h6"
                                sx={{
                                  fontSize: "14px",
                                  "@media screen and (max-width: 600px)": {
                                    fontSize: "10px",
                                  },
                                  fontFamily: "Poppins",
                                  fontWeight: "500",
                                  color: "#121212",
                                }}
                              >
                                {formatPhoneNumberIntl(
                                  userDetails.countryCode +
                                    userDetails.mobileNumber
                                )}
                              </Typography>
                            </Stack>
                            <Stack
                              direction="row"
                              spacing={1}
                              alignItems="center"
                            >
                              <SVG.Mail width={13} color="#274593" />
                              <Typography
                                component={Link}
                                to={`mailto:${userDetails.email}`}
                                variant="h6"
                                sx={{
                                  fontSize: "14px",
                                  "@media screen and (max-width: 600px)": {
                                    fontSize: "10px",
                                  },
                                  fontFamily: "Poppins",
                                  fontWeight: "500",
                                  color: "#121212",
                                  whiteSpace: "normal",
                                  wordBreak: "break-all",
                                }}
                              >
                                {userDetails.email}
                              </Typography>
                            </Stack>
                          </Stack>
                        ) : null}
                      </Box>
                      {userDetails.profile.experience && tablet ? (
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
                                color: "#121212",
                                "@media (max-width:600px)": {
                                  fontSize: "12px",
                                },
                              }}
                            >
                              {userDetails.profile.experience}{" "}
                              {userDetails.profile.experience > 1
                                ? "Years"
                                : "Year"}
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
                  </Stack>
                  <Typography
                    variant="h6"
                    sx={{
                      fontSize: "26px",
                      fontFamily: "Bahnschrift",
                      fontWeight: "600",
                      marginTop: "56px",
                      mb: 2,
                      color: "#121212",
                      "@media (max-width: 900px)": {
                        fontSize: "24px",
                      },
                      "@media (max-width: 600px)": {
                        fontSize: "18px",
                        marginTop: "25px",
                      },
                    }}
                  >
                    About
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "14px",
                      fontFamily: "Poppins",
                      whiteSpace: "pre-line",
                      color: "#121212",
                      wordBreak: "break-word",
                      "@media (max-width: 600px)": {
                        fontSize: "12px",
                      },
                    }}
                  >
                    {userDetails.profile.description}
                  </Typography>
                </Box>
                <Divider
                  sx={{ borderColor: "#ccc", my: mobile ? "10px" : 2 }}
                />
              </Grid>
              <Grid container sx={{ padding: "16px 0 0 16px" }}>
                <Grid
                  item
                  md={6}
                  sm={12}
                  xs={12}
                  sx={{
                    borderRight: "1px solid #cacaca",
                    paddingRight: "30px",
                    "@media screen and (max-width: 900px)": {
                      borderRight: "none",
                    },
                  }}
                >
                  <Box>
                    <Typography
                      variant="h6"
                      sx={{
                        fontSize: "26px",
                        fontFamily: "Bahnschrift",
                        fontWeight: "600",
                        mb: 2,
                        color: "#121212",
                        "@media (max-width: 900px)": {
                          fontSize: "24px",
                        },
                        "@media (max-width: 600px)": {
                          fontSize: "18px",
                        },
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
                                index !== userDetails.workExperiences.length - 1
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
                  <Divider
                    sx={{ borderColor: "#ccc", my: mobile ? "10px" : 2 }}
                  />
                  <Box>
                    <Typography
                      variant="h6"
                      sx={{
                        fontSize: "26px",
                        fontFamily: "Bahnschrift",
                        fontWeight: "600",
                        mb: 2,
                        color: "#121212",
                        "@media (max-width: 900px)": {
                          fontSize: "24px",
                        },
                        "@media (max-width: 600px)": {
                          fontSize: "18px",
                        },
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
                                index !== userDetails.educationRecord.length - 1
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
                </Grid>
                <Grid
                  item
                  sx={{
                    paddingLeft: 0,
                    "@media screen and (min-width: 900px)": {
                      paddingLeft: "30px",
                    },
                  }}
                  md={6}
                  sm={12}
                  xs={12}
                >
                  <Divider
                    sx={{
                      borderColor: "#ccc",
                      my: mobile ? "10px" : 2,
                      display: "block",
                      "@media screen and (min-width: 900px)": {
                        display: "none",
                      },
                    }}
                  />
                  <Box>
                    <Stack direction={"column"} spacing={2}>
                      <Typography
                        variant="h6"
                        sx={{
                          fontSize: "26px",
                          fontFamily: "Bahnschrift",
                          fontWeight: "600",
                          mb: 2,
                          color: "#121212",
                          "@media (max-width: 900px)": {
                            fontSize: "24px",
                          },
                          "@media (max-width: 600px)": {
                            fontSize: "18px",
                          },
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
                      <Divider
                        sx={{ borderColor: "#ccc", my: mobile ? "10px" : 2 }}
                      />
                      <Typography
                        variant="h6"
                        sx={{
                          fontSize: "26px",
                          fontFamily: "Bahnschrift",
                          fontWeight: "600",
                          mb: 2,
                          color: "#121212",
                          "@media (max-width: 900px)": {
                            fontSize: "24px",
                          },
                          "@media (max-width: 600px)": {
                            fontSize: "18px",
                          },
                        }}
                      >
                        Languages
                      </Typography>
                      <Box>
                        <ul className="listitems">
                          {userDetails.languages.length ? (
                            userDetails.languages.map((item, index) => (
                              <li key={index}>
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
                      <Divider
                        sx={{ borderColor: "#ccc", my: mobile ? "10px" : 2 }}
                      />
                      <Box>
                        <Typography
                          variant="h6"
                          sx={{
                            fontSize: "26px",
                            fontFamily: "Bahnschrift",
                            fontWeight: "600",
                            mb: 2,
                            color: "#121212",
                            "@media (max-width: 900px)": {
                              fontSize: "24px",
                            },
                            "@media (max-width: 600px)": {
                              fontSize: "18px",
                            },
                          }}
                        >
                          Download resume
                        </Typography>
                        {!authorizedCV && (
                          <Typography
                            sx={{
                              fontSize: "14px",
                              fontFamily: "Poppins",
                              color: "#848484",
                              marginTop: "10px",
                              marginBottom: "20px",
                            }}
                          >
                            You can't access this CV unless you send a request
                            to the jobseeker
                          </Typography>
                        )}
                        <Typography>
                          <FilledButton
                            title={downloadButtonTitle()}
                            onClick={
                              authorizedCV
                                ? () => downloadPDF()
                                : () =>
                                    requestCVAccessAPI({
                                      userId: params.userId,
                                    })
                            }
                            disabled={isDownloadingPDF}
                            className="outlineLogin"
                          />
                          <div style={{ display: "none" }}>
                            <ResumeTemplate user={userDetails} />
                          </div>
                        </Typography>
                      </Box>
                    </Stack>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xl={4} lg={12} md={12} sm={12} xs={12}>
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: "1fr",
                  rowGap: "42px",
                  paddingLeft: "8px",
                  "@media screen and (max-width: 1535px)": {
                    marginTop: "28px",
                    gridTemplateColumns: "1fr 1fr 1fr",
                    columnGap: "28px",
                  },
                  "@media screen and (max-width: 922px)": {
                    gridTemplateColumns: "1fr 1fr",
                    griTemplateRows: "1fr 1fr",
                  },
                  "@media screen and (max-width: 600px)": {
                    gridTemplateColumns: "1fr",
                    gridTemplateRows: "1fr 1fr 1fr",
                  },
                }}
              >
                <Box
                  sx={{
                    background: "#F2F2F2",
                    height: "300px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    fontSize: "32px",
                    fontWeight: "600",
                    "@media (max-width:768px)": {
                      fontSize: "18px",
                    },
                  }}
                >
                  ADVETRISEMENT
                </Box>
                <Box
                  sx={{
                    background: "#F2F2F2",
                    height: "300px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    fontSize: "32px",
                    fontWeight: "600",
                    "@media (max-width:768px)": {
                      fontSize: "18px",
                    },
                  }}
                >
                  ADVETRISEMENT
                </Box>
                <Box
                  sx={{
                    background: "#F2F2F2",
                    height: "300px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    fontSize: "32px",
                    fontWeight: "600",
                    "@media (max-width:768px)": {
                      fontSize: "18px",
                    },
                  }}
                >
                  ADVETRISEMENT
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      )}
    </Box>
  );
}

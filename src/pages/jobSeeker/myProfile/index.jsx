import { Box, Card, CardContent, Grid, IconButton, Stack } from "@mui/material";
import React, { useState } from "react";
// import ModalView from "../updateProfile/modal";
import DialogBox from "../../../components/dialogBox";
import UpdateInfo from "../updateProfile/update-info";
import AreaChart from "../myProfile/chart";
import ResumeUpdate from "../updateProfile/resume-update";
import JobPreferences from "./job-preferences";
import Education from "./education";
import Languages from "./languages";
import WorkExperience from "./work-experience";
import Skills from "./skills";
import AboutMe from "../aboutMe";
import { Capacitor } from "@capacitor/core";
import { IMAGES } from "@assets/images";
import { SVG } from "@assets/svg";
import { Link } from "react-router-dom";

const MyProfile = () => {
  const [open, setOpen] = useState(false);
  const platform = Capacitor.getPlatform();
  const [toggle, setToggle] = useState(["job"]);

  const handleToggleModel = (type) => {
    setToggle((prev) =>
      prev.includes(type) ? prev.filter((el) => el !== type) : [...prev, type]
    );
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <div className="dashboard-content">
        <Grid container spacing={2}>
          {platform === "android" || platform === "ios" ? (
            <>
              <Grid item xs={12}>
                <Stack
                  direction={"row"}
                  alignItems={"center"}
                  spacing={2}
                  justifyContent={"space-between"}
                  sx={{
                    mb: 1,
                    "& h1": {
                      fontFamily: "Bahnschrift",
                      fontSize: "22px",
                      fontWeight: "600",
                    },
                  }}
                >
                  <h1>My profile</h1>
                  <Stack direction={"row"} spacing={0.5} alignItems={"center"}>
                    <IconButton>
                      <SVG.AppGroup />
                    </IconButton>
                    <IconButton>
                      <SVG.Settings />
                    </IconButton>
                    <IconButton LinkComponent={Link} to="/notification">
                      <SVG.NotificationIcon />
                    </IconButton>
                  </Stack>
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Stack direction={"row"} spacing={3} sx={{ mb: 2 }}>
                  <img
                    alt="profile"
                    src={IMAGES.RecentFive}
                    style={{
                      width: "80px",
                      height: "80px",
                      borderRadius: "100%",
                      boxShadow: "0px 5px 25px 0px rgba(0, 0, 0, 0.25)",
                    }}
                  />
                  <Box
                    sx={{
                      "& h4": {
                        fontSize: "18px",
                        fontFamily: "Bahnschrift",
                        letterSpacing: "0.54px",
                        fontWeight: "700",
                        mb: 1,
                      },
                      "& p": {
                        fontSize: "14px",
                        fontFamily: "Poppins",
                        opacity: "0.5",
                        color: "#121212",
                        fontWeight: "400",
                        mb: 0.5,
                      },
                    }}
                  >
                    <h4>Vlad Blyshchyk</h4>
                    <p>+51599268290</p>
                    <p>vlad@gmail.com</p>
                  </Box>
                </Stack>
              </Grid>
              <Grid item xl={6} lg={6} xs={12}>
                <Stack direction="column" spacing={2}>
                  <Card
                    sx={{
                      "&.MuiCard-root": {
                        boxShadow: "0px 15px 40px rgba(0, 0, 0, 0.05)",
                        borderRadius: "10px",
                      },
                    }}
                  >
                    <CardContent
                      sx={{
                        "&.MuiCardContent-root": {
                          padding: "25px 25px 5px",
                        },
                      }}
                    >
                      <div className="add-content">
                        <AreaChart />
                      </div>
                    </CardContent>
                  </Card>

                  <Card
                    sx={{
                      "&.MuiCard-root": {
                        boxShadow: "0px 15px 40px rgba(0, 0, 0, 0.05)",
                        borderRadius: "10px",
                      },
                    }}
                  >
                    <CardContent
                      sx={{
                        "&.MuiCardContent-root": {
                          padding: "25px",
                        },
                      }}
                    >
                      <JobPreferences
                        fun={() => handleToggleModel("job")}
                        toggle={toggle.includes("job")}
                      />
                    </CardContent>
                  </Card>
                  <AboutMe
                    handleClickOpen={handleClickOpen}
                    fun={() => handleToggleModel("about")}
                    toggle={toggle.includes("about")}
                  />

                  <Card
                    sx={{
                      "&.MuiCard-root": {
                        boxShadow: "0px 15px 40px rgba(0, 0, 0, 0.05)",
                        borderRadius: "10px",
                      },
                    }}
                  >
                    <CardContent
                      sx={{
                        "&.MuiCardContent-root": {
                          padding: "25px",
                        },
                      }}
                    >
                      <ResumeUpdate
                        fun={() => handleToggleModel("resume")}
                        toggle={toggle.includes("resume")}
                        title="Resume"
                        bgcolor="#FEEFD3"
                        color="#EEA23D"
                        description={
                          <>
                            <p>
                              Uploading a resume speeds up your job application
                              process. It also helps the employer to know more
                              about your strengths. Job seekers with resume
                              usually find a job faster 😉
                            </p>
                          </>
                        }
                      />
                    </CardContent>
                  </Card>
                  <div className="education-card">
                    <WorkExperience
                      fun={() => handleToggleModel("work")}
                      toggle={toggle.includes("work")}
                    />
                  </div>
                  <div className="education-card">
                    <Education
                      fun={() => handleToggleModel("edu")}
                      toggle={toggle.includes("edu")}
                    />
                  </div>
                  <div className="education-card">
                    <Skills
                      fun={() => handleToggleModel("skills")}
                      toggle={toggle.includes("skills")}
                    />
                  </div>
                  <div className="education-card">
                    <Languages
                      fun={() => handleToggleModel("lang")}
                      toggle={toggle.includes("lang")}
                    />
                  </div>
                </Stack>
              </Grid>
            </>
          ) : (
            <>
              <Grid item xl={6} lg={6} xs={12}>
                <Stack direction="column" spacing={2}>
                  <Card
                    sx={{
                      "&.MuiCard-root": {
                        boxShadow: "0px 15px 40px rgba(0, 0, 0, 0.05)",
                        borderRadius: "10px",
                      },
                    }}
                  >
                    <CardContent
                      sx={{
                        "&.MuiCardContent-root": {
                          padding: "25px 25px 5px",
                        },
                      }}
                    >
                      <div className="add-content">
                        <AreaChart />
                      </div>
                    </CardContent>
                  </Card>
                  <div className="add-content">
                    <AboutMe
                      handleClickOpen={handleClickOpen}
                      fun={() => handleToggleModel("about")}
                      toggle={toggle.includes("about")}
                    />
                  </div>
                  <div className="education-card">
                    <Education
                      fun={() => handleToggleModel("edu")}
                      toggle={toggle.includes("edu")}
                    />
                  </div>
                  <div className="education-card">
                    <Languages
                      fun={() => handleToggleModel("lang")}
                      toggle={toggle.includes("lang")}
                    />
                  </div>
                </Stack>
              </Grid>
              <Grid xl={6} lg={6} item xs={12}>
                <Stack direction="column" spacing={2}>
                  <Card
                    sx={{
                      "&.MuiCard-root": {
                        boxShadow: "0px 15px 40px rgba(0, 0, 0, 0.05)",
                        borderRadius: "10px",
                      },
                    }}
                  >
                    <CardContent
                      sx={{
                        "&.MuiCardContent-root": {
                          padding: "25px",
                        },
                      }}
                    >
                      <JobPreferences
                        fun={() => handleToggleModel("job")}
                        toggle={toggle.includes("job")}
                      />
                    </CardContent>
                  </Card>
                  <Card
                    sx={{
                      "&.MuiCard-root": {
                        boxShadow: "0px 15px 40px rgba(0, 0, 0, 0.05)",
                        borderRadius: "10px",
                      },
                    }}
                  >
                    <CardContent
                      sx={{
                        "&.MuiCardContent-root": {
                          padding: "25px",
                        },
                      }}
                    >
                      <ResumeUpdate
                        fun={handleToggleModel}
                        toggle={toggle}
                        title="Resume"
                        bgcolor="#FEEFD3"
                        color="#EEA23D"
                        description={
                          <>
                            <p>
                              Uploading a resume speeds up your job application
                              process. It also helps the employer to know more
                              about your strengths. Job seekers with resume
                              usually find a job faster 😉
                            </p>
                          </>
                        }
                      />
                    </CardContent>
                  </Card>
                  <div className="education-card">
                    <WorkExperience
                      fun={() => handleToggleModel("work")}
                      toggle={toggle.includes("work")}
                    />
                  </div>
                  <div className="education-card">
                    <Skills
                      fun={() => handleToggleModel("skills")}
                      toggle={toggle.includes("skills")}
                    />
                  </div>
                </Stack>
              </Grid>
            </>
          )}
        </Grid>
      </div>
      <DialogBox open={open} handleClose={handleClose}>
        <UpdateInfo
          title="Great!"
          color="#EEA23D"
          bgcolor="#FEEFD3"
          description={[
            <>
              <p>
                Thank you for adding this important information. Our team will
                review it and activate your account within 24 hours.{" "}
              </p>
              <p>Psst, it may happen even faster, stay tuned 😉</p>
            </>,
          ]}
          buttonHover="#eea23d14"
          handleClose={handleClose}
          buttontext="Got it"
        />
      </DialogBox>
    </>
  );
};

export default MyProfile;

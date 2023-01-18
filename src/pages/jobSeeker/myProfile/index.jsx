import { Card, CardContent, Grid, Stack } from "@mui/material";
import React, { useState } from "react";
import ModalView from "../updateProfile/modal";
import UpdateInfo from "../updateProfile/modal/update-info";
import AddInfoProfileUpdate from "../updateProfile/AddInfoProfileUpdate";
import AreaChart from "../myProfile/chart";
import ResumeUpdate from "../updateProfile/resume-update";
import JobPreferences from "./job-preferences";
import Education from "./education";
import Languages from "./languages";
import WorkExperience from "./work-experience";
import Skills from "./skills";

const MyProfile = () => {
  const [open, setOpen] = useState(false);

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
          <Grid item xl={6} lg={6}>
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
              <AddInfoProfileUpdate handleClickOpen={handleClickOpen} />
              <div className="education-card">
                <Education />
              </div>
              <div className="education-card">
                <Languages />
              </div>
            </Stack>
          </Grid>
          <Grid xl={6} lg={6} item>
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
                  <JobPreferences />
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
                    title="Resume"
                    bgcolor="#FEEFD3"
                    color="#EEA23D"
                    description={
                      <>
                        <p>
                          Uploading a resume speeds up your job application
                          process. It also helps the employer to know more about
                          your strenths. Job seekers with resume usually find a
                          job faster 😉
                        </p>
                      </>
                    }
                  />
                </CardContent>
              </Card>
              <div className="education-card">
                <WorkExperience />
              </div>
              <div className="education-card">
                <Skills />
              </div>
            </Stack>
          </Grid>
        </Grid>
      </div>
      <ModalView
        open={open}
        handleClose={handleClose}
        content={
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
        }
      />
    </>
  );
};

export default MyProfile;
import { Card, CardContent, Grid, Stack } from "@mui/material";
import React from "react";
import UpdateInfo from "./update-info";
import UploadFile from "./uploadfile";
import ResumeUpdate from "./resume-update";
import { SVG } from "@assets/svg";
import { useNavigate } from "react-router-dom";
import DialogBox from "@components/dialogBox";
import { USER_ROLES } from "@utils/enum";
import AboutMe from "../aboutMe";

const UpdateProfile = () => {
  // navigate
  const navigate = useNavigate();

  // state management
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Stack direction="row" spacing={3} className="mb-3">
        <h1 className="headding m-0">Add info to complete your profile</h1>
        <span
          onClick={() => navigate(`/${USER_ROLES.jobSeeker}/my-profile`)}
          className="later"
        >
          Do it later
        </span>
      </Stack>
      <Grid container spacing={2}>
        <Grid item lg={6} xs={12}>
          <AboutMe handleClickOpen={handleClickOpen} />
        </Grid>
        <Grid item lg={6} xs={12}>
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
                    padding: "30px",
                  },
                }}
              >
                <UploadFile
                  title="Profile photo"
                  textcolor="#EEA23D"
                  color="#EEA23D"
                  bgcolor="rgba(255, 165, 0, 0.1)"
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
                    padding: "30px",
                  },
                }}
              >
                <ResumeUpdate
                  title="Resume"
                  bgcolor="#FEEFD3"
                  color="#EEA23D"
                  buttonWidth="100%"
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
          </Stack>
        </Grid>
      </Grid>
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
          buttonHover="rgba(255, 165, 0, 0.1)"
          handleClose={handleClose}
          buttontext="Got it"
          icon={<SVG.AlertCheckICon />}
        />
      </DialogBox>
    </>
  );
};
export default UpdateProfile;

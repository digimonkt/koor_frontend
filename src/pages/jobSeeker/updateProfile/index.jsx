import { Card, CardContent, Grid, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import UpdateInfo from "./update-info";
import ResumeUpdate from "./resume-update";
import { SVG } from "../../../assets/svg";
import { useNavigate } from "react-router-dom";
import DialogBox from "../../../components/dialogBox";
import { USER_ROLES } from "../../../utils/enum";
import AboutMe from "../aboutMe";
import { ProfilePicInput } from "../../../components/input";
import { useDispatch, useSelector } from "react-redux";
import { setProfilePic, updateCurrentUser } from "../../../redux/slice/user";
import { GetUserDetailsAPI, UpdateProfileImageAPI } from "../../../api/user";
import { ErrorToast, SuccessToast } from "../../../components/toast";
// import { resetToast } from "@redux/slice/toast";

const UpdateProfile = () => {
  // navigate
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.auth);

  // state management
  const [open, setOpen] = useState(false);
  const [profilePicLoading, setProfilePicLoading] = useState("");
  const [profileCompleted, setProfileCompleted] = useState(true);
  const [toggle, setToggle] = useState(["about"]);

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
  const handleProfilePicSave = async (file) => {
    setProfilePicLoading("loading");
    const newFormData = new FormData();
    newFormData.append("profile_image", file);
    dispatch(setProfilePic(URL.createObjectURL(file)));
    const res = await UpdateProfileImageAPI(newFormData);
    if (res.remote === "success") setProfilePicLoading("updated");
    else setProfilePicLoading("error");
  };
  const getUserProfile = async () => {
    const res = await GetUserDetailsAPI();
    if (res.remote === "success") {
      setProfileCompleted(res.data.profileCompleted);
      dispatch(updateCurrentUser(res.data));
    }
  };
  useEffect(() => {
    getUserProfile();
  }, []);
  return (
    <>
      {!profileCompleted && (
        <Stack
          direction={{ xs: "column", lg: "row" }}
          alignItems={{ xs: "start" }}
          spacing={{ xs: 1, lg: 3 }}
          className="mb-3"
        >
          <h1 className="heading m-0">Add info to complete your profile</h1>
          <span
            onClick={() => navigate(`/${USER_ROLES.jobSeeker}/my-profile`)}
            className="later"
          >
            Do it later
          </span>
        </Stack>
      )}
      <Grid container spacing={2}>
        <Grid item lg={6} xs={12}>
          <AboutMe
            handleClickOpen={handleClickOpen}
            fun={() => handleToggleModel("about")}
            toggle={toggle.includes("about")}
          />
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
                <ProfilePicInput
                  fun={() => handleToggleModel("updateprofille")}
                  toggle={toggle.includes("updateprofille")}
                  title="Profile photo"
                  handleSave={handleProfilePicSave}
                  image={currentUser.profileImage}
                  loading={profilePicLoading === "loading"}
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
                  fun={() => handleToggleModel("resume")}
                  toggle={toggle.includes("resume")}
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
              <br />
              <br />
              <p>Psst, it may happen even faster, stay tuned 😉</p>
            </>,
          ]}
          buttonHover="rgba(255, 165, 0, 0.1)"
          handleClose={handleClose}
          buttontext="Got it"
          icon={<SVG.AlertCheckICon />}
        />
      </DialogBox>
      <SuccessToast
        open={profilePicLoading === "updated"}
        message="Profile Pic Updated successfully"
        handleClose={() => setProfilePicLoading("")}
      />
      <ErrorToast
        open={profilePicLoading === "error"}
        message="Something went wrong"
      />
    </>
  );
};
export default UpdateProfile;

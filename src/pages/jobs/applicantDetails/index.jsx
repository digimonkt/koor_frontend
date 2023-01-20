import {
  Avatar,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  Grid,
  IconButton,
  Stack,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { IMAGES } from "../../../assets/images";
import React from "react";
import { OutlinedButton } from "../../../components/button";
import { Link, useNavigate } from "react-router-dom";
import { SVG } from "../../../assets/svg";
import {
  EDUCATION,
  langugesList,
  skillsList,
  WORK_EXPRIENCE,
} from "./applicantData";

const ApplicantDetails = () => {
  // navigate
  const navigate = useNavigate();

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
              <IconButton LinkComponent={Link} onClick={() => navigate(-1)}>
                <ArrowBackIcon />
              </IconButton>
              <Stack
                direction={{ xs: "column", lg: "row" }}
                alignItems={{ xs: "start", lg: "center" }}
                spacing={2}
                divider={<Divider orientation="vertical" flexItem />}
              >
                <h4>Muraua Birhuneya</h4>
                <div className="recent-research">
                  <span>Applied 5 m ago to: </span>
                  <div>
                    Online Research Participant (Work From Home/Part
                    Time/Casual) #KerjaTrending.
                  </div>
                </div>
              </Stack>
            </Stack>

            {/* -------------- applicant basic info ---------- */}

            <Grid container spacing={2} sx={{ mb: 4 }}>
              <Grid item xl={6} lg={6} xs={12}>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Avatar
                    src={IMAGES.RecentOne}
                    sx={{ width: "70px", height: "70px" }}
                  />
                  <div className="user-application">
                    <h4>Muraua Birhuneya</h4>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <span>{<SVG.LocationIcon />}</span>{" "}
                      <span>Paris, France</span>
                    </Stack>
                  </div>
                </Stack>
              </Grid>
              <Grid item xl={6} lg={6} xs={12}>
                <Stack
                  direction="row"
                  spacing={0}
                  className="edit-button"
                  alignItems="center"
                >
                  <Button variant="link">
                    {<SVG.EventIcon />} <span>Interview planned</span>
                  </Button>
                  <Button variant="link">
                    {<SVG.StarIcon />} <span>Shortlisted</span>
                  </Button>
                  <Button variant="link">
                    {<SVG.RejectIcon />} <span>Reject</span>
                  </Button>
                  <Button variant="link">
                    {<SVG.BlockedIcon />} <span>Blacklist</span>
                  </Button>

                  <OutlinedButton
                    style={{
                      fontWeight: "400",
                      fontSize: "12px",
                      display: "flex",
                      alignItems: "center",
                      width: "130px",
                      height: "40px",
                    }}
                    title={
                      <>
                        <span className="me-2 d-inline-flex">
                          {<SVG.MessageIcon />}
                        </span>{" "}
                        Message
                      </>
                    }
                  />
                </Stack>
              </Grid>
            </Grid>
            <Stack
              direction={{ xs: "column", lg: "row" }}
              spacing={3}
              divider={<Divider orientation="vertical" flexItem />}
            >
              <div className="user-descrition">
                <p>
                  Hi there! 👋 Though I don’t have an education mentioned in
                  your job post, I have 8 years of experience in the job
                  described. Please check out my resume, I’m sure you’ll like
                  it. Looking forward to talking in person! Information about
                  the person that they attach as a plain text to grab employer’s
                  attention. We can fit two rows here to be able to showcase
                  yourself before a potential employer even opens your resume.
                  Like “Hi, I’m Maraua and I’m the perfect fit for your job”.
                </p>
                <p>Please check out my attached resume.</p>
              </div>
              <div className="attachment-box">
                <h2>Attachments</h2>
                <ul>
                  <li>
                    <IconButton
                      sx={{
                        background: "#D5E3F7",
                        color: "#274593",
                        "&:hover": {
                          background: "#bcd2f1",
                        },
                        mr: 2,
                      }}
                    >
                      {<SVG.AttachIcon />}
                    </IconButton>
                    Muraua_Birhuneya_resume_2022.pdf
                  </li>
                  <li>
                    <IconButton
                      sx={{
                        background: "#D5E3F7",
                        color: "#274593",
                        "&:hover": {
                          background: "#bcd2f1",
                        },
                        mr: 2,
                      }}
                    >
                      {<SVG.AttachIcon />}
                    </IconButton>
                    examples_of_work.jpeg
                  </li>
                </ul>
              </div>
            </Stack>

            {/* ---------------- education, experience and skills -------- */}

            <div className="user-skills">
              <Grid container spacing={2}>
                <Grid item xl={6} lg={6}>
                  <div className="skills-card">
                    <h3>Work experience</h3>
                    <ul>
                      {WORK_EXPRIENCE.map((item, index) => (
                        <li key={index}>
                          <div className="list-content">
                            <h5>{item.title}</h5>
                            <h6>{item.subtitle}</h6>
                            <p>{item.description}</p>
                            <span>{item.date}</span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Grid>
                <Grid item xl={6} lg={6}>
                  <div className="skills-card">
                    <h3>Education</h3>
                    <ul>
                      {EDUCATION.map((item, index) => (
                        <li key={index}>
                          <div className="list-content">
                            <h5>{item.title}</h5>
                            <h6>{item.subtitle}</h6>
                            <p>{item.description}</p>
                            <span>{item.date}</span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Grid>
              </Grid>
            </div>
            <div className="user-skills pb-3">
              <Grid container spacing={2}>
                <Grid item xl={6} lg={6}>
                  <div className="skills-card">
                    <h3>Skills</h3>
                    <Stack direction="row" spacing={0} flexWrap="wrap">
                      {skillsList.map((item, index) => (
                        <Chip
                          key={index}
                          label={item}
                          sx={{
                            fontSize: "12px",
                            fontFamily: "Poppins",
                            color: "#121212",
                            fontWeight: "400",
                            padding: "5px 10px 5px 20px",
                            margin: "0px 8px 8px 0px",
                          }}
                        />
                      ))}
                    </Stack>
                  </div>
                </Grid>
                <Grid item xl={6} lg={6}>
                  <div className="skills-card">
                    <h3>Languages</h3>
                    <ul className="list-content">
                      {langugesList.map((item, index) => (
                        <li key={index}>
                          <h5>{item.title}</h5>
                          <h6>{item.subtitle}</h6>
                          <span>{item.date}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Grid>
              </Grid>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};
export default ApplicantDetails;

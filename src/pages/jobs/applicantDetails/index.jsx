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
import img from "../../../../../assert/images/recent-1.png";
import React from "react";
import {
  attachIcon,
  blockedIcon,
  eventIcon,
  location,
  messageIcon,
  rejectIcon,
  starIcon,
} from "../../../../../utils/svg.file";
import Cbutton from "../../../../button";
import { Link } from "react-router-dom";
import { SVG } from "../../../assets/svg";
const ApplicantDetails = () => {
  const WORK_EXPRIENCE = [
    {
      title: "Freelancer",
      subtitle: "Upwork",
      date: "May 2018 - Present",
    },
    {
      title: "Lead UX/UI Designer",
      subtitle: "Another company",

      date: "January 2022 - September 2022",
    },
    {
      title: "Senior UX/UI Designer",
      subtitle: "Koor",
      description:
        "Key responsibilities text. For example, assist in th preparation of regularly scheduled reports. Testing way longer text to see if it will generate two lines of text.",
      date: "January 2022 - September 2022",
    },
    {
      title: "No job",
      suptitle: "Another company",
      description: "Only a few key responsibilities.",
      date: "January 2022 - September 2022",
    },
    {
      title: "Test of many jobs",
      suptitle: "Google",

      date: "January 2022 - September 2022",
    },
  ];
  const EDUCATION = [
    {
      title: "Degree",
      subtitle: "Cambridge University",
      date: "2017 - 2022",
    },
    {
      title: "Senior UX/UI Designer",
      subtitle: "Koor",
      description:
        "Key responsibilities text. For example, assist in th preparation of regularly scheduled reports. Testing two lines of text.",
      date: "2017 - 2022",
    },
    {
      title: "Middle UX/UI Designer",
      subtitle: "Koor",
      description:
        "Key responsibilities text. For example, assist in th preparation of regularly scheduled reports. Testing two lines of text.",
      date: "2017 - 2022",
    },
  ];
  const skillsList = [
    "Calls",
    "Event Management",
    "Stock Taking",
    "Gaming",
    "Very long skill pill for test",
    "Test",
    "Cashier",
    "Sales",
    "Accountant",
    "Art",
    "Long skill to test how much we can fit",
  ];
  const langugesList = [
    {
      title: "English",
      subtitle: (
        <>
          Spoken: <strong>Fluent</strong>
          <br />
          Written: <strong>Fluent</strong>
        </>
      ),
    },
    {
      title: "German",
      subtitle: (
        <>
          Spoken: <strong>Conversational</strong>
          <br />
          Written: <strong>Conversational</strong>
        </>
      ),
    },
    {
      title: "Spanish",
      subtitle: (
        <>
          Spoken: <strong>Basic</strong>
          <br />
          Written: <strong>Conversational</strong>
        </>
      ),
    },
  ];
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
            <Stack
              direction="row"
              spacing={2}
              alignItems={{ xs: "start", lg: "center" }}
              className="recent-content job-border pb-2 mb-3"
            >
              <IconButton LinkComponent={Link} to="/manage-jobs">
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
            <Grid container spacing={2} sx={{ mb: 4 }}>
              <Grid item xl={6} lg={6} xs={12}>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Avatar src={img} sx={{ width: "70px", height: "70px" }} />
                  <div className="user-application">
                    <h4>Muraua Birhuneya</h4>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <span>{location}</span> <span>Paris, France</span>
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
                    {eventIcon} <span>Interview planned</span>
                  </Button>
                  <Button variant="link">
                    {starIcon} <span>Shortlisted</span>
                  </Button>
                  <Button variant="link">
                    {rejectIcon} <span>Reject</span>
                  </Button>
                  <Button variant="link">
                    {blockedIcon} <span>Blacklist</span>
                  </Button>

                  <Cbutton
                    variant="outlined"
                    sx={{
                      "&.MuiButton-outlined": {
                        borderRadius: "50px",

                        color: "#274593",
                        fontWeight: "400",
                        fontSize: "12px",
                        fontFamily: "Poppins",
                        padding: "5px 25px",
                        border: "1px solid #274593",
                        textTransform: "capitalize",
                        whiteSpace: "nowrap",
                        display: "flex",
                        alignItems: "center",
                        height: "40px",
                      },
                    }}
                  >
                    <span className="me-2 d-inline-flex">
                      {<SVG.MessageIcon />}
                    </span>{" "}
                    Message
                  </Cbutton>
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
                      {attachIcon}
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
                      {attachIcon}
                    </IconButton>
                    examples_of_work.jpeg
                  </li>
                </ul>
              </div>
            </Stack>
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

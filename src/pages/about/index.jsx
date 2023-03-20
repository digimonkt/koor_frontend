import { Box, Button, Container, Grid } from "@mui/material";
import React from "react";
import styles from "./about.module.css";
import { IMAGES } from "../../assets/images";
import { Link } from "react-router-dom";
import { SVG } from "@assets/svg";
import AboutContent from "./aboutContent";

const aboutImg = [
  {
    img: IMAGES.AboutBanner,
  },
];

const button = [
  {
    icon: <SVG.Reciept />,
    svg: <SVG.ArrowForward />,
    text: "Find Tender",
  },
  {
    icon: <SVG.Vector />,
    svg: <SVG.ArrowForward />,
    text: "Find Tender",
  },
  {
    icon: <SVG.Work />,
    svg: <SVG.ArrowForward />,
    text: "Find Tender",
  },
];

const AboutUs = () => {
  return (
    <>
      <Box className={styles.about}>
        <Box className={styles.about_back_color}>
          <Container>
            <Grid container spacing={{ xs: 2, sm: 10 }}>
              <Grid item md={4} lg={4}>
                {aboutImg.map((item, index) => (
                  <Box key={index}>
                    <img
                      src={item.img}
                      alt="img"
                      className={styles.about_banner_img}
                    />
                  </Box>
                ))}
              </Grid>
              <Grid item lg={8}>
                <Box className={styles.about_text_box}>
                  <h2 className={styles.about_heading}>About Our Company</h2>
                  <p className={styles.about_text}>
                    Koor is an award-winning mobile app which connects
                    non-executive job seekers to reliable employers quickly &
                    easily. With just a tap, applicants can apply for jobs
                    offered by thousands of trusted employers in Singapore,
                    across all sectors! <br /> <br /> Start finding jobs near
                    home or simply discover jobs based on your search
                    preferences. With FastChat in-app, employers and shortlisted
                    candidates can connect in real-time and receive responses.
                  </p>
                </Box>
                <Box className={styles.about_social}>
                  <Link to="/social">
                    <img src={IMAGES.Googleplay} alt="img" />
                  </Link>
                  <Link to="/social" className="mx-3">
                    <img src={IMAGES.Appstore} alt="img" />
                  </Link>
                </Box>
              </Grid>
            </Grid>
          </Container>
        </Box>
        <Box>
          <AboutContent />
        </Box>
        <Box className={styles.about_black_color}>
          <Container>
            <Grid container spacing={2}>
              <Grid item lg={6}>
                <Box className={styles.about_stack_box}>
                  <Box className={styles.about_black_box_text}>
                    <h1>Koor is a global job search platform </h1>
                    <p>
                      Get access to exciting job openings across full-time,
                      part-time and contract roles! New candidates can easily
                      register for an account and create a professional resume
                      with the app.
                    </p>
                  </Box>
                </Box>
              </Grid>
              <Grid item lg={6}>
                <Box className={styles.btn_about_box}>
                  {button.map((item, index) => {
                    return (
                      <>
                        <Box>
                          <Button
                            variant="contained"
                            key={index}
                            className={styles.btn_about}
                          >
                            {item.icon}
                            <span className="mx-2">{item.text}</span>
                            {item.svg}
                          </Button>
                        </Box>
                      </>
                    );
                  })}
                </Box>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
    </>
  );
};
export default AboutUs;

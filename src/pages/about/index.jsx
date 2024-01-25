import { Box, Container, Grid, Stack } from "@mui/material";
import React from "react";
import styles from "./about.module.css";
import { IMAGES } from "../../assets/images";
import { Link } from "react-router-dom";
import AboutContent from "./aboutContent";
import { OTHER_BUTTON } from "../../utils/constants/constants";
import HomeSection from "../home/homeSection";
import FeatureSection from "../home/featureSection";

const aboutImg = [
  {
    img: IMAGES.AboutBanner,
  },
];

const AboutUs = () => {
  return (
    <>
      <Box className={styles.about}>
        <Box className={styles.about_back_color}>
          <Container
            maxWidth={false}
            sx={{
              "@media(min-width:992px)": {
                paddingLeft: "100px",
                paddingRight: "100px",
              },
            }}
          >
            <Grid
              container
              spacing={{ xs: 2, sm: 3, lg: 10 }}
              direction={{ sm: "row-reverse", md: "row", lg: "row-reverse" }}
            >
              <Grid item md={8} lg={7} xs={12} sm={7}>
                <Box className={styles.about_text_box}>
                  <h2>About Our Company</h2>
                  <p>
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
                  <Link to="/">
                    <img src={IMAGES.Googleplay} rel="nofollow" alt="img" />
                  </Link>
                  <Link to="/" className="mx-3">
                    <img src={IMAGES.Appstore} rel="nofollow" alt="img" />
                  </Link>
                </Box>
              </Grid>
              <Grid item md={4} lg={5} xs={12} sm={5}>
                {aboutImg.map((item, index) => (
                  <Box key={index}>
                    <img
                      src={item.img}
                      alt="img"
                      rel="nofollow"
                      className={styles.about_banner_img}
                    />
                  </Box>
                ))}
              </Grid>
            </Grid>
          </Container>
        </Box>
        <Box sx={{ paddingTop: "50px" }}>
          <Container
            maxWidth={false}
            sx={{
              "@media(min-width:992px)": {
                paddingLeft: "100px",
                paddingRight: "100px",
              },
            }}
          >
            <FeatureSection />
            <HomeSection />
          </Container>
        </Box>

        <Box>
          <AboutContent />
        </Box>
        <Box className={styles.about_black_color}>
          <Container
            maxWidth={false}
            sx={{
              "@media(min-width:992px)": {
                paddingLeft: "100px",
                paddingRight: "100px",
              },
            }}
          >
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
              <Grid item lg={6} xs={12}>
                <Box className={styles.btn_about_box}>
                  <Stack
                    direction={{ xs: "column", lg: "row", sm: "row" }}
                    spacing={{ xs: 2, lg: 2, sm: 2 }}
                  >
                    {OTHER_BUTTON.map((item, index) => {
                      return (
                        <>
                          <Link
                            sx={{ textTransform: "capitalize" }}
                            key={index}
                            variant="contained"
                            className={styles.btn_about}
                            to={`${item.url}`}
                          >
                            <span className={styles.icon}>{item.icon}</span>
                            <span className="mx-2">{item.text}</span>
                            {item.svg}
                          </Link>
                        </>
                      );
                    })}
                  </Stack>
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

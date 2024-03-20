import { Box, Container, Grid, Stack } from "@mui/material";
import React, { useState } from "react";
import styles from "./about.module.css";
import { IMAGES } from "../../assets/images";
import { Link } from "react-router-dom";
import AboutContent from "./aboutContent";
import { OTHER_BUTTON } from "../../utils/constants/constants";
import HomeSection from "../home/homeSection";
import FeatureSection from "../home/featureSection";
import DialogBox from "@components/dialogBox";
import { useSelector } from "react-redux";
import { USER_ROLES } from "../../utils/enum";
import { Helmet } from "react-helmet";

const aboutImg = [
  {
    img: IMAGES.AboutBanner,
  },
];

const AboutUs = () => {
  const { role } = useSelector((state) => state.auth);
  const [openDialog, setOpenDialog] = useState(false);
  const handleCommingSoon = () => {
    setOpenDialog(true);
  };

  return (
    <>
      <Helmet>
        <script type="application/ld+json">
          {`
{
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What sets your platform apart from other job search platforms ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Our platform stands out due to its holistic approach, bringing together employers, job seekers, and vendors in one integrated ecosystem. The emphasis on collaboration and the seamless user experience make it a unique and powerful tool in the Somali employment landscape.",
        },
      },
      {
        "@type": "Question",
        name: "Is there a cost associted with using your platform?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "While basic features are often available for free, we offer premium packages with advanced functionalities for employers, job seekers, and vendors. These packages are designed to provide additional benefits and a more tailored experience. Detailed pricing information is available on our website.",
        },
      },
      {
        "@type": "Question",
        name: "Is your platform accessible via both web and mobile devices?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, our platform is designed to be accessible both through a web browser and a mobile app. This ensures flexibility and convenience for users, allowing them to connect anytime, anywhere, whether they are in the office or on the go.",
        },
      },
      {
        "@type": "Question",
        name: "What is the innovative web application and mobile app you offer?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Our revolutionary web application and mobile app serve as a dynamic platform, connecting employers, job seekers, and vendors in Somalia. It streamlines the recruitment process and facilitates seamless interactions, making it easier for all stakeholders to connect and collaborate.",
        },
      },
      {
        "@type": "Question",
        name: "How can I get started on your platform?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "To get started, simply visit our website or download our mobile app. Users can create accounts, customize profiles, and begin exploring the platform's features. Employers can post jobs, job seekers can browse listings, and vendors can establish connections to foster collaboration.",
        },
      },
      {
        "@type": "Question",
        name: "How does your platform ensure security and privacy?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We take security and privacy seriously. Our platform employs robust encryption protocols to safeguard user data. Additionally, user information is handled with strict confidentiality, and we adhere to industry best practices to ensure a secure environment for all users.",
        },
      },
      {
        "@type": "Question",
        name: "What advantages does your platform offer to job seekers?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Job seekers benefit from a user-friendly interface that simplifies the job search process. They can create comprehensive profiles, explore job listings, and directly connect with potential employers. Our platform enhances visibility, making it easier for job seekers to showcase their skills and experience to prospective employers.",
        },
      },
    ],
  };

`}
        </script>
      </Helmet>
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
                  <Link onClick={handleCommingSoon}>
                    <img src={IMAGES.Googleplay} rel="nofollow" alt="img" />
                  </Link>
                  <Link onClick={handleCommingSoon} className="mx-3">
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
                          <>
                            {item.section === "talents" &&
                            role !== USER_ROLES.employer ? (
                              ""
                            ) : (
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
                            )}
                          </>
                        </>
                      );
                    })}
                  </Stack>
                </Box>
              </Grid>
            </Grid>
          </Container>
        </Box>
        <DialogBox open={openDialog} handleClose={() => setOpenDialog(false)}>
          <Box
            sx={{
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              width: "100%",
              textDecoration: "capitalize",
              color: "#eea23d",
            }}
          >
            <h2 className="mb-4">Stay In Touch</h2>
            <h1 className="mb-4" style={{ color: "#000" }}>
              Mobile App Is Coming Soon!
            </h1>
          </Box>
        </DialogBox>
      </Box>
    </>
  );
};
export default AboutUs;

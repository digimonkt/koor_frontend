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
        <meta name="keywords" content="Talent, Jobs, and Business." />
        <meta
          name="description"
          content="Koor bridges the gap between Somali employers, Jobseekers & Vendors on one platform. Hire talent, find jobs, collaborate with businesses - powered by seamless real-time interactions."
        />
        <title>
          About Koor: Connecting Employers, Talent & Vendors in Somalia
        </title>
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
                <Box
                  style={{ textAlign: "justify" }}
                  className={styles.about_text_box}
                >
                  <h1
                    style={{
                      color: "#fff",
                    }}
                  >
                    About Us
                  </h1>
                  <p>
                    Welcome to Koor, a cutting-edge web and mobile app
                    transforming the way employers, job seekers, and vendors
                    connect across Somalia. We are dedicated to revolutionizing
                    the employment landscape with exceptional services tailored
                    to meet the unique needs of our diverse users. Designed as a
                    vibrant hub, Koor facilitates effortless connections and
                    opens up a wealth of opportunities. As an employer, you can
                    register to post job opportunities or access a pool of
                    talented professionals and suppliers. As a job seeker or
                    vendor, simply register, build your profile, and discover
                    the best opportunities available. Koor is the ideal platform
                    for you. Enjoy seamless real-time interactions and prompt
                    responses—our app features ensure effective engagement where
                    employers initiate contact with job seekers and vendors.
                    Receive notifications tailored to your preferences and stay
                    updated with the latest posts by downloading the Koorjobs
                    app.
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
                    <h1>
                      Maximize Potential with Opportunities for All on Koor!
                    </h1>
                    <p style={{ textAlign: "justify" }}>
                      Tailored Solutions for Employers, Job Seekers, and
                      Vendors. As an employer, post job or tender listings and
                      access a pool of qualified candidates and suppliers. As a
                      job seeker or vendor, find opportunities and create
                      profiles to connect with employers.
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
                      switch (true) {
                        case (item.section === "talents" ||
                          item.section === "vendors") &&
                          role !== USER_ROLES.employer:
                          return "";
                        default:
                          return (
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
                          );
                      }
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

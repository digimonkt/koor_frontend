import React from "react";
import { Box, Grid } from "@mui/material";
import { IMAGES } from "../../../assets/images";
import styles from "./home_section.module.css";
import { Helmet } from "react-helmet";

const sectionItem = [
  {
    image: IMAGES.Detail1,
    imgtext: "easy",
    heading: "Transform the Employment Landscape with Koor",
    text: "Are you looking to revolutionize the way employers, job seekers, and vendors connect in Somalia? Look no further – Koor is here to transform the employment landscape in Somalia with our innovative web application and mobile app. Since our inception in 2019, we have been consistently taking ideal initiatives to serve the needs of employers, job seekers, and vendors in the best way possible.",
    title:
      "Our mission is to simplify connections between employers, quality talent, and reliable suppliers, and take the right measures to empower Somalia's workforce and economy through technology. By removing inefficiencies and barriers, we streamline the process for companies to post opportunities and tenders as well as the job search for candidates by providing an efficient online platform.",
  },
  {
    image: IMAGES.Detail2,
    imgtext: "friendly",
    heading: " A Seamless and User-friendly Experience",
    text: "Our platform is built with innovation at its core and our primary focus is on providing a seamless and user-friendly experience to bring together the diverse requirements of the local job market. We take the right measures to enable quick and efficient connections between employers, applicants, and vendors. ",
    title:
      "Countless job seekers can browse through a wide range of job listings tailored to the market and find full time job opportunities. Vendors and consultants can bid on projects that match their expertise and expand their business horizons. Our platform connects you with employers looking for your specific skills, ensuring that your bids are targeted and relevant.",
  },
  {
    image: IMAGES.Detail3,
    imgtext: "useful",
    heading: "The Perfect Opportunity is Just a Click Away",
    text: "Our intuitive interface allows users to filter current Jobs in Somalia and consultants based on industry, experience level, and location, ensuring that the perfect opportunity is just a click away. Employers can discover their next star employee effortlessly, post job listings, review CVs, and connect with a diverse pool of skilled professionals.",
    title:
      "Our platform simplifies the hiring process, allowing you to find the perfect candidate quickly and efficiently. Explore bids from top-notch vendors and consultants to elevate your projects.",
  },
  {
    image: IMAGES.Detail4,
    imgtext: "Simple",
    heading: "Simplify the Hiring Process with Koor",
    text: "Employers can simplify their hiring process by posting job openings on Koor. Our platform allows to reach a targeted audience, making it easier to find qualified candidates as quickly as possible. Save time and resources by utilizing our user-friendly app designed for effective recruitment.",
    title:
      "At Koor, we understand the unique dynamics of the job market and provide solutions that cater to the specific needs and preferences of the community. Our mobile app ensures that you can access our platform anytime, anywhere, making job searching, hiring, and vendor collaboration more convenient than ever.",
  },
];

const HomeSection = () => {
  return (
    <>
      <Helmet>
        <meta name="keywords" content="somali jobs,jobs in somalia" />
        <meta
          name="description"
          content="Find your dream job in Somalia or post opening for top talent. KoorJobs connects employers and applicants full time or part time, offering the best opportunities."
        />
        <title>Koorjobs | Find Your Dream Job in Somalia</title>
      </Helmet>
      <Box mt={20} className={`${styles.home_section_box}`}>
        <Grid container spacing={2}>
          {sectionItem.map((item) => (
            <>
              <Grid
                item
                xs={12}
                md={6}
                lg={6}
                key="index"
                className={styles.home_section_grid}
              >
                <Box className={`${styles.home_section_img_box}`}>
                  <img src={item.image} alt="img" rel="nofollow" />
                  <h5 className={styles.homeheadding}>{item.imgtext}</h5>
                </Box>
              </Grid>
              <Grid item xs={12} md={6} lg={6}>
                <Box className={`${styles.home_section_text_box}`}>
                  <Box>
                    <h3 className={`${styles.home_section_text_h3}`}>
                      {item.heading}
                    </h3>
                    <p className={`${styles.home_section_text_p}`}>
                      {item.text}
                    </p>
                    <p className={`${styles.home_section_text_p}`}>
                      {item.title}
                    </p>
                  </Box>
                </Box>
              </Grid>
            </>
          ))}
        </Grid>
      </Box>
    </>
  );
};

export default HomeSection;

import React from "react";
import { Box, Grid } from "@mui/material";
import { IMAGES } from "@assets/images";
import styles from "./home_section.module.css";

const sectionItem = [
  {
    image: IMAGES.Easy,
    imgtext: "easy",
    heading: "Koor is something new but easy",
    text: "At Koor, our mission is to make job searching easier and more efficient. Our platform is designed with the jobseeker in mind, offering a simple and intuitive way to find job opportunities that match your skills and location preferences.",
    title:
      "With Koor, you can quickly compare job offers and make informed decisions on your next career move. Our real-time notifications ensure that you are the first to know when a new job that matches your criteria is posted, giving you an advantage in a competitive job market.",
  },
  {
    image: IMAGES.Friend,
    imgtext: "friendly",
    heading: "Another title",
    text: "At Koor, our mission is to make job searching easier and more efficient. Our platform is designed with the jobseeker in mind, offering a simple and intuitive way to find job opportunities that match your skills and location preferences.",
    title:
      "With Koor, you can quickly compare job offers and make informed decisions on your next career move. Our real-time notifications ensure that you are the first to know when a new job that matches your criteria is posted, giving you an advantage in a competitive job market.",
  },
  {
    image: IMAGES.Useful,
    imgtext: "useful",
    heading: "The last one  ",
    text: "At Koor, our mission is to make job searching easier and more efficient. Our platform is designed with the jobseeker in mind, offering a simple and intuitive way to find job opportunities that match your skills and location preferences.",
    title:
      "With Koor, you can quickly compare job offers and make informed decisions on your next career move. Our real-time notifications ensure that you are the first to know when a new job that matches your criteria is posted, giving you an advantage in a competitive job market.",
  },
];

const HomeSection = () => {
  return (
    <>
      <Box className={`${styles.home_section_box}`}>
        <Grid container spacing={2}>
          {sectionItem.map((item, index) => (
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
                  <img src={item.image} alt="img" />
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

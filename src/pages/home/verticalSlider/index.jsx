// import { React } from "react";
import { IMAGES } from "@assets/images";
import { Box, Grid } from "@mui/material";
import React from "react";
import Slider from "react-slick";
import styles from "./verticalslider.module.css";

const vertical = [
  {
    img: IMAGES.Testi,
    heading: "Real testimonials",
    title:
      "Very grateful for the professional approach and human qualities of Koor company. In my imagination, I drew a non-standard house (the first floor area is quite large), but I wanted it to look not too big and in the style of Chalet. The team Interior-Idea coped with the task quickly and efficiently, I immediately liked the first proposed option exterior, then there were details and coordination.",
    text: "Olivia Roberts,",
    text1: "Graphic Designer at LaMDA",
  },
  {
    img: IMAGES.Testi,
    heading: "Real testimonials",
    title:
      "Very grateful for the professional approach and human qualities of Koor company. In my imagination, I drew a non-standard house (the first floor area is quite large), but I wanted it to look not too big and in the style of Chalet. The team Interior-Idea coped with the task quickly and efficiently, I immediately liked the first proposed option exterior, then there were details and coordination.",
    text: "Olivia Roberts,",
    text1: "Graphic Designer at LaMDA",
  },
  {
    img: IMAGES.Testi,
    heading: "Real testimonials",
    title:
      "Very grateful for the professional approach and human qualities of Koor company. In my imagination, I drew a non-standard house (the first floor area is quite large), but I wanted it to look not too big and in the style of Chalet. The team Interior-Idea coped with the task quickly and efficiently, I immediately liked the first proposed option exterior, then there were details and coordination.",
    text: "Olivia Roberts,",
    text1: "Graphic Designer at LaMDA",
  },
];

const VerticalSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    arrows: false,
    autoplay: false,
    autoplaySpeed: 1500,
    speed: 500,
    vertical: true,
    verticalSwiping: true,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <>
      <Box className="verticalSlider">
        <Slider {...settings}>
          {vertical.map((item, index) => (
            <>
              <Box className={styles.slider_box}>
                <Grid
                  container
                  spacing={2}
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Grid xs={12} md={6} lg={6} sm={6} key="index">
                    <Box
                      className="text-center"
                      sx={{
                        "@media(max-width:992px)": { paddingRight: "15px" },
                      }}
                    >
                      <img
                        src={IMAGES.Testi}
                        alt=""
                        className={styles.home_testi_img}
                      />
                    </Box>
                  </Grid>
                  <Grid xs={12} md={6} lg={6} sm={6}>
                    <Box className={styles.home_testi_box_testi}>
                      <h2 className={styles.testi_heading}>{item.heading}</h2>
                      <p className={styles.testi_p}>{item.title}</p>
                      <h5 className={styles.testi_h5}>
                        <span className={styles.testi_h5_span}>
                          {item.text}
                        </span>
                        {item.text1}
                      </h5>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </>
          ))}
        </Slider>
      </Box>
    </>
  );
};

export default VerticalSlider;

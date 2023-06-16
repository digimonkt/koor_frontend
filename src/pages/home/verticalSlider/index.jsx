// import { React } from "react";
import { Box, Grid } from "@mui/material";
import React from "react";
import Slider from "react-slick";
import styles from "./verticalslider.module.css";
import { generateFileUrl } from "@utils/generateFileUrl";
const VerticalSlider = ({ testimonialList }) => {
  const settings = {
    dots: true,
    infinite: true,
    arrows: false,
    autoplay: false,
    autoplaySpeed: 1500,
    speed: 500,
    vertical: false,
    verticalSwiping: false,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <>
      <Box className="verticalSlider">
        <Slider {...settings}>
          {(testimonialList || []).map((item, index) => (
            <>
              <Box className={styles.slider_box}>
                <Grid
                  container
                  spacing={0}
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Grid xs={12} md={6} lg={6} sm={6} key={index}>
                    <Box
                      className="text-center"
                      sx={{
                        "@media(max-width:992px)": { paddingRight: "15px" },
                      }}
                    >
                      {item.image?.path && (
                        <img
                          src={generateFileUrl(item.image.path)}
                          alt=""
                          className={styles.home_testi_img}
                        />)
                      }

                    </Box>
                  </Grid>
                  <Grid xs={12} md={6} lg={6} sm={6}>
                    <Box className={styles.home_testi_box_testi}>
                      <h2 className={styles.testi_heading}>{item.title}</h2>
                      <p className={styles.testi_p}>{item.description}</p>
                      <h5 className={styles.testi_h5}>
                        <span className={styles.testi_h5_span}>
                          {item.clientName}
                        </span>
                        , {item.clientPosition} at {item.clientCompany}
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

import { Box, Grid, Typography } from "@mui/material";

import React, { useState } from "react";
import Slider from "react-slick";
import { generateFileUrl } from "../../../utils/generateFileUrl";
import { TESTIMONIAL_MAX_WORD } from "../../../utils/constants/constants";
import styles from "./verticalslider.module.css";
import { SVG } from "../../../assets/svg";
function TestimonialSlider({ testimonialList }) {
  const [nav1, setNav1] = React.useState(null);
  const [nav2, setNav2] = React.useState(null);
  let slider1 = [];
  let slider2 = [];

  React.useEffect(() => {
    setNav1(slider1);
    setNav2(slider2);
  }, [slider1, slider2]);
  const [showMore, setShowMore] = useState("");
  const handleShowMore = (testimonialId) => {
    setShowMore(testimonialId);
  };

  return (
    <>
      <Grid container spacing={{ xs: 3, lg: 10 }} alignItems={"center"}>
        <Grid item xs={12} lg={6} sm={6}>
          <Box
            sx={{
              height: "325px",
              overflow: "hidden",
              "@media(max-width:600px)": {
                height: "auto",
              },
            }}
          >
            <Slider
              asNavFor={nav1}
              ref={(slider) => (slider2 = slider)}
              slidesToShow={3}
              slidesToScroll={3}
              infinite={true}
              swipeToSlide={true}
              focusOnSelect={true}
              vertical={false}
              arrows={false}
              centerMode={true}
              dots={true}
              dotsClass="listvertical"
              centerPadding="0px"
              className="testmonials-slider"
              responsive={[
                {
                  breakpoint: 600,
                  settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                  },
                },
              ]}
            >
              {(testimonialList || []).map((item, index) => (
                <>
                  <Box className="testmonial-img">
                    {item.image?.path && (
                      <img
                        key={index}
                        src={generateFileUrl(item.image.path)}
                        alt=""
                        height={100}
                      />
                    )}
                  </Box>
                </>
              ))}
            </Slider>
          </Box>
        </Grid>
        <Grid item xs={12} lg={6} sm={6}>
          <Slider
            asNavFor={nav2}
            ref={(slider) => (slider1 = slider)}
            arrows={false}
            fade={true}
            infinite={true}
            responsive={[
              {
                breakpoint: 600,
                settings: {
                  slidesToShow: 1,
                  slidesToScroll: 1,
                },
              },
            ]}
          >
            {(testimonialList || []).map((item) => (
              <>
                <Box>
                  <Typography
                    variant="h2"
                    sx={{
                      fontSize: "32px",
                      fontFamily: "Bahnschrift",
                      fontWeight: 600,
                      m: 0,
                    }}
                  >
                    {item.title}
                  </Typography>
                  {showMore === item.id ? (
                    <Box
                      sx={{
                        "& p": {
                          fontSize: "16px",
                          fontFamily: "Poppins",
                          fontWeight: 400,
                        },
                      }}
                      dangerouslySetInnerHTML={{ __html: item.description }}
                    ></Box>
                  ) : (
                    <Box
                      sx={{
                        "& p": {
                          fontSize: "16px",
                          fontFamily: '"Poppins", sans-serif',
                          fontWeight: 400,
                        },
                      }}
                      dangerouslySetInnerHTML={{
                        __html: item.description.substring(
                          0,
                          TESTIMONIAL_MAX_WORD,
                        ),
                      }}
                    ></Box>
                  )}

                  {item.description.length > TESTIMONIAL_MAX_WORD &&
                  showMore !== item.id ? (
                    <Box
                      onClick={() => handleShowMore(item.id)}
                      sx={{
                        cursor: "pointer",
                        mb: 3,
                        position: "relative",
                        zIndex: 2,
                      }}
                      className={styles.home_img_contents_p}
                    >
                      Show More <SVG.ArrowDownward />
                    </Box>
                  ) : item.description.length > TESTIMONIAL_MAX_WORD ? (
                    <Box
                      onClick={() => handleShowMore("")}
                      sx={{
                        cursor: "pointer",
                        mb: 3,
                        position: "relative",
                        zIndex: 2,
                      }}
                      className={styles.home_img_contents_p}
                    >
                      Show Less <SVG.ArrowUpward />
                    </Box>
                  ) : (
                    " "
                  )}
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: 600,
                      fontSize: "16px",
                      fontFamily: '"Poppins", sans-serif',
                    }}
                  >
                    <span>{item.clientName}</span>, {item.clientPosition} at{" "}
                    {item.clientCompany}
                  </Typography>
                </Box>
              </>
            ))}
          </Slider>
        </Grid>
      </Grid>
    </>
  );
}

export default TestimonialSlider;

import { Box, Grid } from "@mui/material";

import React, { useState } from "react";
import Slider from "react-slick";
import { generateFileUrl } from "@utils/generateFileUrl";
import { TESTIMONIAL_MAX_WORD } from "@utils/constants/constants";

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
        <Grid item xs={5}>
          <Slider
            asNavFor={nav1}
            ref={(slider) => (slider2 = slider)}
            slidesToShow={3}
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
        </Grid>
        <Grid item xs={7}>
          <Slider
            asNavFor={nav2}
            ref={(slider) => (slider1 = slider)}
            arrows={false}
            fade={true}
            infinite={true}
          >
            {(testimonialList || []).map((item, index) => (
              <>
                <Box>
                  <h2>{item.title}</h2>
                  {showMore === item.id ? (
                    <div
                      dangerouslySetInnerHTML={{ __html: item.description }}
                    ></div>
                  ) : (
                    <div
                      dangerouslySetInnerHTML={{
                        __html: item.description.substring(
                          0,
                          TESTIMONIAL_MAX_WORD
                        ),
                      }}
                    ></div>
                  )}

                  {item.description.length > TESTIMONIAL_MAX_WORD &&
                  showMore !== item.id ? (
                    <div onClick={() => handleShowMore(item.id)}>Show More</div>
                  ) : item.description.length > TESTIMONIAL_MAX_WORD ? (
                    <div onClick={() => handleShowMore("")}>Show Less</div>
                  ) : (
                    " "
                  )}
                  <h5>
                    <span>{item.clientName}</span>, {item.clientPosition} at{" "}
                    {item.clientCompany}
                  </h5>
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

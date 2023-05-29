import React from "react";
import { Box } from "@mui/material";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "./slider.module.css";
import { SVG } from "../../assets/svg";

const slideItem = [
  {
    icon: <SVG.Market />,
    title: "Marketing",
    text: "104 jobs",
  },
  {
    icon: <SVG.Design />,
    title: "Design & Creative",
    text: "582 jobs",
  },
  {
    icon: <SVG.Person />,
    title: "Office Assitance",
    text: "286 jobs",
  },
  {
    icon: <SVG.QuestionMark />,
    title: "Consulting",
    text: "182 jobs",
  },
  {
    icon: <SVG.Account />,
    title: "Accounting",
    text: "926 jobs",
  },
];

const SlickSlider = () => {
  const settings = {
    dots: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 1500,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };
  return (
    <>
      <Box>
        <Slider {...settings}>
          {slideItem.map((item, index) => (
            <Box key="index" className="px-3">
              <Box className={`${styles.slider_box}`}>
                <Box className={`${styles.slider_icon_box}`}>{item.icon}</Box>
                <Box>
                  <h4 className={`${styles.slider_box_h4}`}>{item.title}</h4>
                  <p className={`m-0 p-0 ${styles.slider_box_p}`}>
                    {item.text}
                  </p>
                </Box>
              </Box>
            </Box>
          ))}
        </Slider>
      </Box>
    </>
  );
};

export default SlickSlider;

import { SVG } from "@assets/svg";
import { FilledButton } from "../../components/button";
// import { Grid } from "@mui/material";
import { useState } from "react";
import Slider from "react-slick";

export const Package = ({ packageData, handleBuyPackage }) => {
  const [ispackage, setIsPackage] = useState(1);

  const handleActivePackage = (id) => {
    setIsPackage(id);
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    arrows: false,
  };

  return (
    <Slider
      {...settings}
      responsive={[
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
      ]}
      sx={{
        backgroundColor: "#ffffff !important",
      }}
    >
      {(packageData || []).map((item, index) => (
        <>
          <div
            className={`credits_cards_div ${
              index === ispackage ? "package-active" : ""
            }`}
            onClick={() => handleActivePackage(index)}
          >
            <h5 className="credits_title">{item.title}</h5>
            <p className="credits_head_credit">{item.credit} Credits</p>
            <ul style={{ minHeight: "160px", padding: "0px" }}>
              {(item.benefit || []).map((benefitList, benefitListIndex) => {
                return (
                  <>
                    {benefitList !== "" && (
                      <li key={benefitListIndex} className="credits_li">
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <SVG.CheckIcon
                            className="me-2"
                            style={{ width: "19px", height: "19px" }}
                          />
                          <span style={{ flex: "1 1 0%" }}>{benefitList}</span>
                        </div>
                      </li>
                    )}
                  </>
                );
              })}
            </ul>
            <FilledButton
              title={`$${item.price} BUY`}
              type="button"
              onClick={() => handleBuyPackage(item)}
              disabled={false}
              fullWidth
              sx={{
                fontSize: "14px !important",
                fontWeight: "500 !important",
                color:
                  index === ispackage ? "#000 !important" : "#000 !important",
                border: "0px !important",
                letterSpacing: "0.28px !important",
                fontFamily: "Poppins !important",
                backgroundColor:
                  index === ispackage
                    ? "#fff !important"
                    : "#d5e3f7 !important",
                padding: "5px 20px 5px 20px !important",
                height: "31px !important",
                "&:hover": {
                  backgroundColor: "#d5e3f7 !important",
                },
              }}
            />
          </div>
        </>
      ))}
    </Slider>
  );
};

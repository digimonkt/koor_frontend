import React from "react";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { OutlinedButton } from "@components/button";
import { Card, CardContent, Grid } from "@mui/material";
import styles from "../styles.module.css";
import { useNavigate } from "react-router-dom";
import { generateFileUrl } from "@utils/generateFileUrl";

export const ResourceCard = ({ id, image, title, description }) => {
  const navigate = useNavigate();
  const removeImagesFromHTMLArray = (htmlArray) => {
    const imgRegex = /<img[^>]+>/g;
    return htmlArray.map((html) => html.replace(imgRegex, ""));
  };
  return (
    <Card
      sx={{
        "&.MuiCard-root": {
          boxShadow: "0px 15px 40px rgba(0, 0, 0, 0.05)",
          borderRadius: "10px",
        },
        mb: 2.5,
      }}
    >
      <CardContent
        sx={{
          "&.MuiCardContent-root": {
            padding: "30px",
          },
        }}
      >
        <Grid container spacing={2}>
          <Grid item lg={4} xs={12}>
            <div className={`${styles.imgbox}`}>
              <img
                alt=""
                src={generateFileUrl(image)}
                className={`${styles.imgSize}`}
                rel="nofollow"
              />
            </div>
          </Grid>
          <Grid item lg={8} xs={12}>
            <div className={`${styles.content}`}>
              <h3>{title}</h3>
              {removeImagesFromHTMLArray(description)?.map(
                (html, innerIndex) => (
                  <div
                    key={innerIndex}
                    dangerouslySetInnerHTML={{
                      __html: html?.slice(0, 300) + "......",
                    }}
                  />
                )
              )}

              <OutlinedButton
                onClick={() => navigate(`/resources/${id}`)}
                title={
                  <>
                    <span className="me-2 d-inline-flex">
                      <ArrowForwardIcon />
                    </span>{" "}
                    Read more
                  </>
                }
                sx={{
                  "&.MuiButton-outlined": {
                    borderRadius: "73px",
                    border: "0",
                    color: "#274593",
                    fontWeight: "500",
                    fontSize: "16px !important",
                    fontFamily: "Bahnschrift",
                    padding: "7px 30px",
                    background: "#D5E3F7",

                    "&:hover": { background: "#c7dcfa" },
                    "@media(max-width:992px)": {
                      fontSize: "14px !important"
                    }
                  },
                }}
              />
            </div>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

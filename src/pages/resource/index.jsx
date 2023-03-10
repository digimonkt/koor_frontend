import React from "react";
import { Box, Container, Grid, Typography } from "@mui/material";
import styles from "./resource.module.css";
import { IMAGES } from "@assets/images";
import { Link } from "react-router-dom";
import { SVG } from "@assets/svg";
import Content from "./Content";

const banner = [
  {
    img: IMAGES.Resource,
  },
];

const Resource = () => {
  return (
    <>
      <Box className={styles.resource}>
        <Box className={styles.resource_back_box}>
          <Container>
            <Grid container spacing={3}>
              <Grid item lg={5}>
                {banner.map((item, index) => (
                  <Box key={index}>
                    <img
                      src={item.img}
                      alt="img"
                      className={styles.resource_banner}
                    />
                  </Box>
                ))}
              </Grid>
              <Grid item lg={7}>
                <Box className={styles.resource_text_box}>
                  <Box>
                    <Typography className={styles.resource_heading}>
                      How to find work nowadays?
                    </Typography>
                    <p className={styles.resource_text}>
                      It’s not all about hard skills only. Read and find out how
                      to get a new job more likely.
                    </p>
                    <Box className={styles.resource_social_box}>
                      <p className={styles.resource_share_p}>Share:</p>
                      <div className={styles.resource_social_div}>
                        <Link className={styles.social_link}>
                          <SVG.SecondTwit />
                        </Link>
                        <Link className={styles.social_link}>
                          <SVG.SecondInsta />
                        </Link>
                        <Link className={styles.social_link}>
                          <SVG.SecondLink />
                        </Link>
                        <Link className={styles.social_link}>
                          <SVG.Face />
                        </Link>
                      </div>
                    </Box>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Container>
          <Box>
            <Content />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Resource;

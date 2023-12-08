import { useEffect, useState } from "react";
import { Box, Container, Grid, Typography } from "@mui/material";
import styles from "./resource.module.css";
import { Link, useParams } from "react-router-dom";
import { SVG } from "../../assets/svg";
import Content from "./Content";
import { getResourceDetailsAPI } from "../../api/common";
import { generateFileUrl } from "../../utils/generateFileUrl";

const Resource = () => {
  const { id } = useParams();
  const [resourceList, setResourceList] = useState([]);

  const resourceDetails = async () => {
    const response = await getResourceDetailsAPI(id);
    if (response.remote === "success") {
      setResourceList(response.data);
    }
  };
  useEffect(() => {
    resourceDetails();
  }, [id]);

  return (
    <>
      <Box className={styles.resource}>
        <Box className={styles.resource_back_box}>
          <Container
            maxWidth={false}
            sx={{
              "@media(min-width:992px)": {
                paddingLeft: "100px",
                paddingRight: "100px",
              },
            }}
          >
            <Grid
              container
              spacing={3}
              direction={{
                sm: "row-reverse",
                md: "row-reverse",
                lg: "row-reverse",
              }}
            >
              <Grid item lg={5} sm={6} xs={12}>
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
                          <SVG.TwitterIcon className={styles.social_icon} />
                        </Link>
                        <Link className={styles.social_link}>
                          <SVG.InstagramIcon className={styles.social_icon} />
                        </Link>
                        <Link className={styles.social_link}>
                          <SVG.LinkedInIcon className={styles.social_icon} />
                        </Link>
                        <Link className={styles.social_link}>
                          <SVG.FacebookIcon className={styles.social_icon} />
                        </Link>
                      </div>
                    </Box>
                  </Box>
                </Box>
              </Grid>
              {resourceList?.attachment?.path ? (
                <Grid item lg={7} sm={6} xs={12}>
                  <Box
                    sx={{
                      "@media (max-width: 480px)": {
                        textAlign: "center",
                      },
                    }}
                  >
                    <img
                      src={generateFileUrl(resourceList?.attachment?.path)}
                      alt="img"
                      className={styles.resource_banner}
                      rel="nofollow"
                    />
                  </Box>
                </Grid>
              ) : (
                ""
              )}
            </Grid>
          </Container>
          {resourceList ? (
            <Box>
              <Content resourceList={resourceList} />
            </Box>
          ) : (
            ""
          )}
        </Box>
      </Box>
    </>
  );
};

export default Resource;

import { SVG } from "@assets/svg";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import styles from "./resource.module.css";
import { getResourcesSuggestionAPI } from "@api/common";
import { useNavigate } from "react-router-dom";
import { generateFileUrl } from "@utils/generateFileUrl";
const Articles = ({ resourcesId }) => {
  const [resourceList, setResourceList] = useState([]);
  const navigate = useNavigate();
  const getResourceSuggestion = async () => {
    const response = await getResourcesSuggestionAPI(resourcesId);
    if (response.remote === "success") {
      setResourceList(response.data.results);
    }
  };
  const removeImagesFromHTMLArray = (htmlArray) => {
    const imgRegex = /<img[^>]+>/g;
    return htmlArray.map((html) => html.replace(imgRegex, ""));
  };
  useEffect(() => {
    getResourceSuggestion();
  }, [resourcesId]);
  return (
    <>
      <div className={styles.articles}>
        <Container>
          <Box>
            <h1 className={styles.articles_heading}>Recommended articles</h1>
            <Box>
              <Grid container spacing={3}>
                {resourceList.map((item, index) => (
                  <>
                    <Grid item lg={4} xs={12} sm={6}>
                      <Card className={styles.div_card} key={index}>
                        <div>
                          <img src={generateFileUrl(item.attachment.path)} className={styles.card_img} />
                        </div>
                        <CardContent className="m-0 p-0">
                          <Typography className={styles.card_title}>
                            {item.title}
                          </Typography>
                          <Typography className={styles.card_text}>

                            {removeImagesFromHTMLArray(item.description)?.map(
                              (html, innerIndex) => (
                                <div
                                  key={innerIndex}
                                  dangerouslySetInnerHTML={{
                                    __html: html?.slice(0, 150) + "......",
                                  }}
                                />
                              )
                            )}
                          </Typography>
                        </CardContent>
                        <CardActions className="px-0">
                          <Button className={styles.card_btn} onClick={() => navigate(`/resources/${item.id}`)}>
                            <SVG.RightArrow />
                            Read More
                          </Button>
                        </CardActions>
                      </Card>
                    </Grid>
                  </>
                ))}
              </Grid>
            </Box>
          </Box>
        </Container>
      </div>
    </>
  );
};

export default Articles;

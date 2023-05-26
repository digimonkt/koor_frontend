import { IMAGES } from "@assets/images";
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
import React from "react";
import styles from "./resource.module.css";

const cardItem = [
  {
    img: IMAGES.Article1,
    title: "Perfect CV. How?",
    text: "Odio convallis nunc odio dui platea sagittis donecnon, quis. Vitae morbi cum lobortis eget..",
  },
  {
    img: IMAGES.Article2,
    title: "Find work faster with Koor!",
    text: "Odio convallis nunc odio dui platea sagittis donec non, quis. Vitae morbi cum lobortis eget lorem consequat. ",
  },
  {
    img: IMAGES.Article3,
    title: "How to post a job",
    text: "Odio convallis nunc odio dui platea sagittis donec non, quis. Vitae morbi cum lobortis eget lorem consequat. ",
  },
];

const Articles = () => {
  return (
    <>
      <div className={styles.articles}>
        <Container>
          <Box>
            <h1 className={styles.articles_heading}>Recommended articles</h1>
            <Box>
              <Grid container spacing={3}>
                {cardItem.map((item, index) => (
                  <>
                    <Grid item lg={4} xs={12} sm={6}>
                      <Card className={styles.div_card} key={index}>
                        <div>
                          <img src={item.img} className={styles.card_img} />
                        </div>
                        <CardContent className="m-0 p-0">
                          <Typography className={styles.card_title}>
                            {item.title}
                          </Typography>
                          <Typography className={styles.card_text}>
                            {item.text}
                          </Typography>
                        </CardContent>
                        <CardActions className="px-0">
                          <Button className={styles.card_btn}>
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

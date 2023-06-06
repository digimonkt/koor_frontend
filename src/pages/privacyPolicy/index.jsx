import { useEffect, useState } from "react";
import { Box, Button, Container, Grid, Stack } from "@mui/material";
import styles from "../about/about.module.css";
import { SVG } from "@assets/svg";
import { getPrivacyApi } from "@api/user";

const PrivacyPolicy = () => {
  const [privacyPolicy, setPrivacyPolicy] = useState("");

  const button = [
    {
      icon: <SVG.Reciept />,
      svg: <SVG.ArrowForward />,
      text: "Find Tender",
    },
    {
      icon: <SVG.ProfileIcon />,
      svg: <SVG.ArrowForward />,
      text: "Find Talent",
    },
    {
      icon: <SVG.Work />,
      svg: <SVG.ArrowForward />,
      text: "Find Job",
    },
  ];

  const userRights = async () => {
    const response = await getPrivacyApi();
    if (response.remote === "success") {
      setPrivacyPolicy(response.data.description);
    } else {
      console.log(response.error);
    }
  };
  useEffect(() => {
    userRights();
  }, []);
  return (
    <>
      <Box className={styles.about}>
        <Box className={styles.about_back_color}>
          <Container
            maxWidth={false}
            sx={{
              "@media(min-width:600px)": {
                paddingLeft: "100px",
                paddingRight: "100px",
              },
            }}
          >
            <Grid
              container
              spacing={{ xs: 2, sm: 3, lg: 10 }}
              direction={{ sm: "row-reverse", md: "row", lg: "row-reverse" }}
            >
              <Grid item md={8} lg={8} sm={8} xs={12}>
                <Box className={styles.about_text_box}>
                  <div
                    dangerouslySetInnerHTML={{ __html: privacyPolicy }}
                    style={{ color: "white" }}
                  />
                </Box>
              </Grid>
            </Grid>
          </Container>
        </Box>
        <Box className={styles.about_black_color}>
          <Container
            maxWidth={false}
            sx={{
              "@media(min-width:600px)": {
                paddingLeft: "100px",
                paddingRight: "100px",
              },
            }}
          >
            <Grid container spacing={2}>
              <Grid item lg={6}>
                <Box className={styles.about_stack_box}>
                  <Box className={styles.about_black_box_text}>
                    <h1>Koor is a global job search platform </h1>
                    <p>
                      Get access to exciting job openings across full-time,
                      part-time and contract roles! New candidates can easily
                      register for an account and create a professional resume
                      with the app.
                    </p>
                  </Box>
                </Box>
              </Grid>
              <Grid item lg={6} xs={12}>
                <Box className={styles.btn_about_box}>
                  <Stack
                    direction={{ xs: "column", lg: "row", sm: "row" }}
                    spacing={{ xs: 2, lg: 2, sm: 2 }}
                  >
                    {button.map((item, index) => {
                      return (
                        <>
                          <Button
                            sx={{ textTransform: "capitalize" }}
                            key={index}
                            variant="contained"
                            className={styles.btn_about}
                            fullWidth
                          >
                            <span className={styles.icon}>{item.icon}</span>
                            <span className="mx-2">{item.text}</span>
                            {item.svg}
                          </Button>
                        </>
                      );
                    })}
                  </Stack>
                </Box>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
    </>
  );
};

export default PrivacyPolicy;

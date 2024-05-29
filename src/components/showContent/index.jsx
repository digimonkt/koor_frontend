import React, { useState } from "react";
import { Box, Container, Grid, Stack } from "@mui/material";
import styles from "../../pages/about/about.module.css";
import { Link } from "react-router-dom";
import { OTHER_BUTTON } from "../../utils/constants/constants";
import { useSelector } from "react-redux";
import DialogBox from "../../components/dialogBox";
import { SVG } from "../../assets/svg";
import { SEARCH_TYPE, USER_ROLES } from "../../utils/enum";

const ShowContent = ({ content }) => {
  const { isLoggedIn, role } = useSelector((state) => state.auth);
  const [warningTrue, setWarningTrue] = useState(false);
  const [warningRole, setWarningRole] = useState(USER_ROLES.employer);
  const employerHandler = (e, section) => {
    if (section === SEARCH_TYPE.talents) {
      if (role !== USER_ROLES.employer) {
        e.preventDefault();
        setWarningTrue(true);
        setWarningRole(USER_ROLES.employer);
      }
    }
  };
  const itemLink = (item) => {
    if (item.section === SEARCH_TYPE.talents) {
      if (isLoggedIn && role === USER_ROLES.employer) {
        return item.url;
      } else {
        return "#";
      }
    }
    return item.url;
  };
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
                    dangerouslySetInnerHTML={{ __html: content }}
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
                    <h1>
                      Maximize Potential with Opportunities for All on Koor!
                    </h1>
                    <p style={{ textAlign: "justify" }}>
                      Tailored Solutions for Employers, Job Seekers, and
                      Vendors. As an employer, post job or tender listings and
                      access a pool of qualified candidates and suppliers. As a
                      job seeker or vendor, find opportunities and create
                      profiles to connect with employers.
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
                    {OTHER_BUTTON.map((item, index) => {
                      return (
                        <>
                          <Link
                            sx={{ textTransform: "capitalize" }}
                            key={index}
                            variant="contained"
                            className={styles.btn_about}
                            to={itemLink(item)}
                            onClick={(e) => employerHandler(e, item.section)}
                          >
                            <span className={styles.icon}>{item.icon}</span>
                            <span className="mx-2">{item.text}</span>
                            {item.svg}
                          </Link>
                        </>
                      );
                    })}
                  </Stack>
                </Box>
              </Grid>
            </Grid>
          </Container>
        </Box>
        <DialogBox open={warningTrue} handleClose={() => setWarningTrue(false)}>
          <div>
            <SVG.Warning
              style={{
                marginLeft: "39%",
                height: "50px",
                width: "50px",
                color: "red",
              }}
            />
            <h1 className="heading" style={{ textTransform: "capitalize" }}>
              {warningRole} login required
            </h1>
            <div className="form-content">
              <p>
                Dear user, to access this content, please log in as a{" "}
                {warningRole}.
              </p>
            </div>
          </div>
        </DialogBox>
      </Box>
    </>
  );
};

export default ShowContent;

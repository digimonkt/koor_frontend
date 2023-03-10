import { Box, Container, Stack, Tab, Tabs } from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./about-content.module.css";

const menu = [
  {
    path: "#/#",
    title: "Job Seeker",
  },
  {
    path: "#/#",
    title: "Employer",
  },
  {
    path: "#/#",
    title: "Vender",
  },
];

// const tabs = [
//   {
//     id: "1",
//     name: "General",
//   },
//   {
//     id: "1",
//     name: "General",
//   },
// ];

const AboutContent = () => {
  const [value, setValue] = useState(2);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Box>
        <Container>
          <Box className={styles.about_content}>
            <Box className={styles.about_content_text}>
              <Box>
                <h2 className={styles.about_content_heading}>
                  Frequently Asked Questions
                </h2>
              </Box>
              <Box className={styles.stack_box}>
                <Stack
                  direction={{ xs: "column", sm: "row" }}
                  spacing={{ xs: 3, sm: 8, md: 8 }}
                >
                  {menu.map((item, index) => (
                    <Box key={index}>
                      <Link
                        to={item.path}
                        value={value}
                        onChange={handleChange}
                        className={styles.about_content_menu}
                      >
                        {item.title}
                      </Link>
                    </Box>
                  ))}
                </Stack>
              </Box>
            </Box>
            <Box>
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="disabled tabs example"
              >
                <Tab label="General" />
                <Tab label="Payment" />
                <Tab label="Security" />
                <Tab label="Returns" />
                <Tab label="Job Search" />
                <Tab label="Cooperation" />
                <Tab label="Work Presentation" />
                <Tab label="Messages" />
              </Tabs>
            </Box>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default AboutContent;

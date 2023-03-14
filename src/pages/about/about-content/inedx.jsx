import { Box, Container, Stack, Tab } from "@mui/material";
import React, { useState } from "react";
import styles from "./about-content.module.css";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import ScrollTabs from "../scrollTabs";

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
            <TabContext value={value}>
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
                    <Box sx={{ width: "100%", typography: "body1" }}>
                      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                        <TabList
                          className="newstabs"
                          onChange={handleChange}
                          aria-label="lab API tabs example"
                        >
                          <Tab label="Job Seeker" value="1" />
                          <Tab label="Employer" value="2" />
                          <Tab label="Vender" value="3" />
                        </TabList>
                      </Box>
                    </Box>
                  </Stack>
                </Box>
              </Box>

              <TabPanel value="1">
                <ScrollTabs />
              </TabPanel>
              <TabPanel value="2">
                <ScrollTabs />
              </TabPanel>
              <TabPanel value="3">
                <ScrollTabs />
              </TabPanel>
            </TabContext>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default AboutContent;

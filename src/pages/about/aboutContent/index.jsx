import { Box, Container, Stack, Tab, Tabs } from "@mui/material";
import styles from "./about-content.module.css";
import PropTypes from "prop-types";
import ScrollTabs from "../scrollTabs";
import { TabContext } from "@mui/lab";
import React from "react";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3, "@media (max-width:480px)": { px: 0 } }}>
          {children}
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const AboutContent = () => {
  const [value, setValue] = React.useState(0);

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
                    spacing={{ xs: 2, sm: 8, md: 8 }}
                  >
                    <Box sx={{ width: "100%", typography: "body1" }}>
                      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                        <Tabs
                          value={value}
                          className="newstabs"
                          onChange={handleChange}
                          aria-label="basic tabs example"
                          sx={{
                            "& .MuiButtonBase-root.MuiTab-root": {
                              "@media(max-width:992px)": {
                                fontSize: "16px !important",
                                marginLeft: "0px !important",
                                paddingLeft: "5px",
                                paddingRight: "5px",
                              },
                            },
                            "& .MuiTabs-scroller": {
                              "@media(max-width:992px)": {
                                textAlign: "center",
                              },
                            },
                          }}
                        >
                          <Tab label="Job Seeker" {...a11yProps(0)} />
                          <Tab label="Employer" {...a11yProps(1)} />
                          <Tab label="Vender" {...a11yProps(2)} />
                        </Tabs>
                      </Box>
                    </Box>
                  </Stack>
                </Box>
              </Box>

              <TabPanel value={value} index={0}>
                <ScrollTabs />
              </TabPanel>
              <TabPanel value={value} index={1}>
                <ScrollTabs />
              </TabPanel>
              <TabPanel value={value} index={2}>
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

import React from "react";
import { Box, Tab } from "@mui/material";
import Accordian from "../accordion";
import { TabContext, TabList, TabPanel } from "@mui/lab";
// import styles from "./scroll-tabs.module.css";

const ScrollTabs = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <>
      <div>
        <Box>
          <TabContext value={value}>
            <TabList
              onChange={handleChange}
              aria-label="lab API tabs example"
              value={value}
              variant="scrollable"
              scrollButtons={false}
              className="scroll_tabs"
            >
              <Tab label="General" value="1" />
              <Tab label="Payment" value="2" />
              <Tab label="Security" value="3" />
              <Tab label="Returns" value="4" />
              <Tab label="Job search" value="5" />
              <Tab label="Cooperation" value="6" />
              <Tab label="Work Presentation" value="7" />
              <Tab label="Message" value="8" />
            </TabList>
            <TabPanel value="1">
              <Accordian />
            </TabPanel>
            <TabPanel value="2">
              <Accordian />
            </TabPanel>
            <TabPanel value="3">
              <Accordian />
            </TabPanel>
            <TabPanel value="4">
              <Accordian />
            </TabPanel>
            <TabPanel value="5">
              <Accordian />
            </TabPanel>
            <TabPanel value="6">
              <Accordian />
            </TabPanel>
            <TabPanel value="7">
              <Accordian />
            </TabPanel>
            <TabPanel value="8">
              <Accordian />
            </TabPanel>
          </TabContext>
        </Box>
      </div>
    </>
  );
};

export default ScrollTabs;

import React from "react";
import { Box, Tab } from "@mui/material";
import Accordian from "../accordion";
import { TabContext, TabList } from "@mui/lab";
import PropTypes from "prop-types";

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
        <Box sx={{ p: 3, "@media (max-width:992px)": { px: 0 } }}>
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

const ScrollTabs = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <>
      <Box>
        <TabContext value={value}>
          <TabList
            onChange={handleChange}
            aria-label="scrollable auto tabs example"
            value={value}
            variant="scrollable"
            scrollButtons="auto"
            className="scroll_tabs"
            sx={{
              "& .MuiButtonBase-root.MuiTab-root": {
                margin: "0px 5px !important",
              },
            }}
          >
            <Tab label="General" {...a11yProps(0)} />
            <Tab label="Payment" {...a11yProps(1)} />
            <Tab label="Security" {...a11yProps(2)} />
            <Tab label="Returns" {...a11yProps(3)} />
            <Tab label="Job search" {...a11yProps(4)} />
            <Tab label="Cooperation" {...a11yProps(5)} />
            <Tab label="Work Presentation" {...a11yProps(6)} />
            <Tab label="Message" {...a11yProps(7)} />
          </TabList>
          <TabPanel value={value} index={0}>
            <Accordian />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Accordian />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <Accordian />
          </TabPanel>
          <TabPanel value={value} index={3}>
            <Accordian />
          </TabPanel>
          <TabPanel value={value} index={4}>
            <Accordian />
          </TabPanel>
          <TabPanel value={value} index={5}>
            <Accordian />
          </TabPanel>
          <TabPanel value={value} index={6}>
            <Accordian />
          </TabPanel>
          <TabPanel value={value} index={7}>
            <Accordian />
          </TabPanel>
        </TabContext>
      </Box>
    </>
  );
};

export default ScrollTabs;

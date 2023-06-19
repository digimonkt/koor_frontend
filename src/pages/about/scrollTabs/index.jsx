
import { Box } from "@mui/material";
import Accordian from "../accordion";
import { TabContext, TabList } from "@mui/lab";
import PropTypes from "prop-types";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getFAQQuestions } from "@redux/slice/faq";
import { OutlinedButton } from "@components/button";
import classes from "./scroll-tabs.module.css";

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

const ScrollTabs = ({ faqCategory }) => {
  const [activeCategory, setActiveCategory] = useState(0);
  const dispatch = useDispatch();
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleFAQQuestion = (role, categoryId) => {
    setActiveCategory(categoryId);
    dispatch(getFAQQuestions({ role, categoryId }));
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
            {(faqCategory || []).map((category, index) =>
            (
              <>
                <OutlinedButton className={(activeCategory === category.id) ? classes.active_color : ""} title={category.title} {...a11yProps(index)} onClick={() => handleFAQQuestion(category.role, category.id)} />
              </>
            ))}
          </TabList>
          {(faqCategory || []).map((category, index) =>
          (<>
            <TabPanel value={value} index={index}>
              <Accordian faqCategory={faqCategory} />
            </TabPanel>
          </>
          ))}
        </TabContext>
      </Box>
    </>
  );
};

export default ScrollTabs;

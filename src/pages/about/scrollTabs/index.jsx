import { Box } from "@mui/material";
import Accordian from "../accordion";
import { TabContext, TabList } from "@mui/lab";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getFAQQuestions } from "../../../redux/slice/faq";
import { OutlinedButton } from "../../../components/button";
import classes from "./scroll-tabs.module.css";

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      style={{
        transition: "all 1s cubic-bezier(.68,-0.55,.27,1.55)",
      }}
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
  const handleChange = (_, newValue) => {
    setValue(newValue);
  };
  const handleFAQQuestion = (role, categoryId) => {
    setActiveCategory(categoryId);
    dispatch(getFAQQuestions({ role, categoryId }));
  };
  useEffect(() => {
    // Set the active category when the component mounts
    if (faqCategory && faqCategory.length > 0) {
      handleFAQQuestion(faqCategory[0].role, faqCategory[0].id);
    }
  }, [faqCategory]);
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
            className={`${classes.scroll_tabs} scroll_tabs`}
            sx={{
              "& .MuiButtonBase-root.MuiTab-root": {
                margin: "0px 5px !important",
              },
            }}
          >
            <Box className={`${classes.scroll_tabs_btn}`}>
              <Box className={classes.about_content_heading_2}>
                Frequently Asked Questions
              </Box>
              {(faqCategory || []).map((category, index) => (
                <>
                  <OutlinedButton
                    className={
                      activeCategory === category.id
                        ? classes.active_color
                        : classes.scroll_tab_tab
                    }
                    title={category.title}
                    {...a11yProps(index)}
                    onClick={() =>
                      handleFAQQuestion(category.role, category.id)
                    }
                  />
                </>
              ))}
            </Box>
          </TabList>
          {(faqCategory || []).map((_, index) => (
            <>
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

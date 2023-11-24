import React from "react";
import { TabContext, TabList } from "@mui/lab";
import { Tab } from "@mui/material";
import { useSelector } from "react-redux";
import { TABS_VALUE } from "@utils/constants/constants";

const EmployerMyPostTabs = ({ onTabChange }) => {
  const { manageJobActiveTab } = useSelector((state) => state.employer);
  const { isMobileView } = useSelector((state) => state.platform);
  const handleChange = (event, newValue) => {
    onTabChange(newValue);
  };

  return (
    <>
      {isMobileView && (
        <TabContext value={manageJobActiveTab}>
          <TabList
            disableRipple={true}
            onChange={handleChange}
            aria-label="lab API tabs example"
            sx={{
              "& .MuiTabs-indicator": {
                background: "#EEA23D",
                borderRadius: "8px 12px 0px 0px",
                height: "3px",
              },
              "& .MuiButtonBase-root": {
                color: "#848484",
                fontFamily: "Bahnschrift",
                fontWeight: "400",
                fontSize: "18px",
                textTransform: "capitalize",
                "&.Mui-selected": {
                  color: "#121212",
                },
              },
            }}
          >
            <Tab label="Jobs" value={TABS_VALUE.tab1} disableRipple={true} />
            <Tab label="Tenders" value={TABS_VALUE.tab2} disableRipple={true} />
            <Tab
              label="Applications"
              value={TABS_VALUE.tab3}
              disableRipple={true}
            />
          </TabList>
        </TabContext>
      )}
    </>
  );
};

export default EmployerMyPostTabs;

import React, { useEffect } from "react";
import { TabContext, TabList } from "@mui/lab";
import { Tab } from "@mui/material";
import { useSelector } from "react-redux";

const EmployerMyPostTabs = ({ onTabChange }) => {
  const { manageJobActiveTab } = useSelector((state) => state.employer);
  const handleChange = (event, newValue) => {
    onTabChange(newValue);
  };
  useEffect(() => {
    console.log({ manageJobActiveTab });
  }, [manageJobActiveTab]);
  return (
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
        <Tab label="My Jobs" value="0" disableRipple={true} />
        <Tab label="Tender" value="1" disableRipple={true} />
        <Tab label="Applications" value="2" disableRipple={true} />
      </TabList>
    </TabContext>
  );
};

export default EmployerMyPostTabs;

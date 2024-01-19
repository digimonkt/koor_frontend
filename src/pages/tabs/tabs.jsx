import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Tab } from "@mui/material";
import AppliedTenderComponent from "@pages/vendor/appliedTender";
import { USER_ROLES } from "@utils/enum";
import React from "react";
import ShortlistedTab from "./shortlisted/";

const Tabs = ({ setValue, value, role }) => {
  const handleChange = (_, newValue) => {
    setValue(newValue);
  };
  return (
    <>
      <TabContext value={value}>
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
              width: "50%",
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
          <Tab label="Talents feed" value="1" disableRipple={true} />
          <Tab
            label={
              role === USER_ROLES.employer ? "Shortlisted" : "Applied tenders"
            }
            value="2"
            disableRipple={true}
          />
        </TabList>
        <TabPanel value="2" sx={{ px: 0 }}>
          <Box sx={{ marginBottom: "130px" }}>
            {role === USER_ROLES.employer ? (
              <ShortlistedTab />
            ) : (
              <AppliedTenderComponent />
            )}
          </Box>
        </TabPanel>
      </TabContext>
    </>
  );
};

export default Tabs;

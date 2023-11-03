import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Tab } from "@mui/material";
import AppliedJobsComponent from "@pages/jobSeeker/appliedJobs";
import Search from "@pages/search";
import JobSearchComponent from "@pages/search/jobSearch/jobSearch";
import { useState } from "react";

const BrowserJob = () => {
  const [value, setValue] = useState("1");

  const handleChange = (event, newValue) => {
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
          <Tab label="Job feed" value="1" disableRipple={true} />
          <Tab label="Applied jobs" value="2" disableRipple={true} />
        </TabList>
        <TabPanel value="1">
          <Search searchTypeForJob={"jobs"} />
          <JobSearchComponent />
        </TabPanel>
        <TabPanel value="2">
          <AppliedJobsComponent />
        </TabPanel>
      </TabContext>
    </>
  );
};

export default BrowserJob;

import React from "react";
import { styled } from "@mui/material/styles";
import { Chip, Stack, Tab, Tabs } from "@mui/material";
import Cbutton from "./button";
import { SVG } from "@assets/svg";
import ApplicationsJobs from "./manage-jobs/applications";

import Tenders from "./tendersjob";
import { Link } from "react-router-dom";
const AntTabs = styled(Tabs)({
  borderBottom: "1px solid transparent",
  "& .MuiTabs-indicator": {
    backgroundColor: "#274593",
    borderRadius: "6px 6px 0px 0px",
    height: "4px",
  },
});

const AntTab = styled((props) => <Tab disableRipple {...props} />)(
  ({ theme }) => ({
    textTransform: "none",
    minWidth: 0,
    [theme.breakpoints.up("sm")]: {
      minWidth: 0,
    },
    fontWeight: theme.typography.fontWeightRegular,
    marginRight: theme.spacing(5),
    color: "#848484",
    paddingLeft: "0px",
    paddingRight: "0px",
    fontSize: "28px",

    fontFamily: ["Bahnschrift"].join(","),
    "&:hover": {
      color: "#121212",
      opacity: 1,
    },
    "&.Mui-selected": {
      color: "#121212",
      fontWeight: theme.typography.fontWeightMedium,
    },
    "&.Mui-focusVisible": {
      backgroundColor: "#d1eaff",
    },
  })
);

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
      {value === index && <>{children}</>}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
const ManageTenders = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <>
      <div className="manage-jobs">
        <AntTabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <AntTab
            label={
              <Stack direction="row" spacing={1} alignItems="center">
                <span>My tenders</span> <Chip label="3" className="job-count" />
              </Stack>
            }
            {...a11yProps(0)}
          />
          <AntTab
            label={
              <Stack direction="row" spacing={1} alignItems="center">
                <span>All applications</span>{" "}
                <Chip label="107" className="job-count" />
              </Stack>
            }
            {...a11yProps(1)}
          />
          <div className="ms-auto">
            <Cbutton
              LinkComponent={Link}
              to="/employer/tender/post"
              variant="outlined"
              sx={{
                "&.MuiButton-outlined": {
                  borderRadius: "73px",
                  border: "1px solid #274593",
                  color: "#274593",
                  fontWeight: "500",
                  fontSize: "16px",
                  fontFamily: "Bahnschrift",
                  padding: "10px 30px",

                  "&:hover": { background: "#1976d20a" },
                },
              }}
            >
              <span className="me-3">{<SVG.EditDashIcon />}</span>Post new
              tenders
            </Cbutton>
          </div>
        </AntTabs>
        <TabPanel value={value} index={0}>
          <Tenders />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <ApplicationsJobs />
        </TabPanel>
      </div>
    </>
  );
};
export default ManageTenders;

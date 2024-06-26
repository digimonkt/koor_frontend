import { Chip, IconButton, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SVG } from "../../../assets/svg";
import { OutlinedButton } from "../../../components/button";
import AllApplication from "./component/allApplication";
import MyJobs from "./component/myJobs";
import { AntTab, AntTabs } from "./style";
import { useDispatch, useSelector } from "react-redux";
import Blacklist from "./component/blacklist";
import urlcat from "urlcat";
import DialogBox from "../../../components/dialogBox";
import { setManageJobActiveTab } from "../../../redux/slice/employer";
import Tenders from "../manageTenders/components/tenders";

function ManageJobsComponent() {
  // const platform = Capacitor.getPlatform();
  const { totalCreatedJobs } = useSelector((state) => state.employer);
  const { totalApplications } = useSelector((state) => state.employer);
  const { isMobileView } = useSelector((state) => state.platform);
  const { totalBlacklist } = useSelector((state) => state.employer);
  const [panel, setPanel] = useState(0);
  const [accountVerifiedWarning, setAccountVerifiedWarning] = useState(false);
  const { currentUser } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { manageJobActiveTab } = useSelector((state) => state.employer);
  const [tabs, setTabs] = useState([
    {
      title: "My jobs",
      count: 3,
      component: MyJobs,
    },
    {
      title: "All applications",
      count: 0,
      component: isMobileView ? Tenders : AllApplication,
    },
    {
      title: "Blacklist",
      count: 0,
      component: isMobileView ? AllApplication : Blacklist,
    },
  ]);

  const handlePageTab = (newValue) => {
    setPanel(newValue);
    dispatch(setManageJobActiveTab(newValue));
  };

  const currentTab = panel === 0 ? "jobs" : "tender";
  const handleCreatePost = () => {
    if (currentUser.profile.isVerified) {
      navigate(urlcat(`../employer/${currentTab}/post`));
    } else {
      setAccountVerifiedWarning(true);
    }
  };

  useEffect(() => {
    setPanel(manageJobActiveTab);
  }, [manageJobActiveTab]);
  useEffect(() => {
    setTabs((prevState) => {
      const newTabs = prevState.map((tab) => {
        if (tab.title === "My jobs") {
          tab.count = totalCreatedJobs;
        }
        return tab;
      });
      return newTabs;
    });
  }, [totalCreatedJobs]);

  return (
    <div className="manage-jobs">
      <div className="ant_tabs_div">
        {!isMobileView && (
          <AntTabs
            value={panel}
            onChange={(e, newValue) => handlePageTab(newValue)}
            variant="scrollable"
            scrollButtons
            allowScrollButtonsMobile
          >
            <AntTab
              label={
                <Stack direction="row" spacing={1} alignItems="center">
                  <span>My Jobs</span>{" "}
                  <Chip label={totalCreatedJobs} className="job-count" />
                </Stack>
              }
              id={`simple - tab - ${0}`}
              aria-controls={`simple - tabpanel - ${0}`}
            />
            <AntTab
              label={
                <Stack direction="row" spacing={1} alignItems="center">
                  <span>All applications</span>{" "}
                  <Chip label={totalApplications} className="job-count" />
                </Stack>
              }
              id={`simple - tab - ${1}`}
              aria-controls={`simple - tabpanel - ${1}`}
            />
            <AntTab
              label={
                <Stack direction="row" spacing={1} alignItems="center">
                  <span>Blacklisted</span>{" "}
                  <Chip label={totalBlacklist} className="job-count" />
                </Stack>
              }
              id={`simple - tab - ${1}`}
              aria-controls={`simple - tabpanel - ${1}`}
            />
          </AntTabs>
        )}

        {isMobileView ? (
          <>
            <IconButton
              onClick={handleCreatePost}
              sx={{
                width: "56px",
                height: "56px",
                background: "#274593",
                color: "#fff",
                boxShadow: "0px 2px 15px 2px rgba(0, 44, 106, 0.25)",
                position: "fixed",
                bottom: "115px",
                right: "17px",
                zIndex: 10,
                "&:hover": {
                  background: "#274593",
                  color: "#fff",
                },
              }}
            >
              <SVG.EditDashIcon />
            </IconButton>
          </>
        ) : (
          <>
            <div className="post_new_job_btn">
              <OutlinedButton
                sx={{ whiteSpace: "nowrap" }}
                onClick={() => {
                  if (currentUser.profile.isVerified) {
                    navigate(urlcat(`../employer/${currentTab}/post`));
                  } else {
                    setAccountVerifiedWarning(true);
                  }
                }}
                title={
                  <>
                    <span className="me-3 d-inline-flex">
                      <SVG.EditDashIcon />
                    </span>
                    Post new job
                  </>
                }
              />
            </div>
          </>
        )}
      </div>
      {tabs.map((tab, index) => (
        <div
          key={index}
          role="tabpanel"
          hidden={index !== panel}
          id={`simple - tabpanel - ${index}`}
          style={{ height: "100%" }}
        >
          <tab.component onTabChange={handlePageTab} />
        </div>
      ))}
      <DialogBox
        open={accountVerifiedWarning}
        handleClose={() => setAccountVerifiedWarning(false)}
      >
        <div>
          <SVG.Warning
            style={{
              marginLeft: "39%",
              height: "50px",
              width: "50px",
              color: "red",
            }}
          />
          <h1 className="heading">Account Verification Status </h1>
          <div className="form-content">
            <p>
              Dear {currentUser.name || currentUser.email}, your account is not
              verified by the administrator. Please contact the administrator
              for further assistance.
            </p>
          </div>
        </div>
      </DialogBox>
    </div>
  );
}

export default ManageJobsComponent;

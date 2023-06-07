import { Chip, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SVG } from "@assets/svg";
import { OutlinedButton } from "@components/button";
import AllApplication from "./component/allApplication";
import MyJobs from "./component/myJobs";
import { AntTab, AntTabs } from "./style";
import { useSelector } from "react-redux";
import Blacklist from "./component/blacklist";
import urlcat from "urlcat";
import DialogBox from "@components/dialogBox";
function ManageJobsComponent() {
  const { totalCreatedJobs } = useSelector((state) => state.employer);
  const { totalApplications } = useSelector((state) => state.employer);
  const { totalBlacklist } = useSelector((state) => state.employer);
  const [panel, setPanel] = useState(0);
  const [accountVerifiedWarning, setAccountVerifiedWarning] = useState(false);
  const { currentUser } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [tabs, setTabs] = useState([
    {
      title: "My jobs",
      count: 3,
      component: MyJobs,
    },
    {
      title: "All applications",
      count: 0,
      component: AllApplication,
    },
    {
      title: "Blacklist",
      count: 0,
      component: Blacklist,
    },
  ]);

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
      <AntTabs value={panel} onChange={(e, newValue) => setPanel(newValue)}>
        <AntTab
          label={
            <Stack direction="row" spacing={1} alignItems="center">
              <span>My Jobs</span>{" "}
              <Chip label={totalCreatedJobs} className="job-count" />
            </Stack>
          }
          id={`simple-tab-${0}`}
          aria-controls={`simple-tabpanel-${0}`}
        />
        <AntTab
          label={
            <Stack direction="row" spacing={1} alignItems="center">
              <span>All applications</span>{" "}
              <Chip label={totalApplications} className="job-count" />
            </Stack>
          }
          id={`simple-tab-${1}`}
          aria-controls={`simple-tabpanel-${1}`}
        />
        <AntTab
          label={
            <Stack direction="row" spacing={1} alignItems="center">
              <span>Blacklist</span>{" "}
              <Chip label={totalBlacklist} className="job-count" />
            </Stack>
          }
          id={`simple-tab-${1}`}
          aria-controls={`simple-tabpanel-${1}`}
        />

        <div className="ms-auto">
        <OutlinedButton
            onClick={() => {
              if (currentUser.profile.isVerified) {
                navigate(
                  urlcat("../employer/jobs/post")
                );
              } else {
                setAccountVerifiedWarning(true);
              }
            }}
            title={
              <>
                <span className="me-3 d-inline-flex">
                  <SVG.EditIcon />
                </span>
                Post new job
              </>
            }
          />
        </div>
      </AntTabs>
      {tabs.map((tab, index) => (
        <div
          key={index}
          role="tabpanel"
          hidden={index !== panel}
          id={`simple-tabpanel-${index}`}
          style={{ height: "100%" }}
        >
          <tab.component />
        </div>
      ))}
      <DialogBox open={accountVerifiedWarning} handleClose={() => setAccountVerifiedWarning(false)}>
        <div>
        <SVG.Warning style={{ marginLeft: "39%", height: "50px", width: "50px", color: "red" }} />
          <h1 className="heading">Account Verification Status </h1>
          <div className="form-content">
            <p>
              Dear {currentUser.name}, your account is not verified by the administrator. Please contact the administrator for further assistance.
            </p>
          </div>
        </div>
      </DialogBox>
    </div>
  );
}

export default ManageJobsComponent;

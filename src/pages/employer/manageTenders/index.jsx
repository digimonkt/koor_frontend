import React, { useState } from "react";
import { Chip, Stack } from "@mui/material";
import { SVG } from "@assets/svg";
import AllApplication from "./components/tenderAllApplications";

import Tenders from "./components/tenders";
import { useNavigate } from "react-router-dom";
import { OutlinedButton } from "@components/button";
import { AntTab, AntTabs } from "./style";
import { useSelector } from "react-redux";
import DialogBox from "@components/dialogBox";
import urlcat from "urlcat";
const ManageTenders = () => {
  // navigate
  const navigate = useNavigate();

  // state management
  const [panel, setPanel] = useState(0);
  const { totalTender } = useSelector((state) => state.employer);
  const { totalTenderApplications } = useSelector((state) => state.employer);
  const [accountVerifiedWarning, setAccountVerifiedWarning] = useState(false);
  const { currentUser } = useSelector((state) => state.auth);
  // tab data
  const tabsData = [
    {
      title: "My Tenders",
      component: Tenders,
    },
    {
      title: "All applications",
      component: AllApplication,
    },
  ];
  return (
    <>
      <div className="manage-jobs">
        <div className="manage-jobs_tab_div">
          <AntTabs value={panel} onChange={(e, newValue) => setPanel(newValue)}>
            <AntTab
              label={
                <Stack direction="row" spacing={1} alignItems="center">
                  <span>My tenders</span>{" "}
                  <Chip label={totalTender} className="job-count" />
                </Stack>
              }
              id={`simple-tab-${0}`}
              aria-controls={`simple-tabpanel-${0}`}
            />
            <AntTab
              label={
                <Stack direction="row" spacing={1} alignItems="center">
                  <span>All applications</span>{" "}
                  <Chip label={totalTenderApplications} className="job-count" />
                </Stack>
              }
              id={`simple-tab-${1}`}
              aria-controls={`simple-tabpanel-${1}`}
            />
          </AntTabs>
          <div className="manage-jobs_tab_button">
            <OutlinedButton
              onClick={() => {
                if (currentUser.profile.isVerified) {
                  navigate(urlcat("../employer/tender/post"));
                } else {
                  setAccountVerifiedWarning(true);
                }
              }}
              title={
                <>
                  <span className="me-3">{<SVG.EditDashIcon />}</span>Post new
                  tenders
                </>
              }
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
            />
          </div>
        </div>
        {tabsData.map((tab, index) => (
          <div
            key={index}
            role="tabpanel"
            hidden={index !== panel}
            id={`simple-tabpanel-${index}`}
          >
            <tab.component />
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
            <h1 className="heading">Account Verification Status</h1>
            <div className="form-content">
              <p>
                Dear {currentUser.name || currentUser.email}, your account is
                not verified by the administrator. Please contact the
                administrator for further assistance.
              </p>
            </div>
          </div>
        </DialogBox>
      </div>
    </>
  );
};
export default ManageTenders;

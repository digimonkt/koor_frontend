import React, { useState, useEffect } from "react";
import { Chip, Stack } from "@mui/material";
import { SVG } from "@assets/svg";
import AllApplication from "./components/tenderAllApplications";

import Tenders from "./components/tenders";
import { useNavigate } from "react-router-dom";
import { OutlinedButton } from "@components/button";
import { AntTab, AntTabs } from "./style";
import { useSelector } from "react-redux";

const ManageTenders = () => {
  const { totalTender } = useSelector((state) => state.employer);

  // tab data
  // const tabsData = [
  //   {
  //     title: "My Tenders",
  //     count: 3,
  //     component: Tenders,
  //   },
  //   {
  //     title: "All applications",
  //     count: 107,
  //     component: ApplicationsJobs,
  //   },
  // ];

  const [tabs, setTabs] = useState([
    {
      title: "My Tenders",
      count: 1,
      component: Tenders,
    },
    {
      title: "All applications",
      count: 107,
      component: ApplicationsJobs,
    },
  ]);
  useEffect(() => {
    setTabs((prevState) => {
      const newTabs = prevState.map((tab) => {
        if (tab.title === "My Tenders") {
          tab.count = totalTender;
        }
        return tab;
      });
      return newTabs;
    });
  }, [totalTender]);
  // navigate
  const navigate = useNavigate();

  // state management
  const [panel, setPanel] = useState(0);
  const { totalTender } = useSelector((state) => state.employer);
  const { totalTenderApplications } = useSelector((state) => state.employer);
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
        <AntTabs value={panel} onChange={(e, newValue) => setPanel(newValue)}>
<<<<<<< HEAD
          {tabs.map((tab, index) => (
            <AntTab
              key={index}
              label={
                <Stack direction="row" spacing={1} alignItems="center">
                  <span>{tab.title}</span>{" "}
                  <Chip label={tab.count} className="job-count" />
                </Stack>
              }
              id={`simple-tab-${index}`}
              aria-controls={`simple-tabpanel-${index}`}
            />
          ))}
=======
          <AntTab
            label={
              <Stack direction="row" spacing={1} alignItems="center">
                <span>My Tenders</span>{" "}
                <Chip label={totalTender} className="job-count" />
              </Stack>
            }
            id={`simple-tab-${0}`}
            aria-controls={`simple-tabpanel-${0}`}
          />
          <AntTab
            label={
              <Stack direction="row" spacing={1} alignItems="center">
                <span>All Applications</span>{" "}
                <Chip label={totalTenderApplications} className="job-count" />
              </Stack>
            }
            id={`simple-tab-${1}`}
            aria-controls={`simple-tabpanel-${1}`}
          />
>>>>>>> a22fb17987cacc5ad6ce8a2bcf83e4672ae45b4d
          <div className="ms-auto">
            <OutlinedButton
              onClick={() => navigate("/employer/tender/post")}
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
        </AntTabs>
        {tabs.map((tab, index) => (
          <div
            key={index}
            role="tabpanel"
            hidden={index !== panel}
            id={`simple-tabpanel-${index}`}
          >
            <tab.component />
          </div>
        ))}
      </div>
    </>
  );
};
export default ManageTenders;

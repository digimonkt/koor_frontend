import { Chip, Stack } from "@mui/material";
import React, { useState } from "react";
import { SVG } from "../../../assets/svg";
import { OutlinedButton } from "../../../components/button";
import AllApplication from "./component/allApplication";
import MyJobs from "./component/myJobs";
import { AntTab, AntTabs } from "./style";

function ManageJobsComponent() {
  const [panel, setPanel] = useState(0);
  // eslint-disable-next-line no-unused-vars
  const [tabs, setTabs] = useState([
    {
      title: "My jobs",
      count: 3,
      component: MyJobs,
    },
    {
      title: "All applications",
      count: 107,
      component: AllApplication,
    },
  ]);
  return (
    <div className="manage-jobs">
      <AntTabs value={panel} onChange={(e, newValue) => setPanel(newValue)}>
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
        <div className="ms-auto">
          <OutlinedButton
            // LinkComponent={Link}
            // to="/manage-jobs/post-a-new-job"
            variant="outlined"
            title={
              <>
                <span className="me-3">
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
        >
          <tab.component />
        </div>
      ))}
    </div>
  );
}

export default ManageJobsComponent;

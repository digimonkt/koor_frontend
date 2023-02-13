import { Card, CardContent, Stack } from "@mui/material";
import React, { useState } from "react";
import { SVG } from "@assets/svg";
import ApplicationCard from "@components/applicationCard";
import JobCard from "@components/jobCard";
import { RECENT_ITEMS } from "../../dashboard/recentHelper";
import ApplicantList from "./applicantList";

function MyJobs() {
  // state management
  const [isActive, setIsActive] = useState(false);

  return (
    <div className="py-3">
      <div className="mb-3">
        <Stack direction="row" spacing={0} className="searchjob-box">
          <input className="jobsearch" placeholder="Search your jobs" />
          <button className="jobt-btn-search">{<SVG.SearchIcon />}</button>
        </Stack>
      </div>
      <Card
        sx={{
          "&.MuiCard-root": {
            boxShadow: "0px 15px 40px rgba(0, 0, 0, 0.05)",
            borderRadius: "10px",
            mb: 3,
          },
        }}
      >
        <CardContent
          sx={{
            "&.MuiCardContent-root": {
              padding: "25px 25px 25px",
            },
          }}
        >
          <JobCard selfJob />
          <ApplicantList
            isActive={isActive}
            handleActive={() => setIsActive(!isActive)}
          />
          {isActive && (
            <div className="recent-box mt-3">
              {RECENT_ITEMS.map((item, index) => (
                <ApplicationCard
                  image={item.img}
                  title={item.title}
                  subTitle={item.subtitle}
                  description={item.description}
                  chiplabel={item.chiplabel}
                  requirement={item.requirement}
                  isDisabled={item.disabled}
                  key={index}
                  isMessagable={true}
                />
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default MyJobs;

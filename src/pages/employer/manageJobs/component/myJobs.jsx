import { Card, CardContent, Stack } from "@mui/material";
import React from "react";
import { SVG } from "../../../../assets/svg";
import JobCard from "../../../../components/jobCard";

function MyJobs() {
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
        </CardContent>
      </Card>
    </div>
  );
}

export default MyJobs;

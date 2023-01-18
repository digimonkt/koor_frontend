import { Card, CardContent } from "@mui/material";
import React from "react";
import JobCard from "../../../../components/jobCard";

function MyJobs() {
  return (
    <div className="py-3">
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
          <JobCard />
        </CardContent>
      </Card>
    </div>
  );
}

export default MyJobs;

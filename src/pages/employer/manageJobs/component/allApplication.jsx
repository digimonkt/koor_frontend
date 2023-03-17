import { Card, CardContent, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import { SVG } from "@assets/svg";
import ApplicationCard from "@components/applicationCard";
import { getRecentApplicationAPI } from "@api/employer";
import dayjs from "dayjs";
function AllApplication() {
  const [recentApplication, setRecentApplication] = useState({ results: [] });

  const getRecentApplications = async () => {
    const res = await getRecentApplicationAPI();
    if (res.remote === "success") {
      setRecentApplication(res.data);
    }
  };
  useEffect(() => {
    getRecentApplications();
  }, []);
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
          {recentApplication.results.map((item, index) => (
                    <ApplicationCard
                      jobId={item.jobId}
                      details={item}
                      subTitle={`Applied ${dayjs(item.createdAt).fromNow()}`}
                      isDisabled={item.disabled}
                      key={index}
                    />
                  ))}
        </CardContent>
      </Card>
    </div>
  );
}

export default AllApplication;

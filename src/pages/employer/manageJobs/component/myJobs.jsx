import { Card, CardContent, Stack } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { SVG } from "@assets/svg";
import JobCard from "@components/jobCard";
import ApplicantList from "./applicantList";
import { getEmployerJobsAPI } from "@api/employer";
import { useDispatch } from "react-redux";
import { setTotalCreatedJobs } from "@redux/slice/employer";

function MyJobs() {
  const dispatch = useDispatch();
  const [jobs, setJobs] = useState([]);
  const getAllJobs = useCallback(async () => {
    const res = await getEmployerJobsAPI();
    if (res.remote === "success") {
      setJobs(res.data.results);
      dispatch(setTotalCreatedJobs(res.data.totalCount || res.data.count));
    } else {
      console.log(res);
    }
  }, []);
  useEffect(() => {
    getAllJobs();
  }, []);
  return (
    <div className="py-3">
      <div className="mb-3">
        <Stack direction="row" spacing={0} className="searchjob-box">
          <input className="jobsearch" placeholder="Search your jobs" />
          <button className="jobt-btn-search">{<SVG.SearchIcon />}</button>
        </Stack>
      </div>
      {jobs.map((job) => {
        return (
          <Card
            key={job.id}
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
              <JobCard selfJob jobDetails={job} />
              <ApplicantList
                jobId={job.id}
                totalApplications={job.applicantCount}
              />
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}

export default MyJobs;

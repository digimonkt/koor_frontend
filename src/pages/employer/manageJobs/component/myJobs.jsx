import { Card, CardContent, Stack } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { SVG } from "@assets/svg";
import JobCard from "@components/jobCard";
import ApplicantList from "./applicantList";
import { getEmployerJobsAPI } from "@api/employer";
import { useDispatch } from "react-redux";
import { setTotalCreatedJobs } from "@redux/slice/employer";
import { NoDataFoundAnimation } from "@components/animations";
import JobCardSkeletonLoader from "@components/jobCard/jobCardSkeletonLoader";

function MyJobs() {
  const dispatch = useDispatch();
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const getAllJobs = useCallback(async () => {
    setIsLoading(true);
    const res = await getEmployerJobsAPI({ search });
    if (res.remote === "success") {
      setJobs(res.data.results);
      dispatch(setTotalCreatedJobs(res.data.totalCount || res.data.count));
    } else {
      console.log(res);
    }
    setIsLoading(false);
  }, [search]);
  useEffect(() => {
    getAllJobs();
  }, [isSearching]);
  return (
    <div className="py-3">
      <div className="mb-3">
        <Stack direction="row" spacing={0} className="searchjob-box">
          <input
            className="jobsearch"
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search your jobs"
            onKeyDown={(e) =>
              e.key === "Enter" ? setIsSearching(!isSearching) : null
            }
          />
          <button
            className="jobt-btn-search"
            onClick={() => setIsSearching(!isSearching)}
          >
            {<SVG.SearchIcon />}
          </button>
        </Stack>
      </div>
      {isLoading ? (
        [1, 2, 3, 4, 5].map((loader) => {
          return (
            <React.Fragment key={loader}>
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
                  <JobCardSkeletonLoader selfJob />
                </CardContent>
              </Card>
            </React.Fragment>
          );
        })
      ) : !jobs.length ? (
        <Card
          sx={{
            "&.MuiCard-root": {
              boxShadow: "0px 15px 40px rgba(0, 0, 0, 0.05)",
              borderRadius: "10px",
              mb: 3,
            },
          }}
        >
          <NoDataFoundAnimation title="It appears that you haven't created any jobs yet." />
        </Card>
      ) : (
        jobs.map((job) => {
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
        })
      )}
    </div>
  );
}

export default MyJobs;

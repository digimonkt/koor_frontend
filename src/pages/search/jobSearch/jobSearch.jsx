import { NoDataFoundAnimation } from "@components/animations";
import JobCard from "@components/jobCard";
import JobCardSkeletonLoader from "@components/jobCard/jobCardSkeletonLoader";
import { Divider } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";

function JobSearchComponent() {
  const { jobs, isSearching } = useSelector((state) => state.search);

  return (
    <div>
      {isSearching ? (
        [1, 2, 3, 4, 5].map((loader) => {
          return (
            <React.Fragment key={loader}>
              <JobCardSkeletonLoader logo />
              <Divider />
            </React.Fragment>
          );
        })
      ) : !jobs.length ? (
        <NoDataFoundAnimation title="We apologize, but we couldn't find any jobs that match your search criteria." />
      ) : (
        jobs.map((job) => {
          return (
            <React.Fragment key={job.id}>
              <JobCard logo jobDetails={job} />
              <Divider />
            </React.Fragment>
          );
        })
      )}
    </div>
  );
}

export default JobSearchComponent;

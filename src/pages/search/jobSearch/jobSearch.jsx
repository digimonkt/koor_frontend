import React, { useEffect, useState } from "react";
import { NoDataFoundAnimation } from "../../../components/animations";
import JobCard from "../../../components/jobCard";
import JobCardSkeletonLoader from "../../../components/jobCard/jobCardSkeletonLoader";
import { Divider } from "@mui/material";
import { useSelector } from "react-redux";
import AdSenseCard from "@components/adSense";
import { AD_AFTER_RECORDS } from "@utils/constants/constants";
import { Helmet } from "react-helmet";

function JobSearchComponent() {
  const { jobs, isSearching } = useSelector((state) => state.search);
  const { adSense } = useSelector((state) => state.adSense);
  const adSenseData = adSense.data.find(
    (item) => item.pageName === "browseJobs"
  );

  // fixing flecking issue by delayed loading of job card
  const [renderJobCard, setRenderJobCard] = useState(false);

  useEffect(() => {
    if (!isSearching) {
      const timeoutId = setTimeout(() => {
        setRenderJobCard(true);
      }, 100);

      return () => clearTimeout(timeoutId);
    }
  }, [isSearching]);

  return (
    <>
      <Helmet>
        <meta
          name="keywords"
          content="Core Jobs, Government Jobs, UN Jobs Somali"
        />
        <meta
          name="description"
          content="Job seekers - explore diverse roles including NGO, government, UN positions on Koor. Create a standout profile to connect with top employers for full-time, part-time & consulting jobs."
        />
        <title>Find NGO, Government, UN Jobs & More in Somalia | Koor.</title>
      </Helmet>
      <div>
        {!renderJobCard || isSearching ? (
          [1, 2, 3, 4, 5].map((loader) => (
            <React.Fragment key={loader}>
              <JobCardSkeletonLoader logo />
              <Divider />
            </React.Fragment>
          ))
        ) : !jobs.length ? (
          <NoDataFoundAnimation title="We apologize, but we couldn't find any jobs that match your search criteria." />
        ) : (
          jobs.map((job, index) => {
            index = index + 1;
            return (
              <React.Fragment key={job.id}>
                {renderJobCard && (
                  <>
                    <JobCard logo jobDetails={job} />
                    <AdSenseCard
                      code={adSenseData?.code}
                      show={index > 0 && index % AD_AFTER_RECORDS === 0}
                    />
                    <Divider />
                  </>
                )}
              </React.Fragment>
            );
          })
        )}
      </div>
    </>
  );
}

export default JobSearchComponent;

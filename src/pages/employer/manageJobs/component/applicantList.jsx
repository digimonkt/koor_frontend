import { Chip } from "@mui/material";
import { Stack } from "@mui/system";
import React, { useEffect, useState } from "react";
import { SVG } from "@assets/svg";
import { getApplicationOnJobAPI } from "@api/employer";

import { JOB_APPLICATION_OPTIONS } from "@utils/enum";
import { NoDataFoundAnimation } from "@components/animations";
import ApplicationListLayout from "@components/layout/applicationListLayout";
import ApplicantCard from "@components/applicantCard";
import ApplicantCardSkeletonLoading from "@components/applicantCard/skeletonLoading";

const ApplicantList = ({ totalApplications, jobId, tenderId }) => {
  const [applicants, setApplicants] = useState([]);
  const [filter, setFilter] = useState("");
  const [totalShortlisted, setTotalShortlisted] = useState(0);
  const [totalRejected, setTotalRejected] = useState(0);
  const [totalBlacklisted, setTotalBlacklisted] = useState(0);
  const [totalPlannedInterview, setTotalPlannedInterview] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const getApplicationList = async () => {
    setIsLoading(true);
    const res = await getApplicationOnJobAPI({ jobId, filter });
    if (res.remote === "success") {
      setApplicants(res.data.results);
      setTotalRejected(res.data.rejectedCount);
      setTotalShortlisted(res.data.shortlistedCount);
      setTotalPlannedInterview(res.data.plannedInterviewCount);
      setTotalBlacklisted(res.data.blacklistedCount);
    }
    setIsLoading(false);
  };

  const handleGetApplicationByStatus = (status) => {
    setFilter((prevState) => (prevState === status ? "" : status));
  };

  useEffect(() => {
    if (filter) getApplicationList(filter);
  }, [filter]);

  const allFilters = () => {
    return (
      <Stack direction={{ xs: "column", lg: "row" }} spacing={1}>
        <Chip
          style={{
            backgroundColor:
              filter === JOB_APPLICATION_OPTIONS.shortlisted && "#d5e3f7",
          }}
          className="chip-cricle"
          onClick={() => {
            handleGetApplicationByStatus(JOB_APPLICATION_OPTIONS.shortlisted);
          }}
          label={
            <>
              Shortlisted
              <span className="cricle">{totalShortlisted}</span>
            </>
          }
          icon={<SVG.StarIcon />}
        />
        <Chip
          style={{
            backgroundColor:
              filter === JOB_APPLICATION_OPTIONS.plannedInterviews && "#d5e3f7",
          }}
          className="chip-cricle"
          onClick={() => {
            handleGetApplicationByStatus(
              JOB_APPLICATION_OPTIONS.plannedInterviews
            );
          }}
          label={
            <>
              Planned interviews{" "}
              <span className="cricle">{totalPlannedInterview}</span>
            </>
          }
          icon={<SVG.EventIcon />}
        />

        <Chip
          style={{
            backgroundColor:
              filter === JOB_APPLICATION_OPTIONS.rejected && "#d5e3f7",
          }}
          className="chip-cricle"
          onClick={() => {
            handleGetApplicationByStatus(JOB_APPLICATION_OPTIONS.rejected);
          }}
          label={
            <>
              Rejected <span className="cricle">{totalRejected}</span>
            </>
          }
          icon={<SVG.RejectIcon />}
        />
        <Chip
          style={{
            backgroundColor:
              filter === JOB_APPLICATION_OPTIONS.blacklisted && "#d5e3f7",
          }}
          className="chip-cricle"
          onClick={() => {
            handleGetApplicationByStatus(JOB_APPLICATION_OPTIONS.blacklisted);
          }}
          label={
            <>
              Blacklisted <span className="cricle">{totalBlacklisted}</span>
            </>
          }
          icon={<SVG.RejectIcon />}
        />
      </Stack>
    );
  };
  return (
    <>
      <ApplicationListLayout
        filters={allFilters()}
        totalApplications={totalApplications}
        onActive={(active) => {
          if (active) getApplicationList();
        }}
      >
        {isLoading ? (
          // skeleton loading need to implement
          [1, 2, 3].map((loaders) => {
            return <ApplicantCardSkeletonLoading key={loaders} />;
          })
        ) : !applicants.length ? (
          <NoDataFoundAnimation
            title={`There are currently no applications for your ${
              jobId ? "job" : "tender"
            } posting.`}
          />
        ) : (
          applicants.map((item, index) => {
            return (
              <ApplicantCard
                key={index}
                details={item}
                interviewPlanned
                shortlist
                reject
                blacklist
                view
                message
              />
            );
          })
        )}
      </ApplicationListLayout>
    </>
  );
};

export default ApplicantList;

import { Chip } from "@mui/material";
import { Stack } from "@mui/system";
import React, { useEffect, useState } from "react";
import { SVG } from "@assets/svg";
import ApplicationCard from "@components/applicationCard";
import { getApplicationOnJobAPI } from "@api/employer";
import { JOB_APPLICATION_OPTIONS } from "@utils/enum";

const ApplicantList = ({ totalApplications, jobId }) => {
  const [isActive, setIsActive] = useState(false);
  const [applicants, setApplicants] = useState([]);
  const [filter, setFilter] = useState("");
  const [totalShortlisted, setTotalShortlisted] = useState(0);
  const [totalRejected, setTotalRejected] = useState(0);
  const [totalBlacklisted, setTotalBlacklisted] = useState(0);
  const [totalPlannedInterview, setTotalPlannedInterview] = useState(0);
  // const [isShortlisted, setIsShortlisted] = useState(false);
  const handleActive = () => {
    setIsActive(!isActive);
  };
  const getApplicationList = async () => {
    const res = await getApplicationOnJobAPI({ jobId, filter });
    if (res.remote === "success") {
      setApplicants(res.data.results);
      setTotalRejected(res.data.rejectedCount);
      setTotalShortlisted(res.data.shortlistedCount);
      setTotalPlannedInterview(res.data.plannedInterviewCount);
      setTotalBlacklisted(res.data.blacklistedCount);
    }
  };
  const handleGetApplicationByStatus = (status) => {
    setFilter((prevState) => (prevState === status ? "" : status));
  };
  useEffect(() => {
    if (isActive) getApplicationList();
  }, [isActive, filter]);
  return (
    <>
      <Stack
        direction="row"
        spacing={2}
        justifyContent="space-between"
        alignItems="center"
        sx={{ mt: 2 }}
      >
        <div className="toggle-application">
          Applications
          <Chip
            label={totalApplications}
            sx={{
              background: "#D5E3F7",
              fontSize: "14px",
              fontFamily: "Poppins",
              color: "#274593",
              mx: 2,
            }}
          />{" "}
          <span
            onClick={() => handleActive()}
            className={`arrowjobs ${isActive ? "active" : ""}`}
          >
            {<SVG.ArrowUpIcon />}
          </span>
        </div>
        {isActive && (
          <>
            <Stack direction={{ xs: "column", lg: "row" }} spacing={1}>
              <Chip
                style={{
                  backgroundColor:
                    filter === JOB_APPLICATION_OPTIONS.shortlisted && "#d5e3f7",
                }}
                className="chip-cricle"
                onClick={() => {
                  handleGetApplicationByStatus(
                    JOB_APPLICATION_OPTIONS.shortlisted
                  );
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
                    filter === JOB_APPLICATION_OPTIONS.plannedInterviews &&
                    "#d5e3f7",
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
                  handleGetApplicationByStatus(
                    JOB_APPLICATION_OPTIONS.rejected
                  );
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
                  handleGetApplicationByStatus(
                    JOB_APPLICATION_OPTIONS.blacklisted
                  );
                }}
                label={
                  <>
                    Blacklisted{" "}
                    <span className="cricle">{totalBlacklisted}</span>
                  </>
                }
                icon={<SVG.RejectIcon />}
              />
            </Stack>
          </>
        )}
      </Stack>
      {isActive && (
        <div className="recent-box mt-3">
          {applicants.map((item, index) => {
            return (
              <ApplicationCard
                jobId={jobId}
                details={item}
                subTitle={item.subtitle}
                isDisabled={item.disabled}
                key={index}
                allOptions
                isShortlisted={item.shortlistedAt}
                isRejected={item.rejectedAt}
              />
            );
          })}
        </div>
      )}
    </>
  );
};

export default ApplicantList;

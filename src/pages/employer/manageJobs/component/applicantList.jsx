import { Chip } from "@mui/material";
import { Stack } from "@mui/system";
import React, { useEffect, useState } from "react";
import { SVG } from "@assets/svg";
import ApplicationCard from "@components/applicationCard";
import { getApplicationOnJobAPI } from "@api/employer";

const ApplicantList = ({ totalApplications, jobId }) => {
  const [isActive, setIsActive] = useState(false);
  const [applicants, setApplicants] = useState([]);
  const handleActive = () => {
    setIsActive(!isActive);
  };
  const getApplicationList = async () => {
    const res = await getApplicationOnJobAPI(jobId);
    if (res.remote === "success") {
      setApplicants(res.data.results);
    }
  };
  useEffect(() => {
    if (isActive) getApplicationList();
  }, [isActive]);
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
                className="chip-cricle"
                label={
                  <>
                    Shortlisted <span className="cricle">0</span>
                  </>
                }
                icon={<SVG.StarIcon />}
              />
              <Chip
                className="chip-cricle"
                label={
                  <>
                    Planned interviews <span className="cricle">0</span>
                  </>
                }
                icon={<SVG.EventIcon />}
              />
              <Chip
                className="chip-cricle"
                label={
                  <>
                    Rejected <span className="cricle">0</span>
                  </>
                }
                icon={<SVG.RejectIcon />}
              />
              <Chip
                className="chip-cricle"
                label={
                  <>
                    Blacklisted <span className="cricle">0</span>
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
                isMessagable
              />
            );
          })}
        </div>
      )}
    </>
  );
};

export default ApplicantList;

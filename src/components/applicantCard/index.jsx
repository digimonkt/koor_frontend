import { Avatar, Chip, Divider, Stack } from "@mui/material";
import { generateFileUrl } from "@utils/generateFileUrl";
import dayjs from "dayjs";
import React, { useState, useEffect } from "react";
import { SVG } from "@assets/svg";
import ApplicationOptions from "@components/applicationOptions";

function ApplicantCard({
  details,
  sx,
  interviewPlanned,
  shortlist,
  reject,
  blacklist,
  view,
  message,
}) {
  const [jobOrTenderDetails, setJobOrTenderDetails] = useState({});
  useEffect(() => {
    setJobOrTenderDetails(details.tender || details.job);
  });
  return (
    <Stack
      direction={{ xs: "column", lg: "row" }}
      spacing={{ xs: "2", lg: "2" }}
      alignItems={{ xs: "start", lg: "center" }}
      justifyContent={{ xs: "center", lg: "space-between" }}
      className="border-recent"
    >
      <Stack direction="row" spacing={2} alignItems="center">
        <Avatar
          src={generateFileUrl(details.user.image?.path || "")}
          sx={{ width: "70px", height: "70px" }}
        />
        <div className="recent-content">
          <Stack
            direction="row"
            divider={<Divider orientation="vertical" flexItem />}
            spacing={2}
            flexWrap="wrap"
            alignItems="center"
            sx={{ mb: 1, ...sx }}
          >
            <h4>{details?.user?.name || details?.user?.email}</h4>
            <div
              className="recent-research"
              style={{ flexWrap: "wrap", display: "flex" }}
            >
              <span>
                Applied{" "}
                <strong>
                  {dayjs.utc(details?.createdAt).local().fromNow()}
                </strong>{" "}
                to:{" "}
              </span>
              <div>{jobOrTenderDetails.title}</div>
            </div>
          </Stack>
          {details?.education || details?.skills || details?.language ? (
            <Stack
              direction="row"
              spacing={1}
              alignItems="center"
              sx={{ mb: 1, ...sx }}
              className="meets_div"
            >
              <span className="meets">Meets your requirements with: </span>

              <>
                {details?.education && (
                  <Chip
                    label="Education"
                    className="chiplabel"
                    icon={<SVG.SchoolIcon />}
                  />
                )}
                {details?.skills && (
                  <Chip
                    label="Skills"
                    className="chiplabel"
                    icon={<SVG.SmallSkillsIcon />}
                  />
                )}
                {details?.language && (
                  <Chip
                    label="Language"
                    className="chiplabel"
                    icon={<SVG.SmallLangugeIcon />}
                  />
                )}
              </>
            </Stack>
          ) : (
            ""
          )}
          <div className="recent-descrition">
            <p>{details?.shortLetter || details?.user?.description}</p>
          </div>
        </div>
      </Stack>
      <Stack direction="row" spacing={0} className="edit-button">
        <ApplicationOptions
          details={details}
          interviewPlanned={interviewPlanned}
          shortlist={shortlist}
          reject={reject}
          blacklist={blacklist}
          view={view}
          message={message}
        />
      </Stack>
    </Stack>
  );
}

export default ApplicantCard;

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
      <Stack
        direction="row"
        spacing={2}
        alignItems="center"
        sx={{ width: "57%", "@media(max-width:992)": { width: "auto" } }}
      >
        <Avatar
          src={generateFileUrl(details.user.image?.path || "")}
          sx={{
            width: "70px",
            height: "70px",
            "@media(max-width:768px)": { width: "40px", height: "40px" },
          }}
        />
        <div className="recent-content">
          <Stack
            direction={{ xs: "column", lg: "row" }}
            divider={
              <Divider
                orientation="vertical"
                flexItem
                sx={{ display: { xs: "none", lg: "block" } }}
              />
            }
            spacing={{ xs: 0, lg: 2 }}
            flexWrap="wrap"
            alignItems={{ xs: "flex-start", lg: "center" }}
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
              direction={"row"}
              spacing={1}
              alignItems={"center"}
              sx={{
                mb: 1,
                ...sx,
                "@media(max-width:768px)": {
                  display: { xs: "none", sm: "flex" },
                },
              }}
              className="meets_div"
            >
              <span className="meets">Meets your requirements with: </span>

              <Stack direction={"row"} alignItems={"center"} spacing={1}>
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
              </Stack>
            </Stack>
          ) : (
            ""
          )}
          <div className="recent-descrition">
            <p>{details?.shortLetter || details?.user?.description}</p>
          </div>
        </div>
      </Stack>

      {details?.education || details?.skills || details?.language ? (
        <Stack
          direction={{ xs: "column", lg: "row" }}
          spacing={1}
          alignItems={{ xs: "flex-start", lg: "center" }}
          sx={{
            display: "none",
            mb: 1,

            ...sx,
            "@media(max-width:768px)": {
              display: { xs: "flex", sm: "none" },
            },
          }}
          className="meets_div"
        >
          <span className="meets">Meets your requirements with: </span>

          <Stack direction={"row"} alignItems={"center"} spacing={2}>
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
          </Stack>
        </Stack>
      ) : (
        ""
      )}
      <div className="recent-descrition mobile-recent-descrition mt-2">
        <p>{details?.shortLetter || details?.user?.description}</p>
      </div>

      <Stack
        direction="row"
        spacing={0}
        flexWrap={"wrap"}
        className="edit-button"
        justifyContent={{ xs: "space-between", lg: "row" }}
        sx={{
          marginLeft: {
            sm: "0px !important",
            xs: "0px",
          },
          marginTop: "5px !important",
          width: { xs: "100%", sm: "auto" },
        }}
      >
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

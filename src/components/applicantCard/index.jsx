import { Avatar, Chip, Stack } from "@mui/material";
import { generateFileUrl } from "../../utils/generateFileUrl";
import dayjs from "dayjs";
import React, { useState, useEffect } from "react";
import { SVG } from "../../assets/svg";
import ApplicationOptions from "../../components/applicationOptions";
import { useSelector } from "react-redux";
import AppView from "./appView";

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
  const { isMobileView } = useSelector(({ platform }) => platform);
  const [jobOrTenderDetails, setJobOrTenderDetails] = useState({});
  useEffect(() => {
    setJobOrTenderDetails(details.tender || details.job);
  });
  return (
    <>
      {isMobileView ? (
        <AppView prop={{ details, sx, interviewPlanned, shortlist }} />
      ) : (
        <Stack
          direction={{ xs: "column", lg: "row" }}
          spacing={{ xs: "2", lg: "2" }}
          alignItems={{ xs: "flex-start", lg: "center" }}
          justifyContent={{ xs: "center", lg: "space-between" }}
          className="border-recent"
        >
          <Stack
            direction="row"
            spacing={2}
            alignItems={{ xs: "flex-start", lg: "row" }}
            sx={{ width: "57%", "@media (max-width:992px)": { width: "auto" } }}
          >
            <Avatar
              src={generateFileUrl(details.user.image?.path || "")}
              sx={{
                width: "70px",
                height: "70px",
                "@media(max-width:768px)": {
                  width: "86px",
                  height: "86px",
                },
              }}
            />
            <div className="recent-content">
              <Stack
                flexWrap={"wrap"}
                direction={{ xs: "column", lg: "row" }}
                spacing={{ xs: 0, lg: 2 }}
                alignItems={{ xs: "flex-start", lg: "flex-startr" }}
                sx={{ mb: 1, ...sx }}
              >
                <h4>{details?.user?.name || details?.user?.email}</h4>
                <div
                  className="recent-research"
                  style={{
                    display: "flex",
                    alignItems: "baseline",
                    flexWrap: "wrap",
                    wordBreak: "break-word",
                  }}
                >
                  <span>
                    Applied{" "}
                    <strong>
                      {dayjs.utc(details?.createdAt).local().fromNow()}
                    </strong>{" "}
                    to:{" "}
                  </span>
                  <div className="strong_text">{jobOrTenderDetails.title}</div>
                </div>
              </Stack>
              {details?.education || details?.skills || details?.language ? (
                <Stack
                  flexWrap={"wrap"}
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
              flexWrap={"wrap"}
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
            useFlexGap
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
      )}
    </>
  );
}

export default ApplicantCard;

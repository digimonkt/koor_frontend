import { Avatar, Divider } from "@mui/material";
import { Stack } from "@mui/system";
import React from "react";
import { generateFileUrl } from "@utils/generateFileUrl";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import utcPlugin from "dayjs/plugin/utc";
import timezonePlugin from "dayjs/plugin/timezone";
import { ChipBox } from "@components/jobCard/style";
import { SVG } from "@assets/svg";
import { Link } from "react-router-dom";
import urlcat from "urlcat";
dayjs.extend(utcPlugin);
dayjs.extend(timezonePlugin);
dayjs.extend(relativeTime);

const BlacklistCard = ({ details, reason, sx }) => {
  return (
    <>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={{ xs: 1, sm: 1, md: 1 }}
        sx={{ width: "100%", flexWrap: "wrap", mt: 2 }}
      >
        <ChipBox
          sx={{ marginBottom: "10px", backgroundColor: "#d5e3f7 !important" }}
          label={`Blacklist Reason: ${reason || ""}`}
          icon={<>{<SVG.BlockedIcon />}</>}
        />
      </Stack>
      <Stack
        direction={{ xs: "column", lg: "row" }}
        spacing={{ xs: "2", lg: "2" }}
        alignItems={{ xs: "start", lg: "center" }}
        justifyContent={{ xs: "center", lg: "space-between" }}
        className="border-recent"
      >
        <Stack direction="row" spacing={2} alignItems="center">
          <Avatar
            src={generateFileUrl(details?.image || "")}
            sx={{ width: "70px", height: "70px" }}
          />{" "}
          <div className="recent-content">
            <Stack
              direction="row"
              divider={<Divider orientation="vertical" flexItem />}
              spacing={2}
              flexWrap="wrap"
              alignItems="center"
              sx={{ mb: 1, ...sx }}
            >
              <Link
                to={urlcat("/job-seeker/:userId/profile", {
                  userId: details?.id,
                })}
              >
                <h4>{details?.name || details?.email}</h4>
              </Link>
            </Stack>
            <div className="recent-descrition">
              <p>{details?.description}</p>
            </div>
          </div>
        </Stack>
      </Stack>
    </>
  );
};

export default BlacklistCard;

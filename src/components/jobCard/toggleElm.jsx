import { Box, Stack } from "@mui/material";
import dayjs from "dayjs";
import React from "react";
import { SVG } from "../../assets/svg";
import JobBadges from "./badges";

const ToggleElm = ({ selfJob, jobDetails, sx }) => {
  return (
    <Box sx={sx}>
      <JobBadges jobDetails={jobDetails} />
      <Stack
        direction="row"
        spacing={2}
        className="mt-3"
        sx={{
          "@media(max-width: 480px)": {
            display: "block",
          },
        }}
      >
        {!selfJob && (
          <Stack direction="row" spacing={1}>
            <span>
              <SVG.BriefcaseIcon />
            </span>{" "}
            <div className="textdes">
              Institution:{" "}
              <span>
                {!jobDetails.company
                  ? jobDetails.user.name
                  : jobDetails.company}
              </span>
            </div>
          </Stack>
        )}
        <Stack
          direction="row"
          spacing={1}
          sx={{
            borderLeft: "1px solid #ccc",
            paddingLeft: "15px",
            "@media(max-width: 480px)": {
              borderLeft: "0px",
              paddingLeft: "0px",
              marginLeft: "0px !important",
              marginTop: "10px !important",
            },
          }}
        >
          <span>
            <SVG.ClockIconSmall />
          </span>{" "}
          <div className="textdes">
            Posted At: <span>{dayjs(jobDetails?.startDate).format("ll")}</span>
          </div>
        </Stack>{" "}
      </Stack>
    </Box>
  );
};

export default ToggleElm;

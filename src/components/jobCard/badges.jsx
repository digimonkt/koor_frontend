import React from "react";
import Stack from "@mui/material/Stack";
import { formatCommaText } from "@utils/constants/utility";
import { SVG } from "@assets/svg";
import { ChipBox } from "./style";

const JobBadges = ({ jobDetails }) => {
  const chipData = [
    {
      condition: true,
      sx: { px: 1.5 },
      label: formatCommaText(jobDetails?.city.title, jobDetails?.country.title),
      icon: <SVG.LocationIcon />,
    },
    {
      condition: !!jobDetails?.duration,
      sx: {
        "@media (max-width: 992px)": {
          paddingLeft: "12px !important",
          paddingRight: "12px !important",
        },
      },
      label: `${jobDetails?.duration} Months`,
      icon: <SVG.BegClock />,
    },
    {
      condition: jobDetails?.isFullTime,
      sx: { marginBottom: "10px !important" },
      label: "Full Time",
      icon: <SVG.MoonCircle />,
    },
    {
      condition: jobDetails?.isPartTime,
      sx: { marginBottom: "10px !important" },
      label: "Part time",
      icon: <SVG.MoonCircle />,
    },
    {
      condition: jobDetails?.hasContract,
      label: "Consultant",
      icon: <SVG.MoonCircle />,
    },
  ];

  return (
    <Stack
      direction="row"
      flexWrap="wrap"
      spacing={{ xs: 2, sm: 1, md: 1 }}
      useFlexGap
      sx={{
        width: "100%",
        "@media (max-width: 992px)": {
          overflow: "hidden",
          overflowX: "auto",
        },
        "@media (max-width: 480px)": {
          "& .MuiChip-root": { marginRight: "5px" },
        },
      }}
      className="job_card_chip"
    >
      {chipData.map(
        (chip, index) =>
          chip.condition && (
            <ChipBox
              key={index}
              sx={chip.sx}
              label={chip.label}
              icon={chip.icon}
            />
          ),
      )}
    </Stack>
  );
};

export default JobBadges;

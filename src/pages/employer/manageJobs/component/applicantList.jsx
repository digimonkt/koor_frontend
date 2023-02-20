import { Chip } from "@mui/material";
import { Stack } from "@mui/system";
import React from "react";
import { SVG } from "@assets/svg";

const ApplicantList = ({ handleActive, isActive }) => {
  return (
    <Stack
      direction="row"
      spacing={2}
      justifyContent="space-between"
      alignItems="center"
      sx={{ mt: 2 }}
    >
      <div className="toggle-application">
        Applications{" "}
        <Chip
          label="0"
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
        <Stack direction={{ xs: "column", lg: "row" }} spacing={1}>
          <Chip
            className="chip-cricle"
            label={
              <>
                Shortlisted <span className="cricle">2</span>
              </>
            }
            icon={<SVG.StarIcon />}
          />
          <Chip
            className="chip-cricle"
            label={
              <>
                Planned interviews <span className="cricle">1</span>
              </>
            }
            icon={<SVG.EventIcon />}
          />
          <Chip
            className="chip-cricle"
            label={
              <>
                Rejected <span className="cricle">1</span>
              </>
            }
            icon={<SVG.RejectIcon />}
          />
          <Chip
            className="chip-cricle"
            label={
              <>
                Blacklisted <span className="cricle">1</span>
              </>
            }
            icon={<SVG.RejectIcon />}
          />
        </Stack>
      )}
    </Stack>
  );
};

export default ApplicantList;

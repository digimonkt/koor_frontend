import { Stack } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { SVG } from "@assets/svg";
import { USER_ROLES } from "@utils/enum";

function EducationCard({
  title,
  description,
  startYear,
  endYear,
  organization,
}) {
  const { role } = useSelector((state) => state.auth);
  return (
    <Stack
      direction="row"
      spacing={2}
      justifyContent="space-between"
      alignItems="center"
    >
      <div className="list-content">
        <h5>{title}</h5>
        <h6>{organization}</h6>
        <p>description</p>
        <span>
          {startYear}-{endYear || "Present"}
        </span>
      </div>
      {role === USER_ROLES.jobSeeker && (
        <Stack direction="row" spacing={1} className="list-button">
          <button>
            <SVG.EditIcon />
            <span>Edit</span>
          </button>
          <button>
            <SVG.DeleteICon />
            <span>Delete</span>
          </button>
        </Stack>
      )}
    </Stack>
  );
}

export default EducationCard;

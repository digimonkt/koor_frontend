import { Box } from "@mui/material";
import React from "react";
import { SVG } from "../../assets/svg";
import { useNavigate } from "react-router-dom";
import urlcat from "urlcat";

const StartHoldEdit = ({ handleStartPause, tenderDetails, isStart }) => {
  const navigate = useNavigate();
  return (
    <Box className="job-button-card">
      <button
        onClick={() => {
          handleStartPause();
        }}
      >
        {isStart === "active" ? (
          <>
            <SVG.PauseIcon />
            <span className="d-block">Hold</span>
          </>
        ) : (
          <>
            <SVG.StartIcon />
            <span className="d-block">Start</span>
          </>
        )}
      </button>
      <button
        onClick={() => {
          if (tenderDetails?.id) {
            navigate(
              urlcat("/employer/tender/post", {
                tenderId: tenderDetails?.id,
              })
            );
          }
        }}
      >
        {<SVG.Edit1 />}
        <span className="d-block">Edit</span>
      </button>
    </Box>
  );
};

export default StartHoldEdit;

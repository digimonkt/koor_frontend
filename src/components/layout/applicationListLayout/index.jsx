import { SVG } from "@assets/svg";
import { Chip, Stack } from "@mui/material";
import React, { useState, useEffect } from "react";

function ApplicationListLayout({
  filters,
  totalApplications,
  children,
  onActive,
}) {
  const [isActive, setIsActive] = useState(false);

  const handleActive = () => {
    setIsActive(!isActive);
  };
  useEffect(() => {
    if (onActive) {
      onActive(isActive);
    }
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
          />
          <span
            onClick={() => handleActive()}
            className={`arrowjobs ${isActive ? "active" : ""}`}
          >
            {<SVG.ArrowUpIcon />}
          </span>
        </div>
        {isActive && <>{filters}</>}
      </Stack>
      {isActive && <div className="recent-box mt-3">{children}</div>}
    </>
  );
}

export default ApplicationListLayout;

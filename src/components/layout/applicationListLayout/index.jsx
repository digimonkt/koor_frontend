import { SVG } from "../../../assets/svg";
import { Chip, Stack } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

function ApplicationListLayout({
  filters,
  totalApplications,
  children,
  onActive,
}) {
  const [isActive, setIsActive] = useState(false);
  const { isMobileView } = useSelector(({ platform }) => platform);
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
        direction={{ xs: "column", lg: "row", md: "column" }}
        spacing={{ xs: 1, lg: 2, md: 1 }}
        justifyContent={{ xs: "flex-start", lg: "space-between" }}
        alignItems={{ xs: "flex-start", lg: "center" }}
        sx={{ marginTop: { lg: "32px" } }}
      >
        {isMobileView ? (
          <div
            className="toggle-application"
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
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
            <p>Applications</p>
          </div>
        ) : (
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
        )}
        {isActive && <>{filters}</>}
      </Stack>
      {isActive && <div className="recent-box mt-3">{children}</div>}
    </>
  );
}

export default ApplicationListLayout;

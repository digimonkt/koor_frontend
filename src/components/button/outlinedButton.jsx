import { Button } from "@mui/material";
import React from "react";

function OutlinedButtonComponent({
  className,
  title,
  onClick,
  jobSeeker,
  ...rest
}) {
  const query = {};
  if (jobSeeker) {
    query.sx = {
      "&.MuiButton-outlined": {
        border: "1px solid #EEA23D !important",
        color: "#EEA23D !important",
        fontWeight: "500",
        fontSize: "16px",
        padding: "10px 30px",
        "&:hover": { background: "rgba(255, 165, 0, 0.1)" },
        "@media (max-width: 992px)": {
          padding: "10px 16px",
          fontSize: "14px",
        },
      },
    };
  }
  return (
    <Button
      variant="outlined"
      className={`outline-button ${className}`}
      onClick={(e) => (onClick ? onClick(e) : null)}
      {...query}
      {...rest}
    >
      {title}
    </Button>
  );
}

export default OutlinedButtonComponent;

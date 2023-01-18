import { Button } from "@mui/material";
import React from "react";
import { IButton } from "src/components/button";

function OutlinedButtonComponent({
  className,
  title,
  onClick,
  ...rest
}: IButton) {
  return (
    <Button
      variant="outlined"
      className={`outline-button ${className}`}
      onClick={(e) => (onClick ? onClick(e) : null)}
      {...rest}
    >
      {title}
    </Button>
  );
}

export default OutlinedButtonComponent;

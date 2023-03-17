import { Button } from "@mui/material";
import React from "react";

export default function SearchButtonComponent({
  leftIcon,
  text,
  className,
  ...rest
}) {
  return (
    <div>
      <Button className={className} {...rest}>
        <span>{leftIcon}</span>
        {text}
      </Button>
    </div>
  );
}

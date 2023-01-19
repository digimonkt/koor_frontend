import { Button } from "@mui/material";
import React from "react";

export default function Searchbutton({
  lefticon,
  text,
  className,
  handleClickOpen,
}) {
  return (
    <div>
      <Button className={className} onClick={handleClickOpen}>
        <span>{lefticon}</span>
        {text}
      </Button>
    </div>
  );
}

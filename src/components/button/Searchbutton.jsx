import { SVG } from "../../assets/svg";
import { Button, Typography } from "@mui/material";
import React from "react";

export default function SearchButtonComponent({
  leftIcon,
  text,
  className,
  handleCross,
  ...rest
}) {
  return (
    <>
      <Button
        sx={{ width: "auto !important" }}
        className={className}
        {...rest}
        disableRipple={true}
      >
        <span>{leftIcon}</span>
        <Typography
          fontSize="small"
          flexWrap="nowrap"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {text}
        </Typography>
        {handleCross ? (
          <span className="close_icon_circle" onClick={handleCross}>
            <SVG.CrossCircle />
          </span>
        ) : (
          ""
        )}
      </Button>
    </>
  );
}

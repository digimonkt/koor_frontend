import { Capacitor } from "@capacitor/core";
import { IconButton } from "@mui/material";
import { Stack } from "@mui/system";
import React from "react";

function NoItem({ icon, bgColor, color, description }) {
  const platform = Capacitor.getPlatform();
  return (
    <Stack
      direction={
        platform === "android" || platform === "ios" ? "column" : "row"
      }
      spacing={2}
      sx={{
        alignItems:
          platform === "android" || platform === "ios" ? "start" : "center",
        "@media(max-width: 480px)": {
          display: "block",
          textAlign:
            platform === "android" || platform === "ios" ? "left" : "center",
        },
      }}
    >
      <IconButton
        sx={{
          "&.MuiIconButton-root": {
            backgroundColor: bgColor || "#FEEFD3",
            width: "101px",
            height: "101px",
            color: { color: color || "#EEA23D" },
            cursor: "default",
          },
          "@media (max-width: 480px)": {
            marginBottom: "16px",
          },
        }}
      >
        {icon}
      </IconButton>
      <div className="description">{description}</div>
    </Stack>
  );
}

export default NoItem;

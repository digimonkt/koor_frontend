import { IconButton } from "@mui/material";
import { Stack } from "@mui/system";
import React from "react";

function NoItem({ icon, description }) {
  return (
    <Stack
      direction="row"
      spacing={2}
      sx={{
        alignItems: "center",
      }}
    >
      <IconButton
        sx={{
          "&.MuiIconButton-root": {
            backgroundColor: "#FEEFD3",
            width: "101px",
            height: "101px",
            color: { color: "#EEA23D" },
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

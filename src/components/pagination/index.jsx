import React from "react";
import { Pagination as MUIPagination } from "@mui/material";
import Stack from "@mui/material/Stack";

export default function Pagination({ ...rest }) {
  return (
    <div>
      <Stack spacing={2}>
        <MUIPagination shape="rounded" {...rest} />
      </Stack>
    </div>
  );
}

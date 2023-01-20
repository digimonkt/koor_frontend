import React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

export default function Paginations() {
  return (
    <div>
      <Stack spacing={2}>
        <Pagination count={21} shape="rounded" />
      </Stack>
    </div>
  );
}

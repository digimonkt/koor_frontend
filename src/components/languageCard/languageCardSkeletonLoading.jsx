import { Stack } from "@mui/material";
import React from "react";
import Skeleton from "react-loading-skeleton";

function LanguageCardSkeletonLoading() {
  return (
    <Stack
      direction="row"
      spacing={2}
      justifyContent="space-between"
      alignItems="center"
    >
      <div className="list-content">
        <h5>
          <Skeleton width={200} />
        </h5>
        <span>
          <Skeleton width={100} />
        </span>
        <span>
          <Skeleton width={100} />
        </span>
        <br />
      </div>
    </Stack>
  );
}

export default LanguageCardSkeletonLoading;

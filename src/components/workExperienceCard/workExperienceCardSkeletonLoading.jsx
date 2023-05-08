import { Stack } from "@mui/material";
import React from "react";
import Skeleton from "react-loading-skeleton";

function WorkExperienceCardSkeletonLoading() {
  return (
    <Stack direction="row" justifyContent="space-between" alignItems="center">
      <div className="list-content">
        <h5>
          <Skeleton width={200} />
        </h5>
        <h6>
          <Skeleton width={100} />
        </h6>
        <span>
          <Skeleton width={800} count={2} style={{ lineHeight: "9px" }} />
        </span>
        <span style={{ display: "flex", marginTop: "10px" }}>
          <Skeleton height={10} width={100} />
          <Skeleton height={10} width={100} />
        </span>
      </div>
    </Stack>
  );
}

export default WorkExperienceCardSkeletonLoading;

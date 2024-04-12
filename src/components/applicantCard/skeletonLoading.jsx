import React from "react";
import { Stack, Skeleton } from "@mui/material";

const ApplicantCardSkeletonLoading = ({ sx }) => {
  return (
    <Stack
      spacing={2}
      justifyContent={{ lg: "space-between" }}
      className="border-recent"
      sx={{ padding: 2 }}
      direction="row"
    >
      <Skeleton variant="circular" sx={{ width: 100, height: 80 }} />
      <Stack direction="column" width="100%">
        <Skeleton sx={{ width: "100%", height: 30 }} />
        <Skeleton
          sx={{
            width: { xs: "50%", sm: "30%", lg: "10%" },
            height: 20,
            borderRadius: "20px",
          }}
        />
        <Skeleton
          sx={{
            width: { xs: "50%", sm: "30%", lg: "10%" },
            height: 20,
            borderRadius: "20px",
          }}
        />
        <Skeleton
          sx={{
            width: { xs: "50%", sm: "30%", lg: "10%" },
            height: 20,
            borderRadius: "20px",
          }}
        />
        <Skeleton height={20} width="100%" />
      </Stack>
    </Stack>
  );
};

export default ApplicantCardSkeletonLoading;

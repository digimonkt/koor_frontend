import { Stack } from "@mui/system";
import React from "react";
import Skeleton from "react-loading-skeleton";

const ApplicantCardSkeletonLoading = ({ sx }) => {
  return (
    <Stack
      direction={{ xs: "column" }}
      spacing={{ xs: "2", lg: "2" }}
      justifyContent={{ lg: "space-between" }}
      className="border-recent"
    >
      <Stack direction="row" spacing={2} alignItems="center">
        <Skeleton circle style={{ width: "70px", height: "70px" }} />
        <div style={{ width: "100%" }}>
          <Skeleton width={"100%"} />
          <Stack
            direction="row"
            spacing={2}
            alignItems="center"
            sx={{ mb: 1, mt: 1, ...sx }}
            className="meets_div"
          >
            <Skeleton width={"100%"} style={{ lineHeight: "9px" }} />
            <div
              style={{
                width: "100%",
              }}
            >
              <Skeleton
                height={20}
                width={"50%"}
                style={{
                  borderRadius: "20px",
                  minWidth: "20px",
                  marginTop: "5px",
                }}
              />
              <Skeleton
                height={20}
                width={"50%"}
                style={{
                  borderRadius: "20px",
                  minWidth: "20px",
                  marginTop: "5px",
                }}
              />
              <Skeleton
                height={20}
                width={"50%"}
                style={{
                  borderRadius: "20px",
                  minWidth: "20px",
                  marginTop: "5px",
                }}
              />
            </div>
          </Stack>
          <Skeleton width={"100%"} count={2} style={{ lineHeight: "9px" }} />
        </div>
      </Stack>
      <Skeleton height={20} width={"100%"} />
    </Stack>
  );
};

export default ApplicantCardSkeletonLoading;

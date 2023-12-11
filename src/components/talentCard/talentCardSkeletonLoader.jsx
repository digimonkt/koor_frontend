import { Divider, Stack } from "@mui/material";
import React from "react";
import Skeleton from "react-loading-skeleton";

function TalentCardSkeletonLoader() {
  return (
    <Stack
      sx={{ width: "100%" }}
      direction={{ xs: "column", lg: "row" }}
      spacing={{ xs: "2", lg: "2" }}
      alignItems={{ xs: "start", lg: "center" }}
      justifyContent={{ xs: "center", lg: "space-between" }}
      className="border-recent"
    >
      <Stack direction="row" spacing={2} alignItems="center">
        <Skeleton circle style={{ width: "70px", height: "70px" }} />
        <div className="recent-content">
          <Stack
            direction="row"
            divider={<Divider orientation="vertical" flexItem />}
            spacing={2}
            flexWrap="wrap"
            alignItems="center"
            sx={{ mb: 1 }}
            useFlexGap
          >
            <h4>
              <Skeleton width={"100%"} />
            </h4>
          </Stack>
          <Stack
            direction="row"
            spacing={2}
            alignItems="center"
            sx={{ mb: 1 }}
            className="meets_div"
          >
            <div>
              <span className="meets">
                <Skeleton width={207} style={{ lineHeight: "9px" }} />
              </span>
            </div>
          </Stack>
          <div className="recent-descrition">
            <p>
              <Skeleton
                width={"100%"}
                count={2}
                style={{ lineHeight: "9px" }}
              />
            </p>
          </div>
          <Stack
            direction="row"
            spacing={2}
            alignItems="center"
            sx={{ mb: 1, mt: 2, flexWrap: "wrap" }}
            className="meets_div"
            useFlexGap
          >
            <Stack direction={"row"} spacing={1.5} flexWrap={"wrap"} useFlexGap>
              <Skeleton
                height={30}
                width={100}
                style={{ borderRadius: "20px" }}
                className="chiplabel"
              />
              <Skeleton
                height={30}
                width={100}
                style={{ borderRadius: "20px" }}
                className="chiplabel"
              />
              <Skeleton
                height={30}
                width={100}
                style={{ borderRadius: "20px" }}
                className="chiplabel"
              />
            </Stack>
          </Stack>
        </div>
      </Stack>
    </Stack>
  );
}

export default TalentCardSkeletonLoader;

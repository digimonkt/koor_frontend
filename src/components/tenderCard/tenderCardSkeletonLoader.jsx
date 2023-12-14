import { Divider, Grid, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";

function TenderCardSkeletonLoader(logo, selfJob) {
  const [gridProps, setGridProps] = useState({});
  useEffect(() => {
    if (logo) {
      setGridProps({
        alignItems: "center",
        sx: { my: 3 },
      });
    }
  }, [logo]);
  return (
    <div className="job_card">
      <Grid container spacing={1.875} {...gridProps}>
        {logo && (
          <Grid
            item
            xs={12}
            spacing={{ lg: 2, sm: 2, xs: 0 }}
            sx={{
              "@media (min-width: 1200px)": {
                maxWidth: "11%",
                flexBasis: "11%",
              },
            }}
          >
            <div
              className="squer-width"
              style={{ height: "70px", width: "70px", borderRadius: "4px" }}
            >
              <Skeleton style={{ height: "100%", borderRadius: "4px" }} />
            </div>
          </Grid>
        )}
        <Grid
          item
          // lg={logo ? 8 : 9}
          xs={12}
          spacing={{ lg: 2, sm: 2, xs: 0 }}
          sx={{
            "@media (min-width: 1200px)": {
              maxWidth: "64%",
              flexBasis: "64%",
            },
          }}
        >
          <div className="my-jobs" style={{ paddingLeft: "75px" }}>
            <Skeleton height={24} width="100" />
            <p className="my-3 job-description card-description">
              <Skeleton count={2} style={{ lineHeight: "9px" }} />
            </p>
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={{ xs: 1, sm: 1, md: 1 }}
              sx={{ width: "100%", flexWrap: "wrap" }}
              useFlexGap
            >
              <Skeleton
                height={30}
                width={100}
                style={{ borderRadius: "20px" }}
              />
              <Skeleton
                height={30}
                width={100}
                style={{ borderRadius: "20px" }}
              />
              <Skeleton
                height={30}
                width={100}
                style={{ borderRadius: "20px" }}
              />
              <Skeleton
                height={30}
                width={100}
                style={{ borderRadius: "20px" }}
              />
              <Skeleton
                height={30}
                width={100}
                style={{ borderRadius: "20px" }}
              />
              <Skeleton
                height={30}
                width={100}
                style={{ borderRadius: "20px" }}
              />
            </Stack>
            <Stack
              direction="row"
              spacing={2}
              className="mt-3"
              divider={<Divider orientation="vertical" flexItem />}
            >
              {!selfJob && (
                <Stack direction="row" spacing={1}>
                  <Skeleton width={200} style={{ borderRadius: "20px" }} />
                </Stack>
              )}
              <Stack direction="row" spacing={1}>
                <Skeleton width={200} style={{ borderRadius: "20px" }} />
              </Stack>
            </Stack>
          </div>
        </Grid>
        <Grid
          item
          // lg={logo ? 2 : 3}
          xs={12}
          spacing={{ lg: 2, sm: 2, xs: 0 }}
          sx={{
            "@media (min-width: 1200px)": {
              maxWidth: "25%",
              flexBasis: "25%",
            },
          }}
        >
          <div className="text-end mb-4">
            <Skeleton height={30} width={100} style={{ borderRadius: "5px" }} />
          </div>
          <Stack
            direction="row"
            spacing={2}
            justifyContent="end"
            alignItems="center"
            divider={<Divider orientation="vertical" flexItem />}
            className="py-2"
            sx={{ minHeight: "87%" }}
          >
            <div className="pricebox py-3">
              {/* Skeleton Loader for Budget Amount */}
              <span className="d-block">
                <Skeleton
                  height={30}
                  width={100}
                  style={{ borderRadius: "5px" }}
                />
              </span>
              <h4>
                <Skeleton
                  height={20}
                  width={100}
                  style={{ borderRadius: "5px" }}
                />
              </h4>
              <span>
                <Skeleton
                  height={10}
                  width={100}
                  style={{ borderRadius: "5px" }}
                />
              </span>
            </div>
          </Stack>
        </Grid>
      </Grid>
    </div>
  );
}

export default TenderCardSkeletonLoader;

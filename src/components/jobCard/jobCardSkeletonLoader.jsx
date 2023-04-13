import { SVG } from "@assets/svg";
import { Divider, Grid, Stack } from "@mui/material";
import React, { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";

function JobCardSkeletonLoader({ logo }) {
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
            sx={{
              "@media (min-width: 1200px)": {
                maxWidth: "10.555%",
                flexBasis: "10.555%",
              },
            }}
          >
            <div className="squer-width">
              <Skeleton circle />
              {/* Skeleton Loader for Avatar */}
            </div>
          </Grid>
        )}
        <Grid
          item
          // lg={logo ? 8 : 9}
          // xs={12}
          sx={{
            "@media (min-width: 1200px)": {
              maxWidth: "72%",
              flexBasis: "72%",
            },
          }}
        >
          <div className="my-jobs">
            <Skeleton />
            <Skeleton count={3} />
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={{ xs: 1, sm: 1, md: 1 }}
              sx={{ width: "100%", flexWrap: "wrap" }}
            >
              {/* Skeleton Loader for ChipBox */}
              {/* Skeleton Loader for ChipBox */}
              {/* Skeleton Loader for ChipBox */}
              {/* Skeleton Loader for ChipBox */}
            </Stack>
            <Stack
              direction="row"
              spacing={2}
              className="mt-3"
              divider={<Divider orientation="vertical" flexItem />}
            >
              {/* Skeleton Loader for Company Name */}
              <Stack direction="row" spacing={1}>
                <span>
                  <SVG.ClockIconSmall />
                </span>{" "}
                <div className="textdes">
                  {/* Skeleton Loader for Posted At Date */}
                </div>
              </Stack>
            </Stack>
          </div>
        </Grid>
        <Grid item lg={logo ? 2 : 3} xs={12}>
          <div className="text-end mb-4">
            {/* Skeleton Loader for SolidButton */}
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
            </div>
          </Stack>
        </Grid>
      </Grid>
    </div>
  );
}

export default JobCardSkeletonLoader;

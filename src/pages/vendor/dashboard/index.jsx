import { getAppliedTendersAPI } from "@api/vendor";
import { NoDataFoundAnimation } from "@components/animations";
import { OutlinedButton } from "@components/button";
import { AreaChart } from "@components/charts";
import TenderCard from "@components/tenderCard";
import TenderCardSkeletonLoader from "@components/tenderCard/tenderCardSkeletonLoader";
import { Card, CardContent, Divider, Grid, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";

function Dashboard() {
  const [recentApplication, setRecentApplication] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [recentApplicationPage, setRecentApplicationPage] = useState(1);
  const [isMoreApplicationsAvailable, setIsMoreApplicationAvailable] =
    useState(true);
  const getRecentApplications = async () => {
    setIsLoading(true);
    const res = await getAppliedTendersAPI({
      limit: 5,
      page: recentApplicationPage,
    });
    if (res.remote === "success") {
      setRecentApplication((prevState) =>
        [...prevState, ...res.data.results].filter(
          (value, index, self) =>
            index === self.findIndex((t) => t.id === value.id)
        )
      );
      setIsMoreApplicationAvailable(!!res.data.next);
    } else {
      if (recentApplicationPage > 0) {
        setRecentApplicationPage((prevState) => prevState - 1);
      }
      setIsMoreApplicationAvailable(false);
    }
    setIsLoading(false);
  };
  const handleShowMore = () =>
    setRecentApplicationPage((prevState) => prevState + 1);
  useEffect(() => {
    getRecentApplications();
  }, [recentApplicationPage]);
  return (
    <div className="employer-dashboard">
      <Grid container spacing={2}>
        <Grid item xl={12} lg={12} sm={12}>
          <Card
            sx={{
              "&.MuiCard-root": {
                boxShadow: "0px 15px 40px rgba(0, 0, 0, 0.05)",
                borderRadius: "10px",
              },
            }}
          >
            <CardContent
              sx={{
                "&.MuiCardContent-root": {
                  padding: "25px 25px 5px",
                },
              }}
            >
              <div className="add-content">
                <AreaChart title="Tender posts analytics" />
              </div>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xl={12} lg={12} sm={12} xs={12}>
          <Card
            sx={{
              "&.MuiCard-root": {
                boxShadow: "0px 15px 40px rgba(0, 0, 0, 0.05)",
                borderRadius: "10px",
              },
            }}
          >
            <CardContent
              sx={{
                "&.MuiCardContent-root": {
                  padding: "25px 25px 25px",
                },
              }}
            >
              <div className="recent-box">
                <Stack
                  direction="row"
                  spacing={2}
                  justifyContent="space-between"
                  alignItems="center"
                  sx={{ mb: 3 }}
                >
                  <h3>Recent applications</h3>
                </Stack>
                {isLoading ? (
                  [1, 2, 3].map((loader) => (
                    <div
                      style={{ borderBottom: "1px solid #cacaca" }}
                      key={loader}
                    >
                      <TenderCardSkeletonLoader logo />
                    </div>
                  ))
                ) : !recentApplication.length ? (
                  <NoDataFoundAnimation title="It seems like you haven't submitted any tender applications yet." />
                ) : (
                  recentApplication.map((list) => {
                    return (
                      <div
                        style={{ borderBottom: "1px solid #cacaca" }}
                        key={list.id}
                      >
                        <TenderCard logo applied tenderDetails={list.tender} />
                        <Divider />
                      </div>
                    );
                  })
                )}

                <div className="text-center mt-4">
                  <OutlinedButton
                    title="Show more"
                    sx={{
                      "&.MuiButton-outlined": {
                        borderRadius: "73px",
                        border: "1px solid #274593",
                        color: "#274593",
                        fontWeight: "500",
                        fontSize: "16px",
                        fontFamily: "Bahnschrift",
                        padding: "10px 30px",
                        background: !isMoreApplicationsAvailable
                          ? "#e3e3e3"
                          : "",
                        "&:hover": { background: "#1976d20a" },
                      },
                    }}
                    onClick={handleShowMore}
                    disabled={!isMoreApplicationsAvailable}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}

export default Dashboard;

import { OutlinedButton } from "@components/button";
// import { AreaChart, DonutChart } from "@components/charts";
import { Card, CardContent, Grid, Stack } from "@mui/material";
// import { RECENT_ITEMS } from "@pages/employer/dashboard/recentHelper";
// import ApplicationCard from "@components/applicationCard";
import React, { useEffect } from "react";
import { vendorCardData } from "./vendorCardData";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/vendor/my-profile");
  });
  return (
    <div className="employer-dashboard">
      <Grid container spacing={2} sx={{ mb: 4 }}>
        {vendorCardData.map((item, index) => (
          <Grid item lg={4} xl={4} xs={12} key={index}>
            <Stack
              direction="row"
              spacing={2}
              alignItems="center"
              sx={{
                borderRadius: "80px",
                boxShadow: item.boxshadow,
                background: item.bgcolor,
                padding: "21px 25px",
                color: "#fff",
                height: "100px",
              }}
            >
              <span>{item.icon}</span>
              <div className="card-count">
                <h1>{item.title}</h1>
                <p>{item.subtitle}</p>
              </div>
            </Stack>
          </Grid>
        ))}
      </Grid>
      <Grid container spacing={2}>
        <Grid item xl={6} lg={6}>
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
                {/* <AreaChart title="Job posts analytics" /> */}
              </div>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xl={6} lg={6}>
          <Card
            sx={{
              "&.MuiCard-root": {
                boxShadow: "0px 15px 40px rgba(0, 0, 0, 0.05)",
                borderRadius: "10px",
                height: "100%",
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
              <div className="add-content">{/* <DonutChart /> */}</div>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xl={12} lg={12} xs={12}>
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
                  <h3>Vendor Recent </h3>
                </Stack>
                {/* {RECENT_ITEMS.map((item, index) => (
                  <ApplicationCard
                    image={item.img}
                    title={item.title}
                    description={item.description}
                    isDisabled={item.disabled}
                    key={index}
                    isShortlisted={item.shortlistedAt}
                    isRejected={item.rejectedAt}
                    isBlacklisted={item.user.isBlacklisted}
                    sx={{ mb: 0 }}
                    url="#!"
                  />
                ))} */}

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

                        "&:hover": { background: "#1976d20a" },
                      },
                    }}
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

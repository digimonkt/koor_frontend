import { Card, CardContent, Grid, Stack } from "@mui/material";
import React from "react";
import "./dashboard.css";
import { RECENT_ITEMS } from "./recentHelper";
import { DonutChart, AreaChart } from "@components/charts";
import ApplicationCard from "@components/applicationCard";
import { employerCard } from "./employerCardData";
import { OutlinedButton } from "@components/button";

const Dashboard = () => {
  return (
    <>
      <div className="employer-dashboard">
        <Grid container spacing={2} sx={{ mb: 4 }}>
          {employerCard.map((item, index) => (
            <Grid item lg={3} xl={3} xs={12} key={index}>
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
                  <AreaChart title="Job posts analytics" />
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
                <div className="add-content">
                  <DonutChart totalShare={"48 total shares:"} />
                </div>
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
                    <h3>Recent application</h3>
                    <p>Recent application</p>
                  </Stack>

                  {RECENT_ITEMS.map((item, index) => (
                    <ApplicationCard
                      image={item.img}
                      title={item.title}
                      subTitle={item.subtitle}
                      description={item.description}
                      chiplabel={item.chiplabel}
                      requirement={item.requirement}
                      isDisabled={item.disabled}
                      key={index}
                    />
                  ))}

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
    </>
  );
};
export default Dashboard;

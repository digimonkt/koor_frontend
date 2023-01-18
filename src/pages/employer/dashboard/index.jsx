import {
  Avatar,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  Stack,
} from "@mui/material";
import React from "react";
import { SVG } from "../../../assets/svg";
import { Cbutton } from "../../../components/button";
import "./dashboard.css";
import { RECENT_ITEMS } from "./recentHelper";
import { DonutChart, AreaChart } from "../components";

const employerCard = [
  {
    icon: <SVG.CreditIcon />,
    title: "371",
    subtitle: "available credits (~55 job posts)",
    bgcolor: "#FCB74F",
    boxshadow: "0px 5px 25px rgba(252, 183, 79, 0.5)",
  },
  {
    icon: <SVG.ClockIcon />,
    title: "244",
    subtitle: "days until credits are expired",
    bgcolor: "#5CC1E0",
    boxshadow: "0px 5px 25px rgba(92, 193, 224, 0.5)",
  },
  {
    icon: <SVG.ActiveJob />,
    title: "2",
    subtitle: "active job posts",
    bgcolor: "#61C78A",
    boxshadow: "0px 5px 25px rgba(97, 199, 138, 0.5)",
  },
  {
    icon: <SVG.UserGroupIcon />,
    title: "31",
    subtitle: "applications received",
    bgcolor: "#9C62E8",
    boxshadow: "0px 5px 25px rgba(156, 98, 232, 0.5)",
  },
];
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
                  <AreaChart />
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
                  <DonutChart />
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
                    <Stack
                      direction={{ xs: "column", lg: "row" }}
                      spacing={{ xs: "2", lg: "2" }}
                      alignItems={{ xs: "start", lg: "center" }}
                      justifyContent={{ xs: "center", lg: "space-between" }}
                      className="border-recent"
                      key={index}
                    >
                      <Stack direction="row" spacing={2} alignItems="center">
                        <Avatar
                          src={item.img}
                          sx={{ width: "70px", height: "70px" }}
                        />{" "}
                        <div className="recent-content">
                          <Stack
                            direction="row"
                            divider={
                              <Divider orientation="vertical" flexItem />
                            }
                            spacing={2}
                            alignItems="center"
                            sx={{ mb: 1 }}
                          >
                            <h4>{item.title}</h4>
                            <div className="recent-research">
                              {item.subtitle}
                            </div>
                          </Stack>
                          <Stack
                            direction="row"
                            spacing={2}
                            alignItems="center"
                            sx={{ mb: 1 }}
                          >
                            <span className="meets">{item.requirement}</span>{" "}
                            {item.chiplabel}
                          </Stack>
                          <div className="recent-descrition">
                            <p>{item.description}</p>
                          </div>
                        </div>
                      </Stack>
                      <Stack
                        direction="row"
                        spacing={0}
                        className="edit-button"
                      >
                        <Button variant="link" disabled={item.disabled}>
                          {<SVG.StarIcon />} <span>Shortlist</span>
                        </Button>
                        <Button variant="link">
                          {<SVG.OpenNewIcon />} <span>View</span>
                        </Button>
                      </Stack>
                    </Stack>
                  ))}

                  <div className="text-center mt-4">
                    <Cbutton
                      variant="outlined"
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
                    >
                      Show more
                    </Cbutton>
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

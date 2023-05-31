import { Card, CardContent, Grid, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import "./dashboard.css";
import { DonutChart } from "@components/charts";
import { employerCard } from "./employerCardData";
import { OutlinedButton } from "@components/button";
import {
  getDashboardActivityAPI,
  getRecentApplicationAPI,
  getShareCountDataAPI,
} from "@api/employer";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { NoDataFoundAnimation } from "@components/animations";
import JobAnalytics from "./jobAnalytics";
import Loader from "@components/loader";
import ApplicantCard from "@components/applicantCard";
import ApplicantCardSkeletonLoading from "@components/applicantCard/skeletonLoading";
dayjs.extend(relativeTime);
const Dashboard = () => {
  const [counts, setCounts] = useState({
    activeJobs: 0,
    activeTender: 0,
    appliedJobs: 0,
    appliedTender: 0,
  });
  const [recentApplication, setRecentApplication] = useState([]);
  const [recentApplicationPage, setRecentApplicationPage] = useState(1);
  const [isMoreApplicationsAvailable, setIsMoreApplicationAvailable] =
    useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [isDonutShow, setIsDonutShow] = useState(false);
  const [shareCount, setShareCount] = useState({
    series: [],
    sites: [],
    total: 0,
  });
  const getRecentApplications = async () => {
    setIsLoading(true);
    const res = await getRecentApplicationAPI({
      limit: 5,
      page: recentApplicationPage,
    });
    if (res.remote === "success") {
      // ! This filter is temporary and need to be optimized, as somehow API is called two time due to this duplicate data is found to remove this `filter` is used, but need to be fix
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

  const getDashboardActivity = async () => {
    const res = await getDashboardActivityAPI();
    if (res.remote === "success") {
      setCounts({
        activeJobs: res.data.activeJobs,
        activeTender: res.data.activeTender,
        appliedJobs: res.data.appliedJobs,
        appliedTender: res.data.appliedTender,
      });
    }
  };
  const getShareCountData = async () => {
    const res = await getShareCountDataAPI();
    if (res.remote === "success") {
      setShareCount({
        series: [
          res.data.facebook,
          res.data.whatsapp,
          res.data.telegram,
          res.data.linked_in,
          res.data.mail,
          res.data.direct_link,
        ],
        sites: [
          { name: "Facebook", count: res.data.facebook },
          { name: "Whatsapp", count: res.data.whatsapp },
          { name: "Telegram", count: res.data.telegram },
          { name: "Linked In", count: res.data.linked_in },
          { name: "Mail", count: res.data.mail },
          { name: "Direct Link", count: res.data.direct_link },
        ].sort((a, b) => b.count - a.count),
        total: res.data.total,
      });
      setIsDonutShow(true);
    }
  };
  const handleShowMore = () =>
    setRecentApplicationPage((prevState) => prevState + 1);

  useEffect(() => {
    getRecentApplications();
  }, [recentApplicationPage]);
  useEffect(() => {
    getDashboardActivity();
  }, []);
  useEffect(() => {
    getShareCountData();
  }, []);
  return (
    <>
      <div className="employer-dashboard">
        <Grid item container spacing={2} sx={{ mb: 4 }}>
          {employerCard(counts).map((item, index) => (
            <Grid item lg={3} xl={3} xs={6} key={index}>
              <Stack
                direction="row"
                spacing={{ xs: 1, lg: 2 }}
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
                  <JobAnalytics title="Job posts analytics" />
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
                <div className="add-content">
                  {isDonutShow ? (
                    <DonutChart shareCountData={shareCount} />
                  ) : (
                    <div
                      style={{
                        display: "flex",
                        paddingTop: "32%",
                        justifyContent: "center",
                        alignSelf: "center",
                      }}
                    >
                      <Loader
                        style={{ width: "44px", height: "44px" }}
                        loading={true}
                      />
                    </div>
                  )}
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
                    {/* <p>Applicants for past 12 hours shown</p> */}
                  </Stack>

                  {isLoading ? (
                    // skeleton loading need to implement
                    [1, 2, 3, 4, 5].map((loader) => (
                      <ApplicantCardSkeletonLoading key={loader} />
                    ))
                  ) : !recentApplication.length ? (
                    <NoDataFoundAnimation title="We could not find any recent job applications." />
                  ) : (
                    recentApplication.map((item, index) => (
                      <ApplicantCard
                        details={item}
                        key={index}
                        shortlist
                        view
                      />
                    ))
                  )}

                  {isMoreApplicationsAvailable && (
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
                        onClick={handleShowMore}
                        disabled={!isMoreApplicationsAvailable}
                      />
                    </div>
                  )}
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

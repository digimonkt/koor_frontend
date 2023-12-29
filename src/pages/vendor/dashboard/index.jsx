import { getAppliedTendersAPI } from "../../../api/vendor";
import { NoDataFoundAnimation } from "../../../components/animations";
import { OutlinedButton } from "../../../components/button";
import { AreaChart } from "../../../components/charts";
import TenderCard from "../../../components/tenderCard";
import TenderCardSkeletonLoader from "../../../components/tenderCard/tenderCardSkeletonLoader";
import {
  Box,
  Card,
  CardContent,
  Checkbox,
  Divider,
  FormControlLabel,
  Grid,
  IconButton,
  Stack,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
// import { globalLocalStorage } from "@utils/localStorage";
import { SVG } from "@assets/svg";
// import { setIsLoggedIn } from "@redux/slice/user";
// import { LogoutUserAPI } from "@api/user";

function Dashboard() {
  // const dispatch = useDispatch();
  const [recentApplication, setRecentApplication] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [recentApplicationPage, setRecentApplicationPage] = useState(1);
  const { isMobileView } = useSelector((state) => state.platform);

  const [isMoreApplicationsAvailable, setIsMoreApplicationAvailable] =
    useState(true);

  const { currentUser } = useSelector(({ auth }) => auth);

  // const logoutHandle = () => {
  //   userLogout();
  //   dispatch(setIsLoggedIn(false));
  // };

  // const userLogout = async () => {
  //   await LogoutUserAPI();
  //   globalLocalStorage.cleanLocalStorage();
  // };

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
            index === self.findIndex((t) => t.id === value.id),
        ),
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
        {isMobileView ? (
          <>
            <Grid item xs={12}>
              <Stack
                direction={"row"}
                alignItems={"center"}
                spacing={2}
                justifyContent={"space-between"}
                sx={{
                  mb: 1,
                  "& h1": {
                    fontFamily: "Bahnschrift",
                    fontSize: "22px",
                    fontWeight: "600",
                  },
                }}
              >
                <h1>Dashboard</h1>
                <Stack direction={"row"} spacing={0.5} alignItems={"center"}>
                  {/* <IconButton onClick={() => logoutHandle()}> */}
                  {/*   <SVG.AppGroup /> */}
                  {/* </IconButton> */}
                  <IconButton LinkComponent={Link} to="/Setting">
                    <SVG.Settings />
                  </IconButton>
                  <IconButton LinkComponent={Link} to="/notification">
                    <SVG.NotificationIcon />
                  </IconButton>
                </Stack>
              </Stack>
            </Grid>
            <Grid item xs={12}>
              <Stack direction={"row"} spacing={3} sx={{ mb: 2 }}>
                <img
                  alt="profile"
                  src={currentUser?.profileImage}
                  style={{
                    width: "80px",
                    height: "80px",
                    borderRadius: "100%",
                    boxShadow: "0px 5px 25px 0px rgba(0, 0, 0, 0.25)",
                  }}
                />
                <Box
                  sx={{
                    "& h4": {
                      fontSize: "18px",
                      fontFamily: "Bahnschrift",
                      letterSpacing: "0.54px",
                      fontWeight: "700",
                      mb: 1,
                      mt: 0,
                    },
                    "& p": {
                      fontSize: "14px",
                      fontFamily: "Poppins",
                      opacity: "0.5",
                      color: "#121212",
                      fontWeight: "400",
                      my: 0,
                    },
                  }}
                >
                  <h4>{currentUser?.name || currentUser?.email}</h4>
                  <p>{currentUser?.profile?.website}</p>
                  <p>{currentUser?.moblieNumber}</p>
                  <p>{currentUser?.email}</p>
                </Box>
              </Stack>
            </Grid>
          </>
        ) : null}
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
              <Stack
                direction={"row"}
                alignItems={"center"}
                spacing={1}
                sx={{ mb: 2, pb: 1, borderBottom: "1px solid #CACACA" }}
              >
                <span className="searchvs">Search visibility:</span>{" "}
                <FormControlLabel
                  sx={{
                    "& .MuiTypography-root": {
                      fontSize: "14px",
                      fontFamily: "Poppins",
                      color: "#121212",
                      letterSpacing: "0.28px",
                    },
                  }}
                  control={
                    <Checkbox
                      sx={{
                        color: "#274593",
                        transition: "all 0.5s ease-out",
                        padding: "2px 10px",
                        "&.Mui-checked": {
                          color: "#274593",
                          transition: "all 0.5s ease-out",
                        },
                      }}
                    />
                  }
                  label="Display my profile in search"
                />
              </Stack>
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
                )}
              </div>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}

export default Dashboard;

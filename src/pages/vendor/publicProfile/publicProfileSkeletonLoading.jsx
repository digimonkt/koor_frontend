import JobCardSkeletonLoader from "../../../components/jobCard/jobCardSkeletonLoader";
import {
  Box,
  Container,
  Grid,
  Stack,
  Typography,
  Divider,
  useMediaQuery,
} from "@mui/material";
import React from "react";
import Skeleton from "react-loading-skeleton";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function PublicProfileComponent() {
  const mobile = useMediaQuery("(max-width: 600px)");
  const { isMobileView } = useSelector((state) => state.platform);

  return (
    <Box
      sx={{
        background: "#fdfdfd",
        py: 3,
        pb: isMobileView ? 15 : null,
      }}
    >
      <Container
        maxWidth={false}
        disableGutters
        sx={{
          padding: "115px 100px",
          "@media screen and (max-width: 900px)": {
            padding: "100px 36px",
          },
          "@media screen and (max-width: 600px)": {
            padding: "44px 20px",
          },
        }}
      >
        <Grid container spacing={2}>
          <Grid item xl={8} lg={12} md={12} sm={12} xs={12}>
            <Grid item sx={{ padding: "16px 0 0 16px" }}>
              <Box
                sx={{
                  paddingRight: "45px",
                  "@media (max-width:900px)": {
                    paddingRight: "0px",
                  },
                }}
              >
                <Stack
                  direction={{ xs: "column", lg: "row" }}
                  spacing={{ xs: 1, lg: 2 }}
                  justifyContent={{ xs: "start", lg: "space-between" }}
                  alignItems={{ xs: "start", lg: "center" }}
                >
                  <Stack
                    direction={"row"}
                    spacing={2}
                    alignItems={"center"}
                    sx={{ width: "100%" }}
                  >
                    <Skeleton
                      circle
                      style={{ width: "88px", height: "88px" }}
                    />
                    <Box>
                      <Typography
                        variant="h4"
                        sx={{
                          fontFamily: "Bahnschrift",
                          fontSize: "24px",
                          fontWeight: "700",
                          letterSpacing: "0.03em",
                          mb: 0,
                        }}
                      >
                        <Skeleton width={300} />
                      </Typography>
                      <Typography
                        sx={{
                          color: "rgb(18 18 18 / 50%)",
                          margin: "3px 0px",
                          fontFamily: "Poppins",
                        }}
                      >
                        <Skeleton width={200} />
                      </Typography>
                      <Stack
                        direction={"row"}
                        spacing={1}
                        alignItems={"center"}
                      >
                        <Skeleton width={200} />
                      </Stack>
                    </Box>
                  </Stack>
                </Stack>
                <Typography
                  variant="h6"
                  sx={{
                    fontSize: "26px",
                    fontFamily: "Bahnschrift",
                    fontWeight: "600",
                    marginTop: "56px",
                    mb: 2,
                    color: "#121212",
                    "@media (max-width: 900px)": {
                      fontSize: "24px",
                    },
                    "@media (max-width: 600px)": {
                      fontSize: "18px",
                      marginTop: "25px",
                    },
                  }}
                >
                  About
                </Typography>
                <Typography
                  sx={{
                    fontSize: "14px",
                    fontFamily: "Poppins",
                    whiteSpace: "pre-line",
                    color: "#121212",
                    wordBreak: "break-word",
                    "@media (max-width: 600px)": {
                      fontSize: "12px",
                    },
                  }}
                >
                  <Skeleton
                    width={100}
                    count={3}
                    style={{ lineHeight: "10px" }}
                  />
                </Typography>
              </Box>
              <Divider sx={{ borderColor: "#ccc", my: mobile ? "10px" : 2 }} />
            </Grid>
            <Grid container sx={{ padding: "16px 0 0 16px" }}>
              <Grid
                item
                md={6}
                sm={12}
                xs={12}
                sx={{
                  borderRight: "1px solid #cacaca",
                  paddingRight: "30px",
                  "@media screen and (max-width: 900px)": {
                    borderRight: "none",
                  },
                }}
              >
                <Box>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{
                        fontSize: "26px",
                        fontFamily: "Bahnschrift",
                        fontWeight: "600",
                        mb: 2,
                        color: "#121212",
                        "@media (max-width: 900px)": {
                          fontSize: "24px",
                        },
                        "@media (max-width: 600px)": {
                          fontSize: "18px",
                        },
                      }}
                    >
                      Contracts Experience
                    </Typography>
                    <Typography
                      variant="string"
                      sx={{
                        fontSize: "14px",
                        fontFamily: "Bahnschrift",
                        color: "#274593",
                      }}
                    >
                      <Link to="#" style={{ color: "#274593" }}>
                        See All
                      </Link>
                    </Typography>
                  </div>
                  <ul className="listitems">
                    <ul className="listitems">
                      {[1, 2, 3].map((item) => (
                        <li key={item}>
                          <JobCardSkeletonLoader />
                        </li>
                      ))}
                    </ul>
                  </ul>
                </Box>
              </Grid>
              <Grid
                item
                sx={{
                  paddingLeft: 0,
                  "@media screen and (min-width: 900px)": {
                    paddingLeft: "30px",
                  },
                }}
                md={6}
                sm={12}
                xs={12}
              >
                <Divider
                  sx={{
                    borderColor: "#ccc",
                    my: mobile ? "10px" : 2,
                    display: "block",
                    "@media screen and (min-width: 900px)": {
                      display: "none",
                    },
                  }}
                />
                <Box>
                  <Stack direction={"column"} spacing={2}>
                    <Typography
                      variant="h6"
                      sx={{
                        fontSize: "26px",
                        fontFamily: "Bahnschrift",
                        fontWeight: "600",
                        mb: 2,
                        color: "#121212",
                        "@media (max-width: 900px)": {
                          fontSize: "24px",
                        },
                        "@media (max-width: 600px)": {
                          fontSize: "18px",
                        },
                      }}
                    >
                      Sectors
                    </Typography>
                    <Box>
                      <Stack direction="row" spacing={0} flexWrap="wrap">
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item, index) => (
                          <Skeleton
                            key={item}
                            height={30}
                            width={100}
                            style={{
                              borderRadius: "20px",
                              fontSize: "12px",
                              fontFamily: "Poppins",
                              color: "#121212",
                              fontWeight: "400",
                              // padding: "5px 10px 5px 20px",
                              margin: "0px 8px 8px 0px",
                            }}
                            className="chiplabel"
                          />
                        ))}
                      </Stack>
                    </Box>
                    <Divider
                      sx={{ borderColor: "#ccc", my: mobile ? "10px" : 2 }}
                    />
                    <Typography
                      variant="h6"
                      sx={{
                        fontSize: "26px",
                        fontFamily: "Bahnschrift",
                        fontWeight: "600",
                        mb: 2,
                        color: "#121212",
                        "@media (max-width: 900px)": {
                          fontSize: "24px",
                        },
                        "@media (max-width: 600px)": {
                          fontSize: "18px",
                        },
                      }}
                    >
                      Tags
                    </Typography>
                    <Box>
                      <Stack direction="row" spacing={0} flexWrap="wrap">
                        {[1, 2, 3, 4, 5, 6, 7].map((item, index) => (
                          <Skeleton
                            key={item}
                            height={30}
                            width={100}
                            style={{
                              borderRadius: "20px",
                              fontSize: "12px",
                              fontFamily: "Poppins",
                              color: "#121212",
                              fontWeight: "400",
                              // padding: "5px 10px 5px 20px",
                              margin: "0px 8px 8px 0px",
                            }}
                            className="chiplabel"
                          />
                        ))}
                      </Stack>
                    </Box>
                  </Stack>
                </Box>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xl={4} lg={12} md={12} sm={12} xs={12}>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "1fr",
                rowGap: "42px",
                paddingLeft: "8px",
                "@media screen and (max-width: 1535px)": {
                  marginTop: "28px",
                  gridTemplateColumns: "1fr 1fr",
                  columnGap: "28px",
                },
                "@media screen and (max-width: 600px)": {
                  gridTemplateColumns: "1fr",
                },
              }}
            >
              <Box
                sx={{
                  background: "#F2F2F2",
                  height: "300px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontSize: "32px",
                  fontWeight: "600",
                  "@media (max-width:768px)": {
                    fontSize: "18px",
                  },
                }}
              ></Box>
              <Box
                sx={{
                  background: "#F2F2F2",
                  height: "300px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontSize: "32px",
                  fontWeight: "600",
                  "@media (max-width:768px)": {
                    fontSize: "18px",
                  },
                }}
              ></Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default PublicProfileComponent;

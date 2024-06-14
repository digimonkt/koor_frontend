import { GetUserDetailsAPI } from "../../../api/user";
import { SVG } from "../../../assets/svg";

import {
  Box,
  Container,
  Grid,
  Stack,
  Avatar,
  Typography,
  Divider,
  Chip,
  useMediaQuery,
} from "@mui/material";
import PublicProfileSkeletonLoading from "./publicProfileSkeletonLoading";
import { generateFileUrl } from "../../../utils/generateFileUrl";
import React, { useEffect, useState } from "react";
import { formatPhoneNumberIntl } from "react-phone-number-input";
import { Link, useParams } from "react-router-dom";
import { NoRecordFoundAnimation } from "../../../components/animations";
import { useSelector } from "react-redux";

function PublicProfileComponent() {
  const params = useParams();
  const mobile = useMediaQuery("(max-width: 600px)");
  const { isMobileView } = useSelector((state) => state.platform);
  const [isLoading, setIsLoading] = useState(true);
  const contractsExperience = [];
  const [userDetails, setUserDetails] = useState({
    educationRecord: [],
    jobPreferences: {},
    languages: [],
    profile: {
      city: {},
      country: {},
      highestEducation: {},
    },
    tags: [],
    sectors: [],
    workExperiences: [],
  });

  const getUserDetails = async (userId) => {
    setIsLoading(true);
    const res = await GetUserDetailsAPI({ userId });
    if (res.remote === "success") {
      setUserDetails(res.data);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    const userId = params.userId;
    getUserDetails(userId);
  }, []);

  return (
    <Box
      sx={{
        background: "#fdfdfd",
        marginTop: isMobileView ? "0px" : "67px",
        py: 3,
        pb: isMobileView ? 15 : null,
      }}
    >
      {isLoading ? (
        <PublicProfileSkeletonLoading />
      ) : (
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
                      <Avatar
                        src={generateFileUrl(userDetails.profileImage || "")}
                        sx={{
                          height: "100px",
                          width: "100px",
                          borderRadius: "10%",
                          boxShadow: "0px 5px 25px rgba(0, 0, 0, 0.25)",
                        }}
                      />
                      <Box
                        sx={{
                          flex: "1 1 0%",
                        }}
                      >
                        <Typography
                          variant="h4"
                          sx={{
                            fontFamily: "Bahnschrift",
                            fontSize: "24px",
                            fontWeight: "700",
                            letterSpacing: "0.03em",
                            mb: 0,
                            color: "#121212  !important",
                            "@media (max-width: 900px)": {
                              fontSize: "20px",
                            },
                            "@media (max-width: 600px)": {
                              fontSize: "16px",
                            },
                          }}
                        >
                          {userDetails.name || userDetails.email}
                        </Typography>
                        {userDetails.profile.country?.title ? (
                          <Stack
                            direction={"row"}
                            spacing={1}
                            alignItems={"center"}
                            sx={{
                              marginTop: "6px",
                              marginBottom: mobile ? "16px" : "21px",
                            }}
                          >
                            <SVG.LocationIcon width={13} color="#939393" />
                            <Box
                              component={"span"}
                              sx={{
                                color: "rgb(18 18 18 / 50%)",
                                fontFamily: "Poppins",
                                fontSize: "12px  !important",
                                "@media screen and (max-width: 600px)": {
                                  fontSize: "10px",
                                },
                              }}
                            >
                              {userDetails.profile.city?.title},{" "}
                              {userDetails.profile.country?.title}
                            </Box>
                          </Stack>
                        ) : (
                          ""
                        )}
                        <Stack
                          direction={mobile ? "column" : "row"}
                          spacing={mobile ? 1 : 3}
                          alignItems={mobile ? "flex-start" : "center"}
                        >
                          {userDetails.countryCode &&
                            userDetails.mobileNumber && (
                              <Stack
                                direction="row"
                                spacing={1}
                                alignItems="center"
                              >
                                <SVG.Phone width={13} color="#274593" />
                                <Typography
                                  component={Link}
                                  to={`tel:${formatPhoneNumberIntl(
                                    userDetails.countryCode +
                                      userDetails.mobileNumber
                                  )}`}
                                  variant="h6"
                                  sx={{
                                    fontSize: "14px",
                                    "@media screen and (max-width: 600px)": {
                                      fontSize: "10px",
                                    },
                                    fontFamily: "Poppins",
                                    fontWeight: "500",
                                    color: "#121212",
                                  }}
                                >
                                  {formatPhoneNumberIntl(
                                    userDetails.countryCode +
                                      userDetails.mobileNumber
                                  )}
                                </Typography>
                              </Stack>
                            )}
                          <Stack
                            direction="row"
                            spacing={1}
                            alignItems="center"
                          >
                            <SVG.Mail width={13} color="#274593" />
                            <Typography
                              component={Link}
                              to={`mailto:${userDetails.email}`}
                              variant="h6"
                              sx={{
                                fontSize: "14px",
                                "@media screen and (max-width: 600px)": {
                                  fontSize: "10px",
                                },
                                fontFamily: "Poppins",
                                fontWeight: "500",
                                color: "#121212",
                                whiteSpace: "normal",
                                wordBreak: "break-all",
                              }}
                            >
                              {userDetails.email}
                            </Typography>
                          </Stack>
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
                    {userDetails.profile.description}
                  </Typography>
                </Box>
                <Divider
                  sx={{ borderColor: "#ccc", my: mobile ? "10px" : 2 }}
                />
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
                      {contractsExperience.length ? (
                        contractsExperience.map((item, index) => "")
                      ) : (
                        <div>
                          <NoRecordFoundAnimation title="No Contract Experiences have been added by the user." />
                        </div>
                      )}
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
                          {userDetails.sectors.length ? (
                            userDetails.sectors.map((item, index) => (
                              <Chip
                                key={index}
                                label={item.sector.title}
                                sx={{
                                  fontSize: "12px",
                                  fontFamily: "Poppins",
                                  color: "#121212",
                                  fontWeight: "400",
                                  // padding: "5px 10px 5px 20px",
                                  margin: "0px 8px 8px 0px",
                                }}
                              />
                            ))
                          ) : (
                            <div>
                              <NoRecordFoundAnimation title="No Sectors have been added by the user." />
                            </div>
                          )}
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
                          {userDetails.tags.length ? (
                            userDetails.tags.map((item, index) => (
                              <Chip
                                key={index}
                                label={item.tag.title}
                                sx={{
                                  fontSize: "12px",
                                  fontFamily: "Poppins",
                                  color: "#121212",
                                  fontWeight: "400",
                                  // padding: "5px 10px 5px 20px",
                                  margin: "0px 8px 8px 0px",
                                }}
                              />
                            ))
                          ) : (
                            <div>
                              <NoRecordFoundAnimation title="No Tags have been added by the user." />
                            </div>
                          )}
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
                >
                  ADVETRISEMENT
                </Box>
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
                >
                  ADVETRISEMENT
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      )}
    </Box>
  );
}

export default PublicProfileComponent;

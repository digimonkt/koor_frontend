import { GetUserDetailsAPI } from "../../../api/user";
import { SVG } from "../../../assets/svg";

import {
  Box,
  CardContent,
  Container,
  Card,
  Grid,
  Stack,
  Avatar,
  Typography,
  Divider,
  Chip,
  alpha,
} from "@mui/material";
import PublicProfileSkeletonLoading from "./publicProfileSkeletonLoading";
import { generateFileUrl } from "../../../utils/generateFileUrl";
import React, { useEffect, useState } from "react";
import { formatPhoneNumberIntl } from "react-phone-number-input";
import { Link, useParams } from "react-router-dom";
import { NoRecordFoundAnimation } from "../../../components/animations";
import { getColorByRole } from "@utils/generateColor.js";
import { useSelector } from "react-redux";

function PublicProfileComponent() {
  const params = useParams();
  const { isMobileView } = useSelector((state) => state.platform);
  const [isLoading, setIsLoading] = useState(true);
  const { role } = useSelector((state) => state.auth);
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
      sx={
        isMobileView
          ? { py: 3, marginBottom: "20px" }
          : { marginTop: "67px", py: 3 }
      }
    >
      {isLoading ? (
        <PublicProfileSkeletonLoading />
      ) : (
        <Container>
          <Card
            sx={{
              boxShadow: "0px 15px 40px rgba(0, 0, 0, 0.05)",
              borderRadius: "20px",
            }}
          >
            <CardContent
              sx={{
                "&.MuiCardContent-root": {
                  padding: "30px",
                },
              }}
            >
              <Grid container spacing={2}>
                <Grid
                  item
                  lg={8}
                  xs={12}
                  sm={6}
                  sx={{
                    borderRight: "1px solid #CACACA",

                    "@media (max-width:992px)": {
                      borderRight: "0",
                    },
                  }}
                >
                  <Box
                    sx={{
                      paddingRight: "45px",
                      "@media (max-width:992px)": { paddingRight: "0px" },
                    }}
                  >
                    <Stack
                      direction={{ xs: "column", lg: "row" }}
                      spacing={{ xs: 1, lg: 2 }}
                      justifyContent={{ xs: "start", lg: "space-between" }}
                      alignItems={{ xs: "start", lg: "center" }}
                    >
                      <Stack direction={"row"} spacing={2}>
                        <Avatar
                          src={generateFileUrl(userDetails.profileImage || "")}
                          sx={{
                            width: "88px",
                            height: "88px",
                            borderRadius: "10%",
                            boxShadow: "0px 5px 25px rgba(0, 0, 0, 0.25)",
                            "@media (max-width:768px)": {
                              width: "60px",
                              height: "60px",
                            },
                            "@media (max-width:480px)": {
                              width: "40px !important",
                              height: "40px !important",
                            },
                          }}
                        />
                        <Box>
                          <Typography
                            variant="h4"
                            sx={{
                              fontFamily: "Bahnschrift",
                              fontSize: "24px",
                              fontWeight: "700",
                              color: "#121212",
                              letterSpacing: "0.03em",
                              mb: 0,
                              "@media(max-width: 992px)": {
                                fontSize: "20px",
                              },
                              "@media(max-width: 480px)": {
                                fontSize: "16px",
                              },
                            }}
                          >
                            {userDetails.name || userDetails.email}
                          </Typography>
                          <Typography
                            sx={{
                              color: "rgb(18 18 18 / 50%)",
                              margin: "3px 0px",
                              fontFamily: "Poppins",
                            }}
                          >
                            {userDetails.profile.highestEducation?.title}
                          </Typography>
                          {userDetails.profile.country?.title ? (
                            <Stack
                              direction={"row"}
                              spacing={1}
                              alignItems={"center"}
                              sx={{ color: "rgb(18 18 18 / 50%)" }}
                            >
                              <SVG.LocationIcon />
                              <Box
                                component={"span"}
                                sx={{
                                  color: "rgb(18 18 18 / 50%)",
                                  fontFamily: "Poppins",
                                  fontSize: "14px",
                                  fontWeight: "400",
                                  letterSpacing: "0.42px",
                                  "@media(max-width: 992px)": {
                                    fontSize: "12px",
                                  },
                                  "@media(max-width: 480px)": {
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
                        </Box>
                      </Stack>
                    </Stack>
                    <Box sx={{ mt: 3 }}>
                      <Typography
                        variant="h6"
                        sx={{
                          fontSize: "26px",
                          fontFamily: "Bahnschrift",
                          fontWeight: "600",
                          "@media (max-width: 992px)": {
                            fontSize: "24px",
                          },
                          "@media (max-width: 480px)": {
                            fontSize: "20px",
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
                          wordBreak: "break-word",
                        }}
                      >
                        {userDetails.profile.description}
                      </Typography>
                      <Divider sx={{ borderColor: "#ccc", my: 2 }} />
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
                              color: "#121212",
                              "@media (max-width: 992px)": {
                                fontSize: "24px",
                              },
                              "@media (max-width: 480px)": {
                                fontSize: "20px",
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
                    </Box>
                  </Box>
                </Grid>
                <Grid item lg={4} xs={12} sm={6}>
                  <Box>
                    <Stack direction={"column"} spacing={2}>
                      <Typography
                        variant="h6"
                        sx={{
                          fontSize: "26px",
                          fontFamily: "Bahnschrift",
                          fontWeight: "600",
                          color: "#121212",
                          mb: 2,
                          "@media (max-width: 992px)": {
                            fontSize: "24px",
                          },
                          "@media (max-width: 480px)": {
                            fontSize: "20px",
                          },
                        }}
                      >
                        Contact info
                      </Typography>
                      {userDetails.countryCode && userDetails.mobileNumber ? (
                        <Stack
                          direction={"row"}
                          spacing={2}
                          alignItems={"center"}
                        >
                          <Box
                            sx={{
                              borderRadius: "5px",
                              p: 1,
                              width: "40px",
                              height: "40px",
                              background: alpha(getColorByRole(role), 0.2),
                              display: "inline-flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <SVG.Phone
                              style={{
                                color: getColorByRole(role),
                              }}
                            />
                          </Box>
                          <Box>
                            <Typography
                              variant="h6"
                              sx={{
                                fontSize: "16px",
                                fontFamily: "Poppins",
                                fontWeight: "500",
                                "@media (max-width: 992px)": {
                                  fontSize: "14px",
                                },
                                "@media (max-width: 480px)": {
                                  fontSize: "12px",
                                },
                              }}
                            >
                              {formatPhoneNumberIntl(
                                userDetails.countryCode +
                                  userDetails.mobileNumber
                              )}
                            </Typography>
                            <Typography
                              sx={{
                                color: "#848484",
                                fontFamily: "Poppins",
                                fontSize: "12px",
                                "@media (max-width: 992px)": {
                                  fontSize: "10px",
                                },
                              }}
                            >
                              Mobile
                            </Typography>
                          </Box>
                        </Stack>
                      ) : null}
                      <Stack
                        direction={"row"}
                        spacing={2}
                        alignItems={"center"}
                      >
                        <Box
                          sx={{
                            background: alpha(getColorByRole(role), 0.2),
                            color: getColorByRole(role),
                            borderRadius: "5px",
                            p: 1,
                            width: "40px",
                            height: "40px",
                            display: "inline-flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <SVG.Mail />
                        </Box>
                        <Box>
                          <Typography
                            variant="h6"
                            component={Link}
                            to={`mailto:${userDetails.email}`}
                            sx={{
                              color: "inherit",
                              fontSize: "16px",
                              fontFamily: "Poppins",
                              fontWeight: "500",
                              "@media (max-width: 992px)": {
                                fontSize: "14px",
                              },
                              "@media (max-width: 480px)": {
                                fontSize: "12px",
                              },
                            }}
                          >
                            {userDetails.email}
                          </Typography>
                          <Typography
                            sx={{
                              color: "#848484",
                              fontFamily: "Poppins",
                              fontSize: "12px",
                              "@media (max-width: 992px)": {
                                fontSize: "10px",
                              },
                            }}
                          >
                            Email
                          </Typography>
                        </Box>
                      </Stack>
                      {userDetails.profile.website ? (
                        <Stack
                          direction={"row"}
                          spacing={2}
                          alignItems={"center"}
                        >
                          <Box
                            sx={{
                              background: alpha(getColorByRole(role), 0.2),
                              color: getColorByRole(role),
                              borderRadius: "5px",
                              p: 1,
                              width: "40px",
                              height: "40px",
                              display: "inline-flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <SVG.Mail />
                          </Box>
                          <Box>
                            <Typography
                              variant="h6"
                              component={Link}
                              to={userDetails.profile.website}
                              sx={{
                                fontSize: "16px",
                                color: "inherit",
                                fontFamily: "Poppins",
                                fontWeight: "500",
                                "@media (max-width: 992px)": {
                                  fontSize: "14px",
                                },
                                "@media (max-width: 480px)": {
                                  fontSize: "12px",
                                },
                              }}
                            >
                              {userDetails.profile.website}
                            </Typography>
                            <Typography
                              sx={{
                                color: "#848484",
                                fontFamily: "Poppins",
                                fontSize: "12px",
                                "@media (max-width: 992px)": {
                                  fontSize: "10px",
                                },
                              }}
                            >
                              Website
                            </Typography>
                          </Box>
                        </Stack>
                      ) : null}
                      {userDetails.profile.address ? (
                        <Stack
                          direction={"row"}
                          spacing={2}
                          alignItems={"center"}
                        >
                          <Box
                            sx={{
                              borderRadius: "5px",
                              p: 1,
                              background: alpha(getColorByRole(role), 0.2),
                              color: getColorByRole(role),
                              width: "40px",
                              height: "40px",
                              display: "inline-flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <SVG.LocationIcon />
                          </Box>
                          <Box sx={{ flex: "1 1 0%" }}>
                            <Typography
                              variant="h6"
                              sx={{
                                fontSize: "16px",
                                fontFamily: "Poppins",
                                fontWeight: "500",
                                "@media (max-width: 992px)": {
                                  fontSize: "14px",
                                },
                                "@media (max-width: 480px)": {
                                  fontSize: "12px",
                                },
                              }}
                            >
                              {userDetails.profile.address}
                            </Typography>
                            <Typography
                              sx={{
                                color: "#848484",
                                fontFamily: "Poppins",
                                fontSize: "12px",
                                fontWeight: "400",
                                "@media (max-width: 992px)": {
                                  fontSize: "10px",
                                },
                              }}
                            >
                              Address
                            </Typography>
                          </Box>
                        </Stack>
                      ) : null}
                    </Stack>
                  </Box>
                  <Divider sx={{ borderColor: "#cacaca" }} />
                  <Typography
                    variant="h6"
                    sx={{
                      fontSize: "26px",
                      fontFamily: "Bahnschrift",
                      fontWeight: "600",
                      mb: 2,
                      color: "#121212",
                      "@media (max-width: 992px)": {
                        fontSize: "24px",
                      },
                      "@media (max-width: 480px)": {
                        fontSize: "20px",
                      },
                    }}
                  >
                    Sectors
                  </Typography>
                  <Box>
                    <Stack direction={"row"} spacing={0} flexWrap="wrap">
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
                  <Divider sx={{ borderColor: "#cacaca" }} />
                  <Typography
                    variant="h6"
                    sx={{
                      fontSize: "26px",
                      fontFamily: "Bahnschrift",
                      fontWeight: "600",
                      mb: 2,
                    }}
                  >
                    Tags
                  </Typography>
                  <Box>
                    <Stack direction={"row"} spacing={0} flexWrap="wrap">
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
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Container>
      )}
    </Box>
  );
}

export default PublicProfileComponent;

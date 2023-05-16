import { GetUserDetailsAPI } from "@api/user";
import { SVG } from "@assets/svg";

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
} from "@mui/material";
import PublicProfileSkeletonLoading from "./publicProfileSkeletonLoading";
import { generateFileUrl } from "@utils/generateFileUrl";
import React, { useEffect, useState } from "react";
import { formatPhoneNumberIntl } from "react-phone-number-input";
import { Link, useParams } from "react-router-dom";
import { NoRecordFoundAnimation } from "@components/animations";

function PublicProfileComponent() {
  const params = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const contractsExperience = [];
  const vendorSectors = [];
  const vendorTags = [];
  const [userDetails, setUserDetails] = useState({
    educationRecord: [],
    jobPreferences: {},
    languages: [],
    profile: {
      city: {},
      country: {},
      highestEducation: {},
    },
    resume: [],
    skills: [],
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
    <Box sx={{ marginTop: "67px", py: 3 }}>
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
                  sx={{
                    borderRight: "1px solid #CACACA",

                    "@media (max-width:992px)": {
                      borderRight: "0",
                    },
                  }}
                >
                  <Box sx={{ paddingRight: "45px" }}>
                    <Stack
                      direction={{ xs: "column", lg: "row" }}
                      spacing={{ xs: 1, lg: 2 }}
                      justifyContent={{ xs: "start", lg: "space-between" }}
                      alignItems={"center"}
                    >
                      <Stack direction={"row"} spacing={2}>
                        <Avatar
                          src={generateFileUrl(userDetails.profileImage || "")}
                          sx={{
                            width: "88px",
                            height: "88px",
                            boxShadow: "0px 5px 25px rgba(0, 0, 0, 0.25)",
                          }}
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
                            >
                              <SVG.LocationIcon />
                              <Box
                                component={"span"}
                                sx={{
                                  color: "rgb(18 18 18 / 50%)",
                                  fontFamily: "Poppins",
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
                        }}
                      >
                        About
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: "14px",
                          fontFamily: "Poppins",
                          whiteSpace: "pre-line",
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
                            }}
                          >
                            Contracts Experience
                          </Typography>
                          <Typography
                            variant="string"
                            sx={{
                              fontSize: "15px",
                              fontFamily: "Bahnschrift",
                            }}
                          >
                            <Link
                              to={`/search/jobs?search=${userDetails.name}`}
                            >
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
                <Grid item lg={4} xs={12}>
                  <Box>
                    <Stack direction={"column"} spacing={2}>
                      <Typography
                        variant="h6"
                        sx={{
                          fontSize: "26px",
                          fontFamily: "Bahnschrift",
                          fontWeight: "600",
                          mb: 2,
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
                              background: "#FEEFD3",
                              borderRadius: "5px",
                              p: 1,
                              color: "#EEA23D",
                              width: "40px",
                              height: "40px",
                              display: "inline-flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <SVG.Phone />
                          </Box>
                          <Box>
                            <Typography
                              variant="h6"
                              sx={{
                                fontSize: "16px",
                                fontFamily: "Poppins",
                                fontWeight: "600",
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
                            background: "#FEEFD3",
                            borderRadius: "5px",
                            p: 1,
                            color: "#EEA23D",
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
                            sx={{
                              fontSize: "16px",
                              fontFamily: "Poppins",
                              fontWeight: "600",
                            }}
                          >
                            {userDetails.email}
                          </Typography>
                          <Typography
                            sx={{
                              color: "#848484",
                              fontFamily: "Poppins",
                              fontSize: "12px",
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
                              background: "#FEEFD3",
                              borderRadius: "5px",
                              p: 1,
                              color: "#EEA23D",
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
                              sx={{
                                fontSize: "16px",
                                fontFamily: "Poppins",
                                fontWeight: "600",
                              }}
                            >
                              {userDetails.profile.website}
                            </Typography>
                            <Typography
                              sx={{
                                color: "#848484",
                                fontFamily: "Poppins",
                                fontSize: "12px",
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
                              background: "#FEEFD3",
                              borderRadius: "5px",
                              p: 1,
                              color: "#EEA23D",
                              width: "40px",
                              height: "40px",
                              display: "inline-flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <SVG.LocationIcon />
                          </Box>
                          <Box>
                            <Typography
                              variant="h6"
                              sx={{
                                fontSize: "16px",
                                fontFamily: "Poppins",
                                fontWeight: "600",
                              }}
                            >
                              {userDetails.profile.address}
                            </Typography>
                            <Typography
                              sx={{
                                color: "#848484",
                                fontFamily: "Poppins",
                                fontSize: "12px",
                              }}
                            >
                              Address
                            </Typography>
                          </Box>
                        </Stack>
                      ) : null}
                      <Divider sx={{ borderColor: "#cacaca" }} />
                    </Stack>
                  </Box>
                  <Box sx={{ mt: 3 }}>
                    <Stack direction={"column"} spacing={2}>
                      <Typography
                        variant="h6"
                        sx={{
                          fontSize: "26px",
                          fontFamily: "Bahnschrift",
                          fontWeight: "600",
                          mb: 2,
                        }}
                      >
                        Sectors
                      </Typography>
                      {vendorSectors.length ? (
                        <Stack
                          direction={"row"}
                          spacing={2}
                          alignItems={"center"}
                        >
                          <Box
                            sx={{
                              background: "#FEEFD3",
                              borderRadius: "5px",
                              p: 1,
                              color: "#EEA23D",
                              width: "40px",
                              height: "40px",
                              display: "inline-flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <SVG.Phone />
                          </Box>
                          <Box>
                            <Typography
                              sx={{
                                color: "#848484",
                                fontFamily: "Poppins",
                                fontSize: "12px",
                              }}
                            >
                              Mobile
                            </Typography>
                          </Box>
                        </Stack>
                      ) : (
                        <div>
                          <NoRecordFoundAnimation title="No Sectors have been added by the user." />
                        </div>
                      )}

                      <Divider sx={{ borderColor: "#cacaca" }} />
                    </Stack>
                  </Box>
                  <Box sx={{ mt: 3 }}>
                    <Stack direction={"column"} spacing={2}>
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
                      {vendorTags.length ? (
                        <Stack
                          direction={"row"}
                          spacing={2}
                          alignItems={"center"}
                        >
                          <Box
                            sx={{
                              background: "#FEEFD3",
                              borderRadius: "5px",
                              p: 1,
                              color: "#EEA23D",
                              width: "40px",
                              height: "40px",
                              display: "inline-flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <SVG.Phone />
                          </Box>
                          <Box>
                            <Typography
                              sx={{
                                color: "#848484",
                                fontFamily: "Poppins",
                                fontSize: "12px",
                              }}
                            >
                              Mobile
                            </Typography>
                          </Box>
                        </Stack>
                      ) : (
                        <div>
                          <NoRecordFoundAnimation title="No Tags have been added by the user." />
                        </div>
                      )}

                      <Divider sx={{ borderColor: "#cacaca" }} />
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

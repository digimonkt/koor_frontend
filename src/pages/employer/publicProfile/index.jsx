import { getEmployerActiveJobsAPI } from "../../../api/employer";
import BusinessCenterOutlinedIcon from "@mui/icons-material/BusinessCenterOutlined";
import { GetUserDetailsAPI } from "../../../api/user";
import { SVG } from "../../../assets/svg";
import { NoRecordFoundAnimation } from "../../../components/animations";
import JobCard from "../../../components/jobCard";
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
  alpha,
} from "@mui/material";
import LanguageIcon from "@mui/icons-material/Language";
import PublicProfileSkeletonLoading from "./publicProfileSkeletonLoading";
import { generateFileUrl } from "@utils/generateFileUrl";
import React, { useEffect, useState } from "react";
import { formatPhoneNumberIntl } from "react-phone-number-input";
import { Link, useParams } from "react-router-dom";
import { getColorByRole } from "@utils/generateColor";
import { useSelector } from "react-redux";
import { USER_ROLES } from "@utils/enum";

function PublicProfileComponent() {
  const params = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const { isMobileView } = useSelector(({ platform }) => platform);
  const { role } = useSelector(({ auth }) => auth);
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
  const [jobList, setJobList] = useState([]);
  const getUserDetails = async (userId) => {
    setIsLoading(true);
    const res = await GetUserDetailsAPI({ userId });
    if (res.remote === "success") {
      setUserDetails(res.data);
    }
    setIsLoading(false);
  };
  const getEmployersJob = async (userId) => {
    const res = await getEmployerActiveJobsAPI({
      employerId: userId,
      limit: 3,
    });
    if (res.remote === "success") {
      setJobList(res.data.results);
    }
  };
  useEffect(() => {
    const userId = params.userId;
    getUserDetails(userId);
    getEmployersJob(userId);
  }, []);
  return (
    <Box
      sx={
        isMobileView ? { marginBottom: "60px" } : { marginTop: "67px", py: 3 }
      }
    >
      {!isLoading ? (
        <PublicProfileSkeletonLoading />
      ) : (
        <Container sx={isMobileView ? { padding: 0 } : {}}>
          <Card
            sx={{
              boxShadow: "0px 15px 40px rgba(0, 0, 0, 0.05)",
              borderRadius: isMobileView ? "0" : "20px",
              marginBottom: "50px",
            }}
          >
            <CardContent
              sx={{
                "&.MuiCardContent-root": {
                  padding: isMobileView
                    ? "30px 0px 30px 16px"
                    : "30px 0px 30px 40px",
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
                  <Box sx={{ paddingRight: isMobileView ? "16px" : "45px" }}>
                    <Stack
                      direction={{ xs: "column", lg: "row" }}
                      spacing={{ xs: 1, lg: 2 }}
                      justifyContent={{ xs: "start" }}
                      alignItems={"flex-start"}
                    >
                      <Stack
                        alignItems="flex-start"
                        direction={"row"}
                        spacing={2}
                      >
                        <div
                          style={{
                            width: "100px",
                          }}
                        >
                          <Avatar
                            sx={{
                              boxShadow: "0px 5px 25px rgba(0, 0, 0, 0.25)",
                              borderRadius: "10%",
                              width: "100%",
                              height: "100%",
                              minHeight: "90px",
                              minWidth: "90px",
                              margin: "auto",
                              color: "#CACACA",
                              fontSize: "15rem",
                              "&.MuiAvatar-colorDefault": {
                                background: "#F0F0F0",
                              },
                            }}
                            src={generateFileUrl(
                              userDetails.profileImage || ""
                            )}
                          >
                            <BusinessCenterOutlinedIcon
                              sx={{
                                width: "100%",
                                padding: "30px",
                                height: "100%",
                              }}
                            />
                          </Avatar>
                        </div>
                        <Box>
                          <Typography
                            variant="h4"
                            ml={2}
                            sx={{
                              fontFamily: "Bahnschrift",
                              wordBreak: "break-all",
                              fontSize: "23px",
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
                            Active Jobs
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
                          {jobList.length ? (
                            jobList.map((item, index) => (
                              <li
                                className={
                                  role === USER_ROLES.jobSeeker
                                    ? "beforeClass1"
                                    : "beforeClass2"
                                }
                                key={index}
                                style={{
                                  borderBottom:
                                    index !==
                                    userDetails.workExperiences.length - 1
                                      ? "1px solid #cacaca"
                                      : "",
                                }}
                              >
                                <JobCard jobDetails={item} />
                              </li>
                            ))
                          ) : (
                            <div>
                              <NoRecordFoundAnimation title="No Work Experiences have been added by the user." />
                            </div>
                          )}
                        </ul>
                      </Box>
                    </Box>
                  </Box>
                </Grid>
                <Grid item lg={4} xs={12}>
                  <Box>
                    <Stack
                      direction={"column"}
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "flex-start",
                      }}
                    >
                      <Typography
                        variant="h6"
                        sx={{
                          fontSize: "26px",
                          fontFamily: "Bahnschrift",
                          fontWeight: "600",
                          color: "#121212",
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
                            target="_blank"
                            sx={{
                              color: "inherit",
                              wordBreak: "break-all",
                              marginRight: "20px",
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
                            <LanguageIcon />
                          </Box>
                          <Box>
                            <Typography
                              component={Link}
                              variant="h6"
                              target="_blank"
                              to={userDetails.profile.website}
                              sx={{
                                color: "inherit",
                                fontSize: "16px",
                                fontFamily: "Poppins",
                                marginRight: "20px",
                                wordBreak: "break-all",
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
                                marginRight: "20px",
                                wordBreak: "break-all",
                              }}
                            >
                              Address
                            </Typography>
                          </Box>
                        </Stack>
                      ) : null}
                      <Divider sx={{ borderColor: "#cacaca" }} />
                      <Box
                        sx={{
                          background: "#F2F2F2",
                          height: "300px",
                          width: "90%",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        ADVERTISEMENT
                      </Box>
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

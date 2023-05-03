import EducationCardSkeletonLoading from "@components/educationCard/educationCardSkeletonLoading";
import LanguageCardSkeletonLoading from "@components/languageCard/languageCardSkeletonLoading";
import WorkExperienceCardSkeletonLoading from "@components/workExperienceCard/workExperienceCardSkeletonLoading";
import {
  Box,
  Card,
  CardContent,
  Container,
  Divider,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import Skeleton from "react-loading-skeleton";

function PublicProfileSkeletonLoading() {
  return (
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
                        <Skeleton width={100} />
                      </Stack>
                    </Box>
                  </Stack>
                  <Stack direction={"row"} spacing={1} alignItems={"center"}>
                    <Box>
                      <Skeleton width={100} height={50} />
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
                    <Skeleton
                      width={1000}
                      count={3}
                      style={{ lineHeight: "10px" }}
                    />
                  </Typography>
                  <Box>
                    <Typography
                      variant="h6"
                      sx={{
                        fontSize: "26px",
                        fontFamily: "Bahnschrift",
                        fontWeight: "600",
                      }}
                    >
                      Work Experience
                    </Typography>
                    <ul className="listitems">
                      {[1, 2, 3].map((item) => (
                        <li key={item}>
                          <WorkExperienceCardSkeletonLoading />
                        </li>
                      ))}
                    </ul>
                  </Box>
                  <Divider sx={{ borderColor: "#ccc", my: 2 }} />
                  <Box>
                    <Typography
                      variant="h6"
                      sx={{
                        fontSize: "26px",
                        fontFamily: "Bahnschrift",
                        fontWeight: "600",
                      }}
                    >
                      Education
                    </Typography>
                    <ul className="listitems">
                      {[1, 2, 3].map((item) => (
                        <li key={item}>
                          <EducationCardSkeletonLoading />
                        </li>
                      ))}
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
                  <Stack direction={"row"} spacing={2} alignItems={"center"}>
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
                      <Skeleton width={40} height={40} />
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
                        <Skeleton width={200} />
                      </Typography>
                      <Typography
                        sx={{
                          color: "#848484",
                          fontFamily: "Poppins",
                          fontSize: "12px",
                        }}
                      >
                        <Skeleton width={50} />
                      </Typography>
                    </Box>
                  </Stack>
                  <Stack direction={"row"} spacing={2} alignItems={"center"}>
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
                      <Skeleton width={40} height={40} />
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
                        <Skeleton width={200} />
                      </Typography>
                      <Typography
                        sx={{
                          color: "#848484",
                          fontFamily: "Poppins",
                          fontSize: "12px",
                        }}
                      >
                        <Skeleton width={50} />
                      </Typography>
                    </Box>
                  </Stack>
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
                    Skills
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
                    Languages
                  </Typography>
                  <Box>
                    <ul className="listitems">
                      {[1, 2, 3].map((item, index) => (
                        <li key={index}>
                          <LanguageCardSkeletonLoading {...item} />
                        </li>
                      ))}
                    </ul>
                  </Box>
                </Stack>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
}

export default PublicProfileSkeletonLoading;

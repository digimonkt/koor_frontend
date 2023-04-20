import { IMAGES } from "@assets/images";
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
import React from "react";

export default function PublicProfileComponent() {
  return (
    <Box sx={{ marginTop: "67px", py: 3 }}>
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
                        src={IMAGES.User}
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
                          Vlad Blyshchyk
                        </Typography>
                        <Typography
                          sx={{
                            color: "rgb(18 18 18 / 50%)",
                            margin: "3px 0px",
                            fontFamily: "Poppins",
                          }}
                        >
                          UI/UX Designer
                        </Typography>
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
                            Nairobi, Kenya
                          </Box>
                        </Stack>
                      </Box>
                    </Stack>
                    <Stack
                      direction={"row"}
                      spacing={1}
                      alignItems={"center"}
                      sx={{
                        border: "1px solid #CACACA",
                        borderRadius: "5px",
                        p: 1,
                      }}
                    >
                      <SVG.ClockIconSmall />{" "}
                      <Box>
                        <Typography
                          variant="h6"
                          sx={{
                            fontWeight: "500",
                            mb: 0,
                            fontSize: "14px",
                            fontFamily: "Poppins",
                            lineHeight: "12px",
                          }}
                        >
                          3+ Years
                        </Typography>
                        <Box
                          component={"span"}
                          sx={{ fontSize: "10px", color: "#848484" }}
                        >
                          Experience
                        </Box>
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
                      sx={{ fontSize: "14px", fontFamily: "Poppins" }}
                    >
                      I am familiar with design software such as Adobe Creative
                      Suite, Sketch or Figma, and have a good understanding of
                      web technologies such as HTML, CSS and JavaScript. I know
                      how to conduct research and user testing to validate my
                      design decisions and iterate my designs.
                    </Typography>
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
                        Work experience
                      </Typography>
                      <Typography>Comming Soon</Typography>
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
                      <Typography>Comming Soon</Typography>
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
                        Download resume
                      </Typography>
                      <Typography>Comming Soon</Typography>
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
                          +51599268290
                        </Typography>
                        <Typography
                          sx={{
                            color: "#848484",
                            fontFamily: "Poppins",
                            fontSize: "12px",
                          }}
                        >
                          Kenya
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
                          max.fomin1000@gmail.com
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
                    <Box>Comming Soon</Box>
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
                    <Box>Comming Soon</Box>
                    <Box
                      sx={{
                        background: "#F2F2F2",
                        height: "300px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      ADVETRISEMENT
                    </Box>
                  </Stack>
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}

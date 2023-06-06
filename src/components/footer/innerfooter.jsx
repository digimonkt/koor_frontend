import {
  Box,
  Container,
  Grid,
  List,
  ListItem,
  ListItemButton,
  Typography,
  Stack,
  Button,
} from "@mui/material";

import { Link } from "react-router-dom";
import { menu } from "./helper";
import { SVG } from "@assets/svg";
import { useState, useEffect } from "react";
import { getTopCategoriesAPI } from "@api/job";

const InnerFooter = () => {
  const [categories, setCategories] = useState({});
  const getCategories = async () => {
    const res = await getTopCategoriesAPI();
    if (res.remote === "success") {
      setCategories(res.data);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);
  return (
    <Box sx={{ background: "#FFFFFF", padding: "60px 0px 60px" }}>
      <Container
        maxWidth={false}
        sx={{
          "@media(min-width:600px)": {
            paddingLeft: "100px",
            paddingRight: "100px",
          },
        }}
      >
        <Grid container spacing={2}>
          <Grid item lg={8} xs={12} sm={12}>
            <Grid container spacing={2}>
              {menu.map((items, index) => (
                <Grid item lg={3} xs={6} sm={3} key={index}>
                  <Typography
                    sx={{
                      fontSize: "20px",
                      color: "#274593",
                      fontWeight: 600,
                      fontFamily: "Poppins",
                      "@media (max-width:992px)": {
                        fontSize: "16px",
                      },
                    }}
                  >
                    {items.title}
                  </Typography>
                  <List>
                    {items.children.map((child, index) => {
                      return (
                        <ListItem disablePadding={true} key={index}>
                          <ListItemButton
                            sx={{
                              "&.MuiButtonBase-root": {
                                fontFamily: "Poppins",
                                fontSize: "16px",
                                color: "#121212",
                                fontWeight: 400,
                                "&:hover": {
                                  background: "transparent",
                                  color: "#EEA23D",
                                },
                                "@media (max-width:992px)": {
                                  fontSize: "12px",
                                },
                              },
                            }}
                            LinkComponent={Link}
                            to={child.url}
                            dense={true}
                            disableGutters={true}
                          >
                            {child.label}
                          </ListItemButton>
                        </ListItem>
                      );
                    })}
                  </List>
                </Grid>
              ))}
              <Grid item lg={3} xs={6} sm={3}>
                <Typography
                  sx={{
                    fontSize: "20px",
                    color: "#274593",
                    fontWeight: 600,
                    fontFamily: "Poppins",
                    "@media (max-width:992px)": {
                      fontSize: "16px",
                    },
                  }}
                >
                  Jobs
                </Typography>
                <List>
                  {categories.jobs?.map((child, index) => {
                    return (
                      <ListItem disablePadding={true} key={index}>
                        <ListItemButton
                          sx={{
                            "&.MuiButtonBase-root": {
                              fontFamily: "Poppins",
                              fontSize: "16px",
                              color: "#121212",
                              fontWeight: 400,
                              "&:hover": {
                                background: "transparent",
                                color: "#EEA23D",
                              },
                              "@media (max-width:992px)": {
                                fontSize: "12px",
                              },
                            },
                          }}
                          LinkComponent={Link}
                          to={`/search/jobs?categories=${child.id}`}
                          dense={true}
                          disableGutters={true}
                        >
                          {child.title}
                        </ListItemButton>
                      </ListItem>
                    );
                  })}
                </List>
              </Grid>

              <Grid item lg={3} xs={6} sm={3}>
                <Typography
                  sx={{
                    fontSize: "20px",
                    color: "#274593",
                    fontWeight: 600,
                    fontFamily: "Poppins",
                    "@media (max-width:992px)": {
                      fontSize: "16px",
                    },
                  }}
                >
                  Tenders
                </Typography>
                <List>
                  {categories.tenders?.map((child, index) => {
                    return (
                      <ListItem disablePadding={true} key={index}>
                        <ListItemButton
                          sx={{
                            "&.MuiButtonBase-root": {
                              fontFamily: "Poppins",
                              fontSize: "16px",
                              color: "#121212",
                              fontWeight: 400,
                              "&:hover": {
                                background: "transparent",
                                color: "#EEA23D",
                              },
                              "@media (max-width:992px)": {
                                fontSize: "12px",
                              },
                            },
                          }}
                          LinkComponent={Link}
                          to={`/search/tenders?tenderCategories=${child.id}`}
                          dense={true}
                          disableGutters={true}
                        >
                          {child.title}
                        </ListItemButton>
                      </ListItem>
                    );
                  })}
                </List>
              </Grid>
              <Grid item lg={3} xs={6} sm={3}>
                <Typography
                  sx={{
                    fontSize: "20px",
                    color: "#274593",
                    fontWeight: 600,
                    fontFamily: "Poppins",
                    "@media (max-width:992px)": {
                      fontSize: "16px",
                    },
                  }}
                >
                  Talents
                </Typography>
                <List>
                  {categories.talents?.map((child, index) => {
                    return (
                      <ListItem disablePadding={true} key={index}>
                        <ListItemButton
                          sx={{
                            "&.MuiButtonBase-root": {
                              fontFamily: "Poppins",
                              fontSize: "16px",
                              color: "#121212",
                              fontWeight: 400,
                              "&:hover": {
                                background: "transparent",
                                color: "#EEA23D",
                              },
                              "@media (max-width:992px)": {
                                fontSize: "12px",
                              },
                            },
                          }}
                          LinkComponent={Link}
                          to={`/search/talents?categories=${"d85a4105-408c-45ae-9aeb-7455f9556c93"}`}
                          dense={true}
                          disableGutters={true}
                        >
                          {child.title}
                        </ListItemButton>
                      </ListItem>
                    );
                  })}
                </List>
              </Grid>
            </Grid>
          </Grid>
          <Grid item lg={4} xs={12} sm={12}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                height: "100%",
                paddingLeft: "5rem",
                "@media(max-width:992px)": {
                  paddingLeft: "0rem",
                  justifyContent: "center",
                },
              }}
            >
              <Box
                sx={{
                  marginLeft: "auto",
                  "@media(max-width:992px)": { marginLeft: "0" },
                }}
              >
                <Typography
                  variant="h2"
                  sx={{
                    fontSize: "20px",
                    fontFamily: "Bahnschrift",
                    fontWeight: "600",
                    mb: 1,
                  }}
                >
                  Sign up for our newsletter
                </Typography>
                <Stack
                  direction={"row"}
                  sx={{
                    borderRadius: "66px",
                    border: "1px solid #D5E3F7",
                    overflow: "hidden",
                    "& input": {
                      outline: "0px",
                      border: "0px",
                      fontFamily: "Poppins",
                      fontSize: "14px",
                      padding: "0px 10px",
                    },
                  }}
                >
                  <input placeholder="Email..." />
                  <Button
                    sx={{
                      borderRadius: "66px",
                      background: "#D5E3F7",
                      color: "#274593",
                      fontFamily: "Bahnschrift",
                      fontSize: "15px",
                      fontWeight: "400",
                    }}
                  >
                    Sign up
                  </Button>
                </Stack>
              </Box>
            </Box>
          </Grid>
        </Grid>
        <Stack
          direction={{ xs: "column", lg: "row", sm: "row" }}
          spacing={{ xs: 1, sm: 2, lg: 5 }}
          alignItems={{ xs: "flex-start", lg: "center" }}
          justifyContent={"space-between"}
          flexDirection={{ xs: "column-reverse", lg: "row", sm: "row" }}
          sx={{ mt: 4, "@media (max-width:540px)": { mt: 0 } }}
        >
          <Stack direction={"row"} spacing={1} alignItems="center">
            <SVG.KoorLogo />
            <Typography
              sx={{
                fontSize: "16px",
                color: "#121212",
                mt: 2,
                fontWeight: 400,
                fontFamily: "Bahnschrift",
                "@media (max-width:992px)": { fontSize: "16px" },
              }}
            >
              © Copyright 2022, Koor
            </Typography>
          </Stack>

          <Stack
            direction={"row"}
            spacing={{ xs: 2, lg: 5 }}
            justifyContent={{ xs: "center" }}
            sx={{
              fontFamily: "Poppins",
              fontSize: "15px",
              fontWeight: "400",
              "@media (max-width:992px)": { width: "100%", fontSize: "12px" },
            }}
          >
            <Link to="/terms-condition" style={{ color: "#848484" }}>
              Terms of use
            </Link>
            <Link to="privacy-policy" style={{ color: "#848484" }}>
              Privacy policy
            </Link>
          </Stack>
          <Stack
            className="iconfooter"
            direction={"row"}
            spacing={2}
            alignItems="center"
            justifyContent={{ xs: "center" }}
            sx={{
              my: 4,
              "@media (max-width:992px)": {
                width: "100%",
                my: 0,
                "& svg": { width: "20px", height: "20px" },
              },
            }}
          >
            <a href="#!">
              <SVG.TwitterIcon />
            </a>
            <a href="#!">
              <SVG.YoutubeIcon />
            </a>
            <a href="#!">
              <SVG.InstagramIcon />
            </a>
            <a href="#!">
              <SVG.LinkedInIcon />
            </a>
            <a href="#!">
              <SVG.FacebookIcon />
            </a>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};
export default InnerFooter;

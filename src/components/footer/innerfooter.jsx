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

const InnerFooter = () => {
  return (
    <Box sx={{ background: "#FFFFFF", padding: "60px 0px 60px" }}>
      <Container>
        <Grid container spacing={2}>
          <Grid item lg={8} xs={12}>
            <Grid container spacing={2}>
              {menu.map((items, index) => (
                <Grid item lg={3} key={index}>
                  <Typography
                    sx={{
                      fontSize: "18px",
                      color: "#EEA23D",
                      fontWeight: 500,
                      fontFamily: "Poppins",
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
                              },
                            }}
                            LinkComponent={Link}
                            to="/"
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
            </Grid>
          </Grid>
          <Grid item lg={4} xs={12}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                height: "100%",
                paddingLeft: "5rem",
              }}
            >
              <Box sx={{ marginLeft: "auto" }}>
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
          direction={"row"}
          spacing={2}
          alignItems="center"
          justifyContent={"space-between"}
          sx={{ mt: 4 }}
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
              }}
            >
              © Copyright 2022, Koor
            </Typography>
          </Stack>

          <Stack
            direction={"row"}
            spacing={1}
            sx={{ fontFamily: "Poppins", fontSize: "15px", fontWeight: "400" }}
          >
            <Link to="#!" style={{ color: "#848484" }}>
              Terms of use
            </Link>
            <Link to="#!" style={{ color: "#848484" }}>
              Privacy policy
            </Link>
          </Stack>
          <Stack
            className="iconfooter"
            direction={"row"}
            spacing={2}
            alignItems="center"
            sx={{ my: 4 }}
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

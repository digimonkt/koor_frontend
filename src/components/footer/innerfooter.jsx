import {
  Box,
  Container,
  Grid,
  List,
  ListItem,
  ListItemButton,
  Typography,
  Stack,
} from "@mui/material";

import { Link } from "react-router-dom";
import { menu } from "./helper";
import { SVG } from "@assets/svg";
import { IMAGES } from "@assets/images";
const InnerFooter = () => {
  return (
    <Box sx={{ background: "#FFFFFF", padding: "60px 0px 60px" }}>
      <Container>
        <Grid container spacing={2}>
          <Grid item lg={9} xs={12}>
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
          <Grid item lg={3} xs={12}>
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
            <Stack direction={"row"} spacing={1.25}>
              <Link to="#!">
                <img src={IMAGES.GoogleStroe} alt="google stroe" />
              </Link>
              <Link to="#!">
                <img src={IMAGES.appleStroe} alt="google stroe" />
              </Link>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};
export default InnerFooter;

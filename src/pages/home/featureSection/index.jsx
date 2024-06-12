// import { css } from "@emotion/core";
import { Box, Container, Grid, Typography } from "@mui/material";
import { SVG } from "../../../assets/svg";
// import { Link } from "react-router-dom";

export const FeatureSection = () => {
  return (
    <Box>
      <Container maxWidth={false} sx={{ mt: { lg: "10" } }}>
        <Grid
          container
          spacing={{ xs: 2, sm: 3, lg: 10 }}
          sx={{ fontfamily: "Bahnschrift" }}
          direction={{ sm: "row-reverse", md: "row", lg: "row-reverse" }}
        >
          <Grid item lg={12} xs={12} sm={12}>
            <Box justifyContent="flex-start">
              <Typography variant="h5" fontSize={"32px"} fontWeight="600">
                Top Reasons Why You Should Choose Koor
              </Typography>
              <Typography
                variant="body1"
                fontWeight={600}
                sx={{ marginTop: 2, color: "#121212", opacity: 0.7 }}
                fontSize={"16px"}
              >
                Ready to elevate your employment and business connections in
                Somalia? Join Koor now. Whether you're an employer, job seeker,
                or vendor, Koor is simply better.
              </Typography>
            </Box>
          </Grid>
          <Grid item lg={12}>
            <Grid
              container
              spacing={{ xs: 2, sm: 3, lg: 10 }}
              direction={{ md: "row" }}
            >
              <Grid item lg={4}>
                <Box>
                  <Typography
                    justifyContent="flex-start"
                    alignItems="center"
                    gap={2}
                    display="flex"
                    variant="h6"
                    fontSize={"24px"}
                    fontWeight="600"
                  >
                    <SVG.SearchAppIcon /> A One-stop Platform
                  </Typography>
                  <Typography
                    variant="body1"
                    fontWeight={600}
                    fontSize={"16px"}
                    gap={2}
                    justifyContent="flex-start"
                    alignItems="center"
                    display="flex"
                    sx={{
                      marginTop: 2,
                      color: "#121212",
                      opacity: 0.7,
                      textAlign: "justify",
                    }}
                  >
                    Eliminate the hassle and save time on navigating different
                    platforms. Koor acts as a comprehensive solution and helps
                    to connect employers, job seekers, and vendors in one
                    centralized hub. Koor is the ultimate platform for those who
                    are looking for ways to hire or find job opportunities.{" "}
                  </Typography>
                </Box>
              </Grid>

              <Grid item lg={4}>
                <Box>
                  <Typography
                    variant="h6"
                    fontSize={"24px"}
                    fontWeight="600"
                    justifyContent="flex-start"
                    alignItems="center"
                    gap={2}
                    display="flex"
                  >
                    <SVG.CollaborationIcon style={{ height: "62px " }} />
                    Vendor Collaboration{" "}
                  </Typography>
                  <Typography
                    variant="body1"
                    fontSize={"16px"}
                    fontWeight={600}
                    sx={{
                      marginTop: 2,
                      color: "#121212",
                      opacity: 0.7,
                      textAlign: "justify",
                    }}
                  >
                    Are you a vendor looking to expand your business? Koor
                    facilitates collaboration between vendors and businesses and
                    fosters a network of partnerships within the Mogadishu
                    community. Explore new opportunities and grow your business
                    through our platform.
                  </Typography>
                </Box>
              </Grid>
              <Grid item lg={4}>
                <Box>
                  <Typography
                    justifyContent="flex-start"
                    alignItems="center"
                    fontSize={"24px"}
                    gap={2}
                    display="flex"
                    variant="h6"
                    fontWeight="600"
                  >
                    <SVG.MessageCommunicationIcon /> Real-Time Communication{" "}
                  </Typography>
                  <Typography
                    fontSize={"16px"}
                    variant="body1"
                    fontWeight={600}
                    sx={{
                      marginTop: 2,
                      color: "#121212",
                      opacity: 0.7,
                      textAlign: "justify",
                    }}
                  >
                    Communication is key and Koor ensures seamless interaction
                    between employers, job seekers, and vendors. Our integrated
                    messaging system allows users to connect in real time.
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default FeatureSection;

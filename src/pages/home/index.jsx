import { IMAGES } from "@assets/images";
import {
  Box,
  Button,
  Divider,
  Grid,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import styles from "./home.module.css";
import { setIstHomePage } from "@redux/slice/user";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container } from "@mui/system";
import SlickSlider from "@pages/slider";
import InputSearch from "@components/inputSearch";
// import SelectInput from "./selectinput";
import { SVG } from "@assets/svg";
import VerticalSlider from "./verticalSlider";
import { Link, useNavigate } from "react-router-dom";
import TextSlide from "./textSlide";
import HomeSection from "./homeSection";
import { SelectInput } from "@components/input";
import { getCountries, getJobCategories } from "@redux/slice/choices";
import { USER_ROLES } from "@utils/enum";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CoravImg from "../../assets/images/corav-bg.png";

// const options = [
//   {
//     id: 1,
//     value: "cat 1",
//     title: "category",
//   },
// ];
// const locations = [
//   {
//     id: 1,
//     value: "cat 1",
//     title: "Location",
//   },
// ];

const Home = () => {
  const navigate = useNavigate();
  // redux dispatch
  const dispatch = useDispatch();
  const { countries, jobCategories } = useSelector((state) => state.choices);
  const { role } = useSelector((state) => state.auth);
  // state management
  const [categories, setCategories] = useState("");
  const [location, setLocation] = useState("");
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    dispatch(setIstHomePage(true));
    if (!countries.data.length) {
      dispatch(getCountries());
    }
    if (!jobCategories.data.length) {
      dispatch(getJobCategories());
    }
    return () => {
      dispatch(setIstHomePage(false));
    };
  }, []);

  return (
    <>
      <div className="homepage">
        <Box className={styles.home_page}>
          <Box
            className={styles.bg_corav}
            sx={{
              background: `url(${CoravImg})`,
              backgroundPosition: "bottom center",
              backgroundRepeat: "no-repeat",
              position: "relative",
              "@media (max-width:992px)": { backgroundSize: "contain" },
              "@media (min-width:992px)": { backgroundSize: "contain" },
            }}
          >
            <Box
              className={styles.back_img_div}
              sx={{
                marginTop: "68px",
                "@media (max-width:992px)": { marginTop: "0px" },
              }}
            >
              <Box>
                <Container
                  maxWidth={false}
                  sx={{
                    "@media(min-width:600px)": {
                      paddingLeft: "100px",
                      paddingRight: "100px",
                    },
                  }}
                >
                  <Box
                    className={styles.headding}
                    sx={{
                      paddingTop: "26%",
                      "@media(max-width:992px)": { paddingTop: "35%" },
                      "@media(max-width:480px)": { paddingTop: "90%" },
                    }}
                  >
                    <h2>Find your dream job</h2>
                    <h5 className="mb-5">
                      Search for the best opportunities in your area
                    </h5>
                    <Grid container spacing={2}>
                      <Grid item xs={6} lg={3} sm={3}>
                        <InputSearch
                          onChange={(e) => setSearchValue(e.target.value)}
                        />
                      </Grid>
                      <Grid item xs={6} lg={4} sm={3}>
                        <SelectInput
                          value={categories}
                          onChange={(vl) => setCategories(vl.target.value)}
                          options={jobCategories.data.map((jobCategory) => ({
                            value: jobCategory.id,
                            label: jobCategory.title,
                          }))}
                          label="Category"
                          placeholder="Category"
                          className={`${styles.category_select}`}
                        />
                      </Grid>
                      <Grid item xs={6} lg={3} sm={3}>
                        <SelectInput
                          value={location}
                          onChange={(vl) => setLocation(vl.target.value)}
                          options={countries.data.map((country) => ({
                            value: country.id,
                            label: country.title,
                          }))}
                          label="Location"
                          placeholder={"Location"}
                          className={`${styles.location_select}`}
                        />
                      </Grid>
                      <Grid item xs={6} lg={2} sm={3}>
                        <Button
                          fullWidth
                          variant="contained"
                          className={styles.home_btn_btn}
                          onClick={() => {
                            navigate(
                              `/search/jobs?search=${searchValue}&categories=${categories}&location=${location}`
                            );
                          }}
                        >
                          Search
                        </Button>
                      </Grid>
                    </Grid>
                  </Box>
                </Container>
              </Box>
            </Box>
            <Container
              maxWidth={false}
              sx={{
                "@media(min-width:600px)": {
                  paddingLeft: "100px",
                  paddingRight: "100px",
                },
              }}
            >
              {role !== USER_ROLES.jobSeeker && role !== USER_ROLES.vendor ? (
                <Stack
                  direction={"row"}
                  alignItems={"center"}
                  spacing={2}
                  justifyContent={"center"}
                  sx={{ padding: "40px 0px", position: "relative", zIndex: 1 }}
                >
                  <h5 className={styles.home_img_contents_h5}>
                    Are you an employer looking for applicants <br /> to fill
                    your job openings fast?
                  </h5>
                  <Link
                    to="/employer/jobs/post"
                    className={styles.home_img_contents_p}
                  >
                    Post a job <SVG.RightArrow className={styles.rightarrow} />
                  </Link>
                </Stack>
              ) : (
                ""
              )}
            </Container>
          </Box>
          <Container
            maxWidth={false}
            sx={{
              "@media(min-width:600px)": {
                paddingLeft: "100px",
                paddingRight: "100px",
              },
            }}
          >
            <Box>
              <Typography className={`${styles.first_heading}`} sx={{ mb: 4 }}>
                Listings from the top companies
              </Typography>
              <Grid
                container
                spacing={{ xs: 2, lg: 10 }}
                direction="row"
                justifyContent="center"
                alignItems="center"
              >
                <Grid item xs={4} lg={2} sm={1}>
                  <img
                    src={IMAGES.Mintra}
                    alt="img"
                    className={`${styles.mintra}`}
                  />
                </Grid>
                <Grid item xs={4} lg={2} sm={2}>
                  <img
                    src={IMAGES.Amazon}
                    alt="img"
                    className={`${styles.amazon}`}
                  />
                </Grid>
                <Grid item xs={4} lg={2} sm={2}>
                  <img src={IMAGES.Dhl} alt="img" className={`${styles.dhl}`} />
                </Grid>
                <Grid item xs={4} lg={2} sm={2}>
                  <img
                    src={IMAGES.Binance}
                    alt="img"
                    className={`${styles.binance}`}
                  />
                </Grid>
                <Grid item xs={4} lg={2} sm={1}>
                  <img
                    src={IMAGES.Dominos}
                    alt="img"
                    className={`${styles.dominos}`}
                  />
                </Grid>
                <Grid item xs={4} lg={2} sm={2}>
                  <img
                    src={IMAGES.Lingo}
                    alt="img"
                    className={`${styles.lingo}`}
                  />
                </Grid>
              </Grid>
              <Divider
                sx={{
                  marginTop: "110px",
                  "@media(max-width:992px)": { marginTop: "24px" },
                }}
              />
            </Box>
            <Box>
              <Stack direction="row" spacing={2} className={styles.stack_box}>
                <Typography className={styles.popular_job}>
                  Popular job categories
                </Typography>
                <Typography className={`ms-auto ${styles.see_all_jobs}`}>
                  See all 4590 jobs{" "}
                  <IconButton>
                    <ArrowForwardIcon sx={{ color: "#eea23d" }} />
                  </IconButton>
                </Typography>
              </Stack>
            </Box>
          </Container>

          <Container
            maxWidth={false}
            sx={{
              "@media(min-width:600px)": {
                paddingLeft: "100px",
                paddingRight: "100px",
              },
            }}
          >
            <SlickSlider />
          </Container>
          <Box>
            <Container
              maxWidth={false}
              sx={{
                "@media(min-width:600px)": {
                  paddingLeft: "100px",
                  paddingRight: "100px",
                },
              }}
            >
              <HomeSection />
            </Container>
          </Box>
          <Box className={`${styles.home_back}`}>
            <Box className={`${styles.home_powerfull_box}`}>
              <Box>
                <h3 className={styles.home_powerfull_h3}>
                  Powerfull platform for everyone
                </h3>
                <p className={styles.home_powerfull_p}>
                  While our competitors say they are the best, we prove it by
                  doing. You can read more about us competitors say they
                </p>
              </Box>
              <Box className={styles.home_new_job_box}>
                <Box className={`${styles.new_jobs}`}>
                  <h2>500</h2>
                  <p>New jobs posted every day</p>
                </Box>
                <Box className={`${styles.new_jobs}`}>
                  <h2>7500</h2>
                  <p>Employers are hiring now</p>
                </Box>
                <Box className={`${styles.new_jobs}`}>
                  <h2>2050</h2>
                  <p>Tenders are currently active</p>
                </Box>
              </Box>
            </Box>
            <Box className={styles.home_testi_box}>
              <Container
                maxWidth={false}
                sx={{
                  "@media(min-width:600px)": {
                    paddingLeft: "100px",
                    paddingRight: "100px",
                  },
                }}
              >
                <VerticalSlider />
              </Container>
            </Box>
            <Box>
              <TextSlide />
            </Box>
            <Box className={styles.stay_back_img} sx={{ marginTop: "50px" }}>
              <Container
                maxWidth={false}
                sx={{
                  "@media(min-width:600px)": {
                    paddingLeft: "100px",
                    paddingRight: "100px",
                  },
                }}
              >
                <Grid container spacing={3}>
                  <Grid item xs={12} lg={5} sm={5}>
                    <Box
                      className={styles.stay_text_box}
                      sx={{ padding: "50px 0px" }}
                    >
                      <h4>Mobile app</h4>
                      <h2>Stay in touch</h2>
                      <p>
                        Meet our app right in your smartphone! Whether you’re a
                        jobseeker, employer or vendor – you’ll get a lot of
                        benefits of using the app. Get instant notifications and
                        stay in touch with prospects.
                      </p>
                      <Box
                        className={styles.stay_social_icon}
                        sx={{
                          "@media (max-width:480px)": {
                            "& img": { width: "45%" },
                          },
                        }}
                      >
                        <img src={IMAGES.Googleplay} alt="" />
                        <img src={IMAGES.Appstore} alt="" className="mx-3" />
                      </Box>
                    </Box>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    lg={7}
                    sm={7}
                    sx={{
                      padding: "50px 0px",
                      "@media (max-width:480px)": {
                        padding: "50px 0px 0px",
                      },
                    }}
                  >
                    <img
                      src={IMAGES.MobileApp}
                      alt=""
                      className={styles.appview}
                    />
                  </Grid>
                </Grid>
              </Container>
            </Box>
          </Box>
        </Box>
      </div>
    </>
  );
};

export default Home;

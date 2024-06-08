import { IMAGES } from "../../assets/images";
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
import { setIstHomePage } from "../../redux/slice/user";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container } from "@mui/system";
import SlickSlider from "../../pages/slider";
import InputSearch from "../../components/inputSearch";
import { SVG } from "../../assets/svg";
import { Link, useNavigate } from "react-router-dom";
import TextSlide from "./textSlide";
import { SelectInput } from "../../components/input";
import { getCountries, getJobCategories } from "../../redux/slice/choices";
import { USER_ROLES } from "../../utils/enum";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CoravImg from "../../assets/images/corav-bg.png";
import {
  getTopJobCategoriesAPI,
  getTopTenderCategoriesAPI,
} from "../../api/job";

import {
  getTestimonialListAPI,
  getTopListingCompaniesAPI,
  getSiteUpdatesAPI,
} from "../../api/home";
import { generateFileUrl } from "../../utils/generateFileUrl";
import TestimonialSlider from "./verticalSlider/TestimonialSlider";
import DialogBox from "../../components/dialogBox";
import { Helmet } from "react-helmet";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { countries, jobCategories } = useSelector((state) => state.choices);
  const { role, isLoggedIn } = useSelector((state) => state.auth);

  const [totalTenders, setTotalTenders] = useState(0);
  const [totalJobs, setTotalJobs] = useState(0);
  const [topJobCategories, setTopJobCategories] = useState([]);
  const [topListingCompanies, setTopListingCompanies] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [testimonialList, setTestimonialList] = useState([]);
  const [siteUpdates, setSiteUpdates] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [categories, setCategories] = useState("");
  const [location, setLocation] = useState("");
  const [message, setMessage] = useState(false);

  const handleSearchValueChange = (e) => {
    setSearchValue(e.target.value);
    setMessage(false); // Reset the message when searchValue changes
  };

  const handleCategoriesChange = (vl) => {
    setCategories(vl.target.value);
    setMessage(false); // Reset the message when categories change
  };

  const handleLocationChange = (vl) => {
    setLocation(vl.target.value);
    setMessage(false); // Reset the message when location changes
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!searchValue && !categories && !location) {
      setMessage(true); // Show a general message that at least one field is required
      return;
    }
    setMessage(false);
    navigate(
      `/search/jobs?search=${searchValue}&categories=${categories}&location=${location}`
    );
  };
  const getTopJobCategories = async () => {
    const res = await getTopJobCategoriesAPI();
    if (res.remote === "success") {
      const displayValue =
        res.data.total_jobs > 100
          ? `${Math.floor(res.data.total_jobs / 100) * 100}+`
          : res.data.total_jobs;
      const jobsrCategoriesWithTypes = res.data.job_categories.map(
        (jobCategories) => ({
          ...jobCategories,
          categoryType: "job",
        })
      );
      setTopJobCategories((prev) => [...prev, ...jobsrCategoriesWithTypes]);
      setTotalJobs(displayValue);
    }
  };

  const getTopTenderCategories = async () => {
    const res = await getTopTenderCategoriesAPI();
    if (res.remote === "success") {
      const displayValue =
        res.data.total_tenders > 100
          ? `${Math.floor(res.data.total_tenders / 100) * 100}+`
          : res.data.total_tenders;

      const tenderCategoriesWithTypes = res.data.tender_categories.map(
        (tenderCategory) => ({
          ...tenderCategory,
          categoryType: "tender",
        })
      );

      setTopJobCategories((prev) => [...prev, ...tenderCategoriesWithTypes]);
      setTotalTenders(displayValue);
    }
  };
  const getSiteUpdates = async () => {
    const res = await getSiteUpdatesAPI();
    if (res.remote === "success") {
      setSiteUpdates(res.data);
    }
  };
  const getTopListingCompanies = async () => {
    const res = await getTopListingCompaniesAPI();
    if (res.remote === "success") {
      setTopListingCompanies(res.data);
    }
  };
  const getTestimonialList = async () => {
    const res = await getTestimonialListAPI();
    if (res.remote === "success") {
      setTestimonialList(res.data.result);
    }
  };

  const handleCommingSoon = () => {
    setOpenDialog(true);
  };

  useEffect(() => {
    getTopTenderCategories();
    getTopJobCategories();
    getTopListingCompanies();
    getTestimonialList();
    getSiteUpdates();
  }, []);
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
      <Helmet>
        <meta name="keywords" content="Somali jobs, jobs in Somali" />
        <meta
          name="description"
          content="Join Koor, the all-in-one platform connecting Employers, Jobseekers & vendors in Somalia. Post opportunities, find talent, access jobs & tenders - Get notified of the latest updates."
        />
        <title>
          Koor - All-in-One Platform for Jobs and Tenders in Somalia.
        </title>
      </Helmet>
      <div>
        <div className="homepage">
          <Box className={styles.home_page} sx={{ marginTop: "62.5px" }}>
            <Box
              className={styles.bg_corav}
              sx={{
                position: "relative",
                "@media (min-width:992px)": {
                  background: `url(${CoravImg})`,
                  backgroundPosition: "bottom center",
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "contain",
                },
              }}
            >
              <Box className={styles.back_img_div}>
                <Box sx={{ width: "100%" }}>
                  <Container
                    maxWidth={false}
                    sx={{
                      "@media(min-width:992px)": {
                        paddingLeft: "100px",
                        paddingRight: "100px",
                      },
                    }}
                  >
                    <Box className={styles.headding}>
                      <Typography
                        variant="h1"
                        sx={{
                          color: "#0e2f59",
                          fontSize: "54px",
                          fontFamily: "Bahnschrift, sans-serif",
                          fontWeight: 700,
                          "@media screen and (max-width: 992px)": {
                            fontSize: "40px",
                          },
                          "@media screen and (max-width: 480px)": {
                            fontSize: "32px",
                          },
                        }}
                      >
                        Find your dream job
                      </Typography>
                      <Typography
                        variant="h2"
                        sx={{
                          color: "#0e2f59",
                          fontSize: "24px",
                          fontFamily: "Poppins, sans-serif",
                          marginTop: "10px",
                          marginBottom: "40px",
                          "@media screen and (max-width: 992px)": {
                            fontSize: "20px",
                          },
                        }}
                      >
                        Search for the best opportunities in your area
                      </Typography>
                      <form onSubmit={handleSubmit}>
                        <Grid
                          container
                          columnGap={2}
                          sx={{
                            "@media(max-width:1274px)": {
                              justifyContent: "space-between",
                              gap: "0px",
                            },
                            "@media(max-width:480px)": {
                              justifyContent: "space-between",
                              columnGap: "0px",
                              padding: "0px 0px 0px 14px !important",
                              "& .MuiGrid-root": {
                                width: "50%",
                                paddingRight: "16px",
                              },
                            },
                          }}
                        >
                          <Grid item className="mb-2">
                            <InputSearch
                              sx={{
                                marginRight: "16px",
                                width: 100,
                                "@media(max-width:480px)": {
                                  width: "100% !important",
                                },
                              }}
                              onChange={handleSearchValueChange}
                            />
                            {message && (
                              <p
                                style={{
                                  color: "#eea23d",
                                  fontWeight: "300",
                                  fontFamily: "Poppins",
                                  fontSize: "14px",
                                  margin: "0",
                                  position: "absolute",
                                }}
                              >
                                Please fill the required value
                              </p>
                            )}
                          </Grid>
                          <Grid item className="mb-2 ">
                            <SelectInput
                              fullWidth
                              value={categories}
                              onChange={handleCategoriesChange}
                              options={jobCategories.data.map(
                                (jobCategory) => ({
                                  value: jobCategory.id,
                                  label: jobCategory.title,
                                })
                              )}
                              label="Category"
                              placeholder="Category"
                              className={`${styles.category_select}`}
                            />
                          </Grid>
                          <Grid item className="mb-2 ">
                            <SelectInput
                              value={location}
                              onChange={handleLocationChange}
                              options={countries.data.map((country) => ({
                                value: country.id,
                                label: country.title,
                              }))}
                              label="Location"
                              placeholder={"Location"}
                              className={`${styles.location_select}`}
                            />
                            {/* {message && (
                            <p
                              style={{
                                color: "#eea23d",
                                fontWeight: "300",
                                fontFamily: "Poppins",
                                fontSize: "14px",
                              }}
                            >
                              Please fill the search value.
                            </p>
                          )} */}
                          </Grid>
                          <Grid item className="mb-2">
                            <Button
                              fullWidth
                              variant="contained"
                              type="submit"
                              className={styles.home_btn_btn}
                              sx={{
                                "@media (max-width: 700px)": {
                                  width: "100% !important",
                                },
                              }}
                            >
                              Search
                            </Button>
                          </Grid>
                        </Grid>
                      </form>
                    </Box>
                  </Container>
                </Box>
              </Box>
              <Container
                maxWidth={false}
                className={styles.ribbon_stack}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  position: "relative",
                  "@media(min-width:992px)": {
                    clipPath: "ellipse(55% 55% at 50% 45%)",
                    marginBottom: "10rem",
                    paddingLeft: "100px",
                    paddingRight: "100px",
                    background: "#e4f0ff",
                  },
                }}
              >
                <div className={styles.ribbon_fix}></div>
                {role !== USER_ROLES.jobSeeker && role !== USER_ROLES.vendor ? (
                  <Stack
                    direction={"row"}
                    alignItems={"center"}
                    spacing={2}
                    justifyContent={"center"}
                    maxWidth={550}
                    sx={{
                      paddingBottom: "30px",
                      position: "relative",
                      zIndex: 1,
                    }}
                  >
                    <h5 className={styles.home_img_contents_h5}>
                      Post anytime, find qualified candidates & suppliers.
                      Connect with us!
                    </h5>
                    <Link
                      to={isLoggedIn ? "/employer/jobs/post" : "/login"}
                      className={styles.home_img_contents_p}
                      style={{ whiteSpace: "nowrap" }}
                    >
                      Post a job{" "}
                      <SVG.RightArrow className={styles.rightarrow} />
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
                "@media(min-width:992px)": {
                  paddingLeft: "100px",
                  paddingRight: "100px",
                },
              }}
            >
              <Box>
                <Stack
                  direction="row"
                  spacing={2}
                  className={styles.stack_box}
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                  }}
                >
                  <Typography className={styles.popular_job}>
                    Trending jobs
                  </Typography>
                  <Box
                    sx={{
                      marginLeft: "auto !important",
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "flex-end",
                    }}
                  >
                    <Typography
                      className={`ms-auto ${styles.see_all_jobs}`}
                      style={{
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        navigate("/search/jobs");
                      }}
                    >
                      See all {totalJobs} jobs{" "}
                      <IconButton>
                        <ArrowForwardIcon />
                      </IconButton>
                    </Typography>
                  </Box>
                </Stack>
              </Box>
              <Box sx={{ marginBottom: "100px" }}>
                <SlickSlider
                  items={topJobCategories
                    .filter((category) => category.categoryType === "job")
                    .map((category) => ({
                      icon: <SVG.Market />,
                      title:
                        (category?.title || "").length > 15
                          ? `${category.title.slice(0, 12)}...`
                          : category.title,
                      text: `${category.count || 0} jobs`,
                      id: category.id,
                      categoryType: category.categoryType,
                    }))}
                />
              </Box>
              <Box>
                <Stack
                  direction="row"
                  spacing={2}
                  className={styles.stack_box}
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                  }}
                >
                  <Typography className={styles.popular_job}>
                    Popular tenders
                  </Typography>
                  <Box
                    sx={{
                      marginLeft: "auto !important",
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "flex-end",
                    }}
                  >
                    <Typography
                      className={styles.see_all_jobs}
                      sx={{
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        navigate("/search/tenders");
                      }}
                    >
                      See all {totalTenders} Tenders{" "}
                      <IconButton>
                        <ArrowForwardIcon />
                      </IconButton>
                    </Typography>
                  </Box>
                </Stack>
              </Box>
              <Box>
                <SlickSlider
                  items={topJobCategories
                    .filter((category) => category.categoryType === "tender")
                    .map((category) => ({
                      icon: <SVG.Market />,
                      title:
                        (category?.title || "").length > 15
                          ? `${category.title.slice(0, 12)}...`
                          : category.title,
                      text: `${category.count || 0} tenders`,
                      id: category.id,
                      categoryType: category.categoryType,
                    }))}
                />
                <Divider
                  sx={{
                    marginTop: "110px",
                    "@media(max-width:992px)": { marginTop: "24px" },
                  }}
                />
              </Box>
              <Box sx={{ width: "100%" }}>
                <Typography
                  className={`${styles.first_heading}`}
                  sx={{ mb: 4 }}
                >
                  Listings from the top institutions
                </Typography>
                <Grid
                  container
                  spacing={{ xs: 2, lg: 10 }}
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                >
                  {(topListingCompanies || []).map((item, key) => {
                    return (
                      <>
                        <Grid key={{ key }} item xs={4} lg={1.5} sm={1}>
                          <img
                            src={generateFileUrl(item.logo.path)}
                            alt="img"
                            className={`${styles.mintra}`}
                          />
                        </Grid>
                      </>
                    );
                  })}
                </Grid>
              </Box>
            </Container>
            <Box className={`${styles.home_back}`}>
              <Box className={`${styles.home_powerfull_box}`}>
                <Box>
                  <h3 className={styles.home_powerfull_h3}>
                    A Powerful Platform for Everyone!
                  </h3>
                  <p className={styles.home_powerfull_p}>
                    At Koor, we foster an inclusive ecosystem where employers,
                    job seekers, and vendors connect. Our robust platform meets
                    the diverse needs of all users. Join us today!
                  </p>
                </Box>
                <Box className={styles.home_new_job_box} useflexGap>
                  <Box className={`${styles.new_jobs}`}>
                    <h2>{siteUpdates.jobs}</h2>
                    <p>New jobs posted today</p>
                  </Box>
                  <Box className={`${styles.new_jobs}`}>
                    <h2>{siteUpdates.employer}</h2>
                    <p>Employers are hiring now</p>
                  </Box>
                  <Box className={`${styles.new_jobs}`}>
                    <h2>{siteUpdates.tenders}</h2>
                    <p>Tenders are currently active</p>
                  </Box>
                </Box>
              </Box>
              {Boolean(testimonialList.length) > 0 && (
                <Box className={styles.home_testi_box}>
                  <Container
                    maxWidth={false}
                    sx={{
                      "@media(min-width:992px)": {
                        paddingLeft: "100px",
                        paddingRight: "100px",
                      },
                    }}
                  >
                    <TestimonialSlider testimonialList={testimonialList} />
                  </Container>
                </Box>
              )}
              <Box
                marginTop={Boolean(testimonialList.length) > 0 ? "0px" : "60px"}
              >
                <TextSlide />
              </Box>
              <Box className={styles.stay_back_img} sx={{ marginTop: "50px" }}>
                <Container
                  maxWidth={false}
                  sx={{
                    "@media(min-width:992px)": {
                      paddingLeft: "100px",
                      paddingRight: "100px",
                    },
                  }}
                >
                  <Grid container spacing={3}>
                    <Grid item xs={12} lg={5} md={7} sm={6}>
                      <Box className={styles.stay_text_box}>
                        <h4>Mobile app</h4>
                        <h2>Stay Connected with us!</h2>
                        <p>
                          Download our app to your smartphone today! Whether you
                          are an employer, jobseekers, or vendors, you'll find
                          great value in using our app. Enjoy instant
                          notifications for real-time updates and insights.
                        </p>
                        <Box
                          className={styles.stay_social_icon}
                          sx={{
                            "@media (max-width:480px)": {
                              "& img": { width: "45%" },
                            },
                          }}
                        >
                          <Box className={styles.about_social}>
                            <Link to="/" onClick={handleCommingSoon}>
                              <img
                                src={IMAGES.Googleplay}
                                rel="nofollow"
                                alt="img"
                              />
                            </Link>
                            <Link
                              to="/"
                              onClick={handleCommingSoon}
                              className="mx-3"
                            >
                              <img
                                src={IMAGES.Appstore}
                                rel="nofollow"
                                alt="img"
                              />
                            </Link>
                          </Box>
                        </Box>
                      </Box>
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      lg={7}
                      md={5}
                      sm={6}
                      sx={{
                        padding: "0px 0px",
                        marginBottom: "-5px",
                        "@media (max-width:480px)": {
                          padding: "0px 0px 0px",
                        },
                      }}
                    >
                      <img
                        src={IMAGES.MobileApp2}
                        alt=""
                        className={styles.appview}
                        rel="nofollow"
                      />
                      <img
                        src={IMAGES.MobileApp}
                        alt=""
                        className={styles.mobile_appview}
                        rel="nofollow"
                      />
                    </Grid>
                  </Grid>
                </Container>
              </Box>
            </Box>
          </Box>
          <DialogBox open={openDialog} handleClose={() => setOpenDialog(false)}>
            <Box
              sx={{
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
                width: "100%",
                textDecoration: "capitalize",
                color: "#eea23d",
              }}
            >
              <h2 className="mb-4">Stay In Touch</h2>
              <h1 className="mb-4" style={{ color: "#000" }}>
                Mobile App Is Coming Soon!
              </h1>
            </Box>
          </DialogBox>
        </div>
      </div>
    </>
  );
};

export default Home;

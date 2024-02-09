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
import { Capacitor } from "@capacitor/core";
import DialogBox from "../../components/dialogBox";
const platform = Capacitor.getPlatform();

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

    // Check if required fields are filled
    if (!searchValue && !categories && !location) {
      setMessage(true); // Show a general message that at least one field is required
      return;
    }
    // Clear any previous errors
    setMessage(false);

    // Navigate to the search page with the provided parameters
    navigate(
      `/search/jobs?search=${searchValue}&categories=${categories}&location=${location}`,
    );
  };
  // const getTopJobCategories = async () => {
  //    const res = await getTopJobCategoriesAPI();
  //    if (res.remote === "success") {
  //      setTopJobCategories(res.data.job_categories);
  //      setTotalJobs(res.data.total_jobs);
  //    }
  //  };
  //  const getTopTenderCategories = async () => {
  //    const res = await getTopTenderCategoriesAPI();
  //    if (res.remote === "success") {
  //      setTopTenderCategories(res.data.tender_categories);
  //      setTotalTenders(res.data.total_tenders);
  //    }
  //  };
  const getTopJobCategories = async () => {
    const res = await getTopJobCategoriesAPI();
    if (res.remote === "success") {
      const displayValue =
        res.data.total_jobs > 100
          ? `${Math.ceil(res.data.total_jobs / 100) * 100}+`
          : res.data.total_jobs;
      const jobsrCategoriesWithTypes = res.data.job_categories.map(
        (jobCategories) => ({
          ...jobCategories,
          categoryType: "job",
        }),
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
          ? `${Math.ceil(res.data.total_tenders / 100) * 100}+`
          : res.data.total_tenders;

      const tenderCategoriesWithTypes = res.data.tender_categories.map(
        (tenderCategory) => ({
          ...tenderCategory,
          categoryType: "tender",
        }),
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
    <div>
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
                marginTop:
                  platform === "android" || platform === "ios" ? "0px" : "68px",
                "@media (max-width:992px)": {
                  marginTop:
                    platform === "android" || platform === "ios"
                      ? "0px"
                      : "60px",
                },
              }}
            >
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
                  <Box
                    className={styles.headding}
                    sx={{
                      paddingTop: "26%",
                      // "@media(max-width:992px)": { paddingTop: "40%" },
                      // "@media(max-width:480px)": { paddingTop: "90%" },
                    }}
                  >
                    <h2>Find your dream job</h2>
                    <h5 className="mb-5">
                      Search for the best opportunities in your area
                    </h5>
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
                            options={jobCategories.data.map((jobCategory) => ({
                              value: jobCategory.id,
                              label: jobCategory.title,
                            }))}
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
                            style={{ width: "100%" }}
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
              sx={{
                "@media(min-width:992px)": {
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
                  sx={{
                    padding: "40px 0px",
                    position: "relative",
                    zIndex: 1,
                  }}
                >
                  <h5 className={styles.home_img_contents_h5}>
                    Are you an employer looking for applicants <br /> to fill
                    your job openings fast?
                  </h5>
                  <Link
                    to={isLoggedIn ? "/employer/jobs/post" : "/login"}
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
              "@media(min-width:992px)": {
                paddingLeft: "100px",
                paddingRight: "100px",
              },
            }}
          >
            <Box sx={{ width: "100%" }}>
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
                {(topListingCompanies || []).map((item, key) => {
                  return (
                    <>
                      <Grid key={{ key }} item xs={4} lg={2} sm={1}>
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
              <Divider
                sx={{
                  marginTop: "110px",
                  "@media(max-width:992px)": { marginTop: "24px" },
                }}
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
                  Popular job categories
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
                    style={{
                      cursor: "pointer",
                      marginRight: "8em",
                    }}
                    onClick={() => {
                      navigate("/search/tenders");
                    }}
                  >
                    See all {totalTenders} Tenders{" "}
                    <IconButton>
                      <ArrowForwardIcon sx={{ color: "#eea23d" }} />
                    </IconButton>
                  </Typography>

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
                      <ArrowForwardIcon sx={{ color: "#eea23d" }} />
                    </IconButton>
                  </Typography>
                </Box>
              </Stack>
            </Box>
          </Container>

          <Container
            maxWidth={false}
            sx={{
              "@media(min-width:992px)": {
                paddingLeft: "100px",
                paddingRight: "100px",
              },
            }}
          >
            <SlickSlider
              items={topJobCategories.map((category) => ({
                icon: <SVG.Market />,
                title:
                  (category?.title || "").length > 15
                    ? `${category.title.slice(0, 12)}...`
                    : category.title,
                text: `${category.count || 0} ${
                  category.categoryType === "tender" ? "tenders" : "jobs"
                }`,
                id: category.id,
                categoryType: category.categoryType,
              }))}
            />
            {/* <Box> */}
            {/*   <Stack direction="row" spacing={2} className={styles.stack_box}> */}
            {/*     <Typography className={styles.popular_job}> */}
            {/*       Popular Tenders categories */}
            {/*     </Typography> */}
            {/*     <Typography */}
            {/*       className={`ms-auto ${styles.see_all_jobs}`} */}
            {/*       style={{ */}
            {/*         cursor: "pointer", */}
            {/*       }} */}
            {/*       onClick={() => { */}
            {/*         navigate("/search/tenders"); */}
            {/*       }} */}
            {/*     > */}
            {/*       See all {totalTenders} Tenders{" "} */}
            {/*       <IconButton> */}
            {/*         <ArrowForwardIcon sx={{ color: "#eea23d" }} /> */}
            {/*       </IconButton> */}
            {/*     </Typography> */}
            {/*   </Stack> */}
            {/* </Box> */}
            {/* <SlickSlider */}
            {/*   categoryType="tenders" */}
            {/*   items={topTenderCategories.map((category) => ({ */}
            {/*     icon: <SVG.Market />, */}
            {/*     title: */}
            {/*       (category?.title || "").length > 15 */}
            {/*         ? `${category.title.slice(0, 12)}...` */}
            {/*         : category.title, */}
            {/*     text: `${category.count || 0} tenders`, */}
            {/*     id: category.id, */}
            {/*   }))} */}
            {/* /> */}
          </Container>

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
              <Box className={styles.home_new_job_box} useflexGap>
                <Box className={`${styles.new_jobs}`}>
                  <h2>{siteUpdates.jobs}</h2>
                  <p>New jobs posted every day</p>
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
          <div className="add-content">
            <h2 className="mb-4">Mobile App Is Coming Soom!</h2>
          </div>
        </DialogBox>
      </div>
    </div>
  );
};

export default Home;

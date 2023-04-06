import { IMAGES } from "@assets/images";
import { Box, Button, Divider, Stack, Typography } from "@mui/material";
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
          <Box sx={{ marginTop: "68px" }}>
            <Box className={`${styles.back_img_div}`}>
              <Container>
                <Box>
                  <h2 className={styles.home_banner_heading}>
                    Find your dream job
                  </h2>
                  <h5 className={styles.home_banner_heading_h5}>
                    Search for the best opportunities in your area
                  </h5>
                </Box>
                <Box className={styles.input_select_btn_box}>
                  <Box className={styles.inputsearch_home}>
                    <InputSearch
                      onChange={(e) => setSearchValue(e.target.value)}
                    />
                  </Box>
                  <div>
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
                  </div>
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
                  <Button
                    variant="contained"
                    className={styles.home_btn_btn}
                    onClick={() => {
                      navigate(
                        `/job-search?search=${searchValue}&categories=${categories}&location=${location}`
                      );
                    }}
                  >
                    Search
                  </Button>
                </Box>
                {role !== USER_ROLES.jobSeeker && role !== USER_ROLES.vendor ? (
                  <Box className={styles.home_img_contents}>
                    <h5 className={styles.home_img_contents_h5}>
                      Are you an employer looking for applicants <br /> to fill
                      your job openings fast?
                    </h5>
                    <Link
                      to="/employer/jobs/post"
                      className={styles.home_img_contents_p}
                    >
                      Post a job{" "}
                      <SVG.RightArrow className={styles.rightarrow} />
                    </Link>
                  </Box>
                ) : (
                  ""
                )}
              </Container>
            </Box>
          </Box>
          <Container>
            <Box>
              <Typography className={`${styles.first_heading}`}>
                Listings from the top companies
              </Typography>
              <Box className={`${styles.social_img}`}>
                <img
                  src={IMAGES.Mintra}
                  alt="img"
                  className={`${styles.mintra}`}
                />
                <img
                  src={IMAGES.Amazon}
                  alt="img"
                  className={`${styles.amazon}`}
                />
                <img src={IMAGES.Dhl} alt="img" className={`${styles.dhl}`} />
                <img
                  src={IMAGES.Binance}
                  alt="img"
                  className={`${styles.binance}`}
                />
                <img
                  src={IMAGES.Dominos}
                  alt="img"
                  className={`${styles.dominos}`}
                />
                <img
                  src={IMAGES.Lingo}
                  alt="img"
                  className={`${styles.lingo}`}
                />
              </Box>
              <Divider className={styles.divider_line} />
            </Box>
            <Box>
              <Stack direction="row" spacing={2} className={styles.stack_box}>
                <Typography className={styles.popular_job}>
                  Popular job categories
                </Typography>
                <Typography className={`ms-auto ${styles.see_all_jobs}`}>
                  See all 4590 jobs
                </Typography>
              </Stack>
              <Box>
                <SlickSlider />
              </Box>
            </Box>
          </Container>
          <Box>
            <HomeSection />
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
              <VerticalSlider />
            </Box>
            <Box>
              <TextSlide />
            </Box>
            <Box className={styles.stay_back_img}>
              <Box className={styles.stay_text_box}>
                <h4>Mobile app</h4>
                <h2>Stay in touch</h2>
                <p>
                  Meet our app right in your smartphone! Whether you’re a
                  jobseeker, employer or vendor – you’ll get a lot of benefits
                  of using the app. Get instant notifications and stay in touch
                  with prospects.
                </p>
                <Box className={styles.stay_social_icon}>
                  <img src={IMAGES.Googleplay} alt="" />
                  <img src={IMAGES.Appstore} alt="" className="mx-3" />
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </div>
    </>
  );
};

export default Home;

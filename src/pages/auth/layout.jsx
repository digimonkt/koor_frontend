/* eslint-disable react/display-name */
import { Box, Container, Grid, IconButton, Stack } from "@mui/material";
import { SVG } from "@assets/svg";
import { Card, CardContent } from "@components/card";
import { USER_ROLES } from "@utils/enum";
import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUserRole } from "@redux/slice/user";
import { processRoleToDisplay } from "@utils/constants/utility";
import { loginWithGooglePopupProvider } from "@firebaseProvider/auth";
import { setErrorToast } from "@redux/slice/toast";
import { SocialLoginAPI } from "@api/user";
import {
  loginWithAppleFacebookPopupProvider,
  loginWithFacebookPopupProvider,
} from "src/firebaseProvider/auth";
import Marquee from "react-fast-marquee";

const AuthOptions = [
  {
    id: "jobSeeker",
    title: "Individual Job Seeker",
    role: USER_ROLES.jobSeeker,
    subtitle: "I'm searching for a job",
  },
  {
    id: "employer",
    title: "Employer",
    role: USER_ROLES.employer,
    subtitle: "I'm looking for talents to join our team",
  },
  {
    id: "vendor",
    title: "Vendor",
    role: USER_ROLES.vendor,
    subtitle: "I'm searching for tenders",
  },
];

function AuthLayout({
  title,
  subTitle,
  btnTitle,
  selectedRoleTitle,
  children,
  isRoleSelection,
  options,
}) {
  return function () {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { role, verifyEmail } = useSelector((state) => state.auth);
    const [isLoginPage, setIsLoginPage] = useState(false);
    const [loading, setLoading] = useState(false);

    const loginWithGoogle = async () => {
      if (!role) {
        dispatch(setErrorToast("Select Role"));
        return;
      }
      setLoading(false);
      const res = await loginWithGooglePopupProvider();
      if (res.remote === "success") {
        const payload = {
          email: res.data.email,
          role,
          name: res.data.displayName,
          display_image: res.data.photoURL,
          source: "google",
        };
        for (const key in payload) {
          if (!payload[key]) {
            delete payload[key];
          }
        }
        const result = await SocialLoginAPI(payload);
        if (result.remote === "success") {
          console.log({ result });
        } else {
          console.log({ result });
        }
      }
      setLoading(true);
    };
    const loginWithApple = async () => {
      if (!role) {
        dispatch(setErrorToast("Select Role"));
        return;
      }
      setLoading(false);
      const res = await loginWithAppleFacebookPopupProvider();
      console.log({ apple: res });
      if (res.remote === "success") {
        const payload = {
          email: res.data.email,
          role,
          name: res.data.displayName,
          display_image: res.data.photoURL,
          source: "apple",
        };
        for (const key in payload) {
          if (!payload[key]) {
            delete payload[key];
          }
        }
        const result = await SocialLoginAPI(payload);
        if (result.remote === "success") {
          console.log({ result });
        } else {
          console.log({ result });
        }
      }
      setLoading(true);
    };
    const loginWithFacebook = async () => {
      if (!role) {
        dispatch(setErrorToast("Select Role"));
        return;
      }
      setLoading(false);
      const res = await loginWithFacebookPopupProvider();
      console.log({ FacebooK: res });
      if (res.remote === "success") {
        // const payload = {
        //   email: res.data.email,
        //   role,
        //   name: res.data.displayName,
        //   display_image: res.data.photoURL,
        //   source: "facebook",
        // };
        // const result = await SocialLoginAPI(payload);
        // if (result.remote === "success") {
        //   console.log({ result });
        // } else {
        //   console.log({ result });
        // }
      }
      setLoading(true);
    };

    useEffect(() => {
      setIsLoginPage(location.pathname === "/login");
    }, [location.pathname]);
    useEffect(() => {
      const url = new URL(window.location.href);
      const role = url.searchParams.get("role");
      if (Object.values(USER_ROLES).includes(role)) {
        dispatch(setUserRole(role));
      }
    }, [dispatch, location.pathname, location.search, navigate]);
    return (
      <div
        className={`register pb-0 pt-5 py-lg-5 ${
          role === USER_ROLES.employer || role === USER_ROLES.vendor
            ? "vendor"
            : ""
        }`}
      >
        <Container
          sx={{
            "@media(max-width:992px)": {
              padding: "0px",
            },
          }}
        >
          <Box
            sx={{
              fontFamily: "Bahnschrift",
              textAlign: "center",
              marginBottom: "25px",
              color: "#fff",
              "& h5": { fontSize: "40px", color: "#fff", margin: "0px" },
              "& p": { fontSize: "16px", margin: "0px" },
              "@media(min-width:992px)": {
                display: "none",
              },
            }}
          >
            <h5>Welcome!</h5>
            <p>I want to register as...</p>
          </Box>
          <Box
            sx={{
              "@media(max-width:992px)": {
                overflow: "hidden",
              },
            }}
          >
            <Box
              sx={{
                marginTop: "50%",
                opacity: 0.2,
                "@media(max-width:992px)": {
                  marginTop: "0%",
                },
                "@media(min-width:992px)": {
                  display: "none",
                },
              }}
            >
              <Marquee
                play={true}
                speed={100}
                gradient={false}
                direction="left"
                className="marquee"
              >
                <h1>Register</h1>
                <h1>Search</h1>
                <h1>Apply</h1>
                <h1>Work</h1>
              </Marquee>
            </Box>
          </Box>
          <Grid container>
            <Grid
              item
              md={5}
              sx={{
                "@media(max-width:992px)": {
                  width: "100%",
                },
              }}
            >
              <Card>
                <CardContent
                  sx={{
                    padding: `75px 60px ${!role ? "!important" : ""}`,
                    "@media(max-width:992px)": {
                      padding: `25px ${!role ? "!important" : ""}`,
                    },
                  }}
                >
                  {isRoleSelection && !role ? (
                    <div className="content-box">
                      <Box
                        sx={{
                          "@media(max-width:992px)": {
                            display: "none",
                          },
                        }}
                      >
                        <h5 data-cy="title">{title}</h5>
                        <p data-cy="subTitle">{subTitle}</p>
                      </Box>
                      <div className="register-des mt-4" data-cy="authOptions">
                        {AuthOptions.map((option) => {
                          return (
                            <Link
                              data-cy={`role-${option.role}`}
                              key={option.id}
                              to={`?role=${option.role}`}
                            >
                              <Stack
                                direction="row"
                                spacing={2}
                                alignItems="center"
                                justifyContent="space-between"
                              >
                                <Stack
                                  direction="column"
                                  spacing={0}
                                  className="register-title"
                                >
                                  <h6>{option.title}</h6>
                                  <span>{option.subtitle}</span>
                                </Stack>
                                <span>
                                  <SVG.ArrowIcon />
                                </span>
                              </Stack>
                            </Link>
                          );
                        })}
                        <Box
                          sx={{
                            color: "#848484",
                            fontFamily: "Poppins",
                            fontSize: "14px",
                            marginTop: "50px",
                            textAlign: "center",
                            "@media(min-width:992px)": {
                              display: "none",
                            },
                          }}
                        >
                          Already have an account?{" "}
                          <Link
                            to="/login"
                            style={{ color: "#EEA23D", fontWeight: "600" }}
                          >
                            Log in
                          </Link>
                        </Box>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="content-box mb-3">
                        <h5
                          style={{
                            fontSize: selectedRoleTitle.includes("@email")
                              ? "35px"
                              : "none",
                          }}
                        >
                          <IconButton
                            onClick={() => navigate(-1)}
                            sx={{
                              padding: "0px",
                              marginRight: "10px",
                              "@media(min-width:992px)": {
                                display: "none",
                              },
                            }}
                          >
                            <SVG.BackArrow />
                          </IconButton>
                          {selectedRoleTitle
                            .replace("@role", processRoleToDisplay(role))
                            .replace("@email", verifyEmail)}
                        </h5>
                      </div>
                      {children}
                      {!options || role === USER_ROLES.employer ? null : (
                        <>
                          <div className="spaceor mt-5 mb-4">
                            <span>Or continue with</span>
                          </div>
                          <div className="icon-social">
                            <Stack
                              direction="row"
                              spacing={2}
                              justifyContent="center"
                            >
                              <div
                                onClick={loginWithGoogle}
                                disabled={loading}
                                style={{ cursor: "pointer" }}
                              >
                                <SVG.Google />
                              </div>
                              <div
                                onClick={loginWithApple}
                                disabled={loading}
                                style={{ cursor: "pointer" }}
                              >
                                <SVG.Apple />
                              </div>
                              <div
                                onClick={loginWithFacebook}
                                disabled={loading}
                                style={{ cursor: "pointer" }}
                              >
                                <SVG.Facebook />
                              </div>
                            </Stack>
                          </div>
                        </>
                      )}

                      {btnTitle && (
                        <div className={"bottombar mt-5"}>
                          <span>Already have an account?</span>
                          <div
                            onClick={() => {
                              dispatch(setUserRole(""));
                              navigate(isLoginPage ? "/register" : "/login");
                            }}
                            style={{
                              color:
                                role === USER_ROLES.jobSeeker
                                  ? "#EEA23D"
                                  : "#274593",
                              cursor: "pointer",
                            }}
                          >
                            {isLoginPage ? "Register" : "Login"}
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </CardContent>
              </Card>
            </Grid>
            <Grid
              md={7}
              sx={{
                "@media(max-width:992px)": {
                  overflow: "hidden",
                },
              }}
            >
              <Box
                sx={{
                  marginTop: "50%",
                  opacity: 0.2,
                  "@media(max-width:992px)": {
                    marginTop: "0%",
                    display: "none",
                  },
                }}
              >
                <Marquee
                  play={true}
                  speed={100}
                  gradient={false}
                  direction="left"
                  className="marquee"
                >
                  <h1>Register</h1>
                  <h1>Search</h1>
                  <h1>Apply</h1>
                  <h1>Work</h1>
                </Marquee>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </div>
    );
  };
}

export default AuthLayout;

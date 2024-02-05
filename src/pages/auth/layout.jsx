/* eslint-disable react/display-name */
import { Box, Container, Grid, IconButton, Stack } from "@mui/material";
import { SVG } from "../../assets/svg";
import { Card, CardContent } from "../../components/card";
import { USER_ROLES } from "../../utils/enum";
import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setSocialLoginError, setUserRole } from "../../redux/slice/user";
import { processRoleToDisplay } from "../../utils/constants/utility";
import { loginWithGooglePopupProvider } from "@firebaseProvider/auth";
import { setErrorToast } from "../../redux/slice/toast";
import { SocialLoginAPI } from "../../api/user";
import {
  loginWithAppleFacebookPopupProvider,
  loginWithFacebookPopupProvider,
} from "src/firebaseProvider/auth";
import Marquee from "react-fast-marquee";
import { Capacitor } from "@capacitor/core";
// eslint-disable-next-line
import { OAuth2Client } from "@byteowls/capacitor-oauth2";

const platform = Capacitor.getPlatform();
const AuthOptions = [
  {
    id: "jobSeeker",
    title: "Individual jobseeker",
    role: USER_ROLES.jobSeeker,
    subtitle: "I'm searching for a job",
  },
  {
    id: "employer",
    title: "Employer",
    role: USER_ROLES.employer,
    subtitle: "I’m looking for talents to join our team",
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
    const { role, verifyEmail, userVerificationToken } = useSelector(
      (state) => state.auth
    );
    const [accessToken, setAccessToken] = useState("");
    const [refreshToken, setRefreshToken] = useState("");

    const [isLoginPage, setIsLoginPage] = useState(false);
    const [loading, setLoading] = useState(false);
    const [activationLabel, setActivationLabel] = useState(selectedRoleTitle);
    const loginWithGoogle = async () => {
      if (!role) {
        dispatch(setErrorToast("Select Role"));
        return;
      }
      setLoading(false);
      if (platform === "android") {
        try {
          // GoogleAuth.initialize({
          //   scopes: ["profile", "email"],
          //   serverClientId:
          //     "902039448819-246pitulvdq9vcu6f32e785c3ncrs4s6.apps.googleusercontent.com",
          //   forceCodeForRefreshToken: true,
          // });
          // console.log(GoogleAuth);
          OAuth2Client.authenticate({
            authorizationBaseUrl: "https://accounts.google.com/o/oauth2/auth",
            accessTokenEndpoint: "https://www.googleapis.com/oauth2/v4/token",
            scope: "email profile",
            resourceUrl: "https://localhost:8100",
            logsEnabled: true,
            web: {
              appId: "org.reactjs.example.koor",
              responseType: "token", // implicit flow
              accessTokenEndpoint: "", // clear the tokenEndpoint as we know that implicit flow gets the accessToken from the authorizationRequest
              redirectUrl: "http://localhost:4200",
              windowOptions: "height=600,left=0,top=0",
            },
            android: {
              appId: "org.reactjs.example.koor",
              responseType: "code", // if you configured a android app in google dev console the value must be "code"
              redirectUrl: "com.companyname.appname:/", // package name from google dev console
            },
            ios: {
              appId: "org.reactjs.example.koor",
              responseType: "code", // if you configured a ios app in google dev console the value must be "code"
              redirectUrl: "com.companyname.appname:/", // Bundle ID from google dev console
            },
          })
            .then((response) => {
              setAccessToken(response["access_token"]); // storage recommended for android logout
              setRefreshToken(response["refresh_token"]);
              console.log({ accessToken, refreshToken });
              // only if you include a resourceUrl protected user values are included in the response!
              const oauthUserId = response["id"];
              const name = response["name"];

              console.log(name, response, oauthUserId);
            })
            .catch((reason) => {
              console.error("OAuth rejected", reason);
            });
          const googleUser = await loginWithGooglePopupProvider();
          console.log(googleUser);
        } catch (error) {
          console.error("GoogleAuth.signIn failed", error);
        }
      } else {
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
          console.log({ payload });
          const result = await SocialLoginAPI(payload);
          if (result.remote === "success") {
            console.log({ result });
          } else {
            dispatch(setSocialLoginError(result.error.errors.message));
          }
        }
        setLoading(true);
      }
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
          dispatch(setSocialLoginError(result.error.errors.message));
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
      // console.log({ FacebooK: res });
      if (res.remote === "success") {
        const payload = {
          email: res.data.email,
          role,
          name: res.data.displayName,
          display_image: res.data.photoURL,
          social_login_id: res.data.uid,
          source: "facebook",
        };
        const result = await SocialLoginAPI(payload);
        if (result.remote === "success") {
          // console.log({ result });
        } else {
          dispatch(setSocialLoginError(result.error.errors.message));
        }
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
      dispatch(setSocialLoginError(""));
    }, [dispatch, location.pathname, location.search, navigate]);
    useEffect(() => {
      if (userVerificationToken) {
        setActivationLabel(
          "Please wait while we are validating activation Link"
        );
      } else {
        setActivationLabel(selectedRoleTitle);
      }
    }, [userVerificationToken]);
    return (
      <div
        className={`register pb-0 py-lg-5 registerApp ${
          role === USER_ROLES.employer || role === USER_ROLES.vendor
            ? "vendor appbg"
            : ""
        } ${platform === "android" || platform === "ios" ? "mt-0" : "pt-5"}`}
      >
        <Container
          sx={{
            "@media(max-width:480px)": {
              padding: "0px",
            },
            "@media(min-width:992px)": {
              paddingLeft: "100px",
              paddingRight: "100px",
            },
          }}
          maxWidth={false}
        >
          <Box
            sx={{
              fontFamily: "Bahnschrift",
              textAlign: "center",
              padding:
                platform === "android" || platform === "ios"
                  ? "142px 0px 60px"
                  : "50px 0px 40px",
              color: "#fff",
              "& h5": { fontSize: "40px", color: "#fff", margin: "0px" },
              "& p": { fontSize: "16px", margin: "0px" },
              "@media(min-width:600px)": {
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
              sm={7}
              xs={12}
              // sx={{
              //   "@media(max-width:992px)": {
              //     width: "100%",
              //   },
              // }}
            >
              <Card
                sx={{
                  position: "relative",
                  zIndex: 2,
                  borderRadius: "25px",
                  "@media(max-width:992px)": {
                    marginBottom: "100px",
                  },
                  "@media(max-width:480px)": {
                    borderRadius: "25px 25px 0px 0px",
                    marginBottom: "0px !important",
                    minHeight: "423px",
                  },
                }}
              >
                <CardContent
                  sx={{
                    padding: `75px 60px ${!role ? "!important" : ""}`,
                    "@media(max-width:992px)": {
                      padding: `25px 20px ${!role ? "!important" : ""}`,
                    },
                  }}
                >
                  {isRoleSelection && !role ? (
                    <div className="content-box">
                      <Box
                        sx={{
                          "@media(max-width:600px)": {
                            display: "none",
                          },
                        }}
                      >
                        <h5 data-cy="title">{title}</h5>
                        <p data-cy="subTitle">{subTitle}</p>
                      </Box>
                      <div
                        className={`register-des ${
                          platform === "android" || platform === "ios"
                            ? "register-app"
                            : ""
                        }`}
                        data-cy="authOptions"
                      >
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
                                <span>{!isLoginPage && <SVG.ArrowIcon />}</span>
                              </Stack>
                            </Link>
                          );
                        })}
                        {platform === "android" || platform === "ios" ? (
                          <>
                            <Box
                              sx={{
                                marginTop: "80px",
                                textAlign: "center",
                                color: "#848484",
                                fontSize: "14px",
                                fontWeight: "400",
                                letterSpacing: " 0.14px",
                                fontFamily: "Poppins",
                              }}
                            >
                              Already have an account?{" "}
                              <Link
                                href="#"
                                style={{ color: "#EEA23D", fontWeight: "600" }}
                              >
                                Log in
                              </Link>
                            </Box>
                            <Box
                              sx={{
                                textAlign: "center",
                                marginTop: "12px",
                                "& span": {
                                  display: "inline-block",
                                  width: "100px",
                                  height: "4px",
                                  background: "#121212",
                                },
                              }}
                            >
                              <span></span>
                            </Box>
                          </>
                        ) : (
                          ""
                        )}
                        {/* <Box
                          sx={{
                            color: "#848484",
                            fontFamily: "Poppins",
                            fontSize: "14px",
                            marginTop: "50px",
                            textAlign: "center",
                            "@media(max-width:992px)": {
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
                        </Box> */}
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="content-box mb-3">
                        <h5
                        // style={{
                        //   fontSize: selectedRoleTitle.includes("@email")
                        //     ? "24px"
                        //     : "none",
                        // }}
                        >
                          {platform === "android" || platform === "ios" ? (
                            <IconButton
                              onClick={() => {
                                dispatch(setUserRole(""));
                                navigate(-1);
                              }}
                            >
                              <SVG.BackArrow />
                            </IconButton>
                          ) : null}

                          {activationLabel
                            .replace("@role", processRoleToDisplay(role))
                            .replace("@email", verifyEmail)}
                        </h5>
                      </div>
                      {children}
                      {!options || role === USER_ROLES.employer ? null : (
                        <>
                          <div className="spaceor mb-4">
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
                                style={{
                                  cursor: "pointer",
                                  border: "1px solid #CACACA",
                                  borderRadius: "16px",
                                  width: "50px",
                                  height: "50px",
                                  padding: "10px",
                                }}
                              >
                                <SVG.Facebook width={30} height={30} />
                              </div>
                            </Stack>
                          </div>
                        </>
                      )}

                      {btnTitle && (
                        <div className={"bottombar mt-5"}>
                          <span>
                            {isLoginPage
                              ? "Don't have an account?"
                              : "Already have an account?"}
                          </span>
                          <div
                            onClick={() => {
                              dispatch(setUserRole(""));
                              navigate(isLoginPage ? "/register" : "/login");
                            }}
                            style={{
                              color:
                                role === USER_ROLES.jobSeeker
                                  ? "#eea23d"
                                  : "#274593",
                              cursor: "pointer",
                              marginLeft: "5px",
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
              sm={7}
              xs={12}
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

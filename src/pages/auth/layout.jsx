/* eslint-disable react/display-name */
import { Container, Grid, Stack } from "@mui/material";
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
import { loginWithFacebookPopupProvider } from "src/firebaseProvider/auth";

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
        //   source: "google",
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
        className={`register py-5 ${
          role === USER_ROLES.employer || role === USER_ROLES.vendor
            ? "vendor"
            : ""
        }`}
      >
        <Container>
          <Grid container>
            <Grid item md={8}>
              <Card>
                <CardContent
                  sx={{
                    padding: `75px 60px ${!role ? "!important" : ""}`,
                  }}
                >
                  {isRoleSelection && !role ? (
                    <div className="content-box">
                      <h5 data-cy="title">{title}</h5>
                      <p data-cy="subTitle">{subTitle}</p>
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
                              <div onClick={loginWithGoogle} disabled={loading}>
                                <SVG.Google />
                              </div>
                              <div disabled={loading}>
                                <SVG.Apple />
                              </div>
                              <div
                                onClick={loginWithFacebook}
                                disabled={loading}
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
                              navigate(isLoginPage ? "/" : "/login");
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
          </Grid>
        </Container>
      </div>
    );
  };
}

export default AuthLayout;

/* eslint-disable react-hooks/rules-of-hooks */
import { Container, Grid, Stack } from "@mui/material";
import { SVG } from "src/assets/svg";
import { Card, CardContent } from "src/components/card";
import { USER_ROLES } from "src/utils/enum";
import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import LoginForm from "src/pages/auth/loginForm";
import RegistrationForm from "src/pages/auth/registrationForm";
import { IMAGES } from "src/assets/images";
import { useAppDispatch, useAppSelector } from "src/redux/hooks";
import { setUserRole } from "src/redux/slice/auth";
import { RootState } from "src/redux/store";

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

function AuthLayout({ title, subTitle }) {
  return function () {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { role } = useAppSelector((state) => state.auth);
    const [isLoginPage, setIsLoginPage] = useState(false);
    useEffect(() => {
      setIsLoginPage(location.pathname === "/login");
    }, [location.pathname]);
    useEffect(() => {
      const url = new URL(window.location.href);
      const role = url.searchParams.get("role");
      if (Object.values(USER_ROLES).includes(role as USER_ROLES)) {
        dispatch(setUserRole(role as USER_ROLES));
      } else {
        dispatch(setUserRole(undefined));
        navigate(location.pathname);
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
                    padding: `50px 60px ${!role ? "!important" : ""}`,
                  }}
                >
                  {!role ? (
                    <div className="content-box">
                      <h5>{title}</h5>
                      <p>{subTitle}</p>
                      <div className="register-des mt-4">
                        {AuthOptions.map((option) => {
                          return (
                            <Link to={`?role=${option.role}`}>
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
                        <h5>
                          {isLoginPage ? "Log in" : "Register"} as {role}
                        </h5>
                      </div>
                      {isLoginPage ? (
                        <LoginForm role={role} />
                      ) : (
                        <RegistrationForm role={role} />
                      )}
                      {role === USER_ROLES.employer ? null : (
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
                              <Link to="!#">
                                <img src={IMAGES.GoogleBoxIcon} alt="" />
                              </Link>
                              <Link to="!#">
                                <img src={IMAGES.AppleBoxIcon} alt="" />
                              </Link>
                              <Link to="!#">
                                <img src={IMAGES.FacebookBoxIcon} alt="" />
                              </Link>
                            </Stack>
                          </div>
                        </>
                      )}

                      <div className={`bottombar mt-5`}>
                        <span>Already have an account?</span>
                        <Link
                          to={isLoginPage ? "/" : "/login"}
                          style={{
                            color:
                              role === USER_ROLES.jobSeeker
                                ? "#EEA23D"
                                : "#274593",
                          }}
                        >
                          {isLoginPage ? "Register" : "Login"}
                        </Link>
                      </div>
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

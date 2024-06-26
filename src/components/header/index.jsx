import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  FormControl,
  IconButton,
  MenuItem,
  Stack,
  useMediaQuery,
} from "@mui/material";
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { SearchCategory, SelectBox } from "./style";
import { FilledButton, OutlinedButton } from "../button";
import {} from "@capacitor/core";
import { SVG } from "../../assets/svg";
import { SEARCH_TYPE, USER_ROLES } from "../../utils/enum";
import { useDispatch, useSelector } from "react-redux";
import { setIsLoggedIn, setUserRole } from "../../redux/slice/user";
import NotificationPopup from "./notificationPopup";
import DialogBox from "../../components/dialogBox";
import { LogoutUserAPI } from "@api/user";
import { globalLocalStorage } from "@utils/localStorage";

// const ismenu = false;

function Header() {
  const [ismenu, setIsmenu] = useState(false);
  const [isMobileSearch, setIsMobileSearch] = useState(false);
  const mobileSearchToggle = () => {
    setIsMobileSearch(!isMobileSearch);
  };
  const dispatch = useDispatch();
  // navigate
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams({});

  const { role, isLoggedIn, currentUser } = useSelector((state) => state.auth);
  const [searchPlaceholder, setSearchPlaceholder] = useState("Jobs");
  const [search, setSearch] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [accountVerifiedWarning, setAccountVerifiedWarning] = useState(false);
  const [warningTrue, setWarningTrue] = useState(false);

  const userLogout = async () => {
    await LogoutUserAPI();
    globalLocalStorage.cleanLocalStorage();
  };
  const logoutHandle = () => {
    userLogout();
    dispatch(setIsLoggedIn(false));
  };
  useEffect(() => {
    switch (role) {
      case USER_ROLES.jobSeeker:
        setSearchPlaceholder("Jobs");
        setSearch(SEARCH_TYPE.jobs);
        break;
      case USER_ROLES.employer:
        setSearchPlaceholder("Vendors");
        setSearch(SEARCH_TYPE.talents);
        break;
      case USER_ROLES.vendor:
        setSearchPlaceholder("Tenders");
        setSearch(SEARCH_TYPE.tenders);
        break;
      default:
        break;
    }
  }, [role]);
  useEffect(() => {
    const search = searchParams.get("search");
    setSearchValue(search || "");
  }, [location.search]);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  const matches = useMediaQuery("(min-width: 600px) and (max-width: 1024px)");

  return (
    <header>
      <Container
        maxWidth={false}
        sx={{
          paddingLeft: "24px",
          paddingRight: "24px",
          "@media(min-width:992px)": {
            paddingLeft: "24px",
            paddingRight: "24px",
          },
        }}
      >
        <Stack
          direction="row"
          spacing={{ xs: 10, lg: 3 }}
          alignItems={{ xs: "center", lg: "center" }}
        >
          <Link to="/" className="navbar-brand">
            <SVG.KoorLogo />
          </Link>
          {isLoggedIn ? (
            <Stack
              direction={"row"}
              alignItems={"center"}
              spacing={2}
              sx={{
                display: {
                  xs: "none",
                  sm: "flex",
                  position: "relative",
                  "@media (max-width:768px)": {
                    justifyContent: "flex-end",
                    flex: "1 1 0%",
                  },
                },
              }}
            >
              <Box sx={{ position: "relative" }}>
                <SearchCategory direction="row" spacing={0} alignItems="center">
                  {role === "employer" ? (
                    <FormControl
                      sx={{
                        "&.MuiSelect-select": {
                          fontFamily: "Poppins",
                          fontSize: "16px",
                        },
                      }}
                      size="small"
                    >
                      <SelectBox
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        inputProps={{ "aria-label": "Without label" }}
                        displayEmpty
                        sx={{ width: "102px", marginLeft: "50px" }}
                      >
                        <MenuItem value={SEARCH_TYPE.talents}>Talent</MenuItem>
                        <MenuItem value={SEARCH_TYPE.vendors}>Vendors</MenuItem>
                      </SelectBox>
                    </FormControl>
                  ) : (
                    ""
                  )}
                  <input
                    onKeyDown={(e) => {
                      if (e.key === "enter" || e.key === "Enter") {
                        switch (search) {
                          case SEARCH_TYPE.jobs:
                            navigate(
                              role === USER_ROLES.jobSeeker
                                ? `/search/${SEARCH_TYPE.jobs}?search=${searchValue}`
                                : "/"
                            );
                            break;
                          case SEARCH_TYPE.talents:
                            navigate(
                              role === USER_ROLES.employer
                                ? `/search/${SEARCH_TYPE.talents}?search=${searchValue}`
                                : "/"
                            );
                            break;
                          case SEARCH_TYPE.vendors:
                            navigate(
                              role === USER_ROLES.employer
                                ? `/search/${SEARCH_TYPE.vendors}?search=${searchValue}`
                                : "/"
                            );
                            break;
                          case SEARCH_TYPE.tenders:
                            navigate(
                              role === USER_ROLES.vendor
                                ? `/search/${SEARCH_TYPE.tenders}?search=${searchValue}`
                                : "/"
                            );
                            break;
                          default:
                            break;
                        }
                      }
                    }}
                    className="employersearch"
                    placeholder={
                      role === USER_ROLES.employer ? "" : searchPlaceholder
                    }
                    onChange={(e) => setSearchValue(e.target.value)}
                    value={searchValue}
                  />
                  <SVG.SearchIcon className="login_header_search_icon" />
                </SearchCategory>
              </Box>
            </Stack>
          ) : (
            ""
          )}

          <div className="ms-auto">
            <Stack direction={"row"} alignItems={"center"} spacing={1}>
              {isLoggedIn ? (
                <>
                  <IconButton
                    disableFocusRipple={false}
                    onClick={mobileSearchToggle}
                    sx={{
                      "&.MuiIconButton-root": {
                        p: 0,
                        mt: 1,
                      },
                      display: {
                        xs: "block",
                        md: "none",
                        sm: "none",
                        lg: "none",
                      },
                    }}
                  >
                    <Box
                      component={"span"}
                      sx={{ "& svg": { width: "24px", height: "24px" } }}
                    >
                      <SVG.SearchIcon className="me-3 header_icon_search" />
                    </Box>
                  </IconButton>
                  <IconButton
                    disableFocusRipple={false}
                    sx={{
                      "&.MuiIconButton-root": {
                        p: 0,
                        mt: 1,
                      },
                      display: {
                        xs: "block",
                        lg: "none",
                        sm: "block",
                      },
                      "@media (min-width: 1025px) and (max-width: 1200px)": {
                        display: "none",
                      },
                    }}
                  >
                    <NotificationPopup />
                  </IconButton>
                </>
              ) : (
                ""
              )}
              {matches ? (
                <>
                  {isLoggedIn ? (
                    <>
                      {/* <Link to={`/${role}/my-profile`}>
                        <FilledButton title="My Profile" />
                      </Link> */}
                    </>
                  ) : (
                    <>
                      <Box
                        className="d-lg-none"
                        onClick={() => {
                          dispatch(setUserRole(""));
                          navigate("/register");
                        }}
                      >
                        <OutlinedButton title="Register" />
                      </Box>

                      <Box
                        className="d-lg-none"
                        data-cy="login-nav"
                        onClick={() => {
                          dispatch(setUserRole(""));
                          navigate("/login");
                        }}
                      >
                        <FilledButton title="Log in" />
                      </Box>
                    </>
                  )}
                </>
              ) : (
                ""
              )}
              <IconButton
                onClick={() => setIsmenu(!ismenu)}
                color="inherit"
                aria-label="open drawer"
                sx={{
                  "&.MuiIconButton-root": {
                    p: 0,
                  },
                  fontSize: "18px",
                  display: { lg: "none", sm: "block", md: "block" },
                  "@media (min-width: 1025px) and (max-width: 1200px)": {
                    display: "none",
                  },
                }}
              >
                <SVG.HamburgerMenu className="ms-3" />
              </IconButton>
            </Stack>
            <ul
              className={`menu ${ismenu && "menu-selected"} ${
                role !== USER_ROLES.jobSeeker ? "color-change" : null
              }`}
            >
              <li onClick={() => setIsmenu(false)}>
                <Link
                  to="/"
                  className="active"
                  style={{
                    color:
                      location.pathname === "/"
                        ? role === USER_ROLES.jobSeeker
                          ? "#eea23d "
                          : "#274593"
                        : "",
                  }}
                >
                  Home
                </Link>
              </li>
              <li onClick={() => setIsmenu(false)}>
                <Link
                  to="/search/jobs"
                  style={{
                    color: location.pathname.includes("/search/jobs")
                      ? role === USER_ROLES.jobSeeker
                        ? "#eea23d "
                        : "#274593"
                      : "",
                  }}
                >
                  Browse jobs
                </Link>
              </li>
              {isLoggedIn && role === USER_ROLES.employer ? (
                <li onClick={() => setIsmenu(false)}>
                  <Link
                    to={"/search/talents"}
                    style={{
                      color: location.pathname.includes("/search/talents")
                        ? role === USER_ROLES.jobSeeker
                          ? "#eea23d "
                          : "#274593"
                        : "",
                    }}
                  >
                    Browse Talents
                  </Link>
                </li>
              ) : (
                ""
              )}
              {isLoggedIn && role === USER_ROLES.employer ? (
                <li onClick={() => setIsmenu(false)}>
                  <Link
                    to={"/search/vendors"}
                    style={{
                      color: location.pathname.includes("/search/vendors")
                        ? role === USER_ROLES.jobSeeker
                          ? "#eea23d "
                          : "#274593"
                        : "",
                    }}
                  >
                    Browse Vendors
                  </Link>
                </li>
              ) : (
                ""
              )}
              <li onClick={() => setIsmenu(false)}>
                <Link
                  // to={isLoggedIn ? "/search/tenders" : "#"}
                  to="/search/tenders"
                  style={{
                    color: location.pathname.includes("/search/tenders")
                      ? role === USER_ROLES.jobSeeker
                        ? "#eea23d "
                        : "#274593"
                      : "",
                  }}
                  // onClick={(e) => checkUserLoggedIn(e)}
                >
                  Browse tenders
                </Link>
              </li>
              {!isLoggedIn && (
                <li onClick={() => setIsmenu(false)}>
                  <Link
                    to="/about-us"
                    style={{
                      color: location.pathname.includes("/about")
                        ? role === USER_ROLES.jobSeeker
                          ? "#eea23d "
                          : "#274593"
                        : "",
                    }}
                  >
                    About us
                  </Link>
                </li>
              )}
              <li onClick={() => setIsmenu(false)}>
                <Link
                  to="/resources"
                  style={{
                    color: location.pathname.includes("/resource")
                      ? role === USER_ROLES.jobSeeker
                        ? "#eea23d "
                        : "#274593"
                      : "",
                  }}
                >
                  Resources
                </Link>
              </li>

              {isLoggedIn ? (
                <>
                  <li className="noti-mobile" onClick={() => setIsmenu(false)}>
                    <IconButton
                      disableFocusRipple={false}
                      sx={{
                        "&.MuiIconButton-root": {
                          p: 0,
                          mt: 1,
                        },
                      }}
                    >
                      <NotificationPopup />
                    </IconButton>
                  </li>
                  {/* <MenuItem onClick={() => setIsmenu(false)}>
                    <Link to={`/${role}/my-profile`}>
                      <FilledButton title="My Profile" />
                    </Link>
                  </MenuItem> */}
                  {role && (
                    <li onClick={() => setIsmenu(false)}>
                      <Link to={`/${role}/my-profile`}>
                        <FilledButton title="My Profile" />
                      </Link>
                    </li>
                  )}
                  {!currentUser.profile.isVerified && (
                    <li onClick={() => logoutHandle()}>
                      <FilledButton title="Log Out" />
                    </li>
                  )}
                </>
              ) : (
                <>
                  {!matches ? (
                    <>
                      <li onClick={() => setIsmenu(false)}>
                        <Box
                          onClick={() => {
                            dispatch(setUserRole(""));
                            navigate("/register");
                          }}
                        >
                          <OutlinedButton title="Register" />
                        </Box>
                      </li>
                      <li onClick={() => setIsmenu(false)}>
                        <Box
                          data-cy="login-nav"
                          onClick={() => {
                            dispatch(setUserRole(""));
                            navigate("/login");
                          }}
                        >
                          <FilledButton title="Log in" />
                        </Box>
                      </li>
                    </>
                  ) : (
                    ""
                  )}
                </>
              )}
            </ul>
          </div>
        </Stack>
        {isLoggedIn ? (
          <Stack
            direction={"row"}
            alignItems={"center"}
            spacing={2}
            sx={{
              display: {
                xs: isMobileSearch ? "block" : "none",
                sm: "none",
                paddingLeft: "0px !important",
              },
            }}
          >
            <SearchCategory
              direction="row"
              spacing={1}
              alignItems="center"
              sx={{ width: "100%" }}
            >
              {role === "employer" ? (
                <FormControl
                  sx={{
                    "&.MuiSelect-select": {
                      fontFamily: "Poppins",
                      fontSize: "16px",
                    },
                  }}
                  size="small"
                >
                  <SelectBox
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    inputProps={{ "aria-label": "Without label" }}
                    displayEmpty
                    sx={{ width: "100px" }}
                  >
                    <MenuItem value={SEARCH_TYPE.talents}>Talent</MenuItem>
                    <MenuItem value={SEARCH_TYPE.vendors}>Vendors</MenuItem>
                  </SelectBox>
                </FormControl>
              ) : (
                ""
              )}
              <input
                onKeyDown={(e) => {
                  if (e.key === "enter" || e.key === "Enter") {
                    switch (search) {
                      case SEARCH_TYPE.jobs:
                        navigate(
                          role === USER_ROLES.jobSeeker
                            ? `/search/${SEARCH_TYPE.jobs}?search=${searchValue}`
                            : "/"
                        );
                        break;
                      case SEARCH_TYPE.talents:
                        navigate(
                          role === USER_ROLES.employer
                            ? `/search/${SEARCH_TYPE.talents}?search=${searchValue}`
                            : "/"
                        );
                        break;
                      case SEARCH_TYPE.vendors:
                        navigate(
                          role === USER_ROLES.employer
                            ? `/search/${SEARCH_TYPE.vendors}?search=${searchValue}`
                            : "/"
                        );
                        break;
                      case SEARCH_TYPE.tenders:
                        navigate(
                          role === USER_ROLES.vendors
                            ? `/search/${SEARCH_TYPE.tenders}?search=${searchValue}`
                            : "/"
                        );
                        break;
                      default:
                        break;
                    }
                  }
                }}
                className="employersearch"
                placeholder={
                  role === USER_ROLES.employer ? "" : searchPlaceholder
                }
                onChange={(e) => setSearchValue(e.target.value)}
                value={searchValue}
              />
            </SearchCategory>
          </Stack>
        ) : (
          ""
        )}
        <DialogBox
          open={accountVerifiedWarning}
          handleClose={() => setAccountVerifiedWarning(false)}
        >
          <div>
            <SVG.Warning
              style={{
                marginLeft: "39%",
                height: "50px",
                width: "50px",
                color: "red",
              }}
            />
            <h1 className="heading">Account Verification Status</h1>
            <div className="form-content">
              <p>
                Dear {currentUser.name || currentUser.email}, your account is
                not verified by the administrator. Please contact the
                administrator for further assistance.
              </p>
            </div>
          </div>
        </DialogBox>
        <DialogBox open={warningTrue} handleClose={() => setWarningTrue(false)}>
          <div>
            <SVG.Warning
              style={{
                marginLeft: "39%",
                height: "50px",
                width: "50px",
                color: "red",
              }}
            />
            <h1 className="heading" style={{ textTransform: "capitalize" }}>
              {USER_ROLES.vendor} login required
            </h1>
            <div className="form-content">
              <p>
                Dear user, to access this content, please log in as a{" "}
                {USER_ROLES.vendor}.
              </p>
            </div>
          </div>
        </DialogBox>
      </Container>
    </header>
  );
}

export default Header;

import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  FormControl,
  IconButton,
  MenuItem,
  Stack,
} from "@mui/material";
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { SearchCategory, SelectBox } from "./style";
import { FilledButton, OutlinedButton } from "../button";
import { SVG } from "@assets/svg";
import MenuIcon from "@mui/icons-material/Menu";
import { SEARCH_TYPE, USER_ROLES } from "@utils/enum";
import { useDispatch, useSelector } from "react-redux";
import { setUserRole } from "@redux/slice/user";
import NotificationPopup from "./notificationPopup";
import DialogBox from "@components/dialogBox";

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

  const { role, isLoggedIn } = useSelector((state) => state.auth);
  const [searchPlaceholder, setSearchPlaceholder] = useState("Jobs");
  const [search, setSearch] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const { currentUser } = useSelector((state) => state.auth);
  const [accountVerifiedWarning, setAccountVerifiedWarning] = useState(false);
  const [warningTrue, setWarningTrue] = useState(false);

  const checkUserVerified = (e) => {
    if (!currentUser.profile.isVerified) {
      setAccountVerifiedWarning(true);
      e.preventDefault();
    }
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

  return (
    <header>
      <Container
        maxWidth={false}
        sx={{
          "@media(min-width:992px)": {
            paddingLeft: "100px",
            paddingRight: "100px",
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
              sx={{ display: { xs: "none", sm: "block" } }}
            >
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
                      sx={{ width: "102px" }}
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
              </SearchCategory>
            </Stack>
          ) : (
            ""
          )}

          <div
            className="ms-auto"
            // ref={menu}
          >
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
                      display: { xs: "block", sm: "none" },
                    }}
                  >
                    <Box
                      component={"span"}
                      sx={{ "& svg": { width: "24px", height: "24px" } }}
                    >
                      <SVG.SearchIcon />
                    </Box>
                  </IconButton>
                  <IconButton
                    disableFocusRipple={false}
                    sx={{
                      "&.MuiIconButton-root": {
                        p: 0,
                        mt: 1,
                      },
                      display: { xs: "block", sm: "block", lg: "none" },
                    }}
                  >
                    <NotificationPopup />
                  </IconButton>
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
                  display: { lg: "none" },
                }}
              >
                <MenuIcon />
              </IconButton>
            </Stack>
            <ul
              className={`menu ${ismenu && "menu-selected"} ${
                role !== USER_ROLES.jobSeeker ? "color-change" : null
              }`}
            >
              {!isLoggedIn ? (
                <li onClick={() => setIsmenu(false)}>
                  <Link
                    to="/"
                    className="active"
                    style={{
                      color: location.pathname === "/" ? "#274593" : "",
                    }}
                  >
                    Home
                  </Link>
                </li>
              ) : (
                ""
              )}
              {!isLoggedIn || role === USER_ROLES.jobSeeker ? (
                <li onClick={() => setIsmenu(false)}>
                  <Link
                    to="/search/jobs"
                    style={{
                      color: location.pathname.includes("/search/jobs")
                        ? "#274593"
                        : "",
                    }}
                  >
                    Browse jobs
                  </Link>
                </li>
              ) : (
                ""
              )}
              {isLoggedIn && role === USER_ROLES.employer ? (
                <li onClick={() => setIsmenu(false)}>
                  <Link
                    to={
                      currentUser.profile.isVerified ? "/search/talents" : "#"
                    }
                    style={{
                      color: location.pathname.includes("/search/talents")
                        ? "#274593"
                        : "",
                    }}
                    onClick={(e) => {
                      checkUserVerified(e);
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
                    to={
                      currentUser.profile.isVerified ? "/search/vendors" : "#"
                    }
                    style={{
                      color: location.pathname.includes("/search/vendors")
                        ? "#274593"
                        : "",
                    }}
                    onClick={(e) => {
                      checkUserVerified(e);
                    }}
                  >
                    Browse Vendors
                  </Link>
                </li>
              ) : (
                ""
              )}
              {!isLoggedIn || role === USER_ROLES.vendor ? (
                <li onClick={() => setIsmenu(false)}>
                  <Link
                    // to={isLoggedIn ? "/search/tenders" : "#"}
                    to="/search/tenders"
                    style={{
                      color: location.pathname.includes("/search/tenders")
                        ? "#274593"
                        : "",
                    }}
                    // onClick={(e) => checkUserLoggedIn(e)}
                  >
                    Browse tenders
                  </Link>
                </li>
              ) : (
                ""
              )}
              {!isLoggedIn && (
                <li onClick={() => setIsmenu(false)}>
                  <Link
                    to="/about-us"
                    style={{
                      color: location.pathname.includes("/about")
                        ? "#274593"
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
                      ? "#274593"
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
                  <li onClick={() => setIsmenu(false)}>
                    <Link to={`/${role}/my-profile`}>
                      <FilledButton title="My Profile" />
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li onClick={() => setIsmenu(false)}>
                    <div
                      onClick={() => {
                        dispatch(setUserRole(""));
                        navigate("/register");
                      }}
                    >
                      <OutlinedButton title="Register" />
                    </div>
                  </li>
                  <li onClick={() => setIsmenu(false)}>
                    <div
                      data-cy="login-nav"
                      onClick={() => {
                        dispatch(setUserRole(""));
                        navigate("/login");
                      }}
                    >
                      <FilledButton title="Log in" />
                    </div>
                  </li>
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
              display: { xs: isMobileSearch ? "block" : "none", sm: "none" },
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

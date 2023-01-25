import React, { useEffect, useState } from "react";
import {
  Container,
  FormControl,
  IconButton,
  MenuItem,
  Stack,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { SearchCategory, SelectBox } from "./style";
import { FilledButton, OutlinedButton } from "../button";
import { SVG } from "@assets/svg";
import MenuIcon from "@mui/icons-material/Menu";
import { USER_ROLES } from "@utils/enum";
import { useSelector } from "react-redux";

const ismenu = true;

const searchType = Object.freeze({
  Talent: "talent",
  Tenders: "tenders",
  Vendors: "vendors",
});

function Header() {
  // navigate
  const navigate = useNavigate();

  const { role, isLoggedIn } = useSelector((state) => state.auth);
  const [searchPlaceholder, setSearchPlaceholder] = useState("Jobs");
  const [search, setSearch] = useState("talent");
  useEffect(() => {
    switch (role) {
      case USER_ROLES.jobSeeker:
        setSearchPlaceholder("Jobs");
        break;
      case USER_ROLES.employer:
        setSearchPlaceholder("Vendors");
        break;
      case USER_ROLES.vendor:
        setSearchPlaceholder("Tenders");
        break;
      default:
        break;
    }
  }, [role]);

  return (
    <header>
      <Container>
        <Stack
          direction="row"
          spacing="3"
          alignItems={{ xs: "start", lg: "center" }}
        >
          <Link to="/" className="navbar-brand">
            <SVG.KoorLogo />
          </Link>
          <div className="">
            <SearchCategory direction="row" spacing={1} alignItems="center">
              <Link
                to={role === USER_ROLES.jobSeeker ? "/job-search" : "/"}
                className="d-inline-flex"
              >
                <SVG.SearchIcon />
              </Link>
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
                    <MenuItem value={searchType.Talent}>Talent</MenuItem>
                    <MenuItem value={searchType.Tenders}>Tenders</MenuItem>
                    <MenuItem value={searchType.Vendors}>Vendors</MenuItem>
                  </SelectBox>
                </FormControl>
              ) : (
                ""
              )}
              <input
                onKeyDown={(e) => {
                  if (e.key === "enter" || e.key === "Enter") {
                    navigate(
                      role === USER_ROLES.jobSeeker ? "/job-search" : "/"
                    );
                  }
                }}
                className="employersearch"
                placeholder={role === "employer" ? "" : searchPlaceholder}
              />
            </SearchCategory>
          </div>

          <div
            className="ms-auto"
            // ref={menu}
          >
            <IconButton
              // onClick={() => setIsmenu(!ismenu)}
              color="inherit"
              aria-label="open drawer"
              edge="start"
              sx={{
                mr: 2,
                fontSize: "14px",
                display: { sm: "none" },
              }}
            >
              <MenuIcon />
            </IconButton>
            <ul
              className={`menu ${ismenu && "menu-selected"} ${
                role !== USER_ROLES.jobSeeker ? "color-change" : null
              }`}
            >
              <li>
                <Link to="/">Home</Link>
              </li>
              {!isLoggedIn && (
                <li>
                  <Link to="/about-us">About Us</Link>
                </li>
              )}
              <li>
                <Link to="/resources">Resources</Link>
              </li>
              {isLoggedIn ? (
                <>
                  <li>
                    <IconButton
                      disableFocusRipple={false}
                      sx={{
                        "&.MuiIconButton-root": {
                          p: 0,
                        },
                      }}
                    >
                      <SVG.NotificationIcon />
                    </IconButton>
                  </li>
                  <li>
                    <Link to={`/${role}/my-profile`}>
                      <FilledButton
                        title="My Profile"
                        isBlueButton={role !== USER_ROLES.jobSeeker}
                      />
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link to="/">
                      <OutlinedButton title="Register" />
                    </Link>
                  </li>
                  <li>
                    <Link data-cy="login-nav" to="/login">
                      <FilledButton title="Login" />
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </Stack>
      </Container>
    </header>
  );
}

export default Header;

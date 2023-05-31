import { Avatar, Box, Drawer, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { SVG } from "@assets/svg";
import { USER_ROLES } from "@utils/enum";
import { navigationOptions } from "./navigation";
import "./styles.css";
import { formatPhoneNumberIntl } from "react-phone-number-input";

const drawerWidth = 300;

function Sidebar() {
  const navigate = useNavigate();
  const { role, currentUser } = useSelector((state) => state.auth);
  const [mobileNumber, setMobileNumber] = useState("");

  const navigateToUpdateProfile = () => {
    if (role === USER_ROLES.jobSeeker) {
      navigate("/job_seeker/my-profile/update-profile");
    }
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const currentUserMobileNumber =
      currentUser.countryCode && currentUser.mobileNumber
        ? formatPhoneNumberIntl(
            currentUser.countryCode + currentUser.mobileNumber
          )
        : "";
    setMobileNumber(currentUserMobileNumber);
  }, [currentUser]);

  const location = useLocation();
  const drawer = (
    <>
      <div className="p-3 border-top border-bottom text-center user-details savetender">
        <Avatar
          sx={{
            width: 100,
            height: 100,
            margin: "auto",
            color: "#CACACA",
            "&.MuiAvatar-colorDefault": {
              background: "#F0F0F0",
            },
          }}
          src={currentUser.profileImage}
          onClick={navigateToUpdateProfile}
        >
          <SVG.UserIcon />
        </Avatar>
        <h1>{currentUser.name}</h1>
        <p style={{ marginBottom: "5px" }}>{mobileNumber}</p>
        <p>{currentUser.email}</p>
      </div>
      <div className="sidebar-scroll">
        <PerfectScrollbar component="div">
          <ul
            className={`sidebar-menu ${
              role !== USER_ROLES.jobSeeker ? "activemenu" : ""
            }`}
          >
            <li>
              {navigationOptions(role).map((option) => (
                <Link
                  style={{
                    pointerEvents: option.isDisable && "none",
                    // backgroundColor: option.isDisable && "#F2F3F4",
                    // borderRadius: option.isDisable && "27px 0px 0px 27px",
                    marginTop: "10px",
                  }}
                  to={option.to}
                  key={option.id}
                  className={
                    location.pathname.includes(option.to) ? "active" : ""
                  }
                >
                  <span className="menu-icon">
                    <option.icon />
                  </span>
                  <span>{option.title}</span>
                </Link>
              ))}
            </li>
          </ul>
        </PerfectScrollbar>
      </div>
      <div className="logout" data-cy="logout-button-nav">
        <Link
          to="/logout"
          style={{
            color:
              role === USER_ROLES.employer
                ? "#274593"
                : role === USER_ROLES.vendor
                ? "#274593"
                : null,
          }}
        >
          <Stack direction="row" spacing={2} alignItems="center">
            <span className="logout-icon">
              <SVG.LogoutIcon />
            </span>
            <span>Log Out</span>
          </Stack>
        </Link>
      </div>
    </>
  );
  return (
    <Box component="nav" sx={{ width: { sm: 300 }, flexShrink: { sm: 0 } }}>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", lg: "block" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
            top: "69px",
            minHeight: "495px",
          },
        }}
        open
      >
        {drawer}
      </Drawer>
    </Box>
  );
}

export default Sidebar;

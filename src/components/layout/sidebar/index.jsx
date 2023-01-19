import { Avatar, Box, Drawer, Stack } from "@mui/material";
import React from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { SVG } from "../../../assets/svg";
import { USER_ROLES } from "../../../utils/enum";
import { navigationOptions } from "./navigation";
import "./styles.css";
const drawerWidth = 300;
function Sidebar() {
  const { role, currentUser } = useSelector((state) => state.auth);
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
        >
          <SVG.UserIcon />
        </Avatar>
        <h1>{currentUser.name}</h1>
        <p>{currentUser.mobileNumber}</p>
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
      <div className="logout">
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
          display: { xs: "none", sm: "block" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
            top: "81px",
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

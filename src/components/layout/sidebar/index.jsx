import { Avatar, Box } from "@mui/material";
import React from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { SVG } from "../../../assets/svg";
import { USER_ROLES } from "../../../utils/enum";

function Sidebar() {
  const { role, currentUser } = useSelector((state) => state.auth);
  return (
    <Box component="nav" sx={{ width: { sm: 300 }, flexShrink: { sm: 0 } }}>
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
              <Link to="/profile">
                <span className="menu-icon">
                  <SVG.DashboardIcon />
                </span>
                <span>Dashboard</span>
              </Link>
            </li>
          </ul>
        </PerfectScrollbar>
      </div>
    </Box>
  );
}

export default Sidebar;

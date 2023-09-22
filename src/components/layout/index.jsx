import { Box, IconButton } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import {
  EMPLOYER_ROUTES,
  JOB_SEEKER_ROUTES,
  VENDOR_ROUTES,
} from "@utils/constants/routes";
import { EmployerRoute, JobSeekerRoute, VendorRoute } from "@utils/routes";
import Sidebar from "./sidebar";
import { USER_ROLES } from "@utils/enum";
import { Suspense, useState } from "react";
import { FallbackLoading } from "@components/loader/fallbackLoader";
import MenuIcon from "@mui/icons-material/Menu";

function Layout() {
  const [SidebarMenu, setSideBarMenu] = useState(false);
  const toggleDrawer = () => {
    setSideBarMenu(true);
  };
  const handleDrawerClose = () => {
    setSideBarMenu(false);
  };
  return (
    <Box
      sx={{
        display: "flex",
        marginTop: "80px",
        minHeight: "93vh",
        "@media(max-width:992px)": {
          display: "block",
        },
      }}
    >
      <Sidebar
        SidebarMenu={SidebarMenu}
        toggleDrawer={toggleDrawer}
        handleDrawerClose={handleDrawerClose}
      />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { lg: `calc(100% - ${"300"}px)` },
          background: "#E5E5E5",
          minHeight: "544px",
        }}
      >
        <IconButton
          color="inherit"
          onClick={toggleDrawer}
          aria-label="open drawer"
          edge="start"
          sx={{ mr: 2, display: { sm: "none" } }}
        >
          <MenuIcon />
        </IconButton>
        {/* {role === USER_ROLES.jobSeeker ? ( */}
        <Routes>
          {JOB_SEEKER_ROUTES.map((route) => {
            return (
              <Route
                path={`/${USER_ROLES.jobSeeker}${route.path}`}
                key={route.id}
                element={
                  <Suspense fallback={<FallbackLoading />}>
                    <JobSeekerRoute>
                      <route.component />
                    </JobSeekerRoute>
                  </Suspense>
                }
              />
            );
          })}
        </Routes>
        {/* ) : role === USER_ROLES.employer ? ( */}
        <Routes>
          {EMPLOYER_ROUTES.map((route) => {
            return (
              <Route
                path={`/${USER_ROLES.employer}${route.path}`}
                key={route.id}
                element={
                  <Suspense fallback={<FallbackLoading />}>
                    <EmployerRoute>
                      <route.component />
                    </EmployerRoute>
                  </Suspense>
                }
              />
            );
          })}
        </Routes>
        {/* ) : role === USER_ROLES.vendor ? ( */}
        <Routes>
          {VENDOR_ROUTES.map((route) => {
            return (
              <Route
                path={`/${USER_ROLES.vendor}${route.path}`}
                key={route.id}
                element={
                  <Suspense fallback={<FallbackLoading />}>
                    <VendorRoute>
                      <route.component />
                    </VendorRoute>
                  </Suspense>
                }
              />
            );
          })}
        </Routes>
        {/* ) : (
          ""
        )} */}
      </Box>
    </Box>
  );
}

export default Layout;

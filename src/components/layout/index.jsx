import { Box, IconButton } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import {
  EMPLOYER_ROUTES,
  JOB_SEEKER_ROUTES,
  VENDOR_ROUTES,
} from "../../utils/constants/routes";
import { EmployerRoute, JobSeekerRoute, VendorRoute } from "../../utils/routes";
import Sidebar from "./sidebar";
import { USER_ROLES } from "../../utils/enum";
import { Suspense, useState } from "react";
import { FallbackLoading } from "../../components/loader/fallbackLoader";
import MenuIcon from "@mui/icons-material/Menu";
import { Capacitor } from "@capacitor/core";

function Layout() {
  const platform = Capacitor.getPlatform();
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
        marginTop:
          platform === "android" || platform === "ios" ? "0px" : "80px",
        minHeight: "calc(100vh - 100px)",
        "@media(max-width:992px)": {
          display: "block",
        },
      }}
    >
      {platform === "android" || platform === "ios" ? null : (
        <Sidebar
          SidebarMenu={SidebarMenu}
          toggleDrawer={toggleDrawer}
          handleDrawerClose={handleDrawerClose}
        />
      )}

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: { lg: `calc(100% - ${"300"}px)` },
          background: "#E5E5E5",
          minHeight: "544px",
          paddingBottom:
            platform === "android" || platform === "ios" ? "150px" : "",
        }}
        className="main_component_class"
      >
        {platform === "android" || platform === "ios" ? null : (
          <IconButton
            color="inherit"
            onClick={toggleDrawer}
            aria-label="open drawer"
            edge="start"
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
        )}

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
      {/* {platform === "android" || platform === "ios" ? "asas" : null}
      {platform === "android" || platform === "ios" ? (
        <Box
          sx={{
            position: "fixed",
            bottom: "0px",
            left: 0,
            right: 0,
            background: "#fff",
            textAlign: "center",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "20px",
          }}
        >
          <Box
            component={"span"}
            sx={{
              borderRadius: "10px",
              width: "100px",
              height: "4px",
              background: "#121212",
              display: "block",
            }}
          ></Box>
        </Box>
      ) : null} */}
    </Box>
  );
}

export default Layout;

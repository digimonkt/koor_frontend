import { Box } from "@mui/material";
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
import NotFoundPage from "@pages/notFound";
import { useSelector } from "react-redux";

function Layout() {
  const [SidebarMenu, setSideBarMenu] = useState(false);
  const toggleDrawer = () => {
    setSideBarMenu(true);
  };
  const handleDrawerClose = () => {
    setSideBarMenu(false);
  };

  const hideSideBar = useSelector((state) => state.employer.hideSideBar);
  return (
    <Box
      sx={{
        display: "flex",
        marginTop: "80px",
        minHeight: "calc(100vh - 100px)",
        "@media(max-width:992px)": {
          display: "block",
        },
      }}
    >
      {!hideSideBar && (
        <div>
          <Sidebar
            SidebarMenu={SidebarMenu}
            toggleDrawer={toggleDrawer}
            handleDrawerClose={handleDrawerClose}
          />
        </div>
      )}

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: { lg: `calc(100% - ${"300"}px)` },
          background: "#E5E5E5",
          minHeight: "544px",
        }}
        className="main_component_class"
      >
        {/* {role === USER_ROLES.jobSeeker ? ( */}
        <Routes>
          {JOB_SEEKER_ROUTES.map((route) => {
            if (!route.path) {
              return null;
            }
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
          <Route
            path={"/*"}
            element={
              <>
                <Suspense fallback={<FallbackLoading />}>
                  <NotFoundPage />
                </Suspense>
              </>
            }
          />
        </Routes>
      </Box>
    </Box>
  );
}

export default Layout;

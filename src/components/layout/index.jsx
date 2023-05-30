import { Box } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import {
  EMPLOYER_ROUTES,
  JOB_SEEKER_ROUTES,
  VENDOR_ROUTES,
} from "@utils/constants/routes";
import { EmployerRoute, JobSeekerRoute, VendorRoute } from "@utils/routes";
import Sidebar from "./sidebar";
import { USER_ROLES } from "@utils/enum";
import { Suspense } from "react";
import { FallbackLoading } from "@components/loader/fallbackLoader";

function Layout() {
  return (
    <Box
      sx={{
        display: "flex",
        marginTop: "60px",
        minHeight: "93vh",
        "@media(max-width:992px)": {
          display: "block",
        },
      }}
    >
      <Sidebar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${"300"}px)` },
          background: "#E5E5E5",
          minHeight: "544px",
        }}
      >
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

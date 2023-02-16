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

function Layout() {
  return (
    <Box sx={{ display: "flex", marginTop: "81px" }}>
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
                  <JobSeekerRoute>
                    <route.component />
                  </JobSeekerRoute>
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
                  <EmployerRoute>
                    <route.component />
                  </EmployerRoute>
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
                  <VendorRoute>
                    <route.component />
                  </VendorRoute>
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

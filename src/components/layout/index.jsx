import { Box } from "@mui/material";
import { useSelector } from "react-redux";
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
  const { role } = useSelector((state) => state.auth);
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
        {role === USER_ROLES.jobSeeker ? (
          <JobSeekerRoute>
            <Routes>
              {JOB_SEEKER_ROUTES.map((route) => {
                return (
                  <Route
                    path={`/${role}${route.path}`}
                    key={route.id}
                    element={<route.component />}
                  />
                );
              })}
            </Routes>
          </JobSeekerRoute>
        ) : role === USER_ROLES.employer ? (
          <EmployerRoute>
            <Routes>
              {EMPLOYER_ROUTES.map((route) => {
                return (
                  <Route
                    path={`/${role}${route.path}`}
                    key={route.id}
                    element={<route.component />}
                  />
                );
              })}
            </Routes>
          </EmployerRoute>
        ) : role === USER_ROLES.vendor ? (
          <VendorRoute>
            <Routes>
              {VENDOR_ROUTES.map((route) => {
                return (
                  <Route
                    path={`/${role}${route.path}`}
                    key={route.id}
                    element={<route.component />}
                  />
                );
              })}
            </Routes>
          </VendorRoute>
        ) : (
          ""
        )}
      </Box>
    </Box>
  );
}

export default Layout;

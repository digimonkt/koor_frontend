import { Box } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import Sidebar from "src/components/layout/sidebar";
import { JOB_SEEKER_ROUTES } from "src/utils/constants/route";
import { JobSeekerRoute } from "src/utils/routes";

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
        <Routes>
          {JOB_SEEKER_ROUTES.map((route) => {
            return (
              <Route
                path={`/job-seeker${route.path}`}
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
      </Box>
    </Box>
  );
}

export default Layout;

import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { JOB_SEEKER_ROUTES } from "../../utils/constants/routes";
import { JobSeekerRoute } from "../../utils/routes";
import Sidebar from "./sidebar";

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
        <Routes>
          {JOB_SEEKER_ROUTES.map((route) => {
            return (
              <Route
                path={`/${role}${route.path}`}
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

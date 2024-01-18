import { SVG } from "@assets/svg";
import { Box } from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Spalsh = () => {
  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      navigate("/login");
    }, 5000);
  }, []);
  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        <SVG.SplashLogo />
      </Box>
    </>
  );
};
export default Spalsh;

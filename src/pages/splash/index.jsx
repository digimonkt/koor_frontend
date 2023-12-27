import { SVG } from "@assets/svg";
import { Box } from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SplashScreen } from "@capacitor/splash-screen";

const Spalsh = () => {
  const navigate = useNavigate();
  SplashScreen.show();
  useEffect(() => {
    setTimeout(() => {
      navigate("/login");
      SplashScreen.hide();
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

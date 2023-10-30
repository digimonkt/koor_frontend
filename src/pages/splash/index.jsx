import { SVG } from "@assets/svg";
import { Box } from "@mui/material";

const Spalsh = () => {
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

import { SVG } from "@assets/svg";
import { Box, IconButton, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import AndroidSwitch from "./switch";

const Setting = () => {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        padding: "100px 24px 24px 24px",
        background: "#fff",
        height: "100vh",
      }}
    >
      <Stack direction={"row"} alignItems={"center"} spacing={1} sx={{ mb: 3 }}>
        <IconButton onClick={() => navigate(-1)}>
          <SVG.BackArrow />
        </IconButton>
        <Box
          component={"span"}
          sx={{
            fontFamily: "Bahnschrift",
            fontSize: "22px",
            fontWeight: "600",
          }}
        >
          Settings
        </Box>
      </Stack>
      <Stack
        direction={"column"}
        spacing={2.5}
        sx={{
          "& .MuiTypography-body1": {
            fontFamily: "Poppins",
            fontSize: "14px",
            fontWeight: "400",
            color: "#121212",
          },
          "& .MuiTypography-span": {
            fontFamily: "Poppins",
            fontSize: "10px",
            fontWeight: "400",
            color: "#848484",
          },
        }}
      >
        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          sx={{ borderBottom: "1px solid #F0F0F0", pb: 2.5 }}
        >
          <Typography variant="body1">High priority notifications</Typography>
          <AndroidSwitch />
        </Stack>
        <Stack
          direction={"column"}
          spacing={2}
          sx={{ borderBottom: "1px solid #F0F0F0", pb: 2.5 }}
        >
          <Box>
            <Typography variant="body1">Appearance</Typography>
            <Typography variant="span">System</Typography>
          </Box>
          <Box>
            <Typography variant="body1">Clear app cache</Typography>
            <Typography variant="span">136 MB</Typography>
          </Box>
        </Stack>
        <Stack
          direction={"column"}
          spacing={2}
          sx={{ borderBottom: "1px solid #F0F0F0", pb: 2.5 }}
        >
          <Box>
            <Typography variant="body1">Profile info</Typography>
          </Box>
          <Box>
            <Typography variant="body1">Password & security</Typography>
          </Box>
          <Box>
            <Typography variant="body1">Change account</Typography>
          </Box>
          <Box>
            <Typography variant="body1">Log out</Typography>
          </Box>
        </Stack>
        <Stack
          direction={"column"}
          spacing={2}
          sx={{ borderBottom: "1px solid #F0F0F0", pb: 2.5 }}
        >
          <Stack direction={"row"} justifyContent={"space-between"}>
            <Typography variant="body1">High priority notifications</Typography>
            <Box sx={{ color: "#848484" }}>
              <SVG.OpenNewIcon />
            </Box>
          </Stack>
          <Stack direction={"row"} justifyContent={"space-between"}>
            <Typography variant="body1">Terms of service</Typography>
            <Box sx={{ color: "#848484" }}>
              <SVG.OpenNewIcon />
            </Box>
          </Stack>
        </Stack>
        <Box sx={{ color: "#848484", fontSize: "14px", fontFamily: "Poppins" }}>
          Version – v0.4.25
        </Box>
      </Stack>
    </Box>
  );
};
export default Setting;

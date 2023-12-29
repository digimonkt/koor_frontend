import { SVG } from "@assets/svg";
import { Box, IconButton, Stack, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
// import AndroidSwitch from "./switch";
import { LogoutUserAPI } from "@api/user";
import { globalLocalStorage } from "@utils/localStorage";
import { useDispatch, useSelector } from "react-redux";
import { setIsLoggedIn } from "@redux/slice/user";
import { USER_ROLES } from "../../utils/enum";

const Setting = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { role } = useSelector(({ auth }) => auth);
  const { version } = useSelector(({ platform }) => platform);

  const userLogout = async () => {
    await LogoutUserAPI();
    globalLocalStorage.cleanLocalStorage();
  };
  const logoutHandle = () => {
    userLogout();
    dispatch(setIsLoggedIn(false));
  };

  return (
    <Box
      sx={{
        padding: "24px",
        background: "#fff",
        height: "100vh",
        overflowY: "scroll",
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
        {/* <Stack */}
        {/*   direction={"row"} */}
        {/*   justifyContent={"space-between"} */}
        {/*   sx={{ borderBottom: "1px solid #F0F0F0", pb: 2.5 }} */}
        {/* > */}
        {/*   <Typography variant="body1">High priority notifications</Typography> */}
        {/*   <AndroidSwitch /> */}
        {/* </Stack> */}
        {/* <Stack */}
        {/*   direction={"column"} */}
        {/*   spacing={2} */}
        {/*   sx={{ borderBottom: "1px solid #F0F0F0", pb: 2.5 }} */}
        {/* > */}
        {/*   <Box> */}
        {/*     <Typography variant="body1">Appearance</Typography> */}
        {/*     <Typography variant="span">System</Typography> */}
        {/*   </Box> */}
        {/*   <Box> */}
        {/*     <Typography variant="body1" onClick={() => clearCache()}> */}
        {/*       Clear app cache */}
        {/*     </Typography> */}
        {/*     <Typography variant="span">{cache} KB</Typography> */}
        {/*   </Box> */}
        {/* </Stack> */}
        <Stack
          direction={"column"}
          spacing={2}
          sx={{ borderBottom: "1px solid #F0F0F0", pb: 2.5 }}
        >
          <Box>
            <Typography
              variant="body1"
              component={Link}
              to={
                role === USER_ROLES.jobSeeker
                  ? `/${role}/my-profile/update-profile`
                  : `/${role}/my-profile`
              }
            >
              Profile info
            </Typography>
          </Box>
          {/* <Box> */}
          {/*   <Typography variant="body1">Change account</Typography> */}
          {/* </Box> */}
          <Box>
            <Typography
              variant="body1"
              component={Link}
              to={`/forgot-password?role=${role}`}
            >
              Change password
            </Typography>
          </Box>
          <Box>
            <Typography variant="body1" onClick={() => logoutHandle()}>
              Log out
            </Typography>
          </Box>
        </Stack>
        <Stack
          direction={"column"}
          spacing={2}
          sx={{ borderBottom: "1px solid #F0F0F0", pb: 2.5 }}
        >
          <Stack direction={"row"} justifyContent={"space-between"}>
            <Typography variant="body1" component={Link} to="/privacy-policy">
              Privacy policy
            </Typography>
            <Box sx={{ color: "#848484" }}>
              <SVG.OpenNewIcon />
            </Box>
          </Stack>
          <Stack direction={"row"} justifyContent={"space-between"}>
            <Typography
              component={Link}
              to={"/terms-condition"}
              variant="body1"
            >
              Terms of service
            </Typography>
            <Box sx={{ color: "#848484" }}>
              <SVG.OpenNewIcon />
            </Box>
          </Stack>
        </Stack>
        <Box sx={{ color: "#848484", fontSize: "14px", fontFamily: "Poppins" }}>
          Version – {version || "v0"}
        </Box>
      </Stack>
    </Box>
  );
};
export default Setting;

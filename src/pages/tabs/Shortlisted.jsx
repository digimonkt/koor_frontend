import {
  Avatar,
  Badge,
  Box,
  Button,
  Chip,
  Divider,
  Stack,
  Typography,
  styled,
} from "@mui/material";
import StarBorderIcon from "@mui/icons-material/StarBorder";

import { IMAGES } from "@assets/images";
import { SVG } from "@assets/svg";
const SmallAvatar = styled(Avatar)(({ theme }) => ({
  width: 22,
  height: 22,

  color: "#274593",
  background: "#fff",
}));

const ShortlistedCard = () => {
  return (
    <>
      <Box>
        <Stack
          direction={"row"}
          spacing={2}
          alignItems={"center"}
          sx={{ mb: 1 }}
        >
          <Stack direction={"row"} spacing={2}>
            <Badge
              overlap="circular"
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              badgeContent={
                <SmallAvatar alt="Remy Sharp">
                  <StarBorderIcon sx={{ fontSize: "16px" }} />
                </SmallAvatar>
              }
            >
              <Avatar
                alt="Remy Sharp"
                src={IMAGES.User}
                SX={{ width: "40px", height: "40px" }}
              />
            </Badge>

            <Box>
              <Typography
                variant="h2"
                sx={{
                  fontFamily: "Poppins",
                  fontSize: "14px",
                  fontWeight: "600",
                  mb: 0.5,
                }}
              >
                Vlad Blyshchyk
              </Typography>
              <Stack
                direction={"row"}
                alignItems={"center"}
                spacing={1}
                sx={{
                  color: "#848484",
                  fontFamily: "Poppins",
                  fontSize: "14px",
                  fontWeight: "300",
                }}
              >
                <SVG.LocationIcon /> <Box component={"span"}>Ukraine, Lviv</Box>
              </Stack>
            </Box>
          </Stack>
          <Box
            sx={{
              borderLeft: "1px solid #CACACA",
              fontFamily: "Poppins",
              fontSize: "12px",
              fontWeight: "400",
              lineHeight: "16px",
              height: "40px",
              display: "flex",
              alignItems: "center",
              paddingLeft: "15px",
            }}
          >
            Product Designer, UX/UI
          </Box>
        </Stack>
        <Stack
          direction={"row"}
          spacing={1}
          alignItems={"center"}
          sx={{ mb: 1 }}
        >
          <Typography className="text-truncate" sx={{ height: "32px" }}>
            Hi there! I’m Johny and I’m a professional UI designer located in
            Kenya. I’ll be happy to work together
          </Typography>
          <Box>
            <Button
              sx={{
                flexDirection: "column",
                justifyContent: "center",
                textTransform: "capitalize",
                fontSize: "10px",
                color: "#274593",
              }}
              disableElevation={false}
              disableRipple={true}
            >
              <SVG.MessageIcon />
              <Box>Message</Box>
            </Button>
          </Box>
        </Stack>
        <Stack
          direction={"row"}
          spacing={1}
          useFlexGap
          flexWrap={"wrap"}
          sx={{
            "& .MuiChip-label": {
              fontSize: "10px",
              fontFamily: "Poppins",
              "& .MuiChip-root": {
                borderRadius: "73px",
                background: "#F0F0F0",
              },
            },
          }}
        >
          <Chip label="UI/UX" />
          <Chip label="Driving: Class B / B1 / B2 " />
          <Chip label="Calls" />
          <Chip label="Event Management" />
        </Stack>
        <Divider sx={{ borderColor: "#CACACA", my: 1 }} />
      </Box>
      <Box sx={{ mt: 2 }}>
        <Stack
          direction={"row"}
          spacing={2}
          alignItems={"center"}
          sx={{ mb: 1 }}
        >
          <Stack direction={"row"} spacing={2}>
            <Badge
              overlap="circular"
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              badgeContent={
                <SmallAvatar alt="Remy Sharp">
                  <StarBorderIcon sx={{ fontSize: "16px" }} />
                </SmallAvatar>
              }
            >
              <Avatar
                alt="Remy Sharp"
                src={IMAGES.User}
                SX={{ width: "40px", height: "40px" }}
              />
            </Badge>

            <Box>
              <Typography
                variant="h2"
                sx={{
                  fontFamily: "Poppins",
                  fontSize: "14px",
                  fontWeight: "600",
                  mb: 0.5,
                }}
              >
                Johny Sunner
              </Typography>
              <Stack
                direction={"row"}
                alignItems={"center"}
                spacing={1}
                sx={{
                  color: "#848484",
                  fontFamily: "Poppins",
                  fontSize: "14px",
                  fontWeight: "300",
                }}
              >
                <SVG.LocationIcon /> <Box component={"span"}>Ukraine, Lviv</Box>
              </Stack>
            </Box>
          </Stack>
          <Box
            sx={{
              borderLeft: "1px solid #CACACA",
              fontFamily: "Poppins",
              fontSize: "12px",
              fontWeight: "400",
              lineHeight: "16px",
              height: "40px",
              display: "flex",
              alignItems: "center",
              paddingLeft: "15px",
            }}
          >
            User interface designer
          </Box>
        </Stack>
        <Stack
          direction={"row"}
          spacing={1}
          alignItems={"center"}
          sx={{ mb: 1 }}
        >
          <Typography className="text-truncate" sx={{ height: "32px" }}>
            Hi there! I’m Johny and I’m a professional UI designer located in
            Kenya. I’ll be happy to work together
          </Typography>
          <Box>
            <Button
              sx={{
                flexDirection: "column",
                justifyContent: "center",
                textTransform: "capitalize",
                fontSize: "10px",
                color: "#274593",
              }}
              disableElevation={false}
              disableRipple={true}
            >
              <SVG.MessageIcon />
              <Box>Message</Box>
            </Button>
          </Box>
        </Stack>
        <Stack
          direction={"row"}
          spacing={1}
          useFlexGap
          flexWrap={"wrap"}
          sx={{
            "& .MuiChip-label": {
              fontSize: "10px",
              fontFamily: "Poppins",
              "& .MuiChip-root": {
                borderRadius: "73px",
                background: "#F0F0F0",
              },
            },
          }}
        >
          <Chip label="Gaming" />
          <Chip label="Cosmetics" />
          <Chip label="Animation" />
        </Stack>
      </Box>
    </>
  );
};

export default ShortlistedCard;

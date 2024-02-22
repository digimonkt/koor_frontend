import {
  Avatar,
  Badge,
  Box,
  Button,
  Chip,
  Divider,
  Stack,
  Typography,
  Link,
  styled,
} from "@mui/material";
import StarBorderIcon from "@mui/icons-material/StarBorder";

import { SVG } from "@assets/svg";
import { chatRedirector } from "@utils/chatRedirector";
import { generateFileUrl } from "@utils/generateFileUrl";
import { useNavigate } from "react-router-dom";

const SmallAvatar = styled(Avatar)(() => ({
  width: 22,
  height: 22,
  color: "#274593",
  background: "#fff",
}));

const ShortlistedCard = ({ applicantDetails }) => {
  const navigate = useNavigate();
  console.log(applicantDetails, "applicantDetails");
  const handleMessageClick = () => {
    chatRedirector(applicantDetails?.id, navigate);
  };
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
                src={generateFileUrl(applicantDetails?.user?.image?.path)}
                sx={{ width: "40px", height: "40px" }}
              />
            </Badge>

            <Box>
              <Typography
                variant="h2"
                component={Link}
                to={`/talent/${applicantDetails?.user?.id}`}
                sx={{
                  fontFamily: "Poppins",
                  textDecoration: "none",
                  color: "inherit",
                  fontSize: "14px",
                  fontWeight: "600",
                  cursor: "pointer",
                  mb: 0.5,
                }}
              >
                {applicantDetails?.user?.name}
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
                <SVG.LocationIcon />{" "}
                <Box component={"span"}>
                  {applicantDetails?.user?.city?.title},{" "}
                  {applicantDetails?.user?.country?.title}
                </Box>
              </Stack>
            </Box>
          </Stack>
          {applicantDetails?.user?.profile_title && (
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
              {applicantDetails?.user?.profile_title}
            </Box>
          )}
        </Stack>
        <Stack
          direction={"row"}
          spacing={1}
          alignItems={"center"}
          justifyContent={"space-between"}
          sx={{ mb: 1 }}
        >
          <Typography className="text-truncate" sx={{ height: "32px" }}>
            {applicantDetails?.short_letter}
          </Typography>
          <Box>
            {applicantDetails?.readyForChat && (
              <Button
                Button
                variant="link"
                onClick={handleMessageClick}
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
            )}
          </Box>
        </Stack>
        {Boolean(applicantDetails?.user?.skills?.length) && (
          <Stack
            direction={"row"}
            spacing={1}
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
            {applicantDetails?.user?.skills?.map((itm, idx) => (
              <>
                <Chip key={idx} label={itm.skill.title} />
              </>
            ))}
          </Stack>
        )}
        <Divider sx={{ borderColor: "#CACACA", my: 1 }} />
      </Box>
    </>
  );
};

export default ShortlistedCard;

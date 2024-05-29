import { SVG } from "../../assets/svg";
import {
  Avatar,
  Box,
  Button,
  Chip,
  Divider,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { generateFileUrl } from "../../utils/generateFileUrl";
import urlcat from "urlcat";
import { Link, useNavigate } from "react-router-dom";
import { getConversationIdByUserIdAPI } from "../../api/chat";
import { Capacitor } from "@capacitor/core";
import { ShowLessText } from "@components/common";

// function VendorCard({ vendorDetails }) {
//   const navigate = useNavigate();

//   const handleMessageClick = async () => {
//     const res = await getConversationIdByUserIdAPI({
//       userId: vendorDetails?.id,
//     });
//     if (res.remote === "success") {
//       const conversationId = res.data.conversation_id;
//       navigate(
//         urlcat("/employer/chat", {
//           conversion: conversationId,
//           userId: vendorDetails?.id,
//         })
//       );
//     }
//   };

//   return (
//     <Stack
//       direction={{ xs: "column", lg: "row" }}
//       spacing={{ xs: "2", lg: "2" }}
//       alignItems={{ xs: "start", lg: "center" }}
//       justifyContent={{ xs: "center", lg: "space-between" }}
//       className="border-recent"
//       textAlign="justify"
//     >
//       <Stack direction="row" spacing={2} sx={{ alignItems: "flex-start" }}>
//         <Avatar
//           src={generateFileUrl(vendorDetails.profilePicture?.path || "")}
//           sx={{ width: "70px", height: "70px", borderRadius: "0px !important" }}
//         />
//         <div className="recent-content">
//           <Stack
//             direction="row"
//             divider={<Divider orientation="vertical" flexItem />}
//             spacing={2}
//             flexWrap="wrap"
//             alignItems="center"
//             sx={{ mb: 1 }}
//           >
//             <h4>
//               <Link
//                 to={urlcat("/vendor/:userId/profile", {
//                   userId: vendorDetails.id,
//                 })}
//               >
//                 {vendorDetails.name || vendorDetails.email}
//               </Link>
//             </h4>
//             <div className="recent-research" style={{ flexWrap: "wrap" }}>
//               <span>{vendorDetails.highestEducation}</span>
//             </div>
//           </Stack>
//           <Stack
//             direction="row"
//             spacing={2}
//             alignItems="center"
//             sx={{ mb: 1 }}
//             className="meets_div"
//           >
//             {vendorDetails.country ? (
//               <>
//                 <div>
//                   <span className="meets">
//                     <SVG.LocationIcon />
//                   </span>
//                 </div>
//                 <div>
//                   <span className="meets">
//                     {vendorDetails.country}, {vendorDetails.city}
//                   </span>
//                 </div>
//               </>
//             ) : (
//               ""
//             )}
//           </Stack>
//           <div>
//             <ShowLessText item={vendorDetails.description} />
//           </div>
//           <Stack
//             direction="row"
//             spacing={2}
//             alignItems="center"
//             sx={{ mb: 1, mt: 2, flexWrap: "wrap" }}
//             useFlexGap
//             className="meets_div"
//           >
//             {vendorDetails.sectors.map((sector) => (
//               <Chip
//                 key={sector.id}
//                 label={`Sector: ${sector.title}`}
//                 className="chiplabel"
//                 icon={<SVG.Sector />}
//               />
//             ))}

//             {vendorDetails.tags.map((tag) => (
//               <Chip
//                 key={tag.id}
//                 label={`Tag: ${tag.title}`}
//                 className="chiplabel"
//                 icon={<SVG.Tag />}
//               />
//             ))}
//           </Stack>
//         </div>
//       </Stack>
//       <Stack direction="row" spacing={2} alignItems="center">
//         <Stack direction="row" spacing={0} className="edit-button">
//           <Button variant="link" onClick={handleMessageClick}>
//             <SVG.MessageIcon
//               style={{
//                 color: "#274593",
//               }}
//               className="application-option-icon"
//             />
//             <span>Message</span>
//           </Button>
//         </Stack>
//       </Stack>
//     </Stack>
//   );
// }

function VendorCard({ vendorDetails }) {
  const platform = Capacitor.getPlatform();
  const matches = useMediaQuery("(max-width:600px)");
  const navigate = useNavigate();

  const handleMessageClick = async () => {
    const res = await getConversationIdByUserIdAPI({
      userId: vendorDetails?.id,
    });
    if (res.remote === "success") {
      const conversationId = res.data.conversation_id;
      navigate(
        urlcat("/employer/chat", {
          conversion: conversationId,
          userId: vendorDetails?.id,
        })
      );
    }
  };
  return (
    <Stack
      className="border-recent"
      direction={{ xs: "column", lg: "row", sm: "row" }}
      spacing={{ xs: 2, lg: 2 }}
      alignItems={{ xs: "start", lg: "flex-start" }}
      justifyContent={{ xs: "flex-start", lg: "space-between" }}
    >
      <Stack
        style={{ width: "100%" }}
        direction={{ xs: "column", lg: "row", sm: "row" }}
        spacing={{ xs: 2, lg: 2 }}
        alignItems={{
          xs: "start",
          lg: "flex-start",
        }}
        justifyContent={{ xs: "flex-start", lg: "space-between" }}
        sx={{
          display: "flex",

          width: {
            xs: "100%",
            sm: "100%",
            lg: "auto",
            "@media (max-width:600px)": { flex: "1 1 0%" },
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            "@media (max-width:600px)": { width: "100%" },
          }}
        >
          <Avatar
            src={generateFileUrl(vendorDetails.profilePicture?.path || "")}
            sx={{
              borderRadius: "0px !important",
              width:
                platform === "android" || platform === "ios" ? "40px" : "70px",
              height:
                platform === "android" || platform === "ios" ? "40px" : "70px",
            }}
          />
          {matches && (
            <Stack direction="row" spacing={0} className="edit-button">
              <Button variant="link" onClick={handleMessageClick}>
                <SVG.MessageIcon
                  style={{
                    color: "#274593",
                  }}
                  className="application-option-icon"
                />
                <span>Message</span>
              </Button>
            </Stack>
          )}
        </Box>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <div className="recent-content">
            <Stack
              direction={{ xs: "column", lg: "row" }}
              spacing={1}
              flexWrap="wrap"
              alignItems={{ xs: "flex-start", lg: "center" }}
              sx={{ mb: 1 }}
            >
              <h4>
                <Link
                  to={urlcat("/vendor/:userId/profile", {
                    userId: vendorDetails.id,
                  })}
                >
                  {vendorDetails.name || vendorDetails.email}
                </Link>
              </h4>
              <Divider
                sx={{
                  display: { xs: "none", lg: "block" },
                }}
                orientation="vertical"
              />
              {vendorDetails?.profileTitle && (
                <Box display="flex" justifyContent="center">
                  <hr
                    style={{ rotate: "90deg", width: "20px", height: "5px" }}
                  />
                  <Typography
                    size="small"
                    fontWeight={500}
                    fontFamily={"Poppins"}
                  >
                    {vendorDetails?.profileTitle}
                  </Typography>
                </Box>
              )}
              <p className="job-description card-description mt-1 mb-2">
                {vendorDetails?.profile?.description}
              </p>
            </Stack>
            <Stack
              direction="row"
              spacing={1}
              alignItems="center"
              sx={{ mb: 1 }}
              className="meets_div"
            >
              {vendorDetails.country ? (
                <Box display="flex" justifyContent="center" gap={0.5}>
                  <span className="meets">
                    <SVG.LocationIcon />
                  </span>

                  <span className="meets">
                    {vendorDetails.country}, {vendorDetails.city}
                  </span>
                </Box>
              ) : (
                ""
              )}
            </Stack>
            <div>
              <Box className="job-description mt-1 mb-3">
                <ShowLessText item={vendorDetails.description} />
              </Box>
            </div>
            <Stack
              direction={"row"}
              spacing={1}
              alignItems={"center"}
              sx={{ mb: 1, mt: 2 }}
              className="meets_div"
              flexWrap={"wrap"}
              useFlexGap
            >
              <>
                {vendorDetails?.skills?.map((skill) => (
                  <Chip
                    key={skill.id}
                    label={skill.skill.title}
                    className="chiplabel"
                    icon={<SVG.SchoolIcon />}
                  />
                ))}
              </>
            </Stack>
            <Stack
              direction="row"
              spacing={2}
              alignItems="center"
              sx={{ mb: 1, mt: 2, flexWrap: "wrap" }}
              useFlexGap
              className="meets_div"
            >
              {vendorDetails.sectors.map((sector) => (
                <Chip
                  key={sector.id}
                  label={`Sector: ${sector.title}`}
                  className="chiplabel"
                  icon={<SVG.Sector />}
                />
              ))}

              {vendorDetails.tags.map((tag) => (
                <Chip
                  key={tag.id}
                  label={`Tag: ${tag.title}`}
                  className="chiplabel"
                  icon={<SVG.Tag />}
                />
              ))}
            </Stack>
          </div>
          <div style={{ display: "grid", placeItems: "center" }}>
            {!matches && (
              <Stack direction="row" spacing={0} className="edit-button">
                <Button variant="link" onClick={handleMessageClick}>
                  <SVG.MessageIcon
                    style={{
                      color: "#274593",
                    }}
                    className="application-option-icon"
                  />
                  <span>Message</span>
                </Button>
              </Stack>
            )}
          </div>
        </div>
      </Stack>
    </Stack>
  );
}

export default VendorCard;

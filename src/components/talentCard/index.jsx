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
import { useState } from "react";
import { USER_ROLES } from "@utils/enum";
import { useSelector } from "react-redux";

function TalentCard({ talentDetails }) {
  const { role } = useSelector(({ auth }) => auth);

  const platform = Capacitor.getPlatform();
  const matches = useMediaQuery("(max-width:600px)");
  const navigate = useNavigate();

  const [numLines, setNumLines] = useState(3);

  const handleSeeMoreClick = () => {
    setNumLines((prevNumLines) =>
      prevNumLines === 3 ? talentDetails.description.length : 3,
    );
  };
  const textWrapperStyle = {
    display: "-webkit-box",
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
    WebkitLineClamp: numLines,
  };

  const handleMessageClick = async () => {
    const res = await getConversationIdByUserIdAPI({
      userId: talentDetails?.id,
    });
    if (res.remote === "success") {
      const conversationId = res.data.conversation_id;
      navigate(
        urlcat("/employer/chat", {
          conversion: conversationId,
          userId: talentDetails?.id,
        }),
      );
    }
  };
  return (
    <Stack
      className="border-recent"
      direction={{ xs: "column", lg: "row", sm: "row" }}
      spacing={{ xs: 2, lg: 2 }}
      alignItems={{ xs: "start", lg: "center", sm: "center" }}
      justifyContent={{ xs: "flex-start", lg: "space-between" }}
    >
      <Stack
        direction={{ xs: "column", lg: "row", sm: "row" }}
        spacing={{ xs: 2, lg: 2 }}
        alignItems={{ xs: "start", lg: "center", sm: "center" }}
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
            src={generateFileUrl(talentDetails.profilePicture?.path || "")}
            sx={{
              borderRadius: "0px !important",
              width:
                platform === "android" || platform === "ios" ? "40px" : "70px",
              height:
                platform === "android" || platform === "ios" ? "40px" : "70px",
            }}
          />
          {matches ? (
            <>
              {talentDetails.readyForChat && (
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
            </>
          ) : (
            ""
          )}
        </Box>
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
                to={urlcat("/job-seeker/:userId/profile", {
                  userId: talentDetails.id,
                })}
              >
                {talentDetails.name || talentDetails.email}
              </Link>
            </h4>
            <Divider
              sx={{
                display: { xs: "none", lg: "block" },
              }}
              orientation="vertical"
            />
            {talentDetails?.profile?.profileTitle && (
              <>
                <hr style={{ rotate: "90deg", width: "20px", height: "5px" }} />
                <Typography size="small">
                  {talentDetails?.profileTitle}
                </Typography>
              </>
            )}
            <p className="job-description card-description mt-1 mb-2">
              {talentDetails?.profile?.description}
            </p>
            <div className="recent-research" style={{ flexWrap: "wrap" }}>
              <span>{talentDetails.highestEducation}</span>
            </div>
          </Stack>
          <Stack
            direction="row"
            spacing={1}
            alignItems="center"
            sx={{ mb: 1 }}
            className="meets_div"
          >
            {talentDetails.country ? (
              <>
                <span className="meets">
                  <SVG.LocationIcon />
                </span>

                <span className="meets">
                  {talentDetails.country}, {talentDetails.city}
                </span>
              </>
            ) : (
              ""
            )}
          </Stack>
          <div className="recent-descrition">
            <Box className="job-description mt-1 mb-3">
              <div style={textWrapperStyle}>
                <p
                  dangerouslySetInnerHTML={{
                    __html: talentDetails.description,
                  }}
                ></p>
              </div>
              {talentDetails.description.length > 350 && (
                <button
                  style={{
                    border: "none",
                    cursor: "pointer",
                    background: "none",
                    color:
                      role !== USER_ROLES.jobSeeker ? "#274593" : "#fe7f00",
                  }}
                  onClick={handleSeeMoreClick}
                >
                  {numLines === 3 ? "See More" : "See Less"}
                </button>
              )}
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
              {talentDetails.skills.map((skill) => (
                <Chip
                  key={skill.id}
                  label={skill.skill.title}
                  className="chiplabel"
                  icon={<SVG.SchoolIcon />}
                />
              ))}
            </>
          </Stack>
        </div>
      </Stack>
      {!matches ? (
        <Stack direction="row" spacing={2} alignItems="center">
          {talentDetails.readyForChat && (
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
        </Stack>
      ) : (
        ""
      )}
    </Stack>
  );
}

export default TalentCard;

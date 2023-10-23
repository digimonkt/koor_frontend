import { SVG } from "../../assets/svg";
import { Avatar, Button, Chip, Stack } from "@mui/material";
import { generateFileUrl } from "../../utils/generateFileUrl";
import React from "react";
import urlcat from "urlcat";
import { Link, useNavigate } from "react-router-dom";
import { getConversationIdByUserIdAPI } from "../../api/chat";

function TalentCard({ talentDetails }) {
  const navigate = useNavigate();
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
        })
      );
    }
  };
  return (
    <Stack
      direction={{ xs: "column", lg: "row" }}
      spacing={{ xs: "2", lg: "2" }}
      alignItems={{ xs: "start", lg: "center" }}
      justifyContent={{ xs: "center", lg: "space-between" }}
      className="border-recent"
    >
      <Stack
        direction="row"
        spacing={2}
        alignItems={{ xs: "flex-start", lg: "row" }}
        sx={{ display: "flex", alignItems: "center" }}
      >
        <Avatar
          src={generateFileUrl(talentDetails.profilePicture?.path || "")}
          sx={{ width: "70px", height: "70px" }}
        />
        <div className="recent-content">
          <Stack
            direction={{ xs: "column", lg: "row" }}
            spacing={2}
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
            <p>{talentDetails.description}</p>
          </div>
          <Stack
            direction={{ xs: "column", lg: "row" }}
            spacing={1}
            alignItems={{ xs: "flex-start", lg: "center" }}
            sx={{ mb: 1, mt: 2 }}
            className="meets_div"
          >
            <>
              {talentDetails.skills.map((skill) => (
                <Chip
                  sx={{ width: { xs: "100%" } }}
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
      <Stack direction="row" spacing={2} alignItems="center">
        {talentDetails.readyForChat &&
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
        }
      </Stack>
    </Stack>
  );
}

export default TalentCard;

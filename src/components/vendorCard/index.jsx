import { SVG } from "../../assets/svg";
import { Avatar, Button, Chip, Divider, Stack } from "@mui/material";
import { generateFileUrl } from "../../utils/generateFileUrl";
import React, { useEffect, useState } from "react";
import urlcat from "urlcat";
import { Link, useNavigate } from "react-router-dom";
import { getConversationIdByUserIdAPI } from "@api/chat";

function VendorCard({ vendorDetails }) {
  const navigate = useNavigate();
  const [showFullText, setShowFullText] = useState(false);
  const [description, setDescription] = useState("");
  const maxLength = 300;
  const textToShow = showFullText
    ? description
    : description.slice(0, maxLength);
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
  const toggleText = () => {
    setShowFullText(!showFullText);
  };
  useEffect(() => {
    setDescription(vendorDetails.description);
  }, [vendorDetails]);
  return (
    <Stack
      direction={{ xs: "column", lg: "row" }}
      spacing={{ xs: "2", lg: "2" }}
      alignItems={{ xs: "start", lg: "center" }}
      justifyContent={{ xs: "center", lg: "space-between" }}
      className="border-recent"
    >
      <Stack direction="row" spacing={2} alignItems={"center"}>
        <Avatar
          src={generateFileUrl(vendorDetails.profilePicture?.path || "")}
          sx={{ width: "70px", height: "70px", borderRadius: "0px !important" }}
        />
        <div className="recent-content">
          <Stack
            direction="row"
            divider={<Divider orientation="vertical" flexItem />}
            spacing={2}
            flexWrap="wrap"
            alignItems="center"
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
            <div className="recent-research" style={{ flexWrap: "wrap" }}>
              <span>{vendorDetails.highestEducation}</span>
            </div>
          </Stack>
          <Stack
            direction="row"
            spacing={2}
            alignItems="center"
            sx={{ mb: 1 }}
            className="meets_div"
          >
            {vendorDetails.country ? (
              <>
                <div>
                  <span className="meets">
                    <SVG.LocationIcon />
                  </span>
                </div>
                <div>
                  <span className="meets">
                    {vendorDetails.country}, {vendorDetails.city}
                  </span>
                </div>
              </>
            ) : (
              ""
            )}
          </Stack>
          <div className="recent-descrition">
            <p>{textToShow}</p>
          </div>
          {description.length > maxLength && (
            <a onClick={toggleText} className="see_more_anchor">
              {showFullText ? "See less" : "See more"}
            </a>
          )}
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
      </Stack>
      <Stack direction="row" spacing={2} alignItems="center">
        <Stack direction="row" spacing={0} className="edit-button">
          {vendorDetails.readyForChat && (
            <Button variant="link" onClick={handleMessageClick}>
              <SVG.MessageIcon
                style={{
                  color: "#274593",
                }}
                className="application-option-icon"
              />
              <span>Message</span>
            </Button>
          )}
        </Stack>
      </Stack>
    </Stack>
  );
}

export default VendorCard;

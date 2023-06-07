import { SVG } from "@assets/svg";
import { Avatar, Box, Button, Chip, Divider, Stack } from "@mui/material";
import { generateFileUrl } from "@utils/generateFileUrl";
import React from "react";
import urlcat from "urlcat";
import { Link } from "react-router-dom";

function TalentCard({ talentDetails }) {
  return (
    <>
      <Stack
        direction={{ xs: "row", lg: "row" }}
        spacing={{ xs: "2", lg: "2" }}
        alignItems={{ xs: "flex-start", lg: "center" }}
        justifyContent={{ xs: "flex-start", lg: "space-between" }}
        className="border-recent"
      >
        <Stack
          direction={{ xs: "column", sm: "row", lg: "row" }}
          spacing={2}
          alignItems={{ xs: "flex-start", lg: "center", sm: "center" }}
        >
          <Avatar
            src={generateFileUrl(talentDetails.profilePicture?.path || "")}
            sx={{ width: "70px", height: "70px" }}
          />
          <Box className="recent-content">
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
                  to={urlcat("/job-seeker/:userId/profile", {
                    userId: talentDetails.id,
                  })}
                >
                  {talentDetails.name || talentDetails.email}
                </Link>
              </h4>
              <div className="recent-research" style={{ flexWrap: "wrap" }}>
                <span>{talentDetails.highestEducation}</span>
              </div>
            </Stack>
            <Stack
              direction="row"
              spacing={1}
              alignItems={"center"}
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
              direction={{ xs: "column", sm: "row", lg: "row" }}
              spacing={1}
              alignItems="center"
              sx={{ mb: 1, mt: 2 }}
              className="meets_div"
            >
              <>
                {talentDetails.skills.map((skill) => (
                  <Chip
                    key={skill.id}
                    label={skill.skill.title}
                    className="chiplabel"
                    icon={<SVG.SchoolIcon />}
                    sx={{ width: "100%" }}
                  />
                ))}
              </>
            </Stack>
          </Box>
        </Stack>
        <Stack
          direction="row"
          spacing={0}
          className="edit-button"
          sx={{ "@media(max-width:992px)": { marginLeft: "auto !important" } }}
        >
          <Button variant="link">
            <SVG.MessageIcon
              style={{
                color: "#274593",
              }}
              className="application-option-icon"
            />
            <span>Message</span>
          </Button>
        </Stack>
      </Stack>
    </>
  );
}

export default TalentCard;

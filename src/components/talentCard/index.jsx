import { SVG } from "@assets/svg";
import { Avatar, Button, Chip, Divider, Stack } from "@mui/material";
import React from "react";

function TalentCard({ talentDetails }) {
  return (
    <Stack
      direction={{ xs: "column", lg: "row" }}
      spacing={{ xs: "2", lg: "2" }}
      alignItems={{ xs: "start", lg: "center" }}
      justifyContent={{ xs: "center", lg: "space-between" }}
      className="border-recent"
    >
      <Stack direction="row" spacing={2} alignItems="center">
        <Avatar src={""} sx={{ width: "70px", height: "70px" }} />
        <div className="recent-content">
          <Stack
            direction="row"
            divider={<Divider orientation="vertical" flexItem />}
            spacing={2}
            flexWrap="wrap"
            alignItems="center"
            sx={{ mb: 1 }}
          >
            <h4>{talentDetails.name || talentDetails.email}</h4>
            <div className="recent-research" style={{ flexWrap: "wrap" }}>
              <span>Sales Increasing Expert</span>
            </div>
          </Stack>
          <Stack
            direction="row"
            spacing={2}
            alignItems="center"
            sx={{ mb: 1 }}
            className="meets_div"
          >
            <div>
              <span className="meets">
                <SVG.LocationIcon />
              </span>
            </div>
            <div>
              <span className="meets">France, Paris</span>
            </div>
          </Stack>
          <div className="recent-descrition">
            <p>
              Ut cursus mattis aliquam maecenas quis eget pellentesque id
              pellentesque. Netus sit hac at etiam. Ut amet arcu, massa
              suspendisse arcu, neque est. Volutpat a nulla ut amet, pretium,
              vitae duis. Quisque enim volutpat id pellentesque. Sed mattis vel
              morbi vitae, est ac Netus sit hac at etiam. Ut amet arcu, massa
              suspendisse arcu…
            </p>
          </div>
          <Stack
            direction="row"
            spacing={2}
            alignItems="center"
            sx={{ mb: 1, mt: 2 }}
            className="meets_div"
          >
            <div>
              <Chip
                label="Education"
                className="chiplabel"
                icon={<SVG.SchoolIcon />}
              />{" "}
            </div>
          </Stack>
        </div>
      </Stack>
      <Stack direction="row" spacing={2} alignItems="center">
        <Stack direction="row" spacing={0} className="edit-button">
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
    </Stack>
  );
}

export default TalentCard;

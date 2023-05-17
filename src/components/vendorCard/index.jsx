import { SVG } from "@assets/svg";
import { Avatar, Chip, Divider, Stack } from "@mui/material";
import { generateFileUrl } from "@utils/generateFileUrl";
import React from "react";
import urlcat from "urlcat";
import { Link } from "react-router-dom";

function VendorCard({ vendorDetails }) {
  return (
    <Stack
      direction={{ xs: "column", lg: "row" }}
      spacing={{ xs: "2", lg: "2" }}
      alignItems={{ xs: "start", lg: "center" }}
      justifyContent={{ xs: "center", lg: "space-between" }}
      className="border-recent"
    >
      <Stack direction="row" spacing={2} alignItems="center">
        <Avatar
          src={generateFileUrl(vendorDetails.profilePicture?.path || "")}
          sx={{ width: "70px", height: "70px" }}
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
            <p>{vendorDetails.description}</p>
          </div>
          <Stack
            direction="row"
            spacing={2}
            alignItems="center"
            sx={{ mb: 1, mt: 2 }}
            className="meets_div"
          >
            <div>
              {vendorDetails.skills.map((skill) => (
                <Chip
                  key={skill.id}
                  label={skill.skill.title}
                  className="chiplabel"
                  icon={<SVG.SchoolIcon />}
                />
              ))}
            </div>
          </Stack>
        </div>
      </Stack>
      <Stack direction="row" spacing={2} alignItems="center">
        <Stack direction="row" spacing={0} className="edit-button">
          {/* <Button variant="link">
            <SVG.MessageIcon
              style={{
                color: "#274593",
              }}
              className="application-option-icon"
            />
            <span>Message</span>
          </Button> */}
        </Stack>
      </Stack>
    </Stack>
  );
}

export default VendorCard;

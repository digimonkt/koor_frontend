import { Avatar, Button, Divider } from "@mui/material";
import { Stack } from "@mui/system";
import React from "react";
import { useNavigate } from "react-router-dom";
import { SVG } from "@assets/svg";

const ApplicationCard = ({
  image,
  title,
  subTitle,
  requirement,
  chiplabel,
  description,
  isDisabled,
  isMessagable,
}) => {
  // navigate
  const navigate = useNavigate();

  // handle navigation
  const handleNavigate = () => {
    navigate("/employer/manage-jobs/applicant-details");
  };

  return (
    <Stack
      direction={{ xs: "column", lg: "row" }}
      spacing={{ xs: "2", lg: "2" }}
      alignItems={{ xs: "start", lg: "center" }}
      justifyContent={{ xs: "center", lg: "space-between" }}
      className="border-recent"
    >
      <Stack direction="row" spacing={2} alignItems="center">
        <Avatar src={image} sx={{ width: "70px", height: "70px" }} />{" "}
        <div className="recent-content">
          <Stack
            direction="row"
            divider={<Divider orientation="vertical" flexItem />}
            spacing={2}
            alignItems="center"
            sx={{ mb: 1 }}
          >
            <h4>{title}</h4>
            <div className="recent-research">{subTitle}</div>
          </Stack>
          <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 1 }}>
            <span className="meets">{requirement}</span> {chiplabel}
          </Stack>
          <div className="recent-descrition">
            <p>{description}</p>
          </div>
        </div>
      </Stack>
      <Stack direction="row" spacing={0} className="edit-button">
        <Button variant="link" disabled={isDisabled}>
          {<SVG.StarIcon />} <span>Shortlist</span>
        </Button>
        <Button onClick={handleNavigate} variant="link">
          {<SVG.OpenNewIcon />} <span>View</span>
        </Button>
        {isMessagable && (
          <Button variant="link">
            {<SVG.MessageIcon style={{ color: "#274593" }} />}{" "}
            <span>Message</span>
          </Button>
        )}
      </Stack>
    </Stack>
  );
};

export default ApplicationCard;

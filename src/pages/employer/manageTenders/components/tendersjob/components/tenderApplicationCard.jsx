import { SVG } from "@assets/svg";
import { Avatar, Button, Chip, Stack, Divider } from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MANAGE_TENDERS_ITEMS } from "./helper";

const TenderApplicationCard = () => {
  // state management
  const [isActive, setIsActive] = useState(false);

  return (
    <>
      <Stack
        direction="row"
        spacing={2}
        justifyContent="space-between"
        alignItems="center"
        sx={{ mt: 2 }}
      >
        <div className="toggle-application">
          Applications{" "}
          <Chip
            label="3"
            sx={{
              background: "#D5E3F7",
              fontSize: "14px",
              fontFamily: "Poppins",
              color: "#274593",
              mx: 2,
            }}
          />{" "}
          <span
            onClick={() => setIsActive(!isActive)}
            className={`arrowjobs ${isActive ? "active" : ""}`}
          >
            {<SVG.ArrowUpIcon />}
          </span>
        </div>
        {isActive && (
          <Stack direction={{ xs: "column", lg: "row" }} spacing={1}>
            <Chip
              className="chip-cricle"
              label={
                <>
                  Shortlisted <span className="cricle">2</span>
                </>
              }
              icon={<SVG.StarIcon />}
            />
            <Chip
              className="chip-cricle"
              label={
                <>
                  Planned interviews <span className="cricle">1</span>
                </>
              }
              icon={<SVG.EventIcon />}
            />
            <Chip
              className="chip-cricle"
              label={
                <>
                  Rejected <span className="cricle">1</span>
                </>
              }
              icon={<SVG.RejectIcon />}
            />
            <Chip
              className="chip-cricle"
              label={
                <>
                  Blacklisted <span className="cricle">1</span>
                </>
              }
              icon={<SVG.RejectIcon />}
            />
          </Stack>
        )}
      </Stack>
      {isActive && (
        <div className="recent-box mt-3">
          {MANAGE_TENDERS_ITEMS.map((item, index) => (
            <Stack
              key={index}
              direction={{ xs: "column", lg: "row" }}
              spacing={{ xs: "2", lg: "2" }}
              alignItems={{ xs: "start", lg: "center" }}
              justifyContent={{ xs: "center", lg: "space-between" }}
              className="border-recent"
            >
              <Stack direction="row" spacing={2} alignItems="center">
                <Avatar src={item.img} sx={{ width: "70px", height: "70px" }} />{" "}
                <div className="recent-content">
                  <Stack
                    direction="row"
                    divider={<Divider orientation="vertical" flexItem />}
                    spacing={2}
                    alignItems="center"
                    sx={{ mb: 1 }}
                  >
                    <Link to="/manage-jobs/user-details">
                      <h4>{item.title}</h4>
                    </Link>
                    <div className="recent-research">
                      <span>30 m ago</span>
                    </div>
                  </Stack>
                  <Stack
                    direction="row"
                    spacing={1}
                    alignItems="center"
                    sx={{ mb: 1 }}
                  ></Stack>
                  <div className="recent-descrition">
                    <p>{item.description}</p>
                  </div>
                </div>
              </Stack>
              <Stack direction="row" spacing={0} className="edit-button">
                <Button variant="link">
                  <SVG.EventIcon /> <span>{item.plan}</span>
                </Button>
                <Button variant="link">
                  <SVG.StarIcon /> <span>Shortlisted</span>
                </Button>
                <Button variant="link">
                  <SVG.RejectIcon /> <span>Reject</span>
                </Button>
                <Button variant="link">
                  <SVG.OpenNewIcon /> <span>View</span>
                </Button>
                <Button variant="link">
                  {<SVG.MessageIcon />} <span>Message</span>
                </Button>
              </Stack>
            </Stack>
          ))}
        </div>
      )}
    </>
  );
};

export default TenderApplicationCard;

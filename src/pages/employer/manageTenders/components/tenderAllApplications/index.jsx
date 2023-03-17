import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  Stack,
  styled,
} from "@mui/material";
import React, { useState } from "react";
import { RECENT_ITEMS } from "../recentHelper";
import { SVG } from "@assets/svg";
export const ListItem = styled("li")(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

const ApplicationsJobs = () => {
  const [chipData, setChipData] = useState([
    { key: 0, label: "Shortlisted" },
    { key: 1, label: "Planned interviews" },
    { key: 2, label: "Rejected" },
    { key: 3, label: "Blacklisted" },
  ]);
  const handleDelete = (chipToDelete) => () => {
    setChipData((chips) =>
      chips.filter((chip) => chip.key !== chipToDelete.key)
    );
  };
  return (
    <>
      <div className="py-3">
        <Box
          sx={{
            display: "flex",

            flexWrap: "wrap",
            listStyle: "none",
            p: 0.5,
            m: 0,
          }}
          component="ul"
        >
          {chipData.map((data) => {
            return (
              <ListItem key={data.key}>
                <Chip
                  label={data.label}
                  onDelete={data.label !== "React" && handleDelete(data)}
                />
              </ListItem>
            );
          })}
        </Box>
        <div className="mb-3">
          <Stack direction="row" spacing={0} className="searchjob-box">
            <input className="jobsearch" placeholder="Search your applicants" />
            <button className="jobt-btn-search">{<SVG.SearchIConJob />}</button>
          </Stack>
        </div>
        <Card
          sx={{
            "&.MuiCard-root": {
              boxShadow: "0px 15px 40px rgba(0, 0, 0, 0.05)",
              borderRadius: "10px",
              mb: 3,
            },
          }}
        >
          <CardContent
            sx={{
              "&.MuiCardContent-root": {
                padding: "25px 25px 25px",
              },
            }}
            className="recent-box"
          >
            {RECENT_ITEMS.map((item, index) => (
              <Stack
                key={index}
                direction={{ xs: "column", lg: "row" }}
                spacing={{ xs: "2", lg: "2" }}
                alignItems={{ xs: "start", lg: "center" }}
                justifyContent={{ xs: "center", lg: "space-between" }}
                className="border-recent"
              >
                <Stack direction="row" spacing={2} alignItems="center">
                  <Avatar
                    src={item?.img}
                    sx={{ width: "70px", height: "70px" }}
                  />
                  <div className="recent-content">
                    <Stack
                      direction="row"
                      divider={<Divider orientation="vertical" flexItem />}
                      spacing={2}
                      alignItems="center"
                      sx={{ mb: 1 }}
                    >
                      <h4>{item?.title}</h4>
                      <div className="recent-research">{item?.subtitle}</div>
                    </Stack>
                    <Stack
                      direction="row"
                      spacing={2}
                      alignItems="center"
                      sx={{ mb: 1 }}
                    >
                      <span className="meets">{item?.requirement}</span>{" "}
                      {/* {item?.chiplabel} */}
                    </Stack>
                    <div className="recent-descrition">
                      <p>{item?.description}</p>
                    </div>
                  </div>
                </Stack>
                <Stack direction="row" spacing={0} className="edit-button">
                  <Button variant="link">
                    {<SVG.StarIcon />} <span>Shortlist</span>
                  </Button>
                  <Button variant="link">
                    {<SVG.OpenNewIcon />} <span>View</span>
                  </Button>
                  <Button variant="link">
                    {<SVG.MessageIcon />} <span>Message</span>
                  </Button>
                </Stack>
              </Stack>
            ))}
          </CardContent>
        </Card>
      </div>
    </>
  );
};
export default ApplicationsJobs;

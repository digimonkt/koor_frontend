import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  Grid,
  Stack,
} from "@mui/material";
import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Cbutton from "../button";
import { Link } from "react-router-dom";
import { MANAGE_TENDERS_ITEMS } from "../helper";
import { SVG } from "@assets/svg";

const ListItem = styled("li")(({ theme }) => ({
  margin: theme.spacing(0.5),
}));
export const ChipBox = styled(Chip)`
  &.MuiChip-root {
    padding-left: 16px;
    padding-right: 16px;
    background: #f0f0f0;
    font-family: "Poppins";
    font-size: 12px;
    font-weight: 400;
    color: #121212;
  }
`;

const Tenders = () => {
  const [chipData, setChipData] = React.useState([
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
  const managetenderlist = [
    {
      title: "Request for quotation for aluminium asset tags",
    },
    {
      title:
        "Invitation to tenders and registration of suppliers for good.services and works. ",
    },
  ];
  const [isActive, setIsActive] = useState(false);
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
                  onDelete={
                    data.label === "React" ? undefined : handleDelete(data)
                  }
                />
              </ListItem>
            );
          })}
        </Box>
        <div className="mb-3">
          <Stack direction="row" spacing={0} className="searchjob-box">
            <input className="jobsearch" placeholder="Search Tenders" />
            <button className="jobt-btn-search">
              <SVG.SearchIConJob />
            </button>
          </Stack>
        </div>
        {managetenderlist.map((items, index) => (
          <Card
            key={index}
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
            >
              <Grid container spacing={2}>
                <Grid item xl={9} lg={9} xs={12}>
                  <div className="my-jobs">
                    <h2>{items.title}</h2>
                    <p>
                      Urna nibh non non consequat massa malesuada interdum. Est
                      ipsum, donec montes, gravida nisi maecenas rhoncus et.
                      Vestibulum diam eget non non, duis. Ipsum, dolor erat ut a
                      a molestie blandit aliquam et. Vulputate viverra facilisis
                      morbi sed quis amet, vulputate sed. Viverra viverra nec
                      quis commodo arcu…
                    </p>
                    <Stack
                      direction={{ xs: "column", sm: "row" }}
                      spacing={{ xs: 1, sm: 1, md: 1 }}
                      sx={{ width: "100%" }}
                    >
                      <ChipBox
                        label={[
                          <>
                            Sector: <b className="font-w">Public</b>
                          </>,
                        ]}
                        icon={<SVG.SellIcon />}
                      />
                      <ChipBox
                        label={[
                          <>
                            Category: <b className="font-w">Services</b>
                          </>,
                        ]}
                        icon={<SVG.CategoryIcon />}
                      />
                    </Stack>
                    <Stack
                      direction="row"
                      spacing={2}
                      className="mt-3"
                      divider={<Divider orientation="vertical" flexItem />}
                    >
                      <Stack direction="row" spacing={1}>
                        <span>{<SVG.BriefcaseIcon />}</span>{" "}
                        <div className="textdes">
                          Company: <span>August 28, 2022</span>
                        </div>
                      </Stack>
                    </Stack>
                  </div>
                </Grid>
                <Grid item xl={3} lg={3} xs={12}>
                  <div className="text-end">
                    <Cbutton
                      variant="outlined"
                      sx={{
                        "&.MuiButton-outlined": {
                          borderRadius: "5px",
                          border: "0px",
                          color: "#fff",
                          fontWeight: "400",
                          fontSize: "12px",
                          fontFamily: "Poppins",
                          padding: "5px 10px",
                          background: "#EBB938",
                          textTransform: "capitalize",
                          whiteSpace: "nowrap",
                        },
                      }}
                    >
                      2 days left
                    </Cbutton>
                  </div>
                  <Stack
                    direction="row"
                    spacing={2}
                    justifyContent="end"
                    alignItems="center"
                    divider={<Divider orientation="vertical" flexItem />}
                    className="py-2"
                    sx={{ minHeight: "87%" }}
                  >
                    <div className="pricebox py-3"></div>
                    <div className="job-button-card py-3">
                      <button>
                        {<SVG.PauseIcon />}
                        <span className="d-block">Hold</span>
                      </button>
                      <button>
                        {<SVG.EditIcon />}
                        <span className="d-block">Edit</span>
                      </button>
                    </div>
                  </Stack>
                </Grid>
              </Grid>
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
                        <Avatar
                          src={item.img}
                          sx={{ width: "70px", height: "70px" }}
                        />{" "}
                        <div className="recent-content">
                          <Stack
                            direction="row"
                            divider={
                              <Divider orientation="vertical" flexItem />
                            }
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
                      <Stack
                        direction="row"
                        spacing={0}
                        className="edit-button"
                      >
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
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
};
export default Tenders;

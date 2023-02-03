import {
  Box,
  Card,
  CardContent,
  Chip,
  Divider,
  Grid,
  Stack,
} from "@mui/material";
import React from "react";
import { styled } from "@mui/material/styles";
import { SVG } from "@assets/svg";
import { SolidButton } from "@components/button";
import TenderApplicationCard from "./components/tenderApplicationCard";
import { ChipBox } from "./style";

const ListItem = styled("li")(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

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
                    <SolidButton title={"2 days left"} />
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
              <TenderApplicationCard />
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
};
export default Tenders;

import {
  Box,
  Card,
  CardContent,
  Chip,
  Divider,
  FormControl,
  FormGroup,
  Grid,
  IconButton,
  Input,
  Stack,
  Typography,
} from "@mui/material";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import NotificationsOffIcon from "@mui/icons-material/NotificationsOff";

import React, { useState, useEffect } from "react";
import { CheckboxInput, SelectInput } from "@components/input";
import { JobFormControl } from "@pages/jobs/postJobs/style";
import { SVG } from "@assets/svg";
import { OutlinedButton } from "@components/button";
import styles from "./advanceFilter.module.css";

export default function webfiltter() {
  const [isSelected, setIsSelected] = useState(false);
  const [isvalue, setIsValue] = useState("");
  const [iscountry, setIsCountry] = useState("");
  const [isCity, setIsCity] = useState("");
  const [isTime, setIsTime] = useState("");
  const handleChangeTime = (event) => {
    setIsTime(event.target.value);
  };
  const handleChangeCity = (event) => {
    setIsCity(event.target.value);
  };
  const handleChange = (event) => {
    setIsValue(event.target.value);
  };
  const handleChangeCountry = (event) => {
    setIsCountry(event.target.value);
  };
  const serchItems = [
    {
      id: 1,
      label: "Initial search",
    },
    {
      id: 2,
      label: "France, $3K +",
    },
    { id: 3, label: "Whole Europe, Full-time $5+" },
    { id: 4, label: "My city" },
  ];
  const handleClick = (id) => {
    const found = serchItems.find((item) => {
      return item.id === id;
    });

    if (found) {
      setIsSelected(found.label);
    }
  };

  useEffect(() => {
    console.log({ isSelected });
  }, [isSelected]);
  const options = [
    {
      id: 1,
      label: "Graphic Design",
      value: "Graphic Design",
    },
  ];
  const country = [
    {
      id: 1,
      label: "Netherlands",
      value: "Netherlands",
    },
    {
      id: 2,
      label: "India",
      value: "India",
    },
  ];
  const City = [
    {
      id: 1,
      label: "Bhopal",
      value: "Bhopal",
    },
  ];
  const timeing = [
    {
      id: 1,
      label: "6-Day week",
      value: "6-Day week",
    },
  ];
  return (
    <>
      <Card
        sx={{
          boxShadow: " 0px 15px 40px rgba(0, 0, 0, 0.05)",
          borderRadius: "10px",
        }}
      >
        <CardContent>
          <Stack direction={"column"} spacing={2.5}>
            <Typography
              variant="h6"
              sx={{ fontFamily: "Poppins", fontSize: "16px", margin: "0px" }}
            >
              Saved searches:
            </Typography>
            <Stack direction={"row"} spacing={0} flexWrap={"wrap"}>
              {serchItems.map((item) => (
                <Chip
                  sx={{
                    fontFamily: "Poppins",
                    padding: "5px",
                    height: "auto",
                    background:
                      isSelected === item.label ? "#FEEFD3" : "#F0F0F0",
                    borderRadius: "73px",
                    border: `1px solid ${
                      isSelected === item.label ? "#EEA23D" : "transparent"
                    }`,
                    color: isSelected === item.label ? "#121212" : "#848484",
                    fontSize: "12px",
                    fontWeight: 500,
                    marginRight: "5px",
                    marginBottom: "5px",
                    "&:hover": {
                      borderColor: "#EEA23D",
                      background: "#FEEFD3",
                      color: "#121212",

                      boxShadow: "none",
                    },
                    "& .MuiChip-icon": { color: "#fff" },
                  }}
                  size="large"
                  key={item}
                  icon={
                    isSelected === item.label ? (
                      <IconButton
                        size="small"
                        sx={{
                          background: "#EEA23D",
                          width: "24px",
                          height: "24px",
                        }}
                      >
                        <NotificationsActiveIcon sx={{ fontSize: "16px" }} />
                      </IconButton>
                    ) : (
                      <IconButton
                        size="small"
                        sx={{
                          background: "#848484",
                          width: "24px",
                          height: "24px",
                        }}
                      >
                        <NotificationsOffIcon sx={{ fontSize: "16px" }} />
                      </IconButton>
                    )
                  }
                  label={item.label}
                  onClick={() => {
                    handleClick(item.id);
                  }}
                />
              ))}
            </Stack>
            <Divider
              sx={{
                marginTop: "0px",
                borderColor: "#CACACA",
                paddingTop: "0px !important",
              }}
            />
            <FormControl sx={{ m: 1 }} className="filter_input">
              <SelectInput
                title="Category"
                defaultValue="Graphic Design"
                placeholder="Select a Job category"
                options={options}
                name={"jobCategories"}
                value={isvalue}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl sx={{ m: 1 }} className="filter_input">
              <SelectInput
                title="Country"
                defaultValue=""
                placeholder="Select country"
                options={country}
                value={iscountry}
                onChange={handleChangeCountry}
              />
            </FormControl>
            <FormControl sx={{ m: 1 }} className="filter_input">
              <SelectInput
                title="City"
                defaultValue=""
                placeholder="Choose city"
                options={City}
                value={isCity}
                onChange={handleChangeCity}
              />
            </FormControl>
            <label>Job type</label>
            <FormGroup sx={{ marginLeft: "7px" }} className="filter_input">
              <JobFormControl control={<CheckboxInput />} label="Part Time" />
              <JobFormControl control={<CheckboxInput />} label="Full Time" />
              <JobFormControl control={<CheckboxInput />} label="Contract" />
            </FormGroup>
            <FormControl sx={{ m: 1 }} className="filter_input">
              <SelectInput
                title="Timing"
                defaultValue=""
                placeholder="Choose time"
                options={timeing}
                value={isTime}
                onChange={handleChangeTime}
              />
            </FormControl>
            <FormControl sx={{ m: 1 }} className="filter_input">
              <label style={{ display: "block", marginBottom: "5px" }}>
                Salary
              </label>
              <Grid container spacing={2}>
                <Grid item xs={12} lg={6}>
                  <Stack
                    direction={"row"}
                    spacing={1}
                    alignItems={"center"}
                    sx={{
                      borderRadius: "10px",
                      background: "#F0F0F0",
                      fontFamily: "Poppins",
                      fontSize: "14px",
                    }}
                  >
                    <Box
                      component={"span"}
                      sx={{
                        background: " #CACACA",
                        borderRadius: "10px",
                        padding: "10px",
                        opacity: "0.5",
                        color: "#121212",
                      }}
                    >
                      USD
                    </Box>
                    <Input
                      placeholder="From"
                      sx={{
                        "&.MuiInput-root": {
                          fontWeight: "400",
                          fontFamily: "Poppins",
                          "&::after": { display: "none" },
                          "&::before": { display: "none" },
                        },
                      }}
                    />
                  </Stack>
                </Grid>
                <Grid item lg={6}>
                  <Input
                    value={"3500"}
                    sx={{
                      "&.MuiInput-root": {
                        background: "#F0F0F0",
                        padding: "4px 15px",
                        borderRadius: "10px",
                        fontWeight: "500",
                        fontFamily: "Poppins",
                        color: "#121212",
                        "&::after": { display: "none" },
                        "&::before": { display: "none" },
                      },
                    }}
                  />
                </Grid>
              </Grid>
            </FormControl>
            <Divider
              sx={{ borderColor: "#CACACA", paddingTop: "0px !important" }}
            />
            <Box
              sx={{
                fontFamily: "Poppins",
                fontSize: "14px",
                color: "#121212",
                textAlign: "center",
              }}
            >
              456 jobs found
            </Box>
            <Stack
              direction={"row"}
              alignItems={"center"}
              justifyContent={"center"}
              spacing={1}
              sx={{
                fontSize: "16px",
                fontFamily: "Bahnschrift",
                fontWeight: "600",
                textTransform: "uppercase",
                letterSpacing: "0.03em",
                color: "#848484",
              }}
            >
              <SVG.Favorite />
              <span>Save search</span>
            </Stack>
            <Box
              sx={{ justifyContent: "center" }}
              className={`${styles.savesearch}`}
            >
              <OutlinedButton
                sx={{ color: "#EEA23D", borderColor: "#EEA23D" }}
                title={
                  <>
                    <span>
                      <SVG.SearchIcon style={{ color: "#EEA23D" }} />
                    </span>
                    Search
                  </>
                }
                type="submit"
              />
            </Box>
          </Stack>
        </CardContent>
      </Card>
    </>
  );
}

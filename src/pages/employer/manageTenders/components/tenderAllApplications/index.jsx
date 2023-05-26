/* eslint-disable no-unused-vars */
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
 jio
    </>
  );
};
export default ApplicationsJobs;

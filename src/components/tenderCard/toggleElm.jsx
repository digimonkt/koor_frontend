import React from "react";
import Clips from "./clips";
import PostInfo from "./postInfo";
import { Box } from "@mui/material";

const ToggleElm = ({ tenderDetails, selfTender, sx }) => {
  return (
    <Box sx={sx}>
      <Clips tenderDetails={tenderDetails} />
      <PostInfo tenderDetails={tenderDetails} selfTender={selfTender} />
    </Box>
  );
};

export default ToggleElm;

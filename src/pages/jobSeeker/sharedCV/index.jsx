import { shareResumeAPI } from "@api/jobSeeker";
import { SVG } from "@assets/svg";
import Loader from "@components/loader";
import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function SharedCVComponent() {
  const [isLoading, setIsLoading] = useState(true);
  const { employerId } = useParams();

  useEffect(() => {
    const shareCV = async () => {
      await shareResumeAPI(employerId).then(() => setIsLoading(false));
    };
    shareCV();
  }, []);

  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "10px",
        overflow: "none",
      }}
    >
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <SVG.CheckIcon height="24px" />
          <Typography variant="h6" sx={{ fontFamily: "Poppins" }}>
            CV shared successfully
          </Typography>
        </>
      )}
    </Box>
  );
}

export default SharedCVComponent;

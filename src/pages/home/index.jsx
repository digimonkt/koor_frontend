import { IMAGES } from "@assets/images";
import { Box } from "@mui/material";

import { setIstHomePage } from "@redux/slice/user";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

const Home = () => {
  // redux dispatch
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setIstHomePage(true));

    return () => {
      dispatch(setIstHomePage(false));
    };
  }, []);

  return (
    <Box sx={{ marginTop: "68px" }}>
      <Box sx={{ background: "#fff", "& img": { maxWidth: "100%" } }}>
        <img src={IMAGES.Banner} alt="" />
      </Box>
    </Box>
  );
};

export default Home;

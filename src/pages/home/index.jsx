import { Box, Container } from "@mui/material";
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
      <Container>Home</Container>
    </Box>
  );
};

export default Home;

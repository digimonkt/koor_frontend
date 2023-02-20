import { CircularProgress, Fade } from "@mui/material";
import React from "react";

function Loader({ loading, style }) {
  return (
    <Fade
      in={loading}
      style={{
        transitionDelay: loading ? "200ms" : "0ms",
        ...(style || {}),
      }}
      unmountOnExit
    >
      <CircularProgress />
    </Fade>
  );
}

export default Loader;

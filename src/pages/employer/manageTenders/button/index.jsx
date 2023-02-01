import { Button } from "@mui/material";
import React from "react";
const Cbutton = (props) => {
  return (
    <>
      <Button {...props}>{props.children}</Button>
    </>
  );
};
export default Cbutton;

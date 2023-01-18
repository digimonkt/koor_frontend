import { CardContent } from "@mui/material";
import React from "react";

function CardContentComponent({ children, ...rest }) {
  return (
    <CardContent
      sx={{
        "&.MuiCardContent-root": {
          padding: "30px",
        },
      }}
      {...rest}
    >
      {children}
    </CardContent>
  );
}

export default CardContentComponent;

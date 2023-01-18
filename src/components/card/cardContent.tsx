import { CardContent, CardContentTypeMap } from "@mui/material";
import { DefaultComponentProps } from "@mui/material/OverridableComponent";
import React from "react";

interface ICardContent extends DefaultComponentProps<CardContentTypeMap> {
  children: React.ReactNode | React.ReactNode[];
}
function CardContentComponent({ children, ...rest }: ICardContent) {
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

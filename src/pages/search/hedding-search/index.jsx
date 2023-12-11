import { SVG } from "@assets/svg";
import { IconButton, Stack } from "@mui/material";

import { Link } from "react-router-dom";

const HeaddingSearch = (props) => {
  return (
    <>
      <Stack
        direction={"row"}
        alignItems={"center"}
        spacing={2}
        justifyContent={"space-between"}
        sx={{
          mb: 1,
          "& h1": {
            fontFamily: "Bahnschrift",
            fontSize: "22px",
            fontWeight: "600",
          },
        }}
      >
        <h1>
          {props.title}
          {props.count}
        </h1>
        <Stack direction={"row"} spacing={0.5} alignItems={"center"}>
          {/* <IconButton LinkComponent={Link} to="/Setting">
            <SVG.Settings />
          </IconButton> */}
          {props.icon}
          <IconButton LinkComponent={Link} to="/notification">
            <SVG.NotificationIcon />
          </IconButton>
        </Stack>
      </Stack>
    </>
  );
};
export default HeaddingSearch;

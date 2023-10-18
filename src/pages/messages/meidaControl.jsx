import { Menu, MenuItem, Stack } from "@mui/material";

const MediaControl = (props) => {
  return (
    <>
      <Menu
        anchorEl={props.anchorElMedia}
        open={Boolean(props.anchorElMedia)}
        onClose={props.handleMenuCloseMedia}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        PaperProps={{
          style: {
            borderRadius: "10px",
            boxShadow: "0px 2px 6px 0px rgba(0, 0, 0, 0.15)",
          },
        }}
      >
        {props.option.map((option) => (
          <MenuItem
            key={option}
            onClick={props.handleMenuCloseMedia}
            sx={{ color: option.color }}
          >
            <Stack direction={"row"} alignItems="center" spacing={0.4}>
              {option.icon}
              <span>{option.option}</span>
            </Stack>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};
export default MediaControl;

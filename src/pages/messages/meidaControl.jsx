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
        sx={{
          "& .MuiList-root": {
            padding: "12px",
          },
        }}
        PaperProps={{
          style: {
            borderRadius: "10px",
            boxShadow: "0px 2px 6px 0px rgba(0, 0, 0, 0.15)",
            width: "126px",
          },
        }}
      >
        {props.option.map((option) => (
          <MenuItem
            key={option}
            onClick={props.handleMenuCloseMedia}
            sx={{
              color: option.color,
              borderBottom: "1px solid #F0F0F0",
              fontSize: "12px",
              fontFamily: "Poppins",
              fontWeight: "400",
              padding: "8px",
              "&:last-child": {
                borderBottom: "0px",
              },
              "& svg": { width: "20px", height: "20px" },
            }}
          >
            <Stack direction={"row"} alignItems="center" spacing={1.5}>
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

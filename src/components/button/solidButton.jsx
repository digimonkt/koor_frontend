import { Button } from "@mui/material";

function SolidButtonComponent({
  className,
  title,
  onClick,
  isBlueButton,
  ...rest
}) {
  return (
    <Button
      variant="outlined"
      sx={{
        "&.MuiButton-outlined": {
          borderRadius: "5px",
          border: "0px",
          color: "#fff",
          fontWeight: "400",
          fontSize: "12px",
          fontFamily: "Poppins",
          padding: "5px 10px",
          background: "#EBB938",
          textTransform: "capitalize",
          whiteSpace: "nowrap",
        },
      }}
      {...rest}
    >
      {title}
    </Button>
  );
}

export default SolidButtonComponent;

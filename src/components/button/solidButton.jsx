import { Button } from "@mui/material";

function SolidButtonComponent({
  className,
  title,
  onClick,
  isBlueButton,
  color,
  ...rest
}) {
  return (
    <Button
      variant="outlined"
      sx={{
        "&.MuiButton-outlined": {
          borderRadius: "5px",
          border: "0px",
          color: "white",
          fontWeight: "400",
          fontSize: "12px",
          fontFamily: "Poppins",
          padding: "5px 10px",
          background: color,
          textTransform: "capitalize",
          whiteSpace: "nowrap",
        },
      }}
      {...rest}
      className={className}>
      {title}
    </Button>
  );
}

export default SolidButtonComponent;

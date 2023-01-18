import { Button } from "@mui/material";

function FilledButtonComponent({
  className,
  title,
  onClick,
  isBlueButton,
  ...rest
}) {
  return (
    <Button
      className={`outline-login ${className} ${isBlueButton && "bluebtn"}`}
      onClick={(e) => (onClick ? onClick(e) : null)}
      {...rest}
    >
      {title}
    </Button>
  );
}

export default FilledButtonComponent;

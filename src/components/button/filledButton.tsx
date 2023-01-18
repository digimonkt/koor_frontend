import { Button } from "@mui/material";
import { IButton } from "src/components/button";

function FilledButtonComponent({
  className,
  title,
  onClick,
  isBlueButton,
  ...rest
}: IButton) {
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

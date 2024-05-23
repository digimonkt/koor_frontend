import { Button } from "@mui/material";

function FilledButtonComponent({
  className,
  disabled = false,
  title,
  onClick,
  ...rest
}) {
  return (
    <Button
      disabled={disabled}
      className={`outline-login ${className}`}
      onClick={(e) => (onClick ? onClick(e) : null)}
      {...rest}
    >
      {title}
    </Button>
  );
}

export default FilledButtonComponent;

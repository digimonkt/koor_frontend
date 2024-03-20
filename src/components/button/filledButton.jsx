import { Button } from "@mui/material";
import { USER_ROLES } from "../../utils/enum";
import { useSelector } from "react-redux";

function FilledButtonComponent({
  className,
  disabled = false,
  title,
  onClick,
  ...rest
}) {
  const { role } = useSelector((state) => state.auth);

  return (
    <Button
      disabled={disabled}
      className={`outline-login ${className} ${
        role !== USER_ROLES.jobSeeker && "bluebtn"
      }`}
      onClick={(e) => (onClick ? onClick(e) : null)}
      {...rest}
    >
      {title}
    </Button>
  );
}

export default FilledButtonComponent;

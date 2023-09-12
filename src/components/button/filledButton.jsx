import { Button } from "@mui/material";
import { USER_ROLES } from "@utils/enum";
import { useSelector } from "react-redux";

function FilledButtonComponent({ className, title, onClick, ...rest }) {
  const { role } = useSelector((state) => state.auth);

  return (
    <Button
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

import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import { BOTOM_BAR_NAVBAR, generateColor } from "@utils/constants/constants";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";

const BottomBar = () => {
  const { role } = useSelector((state) => state.auth);
  const location = useLocation();
  const generatNavbar = (role) => {
    const item = BOTOM_BAR_NAVBAR(role);
    return item.map((item, index) => {
      return (
        <BottomNavigationAction
          key={index}
          label={item.label}
          LinkComponent={Link}
          to={item.address}
          icon={item.icon}
          sx={{
            "&.MuiBottomNavigationAction-root": {
              color:
                location.pathname.includes(item.address) && role
                  ? generateColor(role)
                  : "#848484",
              "& svg": {
                fill:
                  location.pathname.includes(item.address) && role
                    ? generateColor(role)
                    : "#848484",
              },
            },
            "& .MuiBottomNavigationAction-label": {
              fontSize: "12px",
              fontWeight: "400",
              fontFamily: "Poppins",
              marginTop: "5px",
            },
          }}
        />
      );
    });
  };

  return (
    <BottomNavigation
      sx={{
        position: "fixed",
        bottom: "0px",
        left: 0,
        right: 0,
        height: "auto",
        padding: "15px 5px ",
        borderTop: "1px solid #848484",
        zIndex: 999,
      }}
      showLabels
    >
      {role && generatNavbar(role)}
    </BottomNavigation>
  );
};
export default BottomBar;

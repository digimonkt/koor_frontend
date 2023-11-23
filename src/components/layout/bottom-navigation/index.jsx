import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import { BOTOM_BAR_NAVBAR } from "@utils/constants/constants";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const BottomBar = () => {
  const { role } = useSelector((state) => state.auth);

  const generatNavbar = (role) => {
    const item = BOTOM_BAR_NAVBAR(role);
    return item.map((item, index) => {
      if (!item.address) {
        console.log({ item });
      }
      return (
        <BottomNavigationAction
          key={index}
          label={item.label}
          LinkComponent={Link}
          to={item.address}
          icon={item.icon}
        />
      );
    });
  };

  return (
    <>
      <BottomNavigation
        sx={{
          position: "fixed",
          bottom: "20px",
          left: 0,
          right: 0,
          height: "auto",
          padding: "15px 0px",
          borderTop: "1px solid #848484",
          zIndex: 999,

          "& .MuiBottomNavigationAction-label": {
            color: "#848484",
            fontSize: "12px",
            fontWeight: "400",
            fontFamily: "Poppins",
            marginTop: "5px",
          },
        }}
        showLabels
      >
        {role && generatNavbar(role)}
      </BottomNavigation>
    </>
  );
};
export default BottomBar;

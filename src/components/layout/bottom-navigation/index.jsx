import { SVG } from "@assets/svg";
import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import { Link } from "react-router-dom";

const BottomBar = () => {
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
        <BottomNavigationAction
          label="Jobs"
          LinkComponent={Link}
          to="job_seeker/jobs/applied"
          icon={<SVG.JobsSeekerIcon />}
        />
        <BottomNavigationAction
          label="Saved"
          icon={<SVG.UnSave />}
          LinkComponent={Link}
          to="job_seeker/jobs/saved"
        />
        <BottomNavigationAction
          label="Messages"
          icon={<SVG.MessageIcon />}
          LinkComponent={Link}
          to="job_seeker/chat"
        />
        <BottomNavigationAction
          label="Profile"
          icon={<SVG.UserProfile />}
          LinkComponent={Link}
          to="job_seeker/my-profile"
        />
      </BottomNavigation>
    </>
  );
};
export default BottomBar;

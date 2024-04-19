import { Link } from "react-router-dom";
import { OutlinedButton } from "../button";
import DialogBox from "@components/dialogBox";
import { USER_ROLES } from "../../utils/enum";

const Dialog = ({ open, setOpen }) => {
  return (
    <DialogBox
      open={open}
      handleClose={() =>
        setOpen((prev) => ({ ...prev, registrationWarning: false }))
      }
    >
      <div>
        <h1 className="heading">Register as jobseeker</h1>
        <div className="form-content">
          <p className="jobs_dailog_content">
            To apply for the job and have many other useful features to find a
            job, please register on Koor.
          </p>
          <div style={{ textAlign: "center", lineHeight: "40px" }}>
            <Link to="/register?role=job_seeker">
              <OutlinedButton
                title="Register"
                jobSeeker
                sx={{
                  width: "100%",
                  fontSize: "16px !important",
                  "@media (max-width: 992px)": {
                    fontSize: "16px !important",
                  },
                  "@media (max-width: 480px)": {
                    fontSize: "14px !important",
                  },
                }}
              />
            </Link>
            <span className="jobs_dailog_login_line">
              Already have an account?{" "}
              <Link
                to={`/login?role=${USER_ROLES.jobSeeker}`}
                style={{
                  textDecoration: "none",
                  color: "#EEA23D",
                  fontWeight: 600,
                }}
              >
                Login
              </Link>
            </span>
          </div>
        </div>
      </div>
    </DialogBox>
  );
};

export default Dialog;

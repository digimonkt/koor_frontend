import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FilledButton } from "@components/button";
import { LabeledInput } from "@components/input";
import { setIsLoggedIn } from "@redux/slice/user";
import { USER_ROLES } from "@utils/enum";

function RegistrationForm({ role }) {
  // navigate
  const navigate = useNavigate();

  // redux dispatcher
  const dispatch = useDispatch();

  const handleRegister = () => {
    dispatch(setIsLoggedIn(true));

    navigate(`/${role}/my-profile/job-criteria`);
  };

  return (
    <div>
      <div className="form-content">
        <form>
          <div className="form-group mb-3">
            <LabeledInput
              placeholder="Your Email"
              title="Email"
              subtitle="No email? Register with mobile number!"
            />
          </div>
          <div className="form-group mb-3">
            <LabeledInput placeholder="Your Mobile Number" title="Email" />
          </div>
          <div className="form-group mb-3">
            <LabeledInput
              placeholder="Your Password"
              password
              title="Create new password"
            />
          </div>
          <div className="form-group mb-3">
            <LabeledInput
              placeholder="Re-enter Password"
              password
              title="Repeat your password"
            />
          </div>

          <div className="my-4 text-center">
            <FilledButton
              title="Register"
              isBlueButton={role !== USER_ROLES.jobSeeker}
              onClick={handleRegister}
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegistrationForm;

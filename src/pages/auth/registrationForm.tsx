import React from "react";
import { FilledButton } from "src/components/button";
import { LabeledInput } from "src/components/input";
import { useAppDispatch } from "src/redux/hooks";
import { setIsLoggedIn } from "src/redux/slice/auth";
import { USER_ROLES } from "src/utils/enum";
interface IRegistrationForm {
  role: USER_ROLES | "";
}
function RegistrationForm({ role }: IRegistrationForm) {
  const dispatch = useAppDispatch();
  const handleRegister = () => {
    dispatch(setIsLoggedIn(true));
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

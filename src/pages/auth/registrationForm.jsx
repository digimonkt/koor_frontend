import React, { useState } from "react";
import { CreateUserAPI } from "../../api/user";
// import { useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
import { FilledButton } from "../../components/button";
import { LabeledInput } from "../../components/input";
// import { setIsLoggedIn } from "../../redux/slice/user";
import { USER_ROLES } from "../../utils/enum";
import { newSignup } from "./validator";
// import { validateRegistrationForm } from "./validator";

function RegistrationForm({ role }) {
  // navigate
  // const navigate = useNavigate();
  // redux dispatcher
  // const dispatch = useDispatch();

  const [formErrors, setFormErrors] = useState({});
  const [form, setForm] = useState({
    email: "",
    mobileNumber: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setForm((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
  };

  const handleRegister = async () => {
    console.log({ form });
    const { isValid, errors } = newSignup(form);
    // const isValid = newSignup(form);
    // console.log(isValid);
    if (!isValid) {
      setFormErrors(errors);
      return;
    } else {
      setFormErrors({});
    }
    const payload = {
      email: form.email,
      mobileNumber: form.mobileNumber,
      password: form.password,
      role,
    };

    const res = await CreateUserAPI(payload);
    console.log({ res });
    // dispatch(setIsLoggedIn(true));
    // navigate(`/${role}/my-profile/job-criteria`);
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
              name="email"
              type="email"
              onChange={handleChange}
              value={form.email}
            />
          </div>
          <p style={{ color: "red" }}>{formErrors.email}</p>
          <div className="form-group mb-3">
            <LabeledInput
              placeholder="Your Mobile Number"
              title="Mobile"
              name="mobileNumber"
              type="number"
              onChange={handleChange}
              value={form.mobileNumber}
            />
          </div>
          <p style={{ color: "red" }}>{formErrors.mobileNumber}</p>
          <div className="form-group mb-3">
            <LabeledInput
              placeholder="Your Password"
              type="password"
              title="Create new password"
              name="password"
              value={form.password}
              onChange={handleChange}
            />
          </div>
          <p style={{ color: "red" }}>{formErrors.password}</p>
          <div className="form-group mb-3">
            <LabeledInput
              placeholder="Re-enter Password"
              title="Repeat your password"
              type="password"
              name="confirmPassword"
              onChange={handleChange}
              value={form.confirmPassword}
            />
          </div>
          <p style={{ color: "red" }}>{formErrors.confirmPassword}</p>
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

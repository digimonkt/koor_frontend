// import { useDispatch } from "react-redux";
import { FilledButton } from "@components/button";
import { LabeledInput } from "@components/input";
// import { setCurrentUser, setIsLoggedIn } from "@redux/slice/user";
import { USER_ROLES } from "@utils/enum";
// import { generateEmployer, generateJobSeeker } from "@utils/fakeData";
import { useState } from "react";
import { LoginUserAPI } from "@api/user";

function LoginForm({ role }) {
  // const dispatch = useDispatch();
  // const navigate = useNavigate();
  // eslint-disable-next-line no-unused-vars
  const [formErrors, setFormErrors] = useState({});
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
  };

  const handleLogin = async () => {
    console.log({ form });
    // const { isValid, errors } = validateLoginForm(form);
    // if (!isValid) {
    //   setFormErrors(errors);
    //   return;
    // } else {
    //   setFormErrors({});
    // }

    const payload = {
      email: form.email,
      password: form.password,
    };

    const res = await LoginUserAPI(payload);
    console.log({ res });
    // dispatch(setIsLoggedIn(true));
    // let currentUser;
    // if (role === USER_ROLES.jobSeeker) {
    //   currentUser = generateJobSeeker();
    // } else if (role === USER_ROLES.employer) {
    //   currentUser = generateEmployer();
    // }
    // if (currentUser) dispatch(setCurrentUser(currentUser));
    // navigate("/dashboard");
  };
  return (
    <>
      <div className="form-content">
        <form>
          <div className="form-group mb-3">
            <LabeledInput
              placeholder="Your Email"
              title="Email"
              subtitle="Your mobile phone or email"
              data-cy="login-email"
              type="email"
              name="email"
              onChange={handleChange}
              value={form.email}
            />
          </div>
          <p style={{ color: "red" }}>{formErrors.email}</p>
          <div className="form-group mb-3">
            <LabeledInput
              placeholder="Your Password"
              title="Password"
              data-cy="login-password"
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
            />
          </div>
          <p style={{ color: "red" }}>{formErrors.password}</p>
          <div className="text-end forgots">
            <span>Forgot password?</span>
          </div>

          <div className="my-4 text-center">
            <FilledButton
              title="Login"
              isBlueButton={role !== USER_ROLES.jobSeeker}
              onClick={handleLogin}
              data-cy="login-button"
            />
          </div>
        </form>
      </div>
    </>
  );
}

export default LoginForm;

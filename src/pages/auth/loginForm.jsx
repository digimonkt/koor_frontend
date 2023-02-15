import { useDispatch } from "react-redux";
import { FilledButton } from "@components/button";
import { LabeledInput } from "@components/input";
import { setIsLoggedIn } from "@redux/slice/user";
import { USER_ROLES } from "@utils/enum";
import { LoginUserAPI } from "@api/user";
import { useNavigate } from "react-router-dom";
import { validateLoginForm } from "./validator";
import { useFormik } from "formik";
import { ErrorMessage } from "@components/caption";
import { useState } from "react";
import Loader from "@components/loader";

function LoginForm({ role }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setIsLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validateLoginForm,
    onSubmit: async (values) => {
      setIsLoading(true);
      const payload = {
        email: values.email,
        password: values.password,
        role,
      };
      const res = await LoginUserAPI(payload);
      if (res.remote === "success") {
        dispatch(setIsLoggedIn(true));
        setIsLoading(false);
        navigate(`/${role}/my-profile/job-criteria`);
      } else {
        setIsLoading(false);
        formik.setErrors({ password: "Invalid Credentials" });
      }
    },
  });
  return (
    <>
      <div className="form-content">
        <form onSubmit={formik.handleSubmit}>
          <div className="form-group mb-3">
            <LabeledInput
              placeholder="Your Email"
              title="Email"
              subtitle="Your mobile phone or email"
              data-cy="login-email"
              type="email"
              {...formik.getFieldProps("email")}
            />
            {formik.touched.email && formik.errors.email ? (
              <ErrorMessage>{formik.errors.email}</ErrorMessage>
            ) : null}
          </div>
          <div className="form-group mb-3">
            <LabeledInput
              placeholder="Your Password"
              title="Password"
              data-cy="login-password"
              type="password"
              {...formik.getFieldProps("password")}
            />
            {formik.touched.password && formik.errors.password ? (
              <ErrorMessage>{formik.errors.password}</ErrorMessage>
            ) : null}
          </div>
          <div className="text-end forgots">
            <span>Forgot password?</span>
          </div>

          <div className="my-4 text-center">
            <FilledButton
              title={loading ? <Loader loading={loading} /> : "Login"}
              isBlueButton={role !== USER_ROLES.jobSeeker}
              data-cy="login-button"
              type="submit"
              disabled={loading}
            />
          </div>
        </form>
      </div>
    </>
  );
}

export default LoginForm;

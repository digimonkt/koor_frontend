import { FilledButton } from "@components/button";
import { LabeledInput } from "@components/input";
import { LoginUserAPI } from "@api/user";
// import { useNavigate } from "react-router-dom";
import { validateLoginForm } from "./validator";
import { useFormik } from "formik";
import { ErrorMessage } from "@components/caption";
import { useState } from "react";
import Loader from "@components/loader";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import urlcat from "urlcat";

function LoginForm() {
  // const navigate = useNavigate();
  const [loading, setIsLoading] = useState(false);
  const { role } = useSelector((state) => state.auth);
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
        setIsLoading(false);
        // navigate(`/${role}/my-profile/job-criteria`);
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
          <Link
            to={urlcat("/forgot-password", { role })}
            style={{ position: "relative", zIndex: 5 }}
          >
            <div className="text-end forgots">
              <span>Forgot password?</span>
            </div>
          </Link>

          <div className="my-4 text-center">
            <FilledButton
              title={loading ? <Loader loading={loading} /> : "Login"}
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

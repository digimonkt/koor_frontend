import { FilledButton } from "@components/button";
import { LabeledInput } from "@components/input";
import { LoginUserAPI } from "@api/user";
// import { useNavigate } from "react-router-dom";
import { validateLoginForm } from "./validator";
import { useFormik } from "formik";
import { ErrorMessage } from "@components/caption";
import { useState, useEffect } from "react";
import Loader from "@components/loader";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import urlcat from "urlcat";
import { setSocialLoginError } from "@redux/slice/user";
import { REGEX } from "@utils/constants/regex";
import { setErrorToast } from "@redux/slice/toast";

function LoginForm() {
  // const navigate = useNavigate();
  const [loading, setIsLoading] = useState(false);
  const { role, socialLoginError } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validateLoginForm,
    onSubmit: async (values) => {
      dispatch(setSocialLoginError(""));
      setIsLoading(true);
      const validateEmail = (email) => {
        return REGEX.email.test(email);
      };
      const payload = {
        password: values.password,
        role
      };

      if (validateEmail(values.email)) {
        payload.email = values.email;
      } else {
        payload.mobile_number = values.email;
      }

      // Now the payload only contains non-null properties: email, password, phone, and role
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
  useEffect(() => {
    formik.setErrors({});
    if (socialLoginError !== "") {
      dispatch(setErrorToast(socialLoginError));
      dispatch(setSocialLoginError(""));
    }
  }, [socialLoginError]);
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
              type="text"
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
              zIndex={9999}
              {...formik.getFieldProps("password")}
            />
            {formik.touched.password && formik.errors.password ? (
              <ErrorMessage>{formik.errors.password}</ErrorMessage>
            ) : null}
            {/* {socialLoginError !== "" && <ErrorMessage>{socialLoginError}</ErrorMessage>} */}
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

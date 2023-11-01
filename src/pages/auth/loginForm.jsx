import { FilledButton } from "../../components/button";
import { LabeledInput } from "../../components/input";
import { LoginUserAPI } from "../../api/user";
// import { useNavigate } from "react-router-dom";
import { validateLoginForm } from "./validator";
import { useFormik } from "formik";
import { ErrorMessage } from "../../components/caption";
import { useState, useEffect } from "react";
import Loader from "../../components/loader";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import urlcat from "urlcat";
import { setSocialLoginError } from "../../redux/slice/user";
import { REGEX } from "../../utils/constants/regex";
import { setErrorToast } from "../../redux/slice/toast";
import { parsePhoneNumber } from "react-phone-number-input";
import { SVG } from "@assets/svg";
import { USER_ROLES } from "@utils/enum";

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
      const isValidPhoneNumber = (input) => {
        // Remove non-numeric characters
        const numericInput = input.replace(/\D/g, "");

        // Validate numeric input with optional leading '+91' or '91'
        const phoneNumberRegex = /^(\+91|91)?[6789]\d{9}$/;

        return phoneNumberRegex.test(numericInput);
      };
      const payload = {
        password: values.password,
        role,
      };

      if (!values.email.trim()) {
        setIsLoading(false);
        formik.setErrors({
          email: "It's not seems like a Email or Phone number",
        });
        return; // Exit early if there's an error
      }

      if (validateEmail(values.email)) {
        payload.email = values.email;
      } else {
        payload.mobile_number = values.email;
        const phoneNumber = parsePhoneNumber(values.email);
        if (phoneNumber) {
          payload.mobile_number = phoneNumber.nationalNumber;
        }
        if (!isValidPhoneNumber(payload.mobile_number)) {
          setIsLoading(false);
          formik.setErrors({ email: "Invalid Email" });
          return; // Exit early if there's an error
        }
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
              placeholder="your Email or Phone number"
              title="Login"
              subtitle={
                role !== USER_ROLES.jobSeeker && [
                  <>
                    <SVG.HelpIcon className="Question-mark-icon" />
                  </>,
                  "Your mobile phone or email",
                ]
              }
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
              style={{ height: "42px", position: "relative" }}
              placeholder="Your Password"
              title="Password"
              data-cy="login-password"
              pageName="userLogin"
              type="password"
              zIndex={9999}
              {...formik.getFieldProps("password")}
            />
            {formik.touched.password && formik.errors.password ? (
              <ErrorMessage>{formik.errors.password}</ErrorMessage>
            ) : null}
            {/* {socialLoginError !== "" && <ErrorMessage>{socialLoginError}</ErrorMessage>} */}
          </div>
          <div className="text-end forgots">
            <Link
              to={urlcat("/forgot-password", { role })}
              style={{ position: "relative", zIndex: 5 }}
            >
              <span>Forgot password?</span>
            </Link>
          </div>

          <div className="my-4 text-center">
            <FilledButton
              style={{ width: "150px", height: "46px" }}
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

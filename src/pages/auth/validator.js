import { isValidPhoneNumber } from "react-phone-number-input";
import * as Yup from "yup";
const passwordValidation = {
  password: Yup.string()
    .required("Password is Required")
    .min(6, "Password must be at least 6 characters long")
    .matches(
      /.*[!@#$%^&*()].*/,
      "Password must contain at least one special character"
    ),
  confirmPassword: Yup.string()
    .required("Confirm Password is Required")
    .oneOf([Yup.ref("password"), null], "Passwords must match"),
};
export const validateRegistrationForm = Yup.object().shape({
  email: Yup.string()
    .email("Invalid Email"),
  mobileNumber: Yup.mixed().test(
    "isValidMobileNumber",
    "Invalid Mobile Number",
    (value, context) => {
      if (!value.value) {
        return true;
      }
      return isValidPhoneNumber(value.value);
    }
  )
    .test(
      "atLeastOneRequired",
      "Email/Mobile Number is required",
      (value, context) => {
        const { parent } = context;
        return parent.email || parent.mobileNumber.value;
      }
    ),
  ...passwordValidation,
});

export const validateLoginForm = Yup.object().shape({
  email: Yup.string().required("Email or Phone is required"),
  password: Yup.string().required("Password is Required"),
});
export const validateForgotPasswordForm = Yup.object().shape({
  email: Yup.string().email("Invalid Email").required("Email is required"),
});
export const validateResetPasswordForm = Yup.object().shape({
  ...passwordValidation,
});

export const validateOTPForm = Yup.object().shape({
  otp: Yup.string().required("Please enter OTP"),
});

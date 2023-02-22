import { isValidPhoneNumber } from "react-phone-number-input";
import * as Yup from "yup";
export const validateRegistrationForm = Yup.object().shape({
  email: Yup.string()
    .email("Invalid Email")
    .test(
      "atLeastOneRequired",
      "Email/Mobile Number is required",
      (value, context) => {
        const { parent } = context;
        return parent.email || parent.mobileNumber;
      }
    ),
  mobileNumber: Yup.mixed().test(
    "isValidMobileNumber",
    "Invalid Mobile Number",
    (value, context) => {
      if (!value.value) {
        return true;
      }
      return isValidPhoneNumber(value.value);
    }
  ),
  password: Yup.string().required("Password is Required"),
  confirmPassword: Yup.string()
    .required("Confirm Password is Required")
    .oneOf([Yup.ref("password"), null], "Passwords must match"),
});

export const validateLoginForm = Yup.object().shape({
  email: Yup.string().email("Invalid Email").required("Email is required"),
  password: Yup.string().required("Password is Required"),
});

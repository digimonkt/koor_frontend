import * as Yup from "yup";
import { REGEX } from "../../utils/constants/regex";
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
  mobileNumber: Yup.string().matches(REGEX.mobile, "Invalid Mobile Number"),
  password: Yup.string().required("Password is Required"),
  confirmPassword: Yup.string()
    .required("Confirm Password is Required")
    .oneOf([Yup.ref("password"), null], "Passwords must match"),
});

export const validateLoginForm = Yup.object().shape({
  email: Yup.string().email("Invalid Email").required("Email is required"),
  password: Yup.string().required("Password is Required"),
});

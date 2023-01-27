import { REGEX } from "../../utils/constants/regex";
import * as yup from "yup";
import "yup-phone";
import YupPassword from "yup-password";
YupPassword(yup);

export const validateRegistrationForm = (values) => {
  const errors = {};

  if (!values.email) {
    errors.email = "Email is required!";
  } else if (!REGEX.email.test(values.email)) {
    errors.email = "This is not a valid email format!";
  }

  if (!values.mobileNumber) {
    errors.mobileNumber = "Mobile number is required!";
  } else if (!REGEX.mobile.test(values.mobileNumber)) {
    errors.mobileNumber = "This is not a valid mobile number!";
  } else if (values.mobileNumber.length < 4) {
    errors.mobileNumber = "Mobile number must be 10 digits";
  } else if (values.mobileNumber.length > 10) {
    errors.mobileNumber = "Mobile number cannot exceed more than 10 characters";
  }

  if (!values.password) {
    errors.password = "Password is required";
  } else if (values.password.length < 4) {
    errors.password = "Password must be more than 4 characters";
  } else if (values.password.length > 10) {
    errors.password = "Password cannot exceed more than 10 characters";
  }

  if (!values.confirmPassword) {
    errors.confirmPassword = "Confirm Password Required";
  } else if (values === values.password) {
    errors.confirmPassword = "New Password and Confirm Password Must be Same";
  }
  return { errors, isValid: !Object.keys(errors).length };
};

export const validateLoginForm = (values) => {
  const errors = {};

  if (!values.email) {
    errors.email = "Please enter registered email";
  } else if (!REGEX.email.test(values.email)) {
    errors.email = "This is not a valid email format!";
  }

  if (!values.password) {
    errors.password = "Password is required";
  } else if (values.password.length < 4) {
    errors.password = "Password must be more than 4 characters";
  } else if (values.password.length > 10) {
    errors.password = "Password cannot exceed more than 10 characters";
  }
  return { errors, isValid: !Object.keys(errors).length };
};

export const newSignup = (values) =>
  yup.object(values).shape({
    email: yup
      .string()
      .email("Enter valid email")
      .required("Email is required"),
    mobileNumber: yup
      .string()
      .phone("That doesn't look like a phone number")
      .required("A phone number is required")
      .min(10, "too short")
      .max(10, "too long")
      .matches(
        /^([0]{1}|\+?[234]{3})([7-9]{1})([0|1]{1})([\d]{1})([\d]{7})$/g,
        "Invalid phone number"
      ),
    password: yup
      .string()
      .password(" ")
      .required("No password provided.")
      .min(8, "Password is too short - should be 8 chars minimum.")
      .matches(/(?=.*[0-9])/, "Password must contain a number."),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password")], "Password not matched")
      .required("Required"),
  });

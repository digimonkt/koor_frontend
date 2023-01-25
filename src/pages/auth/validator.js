import { REGEX } from "../../utils/constants/regex";

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

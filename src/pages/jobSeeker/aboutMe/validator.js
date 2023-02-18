import dayjs from "dayjs";
import { isValidPhoneNumber } from "react-phone-number-input";
import * as Yup from "yup";

export const validateJobSeekerAboutMe = Yup.object().shape({
  fullName: Yup.string().required("Full Name is required"),
  email: Yup.string().email("Invalid Email").required("Email is required"),
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
  gender: Yup.string().required("Gender is required"),
  dob: Yup.string()
    .required("Deadline is required")
    .test("isFuture", "Date Must be of Future", (value, context) => {
      return dayjs(value).isBefore(dayjs("2006-01-01"));
    }),
  employmentStatus: Yup.string().required("Employment Status is required"),
});

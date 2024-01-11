import * as Yup from "yup";
import { REGEX } from "@utils/constants/regex";
import { isValidPhoneNumber } from "react-phone-number-input";

export const validateCreateResume = Yup.object().shape({
  jobTitle: Yup.string(),
  jobSummary: Yup.string(),
  homeAddress: Yup.string(),
  personalWebsite: Yup.string().matches(REGEX.website, "Invalid website"),
  reference: Yup.array().of(
    Yup.object().shape({
      name: Yup.string().when(["email", "mobile_number"], {
        is: (email, mobileNumber) => email || mobileNumber,
        then: Yup.string().required("Name is required"),
        otherwise: Yup.string().optional(),
      }),
      mobileNumber: Yup.mixed().test(
        "isValidMobileNumber",
        "Invalid Mobile Number",
        (value) => {
          if (!value?.value) {
            return true;
          }
          return isValidPhoneNumber(value.value);
        },
      ),
      email: Yup.string().matches(REGEX.email, "Invalid email"),
    }),
  ),
});

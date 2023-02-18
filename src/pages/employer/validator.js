import { isValidPhoneNumber } from "react-phone-number-input";
import * as Yup from "yup";

export const validateEmployerAboutMe = Yup.object().shape({
  organizationName: Yup.string().required("Organization Name is required"),
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
  license: Yup.mixed().test(
    "elementPresent",
    "License is required",
    (value) => !!value.length
  ),
});

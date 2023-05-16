import * as Yup from "yup";
import { isValidPhoneNumber } from "react-phone-number-input";

export const validateVendorAboutMe = Yup.object().shape({
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
  businessLicenseId: Yup.string().required("Business License Id is required"),
  businessLicense: Yup.mixed().test(
    "elementPresent",
    "Business License is required",
    (value) => !!value.length
  ),
  certificationNumber: Yup.string().required(
    "Certification Number is required"
  ),
  certification: Yup.mixed().test(
    "elementPresent",
    "Certification is required",
    (value) => !!value.length
  ),
  website: Yup.string().url(
    "Please enter a valid URL, e.g. https://www.example.com"
  ),
});

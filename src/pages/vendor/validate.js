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
<<<<<<< HEAD
  businessLicenseId: Yup.number().typeError("Business License Id must be a number ").required("Business License Id is required"),
=======

  // commented out this code to make license and certification optional
  // businessLicenseId: Yup.number().typeError("Business License Id must be a number ").required("Business License Id is required"),
>>>>>>> df72d18ea7683e118ff98600608ef579bcf4bd16
  // businessLicense: Yup.mixed().test(
  //   "elementPresent",
  //   "Business License is required",
  //   (value) => !!value.length
  // ),
<<<<<<< HEAD
  certificationNumber: Yup.string().required(
    "Certification Number is required"
  ),
=======
  // certificationNumber: Yup.string().required(
  //   "Certification Number is required"
  // ),
>>>>>>> df72d18ea7683e118ff98600608ef579bcf4bd16
  // certification: Yup.mixed().test(
  //   "elementPresent",
  //   "Certification is required",
  //   (value) => !!value.length
  // ),
  website: Yup.string().url(
    "Please enter a valid URL, e.g. https://www.example.com"
  ),
});

import * as Yup from "yup";
import { REGEX } from "@utils/constants/regex";

export const validateCreateResume = Yup.object().shape({
  jobTitle: Yup.string(),
  jobSummary: Yup.string(),
  homeAddress: Yup.string(),
  personalWebsite: Yup.string().matches(REGEX.website, "Invalid website"),
  reference: Yup.array().of(
    Yup.object().shape({
      name: Yup.string(),
      moblieNumber: Yup.string().matches(REGEX.mobile, "Invalid Phone Number"),
      countryCode: Yup.string(),
      email: Yup.string().matches(REGEX.email, "Invalid Email"),
    })
  ),
});

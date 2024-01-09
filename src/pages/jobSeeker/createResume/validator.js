import * as Yup from "yup";
import { REGEX } from "@utils/constants/regex";

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
      mobile_number: Yup.number(),
      email: Yup.string(),
    })
  ),
});

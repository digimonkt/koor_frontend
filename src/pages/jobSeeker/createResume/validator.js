import * as Yup from "yup";

export const validateCreateResume = Yup.object().shape({
  jobTitle: Yup.string(),
  jobSummary: Yup.string(),
  homeAddress: Yup.string(),
  personalWebsite: Yup.string().url("Invalid URL"),
  reference: Yup.array().of(
    Yup.object().shape({
      refName: Yup.string(),
      refPhone: Yup.string().matches(/^\d{10}$/, "Invalid Phone Number"),
      refEmail: Yup.string().email("Invalid Email"),
    }),
  ),
});

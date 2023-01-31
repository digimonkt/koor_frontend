import * as Yup from "yup";

export const languageValidationSchema = Yup.object().shape({
  organization: Yup.string().required("Organization is required!"),
  degree: Yup.string().required("degree is required!"),
  description: Yup.string().required("description is required!"),
  startDate: Yup.date().required("start date is required!"),
  endDate: Yup.date().test(
    "atLeastOneRequired",
    "End Date/is Present is required!",
    (value, context) => {
      const { parent } = context;
      return parent.endDate || parent.isPresent;
    }
  ),
  isPresent: Yup.boolean(),
});

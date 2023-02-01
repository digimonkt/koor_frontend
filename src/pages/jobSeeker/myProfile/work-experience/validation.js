import * as Yup from "yup";

export const workExperienceValidationSchema = Yup.object().shape({
  organization: Yup.string().required("Organization is required!"),
  title: Yup.string().required("Title is required!"),
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

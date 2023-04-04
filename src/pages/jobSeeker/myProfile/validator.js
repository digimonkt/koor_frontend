import * as Yup from "yup";

export const validateEditEducation = Yup.object({
  title: Yup.string().required("Diploma / certificate / degree is required"),
  institute: Yup.string().required("School /institute is required"),
  educationLevel: Yup.string().required("Education Level is required"),
  startDate: Yup.mixed().required("Start Date is required"),
  isPresent: Yup.boolean(),
  endDate: Yup.mixed().test(
    "isEndDatePresent",
    "End Date is required",
    (value, context) => {
      const { parent } = context;
      if (parent.isPresent) {
        return true;
      } else {
        return !!value;
      }
    }
  ),
});

export const validateEditLanguage = Yup.object({
  language: Yup.mixed().required("Language is required"),
  spoken: Yup.string().required("Please Select the Spoken Proficiency"),
  written: Yup.string().required("Please Select the Writing Proficiency"),
});
export const validateWorkExperience = Yup.object({
  title: Yup.string().required("Job title is required"),
  companyName: Yup.string().required("Company name is required"),
  startDate: Yup.mixed().required("Start Date is required"),
  isPresent: Yup.boolean(),
  endDate: Yup.mixed().test(
    "isEndDatePresent",
    "End Date is required",
    (value, context) => {
      const { parent } = context;
      if (parent.isPresent) {
        return true;
      } else {
        return !!value;
      }
    }
  ),
  description: Yup.string(),
});

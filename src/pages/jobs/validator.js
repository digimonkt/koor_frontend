import dayjs from "dayjs";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import * as Yup from "yup";
dayjs.extend(isSameOrAfter);
export const validateCreateJobInput = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  budgetCurrency: Yup.string().required("Currency is required"),
  budgetAmount: Yup.number().required("Amount is required"),
  budgetPayPeriod: Yup.string().required("Pay period is required"),
  description: Yup.string().required("Description is required"),
  country: Yup.string().required("Country is required"),
  // city: Yup.string().required("City is required"),
  address: Yup.string().required("Address is required"),
  jobCategories: Yup.array()
    .of(Yup.string())
    .min(1, "One Job Category is required"),
  isFullTime: Yup.boolean(),
  isPartTime: Yup.boolean(),
  hasContract: Yup.boolean(),
  isContactEmail: Yup.boolean(),
  deadline: Yup.string()
    .required("Deadline is required")
    .test("isFuture", "Date Must be of Future", (value, context) => {
      return dayjs(value).isSameOrAfter(dayjs());
    }),
  startDate: Yup.string()
    .required("Start Date is required")
    .test("isFuture", "Date Must be of Future", (value, context) => {
      return dayjs(value).isSameOrAfter(dayjs());
    }),
  contactEmail: Yup.string()
    .email()
    .test("ifPresent", "Contact Email is required", (value, context) => {
      const { parent } = context;
      if (parent.isContactEmail) {
        return parent.contactEmail;
      } else {
        return true;
      }
    }),
  isContactPhone: Yup.boolean(),
  contactPhone: Yup.string().test(
    "ifPresent",
    "Contact Number is required",
    (value, context) => {
      const { parent } = context;
      if (parent.isContactPhone) {
        return parent.contactPhone;
      } else {
        return true;
      }
    }
  ),
  isContactWhatsapp: Yup.boolean(),
  contactWhatsapp: Yup.string().test(
    "ifPresent",
    "Contact Whatsapp Number is required",
    (value, context) => {
      const { parent } = context;
      if (parent.isContactWhatsapp) {
        return parent.contactWhatsapp;
      } else {
        return true;
      }
    }
  ),
  highestEducation: Yup.string().required("Education Level is required"),
  languages: Yup.array()
    .of(
      Yup.object().shape({
        id: Yup.string(),
        spoken: Yup.string(),
        written: Yup.string(),
      })
    )
    .test(
      "atLeastOneLanguage",
      "At Least one Language required",
      (value, context) => {
        let isPresent = false;
        value.forEach((val) => {
          if (val.language && val.spoken && val.written) {
            isPresent = true;
          }
        });
        return isPresent;
      }
    ),
  skills: Yup.array().of(Yup.string()).min(1, "One Skill is required"),
});

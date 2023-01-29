import * as Yup from "yup";
export const validateCreateJobInput = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  budgetCurrency: Yup.string().required("Currency is required"),
  budgetAmount: Yup.number().required("Amount is required"),
  budgetPayPeriod: Yup.string().required("Pay period is required"),
  description: Yup.string().required("Description is required"),
  country: Yup.string().required("Country is required"),
  city: Yup.string().required("City is required"),
  address: Yup.string().required("Address is required"),
  jobCategory1: Yup.string().required("Job Category is required"),
  jobCategory2: Yup.string().optional(),
  isFullTime: Yup.boolean(),
  isPartTime: Yup.boolean(),
  hasContract: Yup.boolean(),
  isContactEmail: Yup.boolean(),
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
  language1: Yup.string().required("Language is required"),
  language2: Yup.string().optional(),
  language3: Yup.string().optional(),
  skill1: Yup.string().required("Skill is required"),
  skill2: Yup.string().optional(),
  skill3: Yup.string().optional(),
});

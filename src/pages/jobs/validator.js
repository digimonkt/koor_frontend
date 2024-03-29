import dayjs from "dayjs";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import * as Yup from "yup";
import { REGEX } from "@utils/constants/regex";

dayjs.extend(isSameOrAfter);
export const validateCreateJobInput = Yup.object()
  .shape({
    title: Yup.string().required("Title is required"),
    budgetCurrency: Yup.string().required("Currency is required"),
    budgetAmount: Yup.number().required("Amount is required"),
    budgetPayPeriod: Yup.string().required("Pay period is required"),
    description: Yup.string().required("Description is required"),
    country: Yup.string().required("Country is required"),
    // city: Yup.string().required("City is required"),
    address: Yup.string().required("Address is required"),
    jobCategories: Yup.string().required("Job Category is required"),
    jobSubCategory: Yup.string(),
    isFullTime: Yup.boolean(),
    isPartTime: Yup.boolean(),
    hasContract: Yup.boolean(),
    isContactEmail: Yup.boolean(),
    isApplyThroughKoor: Yup.boolean(),
    isApplyThroughEmail: Yup.boolean(),
    isApplyThroughWebsite: Yup.boolean(),
    applicationInstruction: Yup.string().nullable(),
    websiteLink: Yup.string().when("isApplyThroughWebsite", {
      is: true,
      then: () =>
        Yup.string()
          .required("Website link is required")
          .matches(REGEX.website, "website link not valid"),
      otherwise: () =>
        Yup.string()
          .notRequired()
          .matches(REGEX.website, "website link not valid"),
    }),
    duration: Yup.number(),
    experience: Yup.number()
      .typeError("Experience must be a number")
      .required("Experience is required"),
    deadline: Yup.string()
      .nullable()
      .required("Deadline is required")
      .test("isFuture", "Date Must be of Future", (value) => {
        return dayjs(value).isSameOrAfter(dayjs(), "days");
      }),
    startDate: Yup.string().nullable().required("Start Date is required"),
    // contactEmail: Yup.string()
    //   .email()
    //   .test("ifPresent", "Contact Email is required", (value, context) => {
    //     const { parent } = context;
    //     if (parent.isContactEmail) {
    //       return parent.contactEmail;
    //     } else {
    //       return true;
    //     }
    //   }),
    contactEmail: Yup.string()
      .email("Invalid Email")
      .test(
        "atLeastOneContactMethod",
        "At least one email is required",
        function (value) {
          const { isApplyThroughEmail } = this.parent;
          if (isApplyThroughEmail) {
            return value || this.parent.cc1 || this.parent.cc2;
          }
          return true; // Not required when isApplyThroughEmail is false
        }
      ),
    cc1: Yup.string().email("Invalid Email"),
    cc2: Yup.string().email("Invalid Email"),
    isContactWhatsapp: Yup.boolean(),
    contactWhatsapp: Yup.string().test(
      "ifPresent",
      "Contact Whatsapp Number is required",
      (_, context) => {
        const { parent } = context;
        if (parent.isContactWhatsapp) {
          return parent.contactWhatsapp;
        } else {
          return true;
        }
      }
    ),
    highestEducation: Yup.string(),
    languages: Yup.array().of(Yup.string()).max(3, "Maximum 3 allows"),
    skills: Yup.array().of(Yup.string()).max(3, "Maximum 3 allows"),
  })
  .test(
    "oneOfFields",
    "At least one option must be selected",
    function (value) {
      const { isApplyThroughKoor, isApplyThroughEmail, isApplyThroughWebsite } =
        value;

      const isError = !(
        isApplyThroughKoor ||
        isApplyThroughEmail ||
        isApplyThroughWebsite
      );

      if (isError) {
        return this.createError({
          path: "isApplyThroughKoor",
          message: "At least one option must be selected",
        });
      }

      return true;
    }
  );

export const validateCreateTenderInput = Yup.object()
  .shape({
    title: Yup.string().required("Title is required"),
    budgetCurrency: Yup.string(),
    budgetAmount: Yup.number(),
    budgetPayPeriod: Yup.string(),
    description: Yup.string().required("Description is required"),
    country: Yup.string().required("Country is required"),
    city: Yup.string().required("City is required"),
    categories: Yup.array()
      .of(Yup.string())
      .min(1, "At Least one category is required")
      .max(3, "Maximum 3 categories allowed"),
    address: Yup.string().required("Address is required"),
    deadline: Yup.string()
      .nullable()
      .required("Deadline is required")
      .test("isFuture", "Date Must be of Future", (value) => {
        return dayjs(value).isSameOrAfter(dayjs(), "days");
      }),
    isContactEmail: Yup.boolean(),
    isApplyThroughKoor: Yup.boolean(),
    isApplyThroughEmail: Yup.boolean(),
    isApplyThroughWebsite: Yup.boolean(),
    applicationInstruction: Yup.string().nullable(),
    websiteLink: Yup.string().when("isApplyThroughWebsite", {
      is: true,
      then: () =>
        Yup.string()
          .required("Website link is required")
          .matches(REGEX.website, "website link not valid"),
      otherwise: () =>
        Yup.string()
          .notRequired()
          .matches(REGEX.website, "website link not valid"),
    }),
    contactEmail: Yup.string()
      .email("Invalid Email")
      .test(
        "atLeastOneContactMethod",
        "At least one email is required",
        function (value) {
          const { isApplyThroughEmail } = this.parent;
          if (isApplyThroughEmail) {
            return value || this.parent.cc1 || this.parent.cc2;
          }
          return true;
        }
      ),
    cc1: Yup.string().email("Invalid Email"),
    cc2: Yup.string().email("Invalid Email"),
    startDate: Yup.string().nullable().required("Start Date is required"),
  })
  .test(
    "oneOfFields",
    "At least one option must be selected",
    function (value) {
      const { isApplyThroughKoor, isApplyThroughEmail, isApplyThroughWebsite } =
        value;
      const isError = !(
        isApplyThroughKoor ||
        isApplyThroughEmail ||
        isApplyThroughWebsite
      );
      if (isError) {
        return this.createError({
          path: "isApplyThroughKoor",
          message: "At least one option must be selected",
        });
      }
      return true;
    }
  );

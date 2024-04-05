import { SALARY_MAX, SALARY_MIN } from "@utils/constants/constants";

export function getObject(fl) {
  if (fl === "from") {
    return {
      id: "",
      jobCategories: "",
      jobSubCategories: [],
      country: "",
      city: "",
      isFullTime: false,
      isPartTime: false,
      hasContract: false,
      available: false,
      salaryMin: SALARY_MIN,
      salaryMax: SALARY_MAX,
      experience: "",
      budgetMin: "",
      budgetMax: "",
      sector: [],
      deadline: null,
      opportunityType: [],
      tag: [],
      tenderCategories: [],
      yearsInMarket: "",
    };
  } else {
    return {
      country: "",
      city: "",
      jobCategory: "",
      jobSubCategories: [],
      fullTime: false,
      partTime: false,
      contract: false,
      timing: "",
      isAvailable: false,
      salaryMin: SALARY_MIN,
      salaryMax: SALARY_MAX,
      budgetMin: "",
      budgetMax: "",
      deadline: "",
      sector: "",
      opportunityType: "",
      tag: "",
      yearsInMarket: "",
    };
  }
}

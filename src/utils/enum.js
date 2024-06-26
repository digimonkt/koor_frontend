export const USER_ROLES = Object.freeze({
  jobSeeker: "job_seeker",
  employer: "employer",
  vendor: "vendor",
});

export const EMPLOYMENT_STATUS = Object.freeze({
  employed: "employed",
  fresher: "fresher",
  other: "other",
});

export const EDUCATION = Object.freeze({
  secondary: "secondary",
  higherSecondary: "higherSecondary",
  graduation: "graduation",
  postGraduation: "postGraduation",
});

export const ORGANIZATION_TYPE = Object.freeze({
  business: "business",
  ngo: "ngo",
  government: "government",
  public: "public",
  private: "private",
});

export const GENDER = {
  male: "male",
  female: "female",
  trans: "trans",
};

export const LANGUAGE_PROFICIENCY = {
  basic: "basic",
  conversational: "conversational",
  fluent: "fluent",
};

export const PAY_PERIOD = {
  year: "yearly",
  quarter: "quarterly",
  month: "monthly",
  week: "weekly",
  hour: "hourly",
};

export const MESSAGE_TYPE = {
  error: "error",
  success: "success",
  warning: "warning",
  null: "",
};

export const JOB_ORDER_BY = {
  ascending: "ascending",
  descending: "descending",
};

export const JOB_SORT_BY = {
  // salary: "salary",
  active: "active",
  expired: "expired",
  expiration: "expiration",
  created: "created_at",
};
export const TENDER_ORDER_BY = {
  ascending: "ascending",
  descending: "descending",
};
export const TENDER_SORT_BY = {
  // budget: "budget",
  active: "active",
  expired: "expired",
  expiration: "expiration",
  created: "created_at",
};

export const NOTIFICATION_TYPE = {
  applied: "applied",
  rejected: "rejected",
  passwordUpdate: "password_update",
  shortlisted: "shortlisted",
  message: "message",
  advanceFilter: "advance_filter",
  plannedInterviews: "planned_interviews",
  expiredJob: "expired_save_job", // pending from backend
};

export const JOB_APPLICATION_OPTIONS = {
  shortlisted: "shortlisted",
  rejected: "rejected",
  blacklisted: "blacklisted",
  plannedInterviews: "planned_interviews",
};

export const SEARCH_TYPE = {
  jobs: "jobs",
  talents: "talents",
  vendors: "vendors",
  tenders: "tenders",
};
export const SHARE_PLATFORM = {
  facebook: "facebook",
  whatsapp: "whatsapp",
  telegram: "telegram",
  mail: "mail",
  linkedin: "linked_in",
  directLink: "direct_link",
};

export const SOCIAL_LINKS = {
  instagram: "https://www.instagram.com/koorjobs?igsh=enY5Z2N6MGhjeDBx",
  youtube: "https://www.youtube.com/@Koorjobs",
  linkedin: "https://www.linkedin.com/in/koorjobs",
  facebook: "https://www.facebook.com/koorjobs",
  twitter: "https://twitter.com/Koorjobs",
};

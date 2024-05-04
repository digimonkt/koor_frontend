import dayjs from "dayjs";

export const transformJobListResponse = (data) => {
  return {
    count: data.count,
    next: data.next,
    previous: data.previous,
    results: data.results.map((res) => {
      const today = dayjs(new Date().toISOString().split("T")[0]);
      const tomorrow = today.add(-1, "day");
      const deadline = dayjs(res.deadline);
      return {
        id: res.id,
        title: res.title,
        description: res.description,
        budgetCurrency: res.budget_currency,
        budgetAmount: Number(res.budget_amount)
          ? Number(res.budget_amount).toLocaleString()
          : 0,
        budgetPayPeriod: res.budget_pay_period,
        country: res.country,
        city: res.city,
        duration: res.duration,
        experience: res.experience,
        isFullTime: res.is_full_time,
        isPartTime: res.is_part_time,
        isSaved: res.is_saved,
        isApplied: res.is_applied,
        isShortlisted: res.is_shortlisted,
        isRejected: res.is_rejected,
        isPostedByAdmin: res.post_by_admin,
        isPlannedInterview: res.interview_at,
        hasContract: res.has_contract,
        workingDays: res.working_days,
        deadline: res.deadline,
        startDate: res.start_date,
        company: res.company,
        companyLogo: res.company_logo,
        expiredInDays: deadline.diff(tomorrow, "day", true),
        status: res.status,
        createdAt: res.created,
        applicantCount: res.applicant,
        user: {
          id: res.user.id,
          name: res.user.name,
          email: res.user.email,
          image: res.user.image || res.company_logo,
        },
        slug: res.slug,
      };
    }),
  };
};
export const transformFullJobDetails = (data) => {
  const today = dayjs(new Date().toISOString().split("T")[0]);
  const tomorrow = today.add(-1, "day");
  const deadline = dayjs(data.deadline);
  const description =
    data.description !== "<p><br></p>" ? data.description : "";
  return {
    id: data.id,
    title: data.title,
    application: data.application || {},
    description,
    budgetCurrency: data.budget_currency,
    budgetAmount: Number(data.budget_amount).toLocaleString().replace(/,/g, ""),
    budgetPayPeriod: data.budget_pay_period,
    country: data.country,
    city: data.city,
    address: data.address,
    jobCategories: data.job_category,
    jobSubCategory: data.job_sub_category,
    duration: data.duration,
    experience: data.experience,
    deadline: data.deadline,
    startDate: data.start_date,
    isFullTime: data.is_full_time,
    isApplied: data.is_applied,
    isEditable: data.is_editable,
    isSaved: data.is_saved,
    isPartTime: data.is_part_time,
    hasContract: data.has_contract,
    contactEmail: data.contact_email || "",
    cc1: data.cc1 || "",
    cc2: data.cc2 || "",
    contactPhone: data.contact_phone || "",
    contactWhatsapp: data.contact_whatsapp || "",
    highestEducation: data.highest_education,
    languages: data.language || [],
    skills: data.skill || [],
    status: data.status,
    applicant: data.applicant,
    createdAt: data.created,
    isApplyThroughKoor: data.apply_through_koor,
    isApplyThroughEmail: data.apply_through_email,
    isApplyThroughWebsite: data.apply_through_website,
    applicationInstruction: data.application_instruction,
    websiteLink: data.website_link,
    expiredInDays: deadline.diff(tomorrow, "day", true),
    user: {
      id: data.user.id,
      name: data.user.name || data.company,
      email: data.user.email,
      countryCode: data.user.country_code,
      mobileNumber: data.user.mobile_number,
      image: data.user.image || data.company_logo,
    },
    slug: data.slug,
    attachments:
      data.attachments?.map((attachment) => ({
        id: attachment.id,
        path: attachment.path,
        type: attachment.type,
        title: attachment.title,
      })) || [],
  };
};

export const transformSavedFilter = (data) => {
  return {
    id: data.id,
    jobCategories: data.job_category.map((category) => category.id || category),
    jobSubCategory: data.job_sub_category.map(
      (subCategory) => subCategory.id || subCategory
    ),
    country: data.country,
    city: data.city,
    isFullTime: data.is_full_time,
    isPartTime: data.is_part_time,
    isNotification: data.is_notification,
    hasContract: data.has_contract,
    title: data.title,
    workingDays: data.working_days,
  };
};

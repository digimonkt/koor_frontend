import dayjs from "dayjs";
export const transformTenderResponse = (data) => {
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
        sector: res.sector,
        isApplied: res.is_applied,
        isSaved: res.is_saved,
        isPostedByAdmin: res.post_by_admin,
        vendor: res.vendor,
        status: res.status,
        createdAt: res.created,
        startDate: res.start_date || "",
        expiredInDays: deadline.diff(tomorrow, "day", true),
        companyLogo: res.company_logo,
        company: res.company,
        tenderCategory: (res.tender_category || []).map((category) => ({
          id: category.id,
          title: category.title,
        })),
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

export const transformFullTenderDetails = (data) => {
  const description =
    data.description !== "<p><br></p>" ? data.description : "";
  const today = dayjs(new Date().toISOString().split("T")[0]);
  const tomorrow = today.add(-1, "day");
  const deadline = dayjs(data.deadline);
  return {
    id: data.id,
    title: data.title,
    tenderId: data.tender_id,
    budgetCurrency: data.budget_currency,
    budgetAmount: data.budget_amount,
    description,
    country: data.country || {},
    city: data.city || {},
    address: data.address || "",
    tag: data.tag || [],
    categories: data.tender_category || [],
    type: data.tender_type || {},
    sector: data.sector,
    expiredInDays: deadline.diff(tomorrow, "day", true),
    startDate: data.start_date,
    deadline: data.deadline,
    user: {
      id: data.user.id,
      name: data.user.name || data.company,
      email: data.user.email || "",
      countryCode: data.user.country_code || "",
      mobileNumber: data.user.mobile_number || "",
      image: data.user.image || data.company_logo,
      description: data.user.description || "",
      isBlacklisted: data.user.is_blacklisted,
    },
    attachments: data.attachments,
    createdAt: data.created,
    vendor: data.vendor,
    isApplied: data.is_applied,
    isSaved: data.is_saved,
    isEditable: data.is_editable,
    application: data.application,
    contactEmail: data.contact_email || "",
    cc1: data.cc1 || "",
    cc2: data.cc2 || "",
    isApplyThroughKoor: data.apply_through_koor,
    isApplyThroughEmail: data.apply_through_email,
    isApplyThroughWebsite: data.apply_through_website,
    applicationInstruction: data.application_instruction,
    websiteLink: data.website_link,
    slug: data.slug,
  };
};

export const transformSavedFilter = (data) => {
  return {
    id: data.id,
    jobCategories: data.job_category.map((category) => category.id),
    country: data.country?.id ? data.country : null,
    city: data.city?.id ? data.city : null,
    isFullTime: data.is_full_time,
    isPartTime: data.is_part_time,
    isNotification: data.is_notification,
    hasContract: data.has_contract,
    title: data.title,
    workingDays: data.working_days,
  };
};
export const transformTenderSuggestion = (data) => {
  return {
    count: data.count,
    next: data.next,
    previous: data.previous,
    results: data.results.map((res) => ({
      id: res.id,
      title: res.title,
      country: res.country.title,
      city: res.city.title,
      budgetAmount: res.budget_amount,
      budgetCurrency: res.budget_currency,
    })),
  };
};

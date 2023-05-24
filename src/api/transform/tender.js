import dayjs from "dayjs";

export const transformTenderResponse = (data) => {
  return {
    count: data.count,
    next: data.next,
    previous: data.previous,
    results: data.results.map((res) => ({
      id: res.id,
      title: res.title,
      description: res.description,
      sector: res.sector,
      isApplied: res.is_applied,
      isSaved: res.is_saved,
      vendor: res.vendor,
      status: res.status,
      createdAt: res.created,
      expiredInDays: dayjs(res.deadline).diff(
        dayjs(new Date().toISOString().split("T")[0]),
        "day",
        true
      ),
      tenderCategory: (res.tender_category || []).map((category) => ({
        id: category.id,
        title: category.title,
      })),
      user: {
        id: res.user.id,
        name: res.user.name,
        email: res.user.email,
        image: res.user.image,
      },
    })),
  };
};
export const transformFullTenderDetails = (data) => {
  return {
    id: data.id,
    title: data.title,
    tenderId: data.tender_id,
    budgetCurrency: data.budget_currency,
    budgetAmount: data.budget_amount,
    description: data.description,
    country: data.country || {},
    city: data.city || {},
    address: data.address || "",
    tag: data.tag || [],
    categories: data.tender_category || [],
    type: data.tender_type || {},
    sector: data.sector,
    expiredInDays: dayjs(data.deadline).diff(
      dayjs(new Date().toISOString().split("T")[0]),
      "day",
      true
    ),
    startDate: data.start_date,
    deadline: data.deadline,
    user: {
      id: data.user.id,
      name: data.user.name,
      email: data.user.email || "",
      countryCode: data.user.country_code || "",
      mobileNumber: data.user.mobile_number || "",
      image: data.user.image,
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

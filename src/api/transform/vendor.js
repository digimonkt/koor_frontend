export const transformTenderSavedFilter = (data) => {
  return {
    id: data.id,
    jobCategories: (data.tender_category || []).map(
      (categoryData) => categoryData.id
    ),
    country: data.country?.id ? data.country : null,
    city: data.city?.id ? data.city : null,
    opportunityType: data.opportunity_type,
    tag: data.tag,
    isNotification: data.is_notification,
    title: data.title,
    deadline: data.deadline,
    budgetMin: data.budget_min,
    budgetMax: data.budget_max,
    sector: (data.sector || []).map((sector) => sector.title),
  };
};

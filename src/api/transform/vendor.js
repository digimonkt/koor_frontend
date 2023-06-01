export const transformTenderSavedFilter = (data) => {
  return {
    id: data.id,
    title: data.title,
    country: data.country,
    city: data.city,
    opportunityType: data.opportunity_type.map((opportunityType) => opportunityType.id || opportunityType),
    sector: (data.sector || []).map((sector) => sector.id || sector),
    tag: (data.tag || []).map((tag) => tag.id || tag),
    tenderCategories: data.tender_category.map((tenderCategory) => tenderCategory.id || tenderCategory),
    isNotification: data.is_notification,
    deadline: data.deadline,
    budgetMin: data.budget_min,
    budgetMax: data.budget_max,
  };
};

// pending task
export const transformVendorSavedFilter = (data) => {
  return {
    id: data.id,
    title: data.title,
    country: data.country?.id ? data.country : "",
    city: data.city?.id ? data.city : "",
    opportunityType: (data.opportunity_type || []).map((data) => data.id),
    sector: (data.sector || []).map((sector) => sector.id),
    tag: (data.tag || []).map((tag) => tag.id),
    tenderCategories: (data.tender_category || []).map((cate) => cate.id),
    isNotification: data.is_notification,
    deadline: data.deadline,
    budgetMin: data.budget_min,
    budgetMax: data.budget_max,
  };
};

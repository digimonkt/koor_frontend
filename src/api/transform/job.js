import dayjs from "dayjs";

export const transformJobListResponse = (data) => {
  return {
    count: data.count,
    next: data.next,
    previous: data.previous,
    results: data.results.map((res) => ({
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
      isFullTime: res.is_full_time,
      isPartTime: res.is_part_time,
      hasContract: res.has_contract,
      workingDays: res.working_days,
      deadline: res.deadline,
      expiredInDays: dayjs(res.deadline).diff(
        dayjs(new Date().toISOString().split("T")[0]),
        "day",
        true
      ),
      status: res.status,
      createdAt: res.created,
      applicantCount: res.applicant,
      user: {
        id: res.user.id,
        name: res.user.name,
        email: res.user.email,
        image: res.user.image,
      },
    })),
  };
};
export const transformFullJobDetails = (data) => {
  return {
    id: data.id,
    title: data.title,
    description: data.description,
    budgetCurrency: data.budget_currency,
    budgetAmount: data.budget_amount,
    budgetPayPeriod: data.budget_pay_period,
    country: data.country,
    city: data.city,
    address: data.address,
    jobCategories: data.job_category,
    deadline: data.deadline,
    isFullTime: data.is_full_time,
    isApplied: data.is_applied,
    isPartTime: data.is_part_time,
    hasContract: data.has_contract,
    contactEmail: data.contact_email || "",
    contactPhone: data.contact_phone || "",
    contactWhatsapp: data.contact_whatsapp || "",
    highestEducation: data.highest_education,
    languages: data.language,
    skills: data.skill,
    workingDays: data.working_days,
    status: data.status,
    applicant: data.applicant,
    createdAt: data.created,
    expiredInDays: dayjs(data.deadline).diff(
      dayjs(new Date().toISOString().split("T")[0]),
      "day",
      true
    ),
    user: {
      id: data.user.id,
      name: data.user.name,
      email: data.user.email,
      countryCode: data.user.country_code,
      mobileNumber: data.user.mobile_number,
      image: data.user.image,
    },
    attachments:
      data.attachments?.map((attachment) => ({
        id: attachment.id,
        path: attachment.path,
        type: attachment.type,
        title: attachment.title,
      })) || [],
  };
};

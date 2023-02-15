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
      budgetAmount: Number(res.budget_amount).toLocaleString() || 0,
      budgetPayPeriod: res.budget_pay_period,
      country: res.country,
      city: res.city,
      isFullTime: res.is_full_time,
      isPartTime: res.is_part_time,
      hasContract: res.has_contract,
      workingDays: res.workingDays,
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

export const transformJobSeekerCategoriesResponse = (data) => {
  return data.map((data) => {
    return {
      id: data.id,
      title: data.title,
      subCategories: data.sub_category.map((subCategory) => {
        return {
          id: subCategory.id,
          status: subCategory.status,
          title: subCategory.title,
        };
      }),
    };
  });
};
export const transformProfileAnalytics = (data) => {
  let total = 0;
  const counts = new Array(12).fill(0);
  for (const d of data) {
    counts[d.date__month] += d.total_count;
    total += d.total_count;
  }

  const result = [];
  for (let i = 1; i <= 12; i++) {
    result.push(`${counts[i] || 0}`);
  }

  return { result, total };
};

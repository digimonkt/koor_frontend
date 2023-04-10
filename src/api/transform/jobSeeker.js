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

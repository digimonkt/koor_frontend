export const transformBlacklistUser = (data) => {
  return {
    count: data.count,
    next: data.next,
    previous: data.previous,
    results: data.results.map((res) => ({
      user: {
        id: res.blacklisted_user.id,
        description: res.blacklisted_user.description,
        image: res.blacklisted_user.image?.path || "",
        name: res.blacklisted_user.name,
        email: res.blacklisted_user.email,
      },
      reason: res.reason,
    })),
  };
};

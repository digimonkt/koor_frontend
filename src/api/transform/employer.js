export const transformApplicationOnJobListData = (data) => {
  return {
    count: data.count,
    next: data.next,
    previous: data.previous,
    blacklisted_count: data.blacklisted_count,
    rejected_count: data.rejected_count,
    shortlisted_count: data.shortlisted_count,
    planned_interview_count: data.planned_interview_count,
    results: data.results.map((result) => {
      return {
        id: result.id,
        shortlistedAt: result.shortlisted_at,
        rejectedAt: result.rejected_at,
        createdAt: result.created,
        shortLetter: result.short_letter,
        job: result.job,
        user: {
          id: result.user.id,
          name: result.user.name,
          email: result.user.email,
          countryCode: result.user.country_code,
          mobileNumber: result.user.mobile_number,
          image: result.user.image,
          description: result.user.description,
        },
        education: result.education,
        language: result.language,
        skills: result.skill,
      };
    }),
  };
};

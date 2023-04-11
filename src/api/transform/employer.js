export const transformApplicationOnJobListData = (data) => {
  return {
    count: data.count,
    next: data.next,
    previous: data.previous,
    blacklistedCount: data.blacklisted_count || 0,
    rejectedCount: data.rejected_count || 0,
    shortlistedCount: data.shortlisted_count || 0,
    plannedInterviewCount: data.planned_interview_count || 0,
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

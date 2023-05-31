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
        interviewAt: result.interview_at,
        job: result.job,
        user: {
          id: result.user.id,
          name: result.user.name,
          email: result.user.email,
          countryCode: result.user.country_code,
          mobileNumber: result.user.mobile_number,
          image: result.user.image,
          description: result.user.description,
          isBlacklisted: result.user.is_blacklisted,
        },
        education: result.education,
        language: result.language,
        skills: result.skill,
      };
    }),
  };
};
export const transformApplicationTenderListData = (data) => {
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
        user: {
          id: result.user.id,
          name: result.user.name,
          email: result.user.email,
          countryCode: result.user.country_code,
          mobileNumber: result.user.mobile_number,
          image: result.user.image,
          description: result.user.description,
          isBlacklisted: result.user.is_blacklisted,
        },
        tender: {
          id: result.tender.id,
          title: result.tender.title,
        },
      };
    }),
  };
};

export const getDashboardActivityAPIResponseTransform = (data) => {
  return {
    activeJobs: data.active_jobs,
    activeTender: data.active_tender,
    appliedJobs: data.applied_jobs,
    appliedTender: data.applied_tender,
  };
};

export const getTenderDetailsAPIResponseTransform = (data) => {
  return {
    count: data.count,
    result: data.results.map((result) => {
      return {
        id: result.id,
        created: result.created,
        deadline: result.deadline,
        description: result.description,
        isApplied: result.is_applied,
        isSave: result.is_saved,
        sector: result.sector,
        status: result.status,
        tenderCategory: result.tender_category,
        user: {
          countryCode: result.user.country_code,
          description: result.user.description,
          email: result.user.email,
          id: result.user.id,
          image: result.user.image,
          isBlackListed: result.user.is_blacklisted,
          mobileNumber: result.user.mobile_number,
          tenderName: result.user.name,
        },
      };
    }),
  };
};

export const transformApplicationOnTenderListData = (data) => {
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
        interviewAt: result.interview_at,
        job: result.job,
        user: {
          id: result.user.id,
          name: result.user.name,
          email: result.user.email,
          countryCode: result.user.country_code,
          mobileNumber: result.user.mobile_number,
          image: result.user.image,
          description: result.user.description,
          isBlacklisted: result.user.is_blacklisted,
        },
        tender: {
          id: result.tender.id,
          title: result.tender.title
        },
        education: result.education,
        language: result.language,
        skills: result.skill,
      };
    }),
  };
};

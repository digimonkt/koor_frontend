import { generateFileUrl } from "../../utils/generateFileUrl";

export const transformGetUserDetails = (data) => {
  return {
    id: data.id,
    sessionId: data.session_id,
    email: data.email || "",
    mobileNumber: data.mobile_number || "",
    countryCode: data.country_code || "",
    name: data.name || "",
    profileImage: data.image?.path ? generateFileUrl(data.image.path) : "",
    role: data.role,
    profileCompleted: data.profile_completed,
    notificationCount: data.notification_count || 0,
    profile: {
      description: data.profile.description || "",
      country: data.profile.country || data.country || {},
      city: data.profile.city || data.city || {},
      // job-seeker
      gender: data.profile.gender || "",
      dob: data.profile.dob || "",
      employmentStatus: data.profile.employment_status || "",
      profileTitle: data.profile.profile_title || "",
      highestEducation: data.profile.highest_education,
      marketInformationNotification:
        data.profile.market_information_notification || false,
      jobNotification: data.profile.job_notification,
      // employer
      organizationType: data.profile.organization_type || {},
      licenseId: data.profile.license_id,
      licenseIdFile: data.profile.license_id_file,
      experience: data.profile.experience,
      address: data.profile.address || "",
      isVerified: !!data.is_verified || !!data.profile.is_verified,
      // isVerified: data.profile.is_verified,
      // vendor
      registrationNumber: data.profile.registration_number || "",
      registrationCertificate: data.profile.registration_certificate,
      operatingYears: data.profile.operating_years || "",
      jobsExperience: data.profile.jobs_experience || "",
      website: data.profile.website || "",
      otherNotification: data.profile.other_notification || false,
      personalWebsite: data.profile.personal_website || "",
      homeAddress: data.profile.home_address || "",
      references: data.profile.references || data.references || [],
      shortSummary: data.profile.short_summary || "",
    },
    jobPreferences: data.job_preferences
      ? {
          id: data.job_preferences.id,
          isAvailable: data.job_preferences.is_available,
          displayInSearch: data.job_preferences.display_in_search,
          isPartTime: data.job_preferences.is_part_time,
          isFullTime: data.job_preferences.is_full_time,
          hasContract: data.job_preferences.has_contract,
          expectedSalary: data.job_preferences.expected_salary,
          payPeriod: data.job_preferences.pay_period,
        }
      : {},
    educationRecord: (data.education_record || []).map((record) => ({
      id: record.id,
      title: record.title,
      startDate: record.start_date,
      endDate: record.end_date,
      present: !record.end_date,
      institute: record.institute,
      educationLevel: {
        id: record.education_level.id,
        title: record.education_level.title,
      },
    })),
    workExperiences: (data.work_experience || []).map((record) => ({
      id: record.id,
      title: record.title,
      startDate: record.start_date,
      endDate: record.end_date,
      present: !record.end_date,
      organization: record.organization,
      description: record.description,
    })),
    languages: (data.languages || []).map((record) => ({
      id: record.id,
      language: record.language,
      written: record.written,
      spoken: record.spoken,
    })),
    skills: (data.skills || []).map((record) => ({
      id: record.id,
      skill: record.skill,
    })),
    resume: (data.resume || []).map((record) => ({
      id: record.id,
      title: record.title,
      filePath: record.file_path,
      createdAt: record.created_at,
    })),
    sectors: (data.sector || []).map((record) => ({
      id: record.id,
      sector: record.sector,
    })),
    tags: (data.tag || []).map((record) => ({
      id: record.id,
      tag: record.tag,
    })),
  };
};

export const transformNotificationResponse = (data) => {
  return {
    id: data.id,
    createdAt: data.created,
    notificationType: data.notification_type,
    jobFilter: data.job_filter,
    seen: data.seen,
    message: data?.message || "",
    messageId: data?.message_id || "",
    conversion: data?.conversation_id,
    userId: data?.message_sender,
    tender: data.tender,
    tenderApplication: data.tender_application,
    application: {
      id: data.application?.id,
      attachments: data.application ? data.application.attachments[0] : {},
      job: data.application?.job,
      user: data.application?.user,
    },
    job: {
      id: data.job?.id,
      title: data.job?.title,
      user: {
        id: data.job?.user?.id,
        name: data.job?.user?.name,
        email: data.job?.user?.email,
        image: data.job?.company_logo || data.job?.user?.image,
        company: data.job?.company || "",
      },
    },
    sender: {
      id: data.sender?.id,
      name: data.sender?.name,
      email: data.sender?.email,
      image: data.sender?.image,
    },
  };
};

export const transformSearchUserByRoleResponse = (data) => {
  return {
    id: data.id,
    role: data.role,
    name: data.name,
    email: data.email,
    profilePicture: data.image || {},
    description: data.profile.description || "",
    skills: data.skills || [],
    country: data.profile?.country?.title || "",
    address: data.profile?.address || "",
    profileTitle: data.profile?.profile_title || "",
    city: data.profile?.city?.title || "",
    highestEducation: data.highest_education || "",
    readyForChat: data.ready_for_chat,
    sectors: (data.sector || []).map((item) => item.sector),
    tags: (data.tag || []).map((item) => item.tag),
  };
};

export const transformSearchUserFilterResponse = (data) => {
  return {
    id: data.id,
    title: data.title,
    country: data.country,
    city: data.city,
    jobCategories: data.category.map((category) => category.id),
    isFullTime: data.is_full_time,
    isPartTime: data.is_part_time,
    hasContract: data.has_contract,
    isAvailable: data.availability,
    isNotification: data.is_notification,
    salaryMin: data.salary_min,
    salaryMax: data.salary_max,
  };
};

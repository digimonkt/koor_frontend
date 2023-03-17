import { generateFileUrl } from "@utils/generateFileUrl";

export const transformGetUserDetails = (data) => {
  return {
    id: data.id,
    email: data.email || "",
    mobileNumber: data.mobile_number || "",
    countryCode: data.country_code || "",
    name: data.name || "",
    profileImage: data.image?.path ? generateFileUrl(data.image.path) : "",
    role: data.role,
    profile: {
      description: data.profile.description || "",
      // job-seeker
      gender: data.profile.gender || "",
      dob: data.profile.dob || "",
      employmentStatus: data.profile.employment_status || "",
      highestEducation: data.profile.highest_education,
      marketInformationNotification:
        data.profile.market_information_notification || false,
      jobNotification: data.profile.job_notification,
      // employer
      organizationType: data.profile.organization_type,
      licenseId: data.profile.license_id,
      licenseIdFile: data.profile.license_id_file,
    },
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
  };
};

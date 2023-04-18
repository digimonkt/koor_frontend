import api from ".";
import urlcat from "urlcat";
import { transformJobListResponse } from "./transform/job";
import { transformJobSeekerCategoriesResponse } from "./transform/jobSeeker";
export const updateJobSeekerAboutMeAPI = async (data) => {
  const res = await api.request({
    url: "/v1/users/job-seeker/about-me",
    method: "PATCH",
    data,
  });
  return res;
};

export const addEducationDetailsAPI = async (data) => {
  const res = await api.request({
    url: urlcat("/v1/users/job-seeker/educations"),
    method: "POST",
    data,
  });
  return res;
};

export const updateEducationDetailsAPI = async (educationId, data) => {
  const res = await api.request({
    url: urlcat("/v1/users/job-seeker/educations/:educationId", {
      educationId,
    }),
    method: "PATCH",
    data,
  });
  return res;
};
export const deleteEducationDetailsAPI = async (id) => {
  const res = await api.request({
    url: urlcat("/v1/users/job-seeker/educations/:educationId", {
      educationId: id,
    }),
    method: "DELETE",
  });
  return res;
};

export const addLanguageDetailsAPI = async (data) => {
  const res = api.request({
    url: urlcat("/v1/users/job-seeker/language"),
    method: "POST",
    data,
  });
  if (res.remote === "success") {
    return {
      remote: "success",
      data: res.data.data,
    };
  }
  return res;
};

export const updateLanguageDetailsAPI = async (data) => {
  const res = await api.request({
    url: urlcat("/v1/users/job-seeker/language/:languageId", {
      languageId: data.id,
    }),
    method: "PATCH",
    data,
  });
  return res;
};
export const deleteLanguageDetailsAPI = async (languageId) => {
  const res = await api.request({
    url: urlcat("/v1/users/job-seeker/language/:languageId", { languageId }),
    method: "DELETE",
  });
  return res;
};

export const addWorkExperienceDetailsAPI = async (data) => {
  const res = api.request({
    url: urlcat("/v1/users/job-seeker/work-experiences"),
    method: "POST",
    data,
  });
  if (res.remote === "success") {
    return {
      remote: "success",
      data: res.data.data,
    };
  }
  return res;
};

export const updateWorkExperienceDetailsAPI = async (data) => {
  const res = await api.request({
    url: urlcat("/v1/users/job-seeker/work-experiences/:workExperienceId", {
      workExperienceId: data.id,
    }),
    method: "PATCH",
    data,
  });
  return res;
};
export const deleteWorkExperienceDetailsAPI = async (workExperienceId) => {
  const res = await api.request({
    url: urlcat("/v1/users/job-seeker/work-experiences/:workExperienceId", {
      workExperienceId,
    }),
    method: "DELETE",
  });
  return res;
};

export const addSkillsDetailsAPI = async (data) => {
  const res = await api.request({
    url: urlcat("/v1/users/job-seeker/skills"),
    method: "POST",
    data,
  });
  if (res.remote === "success") {
    return {
      remote: "success",
      data: res.data.data,
    };
  }
  return res;
};

export const getAppliedJobsAPI = async (sortQuery) => {
  const res = await api.request({
    url: urlcat("/v1/users/job-seeker/jobs/apply", sortQuery),
    method: "GET",
  });
  if (res.remote === "success") {
    return {
      remote: "success",
      data: {
        ...res.data,
        results: res.data.results.map((result) => {
          return {
            attachments: result.attachments,
            id: result.id,
            rejectedAt: result.rejected_at,
            shortLetter: result.short_letter,
            shortlistedAt: result.shortlisted_at,
            job: transformJobListResponse({
              results: [result.job],
            }).results[0],
          };
        }),
      },
    };
  }
  return res;
};

export const saveJobAPI = async (jobId) => {
  const res = await api.request({
    url: urlcat("/v1/users/job-seeker/jobs/save/:jobId", { jobId }),
    method: "POST",
  });
  return res;
};

export const unSaveJobAPI = async (jobId) => {
  const res = await api.request({
    url: urlcat("/v1/users/job-seeker/jobs/save/:jobId", { jobId }),
    method: "DELETE",
  });
  return res;
};

export const getSaveJobAPI = async (data) => {
  const res = await api.request({
    url: urlcat("/v1/users/job-seeker/jobs/save", data),
    method: "GET",
  });
  if (res.remote === "success") {
    return {
      remote: "success",
      data: {
        ...res.data,
        results: res.data.results.map((result) => {
          return {
            attachments: result.attachments,
            id: result.id,
            rejectedAt: result.rejected_at,
            shortLetter: result.short_letter,
            shortlistedAt: result.shortlisted_at,
            job: transformJobListResponse({
              results: [result.job],
            }).results[0],
          };
        }),
      },
    };
  }
  return res;
};

export const GetJobSeekerCategoriesAPI = async () => {
  const res = await api.request({
    url: "v1/users/job-seeker/category",
    method: "GET",
  });
  if (res.remote === "success") {
    return {
      remote: "success",
      data: transformJobSeekerCategoriesResponse(res.data),
    };
  }
};

export const UpdateJobSeekerCategoriesAPI = async (data) => {
  return await api.request({
    url: "v1/users/job-seeker/category",
    method: "PUT",
    headers: { "Content-Type": "multipart/form-data" },
    data,
  });
};

export const UpdateJobSeekerAdditionalParametersAPI = async (data) => {
  return await api.request({
    url: "v1/users/job-seeker/additional-parameter",
    method: "PUT",
    data,
  });
};

export const UpdateJobPreferencesAPI = async (data) => {
  return await api.request({
    url: "v1/users/job-seeker/job-preferences",
    method: "PATCH",
    data,
  });
};
export const DownloadResumeAPI = async () => {
  return await api.request({
    url: "v1/users/job-seeker/resume",
    method: "GET",
  });
};

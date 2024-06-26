import api from ".";
import urlcat from "urlcat";
import {
  transformFullJobDetails,
  transformJobListResponse,
  transformSavedFilter,
} from "./transform/job";
export const getJobDetailsByIdAPI = async (data) => {
  const response = await api.request({
    url: urlcat("/v1/jobs/:slug", data),
    method: "GET",
  });
  if (response.remote === "success") {
    return {
      remote: "success",
      data: transformFullJobDetails(response.data),
    };
  }
  return response;
};

export const getSearchJobsAPI = async (data) => {
  let jobSubCategories = [];
  const newData = { ...data };
  if (newData.jobCategory) {
    jobSubCategories = newData.jobSubCategories;
    delete newData.jobSubCategories;
  }
  let url = urlcat("/v1/jobs", newData);
  jobSubCategories.forEach((category) => {
    url += `&jobSubCategory=${category.title}`;
  });
  const response = await api.request({
    url,
    method: "GET",
  });
  if (response.remote === "success") {
    return {
      remote: "success",
      data: transformJobListResponse(response.data),
    };
  }
  return response;
};

export const applyForJobAPI = async (jobId, data) => {
  const response = await api.request({
    url: urlcat("/v1/users/job-seeker/jobs/apply/:jobId", { jobId }),
    method: "POST",
    data,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response;
};
export const updateAppliedJobAPI = async (jobId, data) => {
  const response = await api.request({
    url: urlcat("/v1/users/job-seeker/jobs/apply/:jobId", { jobId }),
    method: "PUT",
    data,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response;
};

export const withdrawJobApplicationAPI = async ({ jobId }) => {
  return await api.request({
    url: urlcat("v1/users/job-seeker/jobs/apply/:jobId", { jobId }),
    method: "DELETE",
  });
};

export const saveSearchJobsFilterAPI = async (data) => {
  const response = await api.request({
    url: urlcat("/v1/jobs/filter"),
    method: "POST",
    data,
  });
  if (response.remote === "success") {
    return {
      remote: "success",
      data: transformSavedFilter(response.data),
    };
  }
  return response;
};
export const getSearchJobsFilterAPI = async () => {
  const response = await api.request({
    url: urlcat("/v1/jobs/filter"),
    method: "GET",
  });
  if (response.remote === "success") {
    return {
      remote: "success",
      data: response.data.map((data) => transformSavedFilter(data)),
    };
  }
  return response;
};

export const deleteSearchJobsFilterAPI = async (filterId) => {
  const response = await api.request({
    url: urlcat("/v1/jobs/filter/:filterId", { filterId }),
    method: "DELETE",
  });
  return response;
};

export const getJobSuggestionAPI = async (jobId) => {
  const response = await api.request({
    url: urlcat("/v1/jobs/:jobId/suggestion", { jobId, limit: 4 }),
    method: "GET",
  });
  if (response.remote === "success") {
    return {
      remote: "success",
      data: transformJobListResponse(response.data),
    };
  }
  return response;
};

export const updateSavedSearchFilterAPI = async (filterId, status) => {
  const data = { is_notification: status };
  return await api.request({
    url: urlcat("/v1/jobs/filter/:filterId", { filterId }),
    method: "PATCH",
    data,
  });
};
export const updateJobShareCountAPI = async ({ jobId, platform }) => {
  return await api.request({
    url: urlcat("v1/jobs/:jobId/share/:platform", { jobId, platform }),
    method: "PUT",
  });
};
export const getTopJobCategoriesAPI = async () => {
  return await api.request({
    url: urlcat("v1/jobs/job-categories"),
    method: "GET",
  });
};
export const getTopTenderCategoriesAPI = async () => {
  return await api.request({
    url: urlcat("v1/tenders/tender-categories"),
    method: "GET",
  });
};
export const getTopCategoriesAPI = async () => {
  return await api.request({
    url: urlcat("v1/jobs/categories"),
    method: "GET",
  });
};
export const getJobAttachmentAPI = async (filePath) => {
  return await api.request({
    url: `v1/jobs/download-image?file_path=${filePath}`,
    method: "GET",
  });
};
export const getApplyJobByEmailAPI = async (jobId) => {
  return await api.request({
    url: urlcat("v1/users/job-seeker/jobs/apply/by_email/:jobId", { jobId }),
    method: "POST",
  });
};

export const updateCoverLetterAPI = async (data, jobId) => {
  const response = await api.request({
    url: urlcat("v1/users/job-seeker/cover-letter/:jobId", { jobId }),
    method: "POST",
    data,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  if (response.remote === "success") {
    return {
      remote: "success",
      data: response.data,
    };
  }
  return response;
};

export const getCoverLetterDataAPI = async (jobId) => {
  const response = await api.request({
    url: urlcat("v1/users/job-seeker/get-cover-letter", { jobId }),
    method: "GET",
  });
  if (response.remote === "success") {
    return {
      remote: "success",
      data: response.data,
    };
  }
  return response;
};

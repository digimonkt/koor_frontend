import api from ".";
import urlcat from "urlcat";
import {
  transformFullJobDetails,
  transformJobListResponse,
  transformSavedFilter,
} from "./transform/job";
export const getJobDetailsByIdAPI = async (data) => {
  const response = await api.request({
    url: urlcat("/v1/jobs/:jobId", data),
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
    url += `&jobSubCategories=${category.title}`;
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

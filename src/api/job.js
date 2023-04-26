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
  let jobCategories = [];
  const newData = { ...data };
  if (newData.jobCategory) {
    jobCategories = newData.jobCategory;
    delete newData.jobCategory;
  }
  let url = urlcat("/v1/jobs", newData);
  jobCategories.forEach((category) => {
    url += `&jobCategory=${category.title}`;
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
    url: urlcat("/v1/jobs/filter", filterId),
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
export const withdrawJobApplicationAPI = async ({ jobId }) => {
  return await api.request({
    url: urlcat("v1/users/job-seeker/jobs/apply/:jobId", { jobId }),
    method: "DELETE",
  });
};

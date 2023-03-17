import api from ".";
import urlcat from "urlcat";
import {
  transformFullJobDetails,
  transformJobListResponse,
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
  const response = await api.request({
    url: urlcat("/v1/jobs", data),
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
  });
  return response;
};

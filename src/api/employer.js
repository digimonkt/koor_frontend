import api from ".";
import urlcat from "urlcat";
import { transformJobListResponse } from "./transform/job";
import { transformApplicationOnJobListData } from "./transform/employer";
export const createJobAPI = async (data) => {
  const res = await api.request({
    url: urlcat("/v1/users/employer/jobs"),
    method: "POST",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    data,
  });
  return res;
};
export const getEmployerJobsAPI = async (data) => {
  const res = await api.request({
    url: urlcat("/v1/users/employer/jobs", data || {}),
    method: "GET",
  });
  if (res.remote === "success") {
    return {
      remote: "success",
      data: transformJobListResponse(res.data),
    };
  }
  return res;
};
export const updateEmployerAboutMe = async (data) => {
  const response = await api.request({
    url: "/v1/users/employer/about-me",
    method: "PATCH",
    data,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response;
};

export const updateEmployerJobAPI = async (jobId, data) => {
  const response = await api.request({
    url: urlcat("/v1/users/employer/jobs/:jobId", { jobId }),
    method: "PUT",
    data,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response;
};

export const getApplicationOnJobAPI = async (jobId) => {
  const response = await api.request({
    url: urlcat("/v1/jobs/:jobId/applications", { jobId }),
    method: "GET",
  });
  if (response.remote === "success") {
    return {
      remote: "success",
      data: transformApplicationOnJobListData(response.data),
    };
  }
  return response;
};

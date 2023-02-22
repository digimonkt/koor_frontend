import api from ".";
import urlcat from "urlcat";
import { transformFullJobDetails } from "./transform/job";
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
      data: {
        ...response.data,
        results: response.data.results.map((data) =>
          transformFullJobDetails(data)
        ),
      },
    };
  }
  return response;
};

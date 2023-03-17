import api from ".";
import urlcat from "urlcat";
import { transformGetCountriesAPIResponse } from "./transform/choices";
export const getCountriesAPI = async (data) => {
  const response = await api.request({
    url: urlcat("/v1/admin/country", data || {}),
    method: "GET",
  });
  if (response.remote === "success") {
    return {
      remote: "success",
      data: transformGetCountriesAPIResponse(response.data.results),
    };
  }
  return response;
};
export const getCitiesAPI = async (data) => {
  const response = await api.request({
    url: urlcat("/v1/admin/city", data),
    method: "GET",
  });
  if (response.remote === "success") {
    return {
      remote: "success",
      data: response.data.results,
    };
  }
  return response;
};

export const getJobCategoriesAPI = async (data) => {
  const response = await api.request({
    url: urlcat("/v1/admin/job-category", data || {}),
    method: "GET",
  });
  if (response.remote === "success") {
    return {
      remote: "success",
      data: response.data.results,
    };
  }
  return response;
};

export const getEducationLevelsAPI = async (data) => {
  const response = await api.request({
    url: urlcat("/v1/admin/education-level", data || {}),
    method: "GET",
  });
  if (response.remote === "success") {
    return {
      remote: "success",
      data: response.data.results,
    };
  }
  return response;
};

export const getLanguagesAPI = async (data) => {
  const response = await api.request({
    url: urlcat("/v1/admin/language", data || {}),
    method: "GET",
  });
  if (response.remote === "success") {
    return {
      remote: "success",
      data: response.data.results,
    };
  }
  return response;
};

export const getSkillsAPI = async (data) => {
  const response = await api.request({
    url: urlcat("/v1/admin/skills", data || {}),
    method: "GET",
  });
  if (response.remote === "success") {
    return {
      remote: "success",
      data: response.data.results,
    };
  }
  return response;
};

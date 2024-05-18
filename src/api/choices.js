import api from ".";
import urlcat from "urlcat";
import { transformGetCountriesAPIResponse } from "./transform/choices";
export const getCountriesAPI = async data => {
  const response = await api.request({
    url: urlcat("/v1/admin/country", { limit: 500, ...(data || {}) }),
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
export const getCitiesAPI = async data => {
  const response = await api.request({
    url: urlcat("/v1/admin/city", {
      ...data,
      limit: 500,
    }),
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

export const getJobCategoriesAPI = async data => {
  const response = await api.request({
    url: urlcat(
      "/v1/admin/job-category",
      {
        ...data,
        limit: 500,
      } || {},
    ),
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

export const getJobSubCategoriesAPI = async data => {
  const response = await api.request({
    url: urlcat("/v1/admin/job-sub-category", {
      ...data,
      limit: 500,
    }),
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
export const getEducationLevelsAPI = async data => {
  const response = await api.request({
    url: urlcat(
      "/v1/admin/education-level",
      {
        ...data,
        limit: 500,
      } || {},
    ),
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

export const getLanguagesAPI = async data => {
  const response = await api.request({
    url: urlcat(
      "/v1/admin/language",
      {
        ...data,
        limit: 500,
      } || {},
    ),
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

export const getSkillsAPI = async data => {
  const response = await api.request({
    url: urlcat(
      "/v1/admin/skills",
      {
        ...data,
        limit: 500,
      } || {},
    ),
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

export const getTenderSectorAPI = async data => {
  const response = await api.request({
    url: urlcat(
      "/v1/admin/sector",
      {
        ...data,
        limit: 500,
      } || {},
    ),
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
// pending  opportunity type
export const getTenderOpportunityTypeAPI = async data => {
  const response = await api.request({
    url: urlcat(
      "/v1/admin/opportunity-type",
      {
        ...data,
        limit: 500,
      } || {},
    ),
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

export const getTenderTagsAPI = async data => {
  const response = await api.request({
    url: urlcat(
      "/v1/admin/tag",
      {
        ...data,
        limit: 500,
      } || {},
    ),
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

export const getTenderCategoryAPI = async data => {
  const response = await api.request({
    url: urlcat("/v1/admin/tender-category", { ...data, limit: 500 } || {}),
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
export const getPackageAPI = async () => {
  const response = await api.request({
    url: urlcat("/v1/admin/package"),
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

import api from ".";
import urlcat from "urlcat";
import { transformTenderSavedFilter } from "./transform/vendor";
export const saveTenderAPI = async (tenderId) => {
  const response = await api.request({
    url: urlcat("v1/users/vendor/tender/save/:tenderId", { tenderId }),
    method: "POST",
  });
  if (response.remote === "success") {
    return {
      remote: "success",
      data: response.data,
    };
  }
  return response;
};

export const unSaveTenderAPI = async (tenderId) => {
  const response = await api.request({
    url: urlcat("v1/users/vendor/tender/save/:tenderId", { tenderId }),
    method: "DELETE",
  });
  if (response.remote === "success") {
    return {
      remote: "success",
      data: response.data,
    };
  }
  return response;
};

export const saveSearchTenderFilterAPI = async (data) => {
  const response = await api.request({
    url: urlcat("v1/tenders/filter"),
    method: "POST",
    data,
  });
  if (response.remote === "success") {
    return {
      remote: "success",
      data: transformTenderSavedFilter(response.data),
    };
  }
  return response;
};

export const getSearchTenderFilterAPI = async (data) => {
  const response = await api.request({
    url: urlcat("v1/tenders/filter"),
    method: "GET",
    data,
  });
  if (response.remote === "success") {
    return {
      remote: "success",
      data: response.data.map((data) => transformTenderSavedFilter(data)),
    };
  }
  return response;
};
export const deleteSearchTenderFilterAPI = async (filterId) => {
  const response = await api.request({
    url: urlcat("v1/tenders/filter/:filterId", { filterId }),
    method: "DELETE",
  });
  if (response.remote === "success") {
    return {
      remote: "success",
      data: response.data,
    };
  }
  return response;
};

export const updateSavedSearchTenderFilterAPI = async (filterId, status) => {
    const data = { is_notification: status };
    return await api.request({
      url: urlcat("/v1/tenders/filter/:filterId", { filterId }),
      method: "PUT",
      data,
    });
  };

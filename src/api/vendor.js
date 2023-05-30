import api from ".";
import urlcat from "urlcat";
import {
  transformTenderSavedFilter,
  transformVendorSavedFilter,
} from "./transform/vendor";
import { transformTenderResponse } from "./transform/tender";
import { transformGetUserDetails } from "./transform/user";
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

export const updateVendorAboutMeAPI = async (data) => {
  const response = await api.request({
    url: "/v1/users/vendor/about-me",
    method: "PATCH",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    data,
  });
  return response;
};

export const getSaveTenderAPI = async () => {
  const response = await api.request({
    url: "/v1/users/vendor/tender/save",
    method: "GET",
  });
  if (response.remote === "success") {
    return {
      remote: "success",
      data: {
        ...response.data,
        results: response.data.results.map((result) => {
          return {
            id: result.id,
            tender: transformTenderResponse({
              results: [result.tender],
            }).results[0],
          };
        }),
      },
    };
  }
  return response;
};

// vendor
export const saveSearchVendorFilterAPI = async (data) => {
  const response = await api.request({
    url: urlcat("v1/vendors/filter"),
    method: "POST",
    data,
  });
  if (response.remote === "success") {
    return {
      remote: "success",
      data: transformVendorSavedFilter(response.data),
    };
  }
  return response;
};

export const getSearchVendorFilterAPI = async (data) => {
  const response = await api.request({
    url: urlcat("v1/vendors/filter"),
    method: "GET",
    data,
  });
  if (response.remote === "success") {
    return {
      remote: "success",
      data: response.data.map((data) => transformVendorSavedFilter(data)),
    };
  }
  return response;
};
export const deleteSearchVendorFilterAPI = async (filterId) => {
  const response = await api.request({
    url: urlcat("v1/vendors/filter/:filterId", { filterId }),
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

export const updateSavedSearchVendorFilterAPI = async (filterId, status) => {
  const data = { is_notification: status };
  return await api.request({
    url: urlcat("/v1/vendors/filter/:filterId", { filterId }),
    method: "PUT",
    data,
  });
};

export const getApplicationDetailsAPI = async (applicationId) => {
  const res = await api.request({
    url: urlcat("/v1/tenders/applications-detail/:applicationId", {
      applicationId,
    }),
    method: "GET",
  });
  if (res.remote === "success") {
    res.data.user.profile = {
      ...(res.data.user.profile || {}),
      description: res.data.user.description,
    };
    return {
      remote: "success",
      data: {
        id: res.data.id,
        createdAt: res.data.created,
        tender: res.data.tender,
        rejectedAt: res.data.rejected_at,
        shortLetter: res.data.short_letter,
        shortlistedAt: res.data.shortlisted_at,
        attachments: res.data.attachments,
        user: { ...transformGetUserDetails(res.data.user) },
      },
    };
  }
  return res;
};
export const getAppliedTendersAPI = async (sortQuery) => {
  const res = await api.request({
    url: urlcat("/v1/users/vendor/tender/apply", sortQuery),
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
            tender: transformTenderResponse({
              results: [result.tender],
            }).results[0],
          };
        }),
      },
    };
  }
  return res;
};

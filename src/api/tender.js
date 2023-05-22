import api from ".";
import urlcat from "urlcat";
import {
  transformFullTenderDetails,
  transformTenderResponse,
} from "./transform/tender";
export const getTenderSearchAPI = async (data) => {
  const newData = { ...data };
  delete newData.sector;
  let url = urlcat("v1/tenders", { ...newData });
  if (data.sector) {
    data.sector.forEach((sector) => {
      url += `&sector=${sector}`;
    });
  }
  if (data.tenderCategories) {
    data.tenderCategories.forEach((category) => {
      url += `&tenderCategory=${category}`;
    });
  }
  if (data.opportunityType) {
    data.opportunityType.forEach((category) => {
      url += `&opportunityType=${category}`;
    });
  }

  const response = await api.request({
    url,
    method: "GET",
  });

  if (response.remote === "success") {
    return {
      remote: "success",
      data: transformTenderResponse(response.data),
    };
  }
  return response;
};
export const getTenderDetailsByIdAPI = async (data) => {
  const response = await api.request({
    url: urlcat("v1/tenders/:tenderId", { ...data }),
    method: "GET",
  });

  if (response.remote === "success") {
    return {
      remote: "success",
      data: transformFullTenderDetails(response.data),
    };
  }
  return response;
};

export const getTenderSuggestionAPI = async (tenderId) => {
  const response = await api.request({
    url: urlcat("v1/tenders/:tenderId/suggestion", { tenderId }),
    method: "GET",
  });
  if (response.status === "success") {
    return {
      remote: "success",
      data: transformTenderResponse(response.data),
    };
  }
  return response;
};

export const applyForTenderAPI = async (tenderId, data) => {
  const response = await api.request({
    url: urlcat("/v1/users/vendor/tender/apply/:tender", { tenderId }),
    method: "POST",
    data,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response;
};

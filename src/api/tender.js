import api from ".";
import urlcat from "urlcat";
import {
  transformFullTenderDetails,
  transformTenderResponse,
} from "./transform/tender";
export const getTenderSearchAPI = async (data) => {
  const response = await api.request({
    url: urlcat("v1/tenders", { ...data }),
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

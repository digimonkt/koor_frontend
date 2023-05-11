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

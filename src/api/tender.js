import api from ".";
import urlcat from "urlcat";
import { transformTenderResponse } from "./transform/tender";
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

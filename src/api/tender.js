import api from ".";
import urlcat from "urlcat";
import { transformTenderResponse } from "./transform/tender";
export const getTenderSearchAPI = async () => {
  const response = await api.request({
    url: urlcat("v1/tenders"),
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

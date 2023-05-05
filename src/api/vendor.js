import api from ".";
import urlcat from "urlcat";
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

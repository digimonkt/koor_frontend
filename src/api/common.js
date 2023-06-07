import api from ".";
import urlcat from "urlcat";
export const getResourcesAPI = async (limit, page) => {
  const res = await api.request({
    url: urlcat("/v1/admin/resources", { limit, page }),
    method: "GET",
  });
  return res;
};

export const getResourceDetailsAPI = async (resourcesId) => {
  const res = await api.request({
    url: urlcat("/v1/admin/resources/:resourcesId/detail", {
      resourcesId,
    }),
    method: "GET",
  });
  return res;
};

export const getUserRightsApi = async () => {
  const response = await api.request({
    url: urlcat("/v1/admin/user-rights"),
    method: "GET",
  });
  return response;
};

export const getPrivacyApi = async () => {
  const response = await api.request({
    url: urlcat("/v1/admin/privacy-policy"),
    method: "GET",
  });
  return response;
};

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

export const getUserRightsAPI = async () => {
  const response = await api.request({
    url: urlcat("/v1/admin/user-rights"),
    method: "GET",
  });
  return response;
};

export const getPrivacyAPI = async () => {
  const response = await api.request({
    url: urlcat("/v1/admin/privacy-policy"),
    method: "GET",
  });
  return response;
};

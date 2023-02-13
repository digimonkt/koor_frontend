import api from ".";
import urlcat from "urlcat";
import { transformGetUserDetails } from "./transform/user";
export const CreateUserAPI = async (data) => {
  const response = await api.request({
    url: "/v1/users",
    method: "POST",
    data,
  });
  return response;
};

export const LoginUserAPI = async (data) => {
  const response = await api.request({
    url: "/v1/users/session",
    method: "POST",
    data,
  });
  return response;
};

/**
 *
 * @param {object} data { userId: string}
 * @returns
 */
export const GetUserDetailsAPI = async (data) => {
  const response = await api.request({
    url: urlcat("/v1/users", data || {}),
  });
  if (response.remote === "success") {
    return {
      remote: "success",
      data: transformGetUserDetails(response.data),
    };
  }
  return response;
};

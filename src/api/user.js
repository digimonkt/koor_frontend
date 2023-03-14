import api from ".";
import urlcat from "urlcat";
import { transformGetUserDetails } from "./transform/user";
export const CreateUserAPI = async (data) => {
  return await api.request({
    url: "/v1/users",
    method: "POST",
    data,
  });
};

export const LoginUserAPI = async (data) => {
  return await api.request({
    url: "/v1/users/session",
    method: "POST",
    data,
  });
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

export const LogoutUserAPI = async () => {
  return await api.request({
    url: urlcat("/v1/users/delete-session"),
    method: "DELETE",
  });
};

export const UpdateProfileImageAPI = async (data) => {
  return await api.request({
    url: "/v1/users/display-image",
    method: "PATCH",
    data,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const SendOtpAPI = async (data) => {
  return await api.request({
    url: urlcat("/v1/users/send-otp", { email: data.email }),
    method: "GET",
  });
};

export const VerifyOtpAPI = async (data) => {
  return await api.request({
    url: urlcat("v1/users/otp-verification/:otp", data),
    method: "GET",
  });
};

export const ResetPasswordAPI = async (data, token) => {
  return await api.request({
    url: urlcat("v1/users/change-password", { token }),
    method: "PUT",
    data,
  });
};

import api from ".";
import urlcat from "urlcat";
import {
  transformGetUserDetails,
  transformNotificationResponse,
  transformSearchUserByRoleResponse,
  transformSearchUserFilterResponse,
} from "./transform/user";
import env from "@utils/validateEnv";
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

export const SocialLoginAPI = async (data) => {
  return await api.request({
    url: urlcat("v1/users/social-login"),
    method: "POST",
    data,
  });
};

export const GetNotificationAPI = async () => {
  const res = await api.request({
    url: urlcat("v1/users/notification"),
    method: "GET",
  });
  if (res.remote === "success") {
    return {
      remote: "success",
      data: {
        ...res.data,
        results: res.data.results.map((data) =>
          transformNotificationResponse(data)
        ),
      },
    };
  }
  return res;
};

export const GetSuggestedAddressAPI = async (search) => {
  return await api.request({
    url: urlcat("v1/users/get-location", { search }),
    method: "GET",
  });
};
export const getLetLongByAddressAPI = async (address) => {
  const res = await api.request({
    url: urlcat("https://maps.googleapis.com/maps/api/geocode/json", {
      address,
      key: env.REACT_APP_GOOGLE_API_KEY,
    }),
    method: "GET",
  });
  return res;
};

export const getUserIpAPI = async () => {
  return await api.request({
    url: "https://api.ipify.org?format=json",
    method: "GET",
  });
};

export const getUserCountryByIpAPI = async (ip) => {
  return await api.request({
    url: urlcat("https://api.iplocation.net/", { ip }),
    method: "GET",
  });
};
export const getSearchUserFilterAPI = async (data) => {
  const res = await api.request({
    url: urlcat("/v1/users/filter"),
    method: "GET",
  });
  if (res.remote === "success") {
    return {
      remote: "success",
      data: res.data.map((data) => transformSearchUserFilterResponse(data)),
    };
  }
  return res;
};
export const saveSearchUserFilterAPI = async (data) => {
  const res = await api.request({
    url: urlcat("/v1/users/filter"),
    method: "POST",
    data,
  });
  if (res.remote === "success") {
    console.log({ res });
  }
  return res;
};
export const updateSavedSearchUserFilterAPI = async (filterId, status) => {
  const data = { is_notification: status };
  return await api.request({
    url: urlcat("/v1/users/filter/:filterId", { filterId }),
    method: "PUT",
    data,
  });
};
export const deleteSearchUserFilterAPI = async (filterId) => {
  return await api.request({
    url: urlcat("/v1/users/filter/:filterId", { filterId }),
    method: "DELETE",
  });
};
export const searchUserByRole = async (data) => {
  let jobSubCategories = [];
  const newData = { ...data };
  if (newData.jobSubCategories) {
    jobSubCategories = newData.jobSubCategories;
    delete newData.jobSubCategories;
  }
  let url = urlcat("/v1/users/search/:role", { ...newData });
  jobSubCategories.forEach((subCategory) => {
    url += `&jobSubCategory=${subCategory.title}`;
  });
  const res = await api.request({
    url,
    method: "GET",
  });
  if (res.remote === "success") {
    return {
      remote: "success",
      data: {
        ...res.data,
        results: res.data.results.map((data) =>
          transformSearchUserByRoleResponse(data)
        ),
      },
    };
  }
  return res;
};

export const getJobSeekerCategoriesAPI = async () => {
  const res = await api.request({
    url: urlcat("/v1/admin/job-seeker-category"),
    method: "GET",
  });
  return res;
};

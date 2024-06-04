import api from ".";
import urlcat from "urlcat";
import {
  transformGetUserDetails,
  transformNotificationResponse,
  transformSearchUserByRoleResponse,
  transformSearchUserFilterResponse,
} from "./transform/user";
import env from "../utils/validateEnv";
import { USER_ROLES } from "../utils/enum";

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
    url: urlcat("/v1/users/send-otp", { email: data.email, role: data.role }),
    method: "GET",
  });
};

export const VerifyOtpAPI = async (data) => {
  return await api.request({
    url: urlcat("v1/users/otp-verification/:otp", data),
    method: "GET",
  });
};

export const ResentActivation = async (data) => {
  return await api.request({
    url: urlcat("v1/users/resend-verification"),
    method: "POST",
    data,
  });
};

export const VerifyAcountAPI = async (data) => {
  return await api.request({
    url: urlcat("v1/users/account-verification/:hash_code", {
      hash_code: data,
    }),
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

export const GetNotificationAPI = async ({ type, created, exactDate }) => {
  const res = await api.request({
    url: urlcat("v1/users/notification", {
      type,
      created,
      limit: 1000,
      exact_date: exactDate,
    }),
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
export const postUserIpAPI = async (ip) => {
  await api.request({
    url: urlcat("/v1/users/visitors"),
    method: "POST",
    data: { ip },
  });
};
export const getSearchUserFilterAPI = async (data) => {
  const res = await api.request({
    url: urlcat("/v1/users/filter", { role: "job_seeker" }),
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
  let organizationTypes = [];
  let tag = [];
  let sector = [];
  const newData = { ...data };
  if (newData.jobSubCategories) {
    jobSubCategories = newData.jobSubCategories;
    delete newData.jobSubCategories;
  }
  if (data.role === USER_ROLES.vendor) {
    const city = data.city;
    const country = data.country;
    delete newData.city;
    delete newData.country;
    newData.vendor_city = city;
    newData.vendor_country = country;
    if (data.opportunityType) {
      organizationTypes = data.opportunityType;
      delete newData.opportunityType;
    }
    if (data.tag) {
      tag = data.tag;
      delete newData.tag;
    }
    if (data.sector) {
      sector = data.sector;
      delete newData.sector;
    }
  }
  let url = urlcat("/v1/users/search/:role", { ...newData });
  jobSubCategories.forEach((subCategory) => {
    url += `&jobSubCategory=${subCategory.title}`;
  });
  organizationTypes.forEach((organizationType) => {
    url += `&organizationType=${organizationType.title}`;
  });
  tag.forEach((tag) => {
    url += `&tag=${tag.title}`;
  });
  sector.forEach((sector) => {
    url += `&sector=${sector.title}`;
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

export const storeProfileAnalyticsAPI = async (data) => {
  const res = await api.request({
    url: urlcat("/v1/users/analytic"),
    method: "POST",
    data,
  });
  return res;
};

export const settingUpdateAPI = async (notificationType) => {
  const res = await api.request({
    url: urlcat("v1/users/notification/settings/:notificationType", {
      notificationType,
    }),
    method: "PUT",
  });
  return res;
};

export const getSettingUpdateAPI = async () => {
  const res = await api.request({
    url: urlcat("v1/users/notification/settings"),
    method: "GET",
  });
  return res;
};

export const updateNotificationReadAPI = async (id) => {
  const res = await api.request({
    url: urlcat("v1/users/notification/:id", { id }),
    method: "PUT",
  });
  return res;
};

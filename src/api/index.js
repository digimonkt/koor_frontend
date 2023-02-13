import axios from "axios";
import { SERVER_URL } from "../utils/serverUrl";
import { globalLocalStorage } from "../utils/localStorage";

export const axiosInstance = axios.create({
  baseURL: `${SERVER_URL}api`,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.response.use(function (response) {
  const newAccessToken = response.headers.get("x-access");
  if (newAccessToken !== globalLocalStorage.getAccessToken()) {
    globalLocalStorage.setAccessToken(newAccessToken);
  }
  const newRefreshToken = response.headers.get("x-refresh");
  if (newRefreshToken !== globalLocalStorage.getRefreshToken()) {
    globalLocalStorage.setRefreshToken(newRefreshToken);
  }
  return response;
});

export const request = async (config) => {
  try {
    if (!config.headers) {
      config.headers = {};
    }
    if (!config.headers["Content-Type"]) {
      config.headers["Content-Type"] = "application/json";
    }
    const accessToken = globalLocalStorage.getAccessToken();
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    const refreshToken = globalLocalStorage.getRefreshToken();
    if (refreshToken) {
      config.headers["x-refresh"] = `Bearer ${refreshToken}`;
    }
    const response = await axiosInstance.request({ ...config });
    console.log({ body: response });
    return {
      remote: "success",
      data: response.data,
    };
  } catch (error) {
    if (error) {
      if (error.response) {
        const axiosError = error;
        if (axiosError.response && axiosError.response.data) {
          let errorMessage = axiosError.response.data;
          // check for 500 to handle message defined by the app
          if (axiosError.response.status === 500) {
            errorMessage = {
              message: ["Internal Server Error"],
            };
          }
          for (const key in errorMessage) {
            errorMessage[key] = errorMessage[key][0];
          }
          return {
            remote: "failure",
            error: {
              status: axiosError.response.status,
              errors: errorMessage,
            },
          };
        }
      } else {
        const axiosError = error;
        const errorMessage = axiosError.message;

        return {
          remote: "failure",
          error: {
            errors: errorMessage,
          },
        };
      }
    }
    throw error;
  }
};

export const parseResponse = (response) => {
  const data = JSON.parse(response);
  if (data && (data.errors || data.error)) {
    return {
      remote: "failure",
      error: {
        errors: data.errors ?? data.error,
      },
    };
  }
  return {
    remote: "success",
    data,
  };
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { axiosInstance, request, parseResponse };

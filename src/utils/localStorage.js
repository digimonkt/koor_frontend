import { Capacitor } from "@capacitor/core";
import { Storage } from "@capacitor/storage";

export const globalLocalStorage = {
  setAccessToken: async (accessToken) => {
    if (Capacitor.isNativePlatform()) {
      await Storage.set({ key: "x-access", value: accessToken });
    } else {
      localStorage.setItem("x-access", accessToken);
      window.dispatchEvent(new Event("storage"));
    }
  },
  removeAccessToken: async () => {
    if (Capacitor.isNativePlatform()) {
      await Storage.remove({ key: "x-access" });
    } else {
      localStorage.removeItem("x-access");
      window.dispatchEvent(new Event("storage"));
    }
  },
  getAccessToken: async () => {
    if (Capacitor.isNativePlatform()) {
      const { value } = await Storage.get({ key: "x-access" });
      return value;
    } else {
      return localStorage.getItem("x-access");
    }
  },
  setRefreshToken: async (refreshToken) => {
    if (Capacitor.isNativePlatform()) {
      await Storage.set({ key: "x-refresh", value: refreshToken });
    } else {
      localStorage.setItem("x-refresh", refreshToken);
      window.dispatchEvent(new Event("storage"));
    }
  },
  removeRefreshToken: async () => {
    if (Capacitor.isNativePlatform()) {
      await Storage.remove({ key: "x-refresh" });
    } else {
      localStorage.removeItem("x-refresh");
      window.dispatchEvent(new Event("storage"));
    }
  },
  getRefreshToken: async () => {
    if (Capacitor.isNativePlatform()) {
      const { value } = await Storage.get({ key: "x-refresh" });
      return value;
    } else {
      return localStorage.getItem("x-refresh");
    }
  },
  cleanLocalStorage: async () => {
    if (Capacitor.isNativePlatform()) {
      await Storage.clear();
    } else {
      localStorage.clear();
    }
  },
};

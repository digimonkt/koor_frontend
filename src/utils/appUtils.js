import { Capacitor } from "@capacitor/core";
import { App } from "@capacitor/app";
import { setAppInfo, setStatusBar } from "@redux/slice/platform";
import { SafeArea } from "capacitor-plugin-safe-area";

export const backButtonAction = () => {
  const history = window.history;
  if (history.length > 1) {
    history.back();
  } else {
    if (Capacitor.isNativePlatform) {
      App.exitApp();
    }
  }
};

export const deepLinked = (nav, url) => {
  const handleDeepLink = async (url) => {
    const parsedUrl = new URL(url);
    const verifyToken = parsedUrl.searchParams.get("verify-token");
    nav("/activation?verify-token=" + verifyToken);
  };
  handleDeepLink(url);
  App.getLaunchUrl().then((launchUrl) => {
    if (launchUrl && launchUrl.url) {
      handleDeepLink(launchUrl.url);
    }
  });
};

export const fetchAppInfo = async (dispatch) => {
  try {
    const appInfoResult = await App.getInfo();
    dispatch(setAppInfo(appInfoResult));
  } catch (error) {
    console.error("Error fetching app information:", error);
  }
};

export const safeAreaSetter = (dispatch) => {
  SafeArea.getStatusBarHeight().then(({ statusBarHeight }) => {
    dispatch(setStatusBar(statusBarHeight));
    const appElement = document.querySelector(".App");
    if (appElement) {
      const platform = Capacitor.getPlatform;
      if (platform === "ios") {
        appElement.style.marginTop = `${statusBarHeight}px`;
        appElement.style.marginBottom = `${statusBarHeight - 20}px`;
      }
    }
  });
};

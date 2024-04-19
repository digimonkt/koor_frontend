import { Capacitor } from "@capacitor/core";
import { App } from "@capacitor/app";

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

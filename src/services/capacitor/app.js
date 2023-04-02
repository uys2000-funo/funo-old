import { App } from "@capacitor/app";

export const runAtAppStateChange = function (runFunc = () => {}) {
  return App.addListener("appStateChange", runFunc);
};

export const runAtAppUrlOpen = function (runFunc = () => {}) {
  return App.addListener("appUrlOpen", runFunc);
};

export const runAtAppRestored = function (runFunc = () => {}) {
  return App.addListener("appRestoredResult", runFunc);
};

export const runAtBackButton = function (runFunc = () => {}) {
  return App.addListener("backButton", runFunc);
}

export const removeAppListeners = function () {
  return App.removeAllListeners();
}
export const getAppLaunchURL = function () {
  return App.getLaunchUrl();
};

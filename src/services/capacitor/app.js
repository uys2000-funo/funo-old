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

export const getAppLaunchURL = function () {
  return App.getLaunchUrl();
};

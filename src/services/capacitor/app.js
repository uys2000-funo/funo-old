import { App } from "@capacitor/app";
import { c } from "../c";

export const runAtAppStateChange = function (
  f = ({ isActive }) => c("appStateChanged", isActive)
) {
  return App.addListener("appStateChange", f);
};

export const runAtAppUrlOpen = function (
  f = ({ data }) => c("appUrlOpend", data)
) {
  return App.addListener("appUrlOpen", f);
};

export const runAtAppRestored = function (
  f = ({ data }) => c("appUrlOpend", data)
) {
  return App.addListener("appRestoredResult", f);
};

export const getAppLaunchURL = async function () {
  return App.getLaunchUrl();
};  

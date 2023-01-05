import { App as CapacitorApp } from "@capacitor/app";

export const setBackButton = function () {
  CapacitorApp.addListener("backButton", ({ canGoBack }) => {
    if (!canGoBack) {
      alert("asd");
    } else {
      window.history.back();
    }
  });
};
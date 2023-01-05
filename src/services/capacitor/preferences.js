import { Preferences } from "@capacitor/preferences";

export const setLocalObject = function (key, value) {
  return Preferences.set({ key: key, value: value });
};

export const getLocalObject = function (key) {
  return Preferences.get({ key: key });
};

export const removeLocalObject = function (key) {
  return Preferences.remove({ key: key });
};

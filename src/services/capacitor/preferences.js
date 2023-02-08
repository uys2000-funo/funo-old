import { Preferences } from "@capacitor/preferences";
import { c } from "../c";

export const setLocalObject = function (key, value) {
  c("setLocalObject", key, value);
  return Preferences.set({ key: key, value: JSON.stringify(value) });
};

export const getLocalObject = function (key) {
  c("getLocalObject", key);
  return Preferences.get({ key: key }).then(({value:rawValue}) => ({value : JSON.parse(rawValue)}));
};

export const removeLocalObject = function (key) {
  return Preferences.remove({ key: key });
};

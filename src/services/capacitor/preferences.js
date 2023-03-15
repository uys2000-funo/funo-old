import { Preferences } from "@capacitor/preferences";
import { l } from "../debug";

export const setLocalObject = function (key, value) {
  l("setLocalObject", arguments);
  return Preferences.set({ key: key, value: JSON.stringify(value) });
};

export const getLocalObject = function (key) {
  l("getLocalObject", arguments);
  return Preferences.get({ key: key }).then(({ value: rawValue }) => ({
    value: JSON.parse(rawValue),
  }));
};

export const removeLocalObject = function (key) {
  l("removeLocalObject", arguments);
  return Preferences.remove({ key: key });
};

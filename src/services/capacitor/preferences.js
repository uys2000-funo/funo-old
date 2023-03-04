import { Preferences } from "@capacitor/preferences";

export const setLocalObject = function (key, value) {
  return Preferences.set({ key: key, value: JSON.stringify(value) });
};

export const getLocalObject = function (key) {
  return Preferences.get({ key: key }).then(({value:rawValue}) => ({value : JSON.parse(rawValue)}));
};

export const removeLocalObject = function (key) {
  return Preferences.remove({ key: key });
};

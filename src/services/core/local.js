import { c } from "../c";

export const setLocalValue = function (key, value) {
  c("Run :setLastUser", value);
  localStorage.setItem(key, JSON.stringify(value));
};
export const getLocalValue = function (key) {
  return c("Run gettLastUser", JSON.parse(localStorage.getItem(key)));
};

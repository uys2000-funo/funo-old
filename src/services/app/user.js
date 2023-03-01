import { f } from "../c";
import { setLocalObject, getLocalObject } from "../capacitor/preferences";
import { getDocument } from "../firebase/core/firestore";

export const getFirestoreUser = function (uID) {
  return f(getDocument, "-Users", uID).then((rawUser) => rawUser.data);
};
export const setLocalUserData = function (user) {
  return f(setLocalObject, "user", user);
};
export const getLocalUserData = function () {
  return f(getLocalObject, "user");
};

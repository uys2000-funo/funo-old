import { f } from "../c";
import { setLocalObject } from "../capacitor/preferences";
import { getDocument } from "../firebase/core/firestore";

export const getFirestoreUser = function (uID) {
  return f(getDocument, "U", uID);
};
export const setLocalUserData = function (user) {
  return f(setLocalObject, "user", user);
};

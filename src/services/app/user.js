import { signInWithEmailAndPassword } from "@/services/app/auth";
import { f } from "../c";
import {
  signOutCapacitor,
  updateCapacitorPassword,
} from "../capacitor/firebaseAuthentication";
import { setLocalObject, getLocalObject } from "../capacitor/preferences";
import { signOutFirebase } from "../firebase/authentication";
import { getDocument, updateDocument } from "../firebase/firestore";

export const updateUser = function (uID, data) {
  return f(updateDocument, "-Users", uID, data);
};
export const updatePassword = function (mail, oldPassword, newPassword) {
  return f(signInWithEmailAndPassword, mail, oldPassword).then(() =>
    f(updateCapacitorPassword, newPassword)
  );
};
export const setLocalUserData = function (user) {
  return f(setLocalObject, "user", user);
};
export const getLocalUserData = function () {
  return f(getLocalObject, "user");
};
export const getFirestoreUser = function (uID) {
  return f(getDocument, "-Users", uID).then((rawUser) => rawUser.data);
};
export const signOut = function () {
  return signOutFirebase().then(() => signOutCapacitor());
};

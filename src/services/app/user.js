import { l, f } from "@/services/debug.js";
import {
  signOutCapacitor,
  updateCapacitorPassword,
} from "../capacitor/firebaseAuthentication";
import { signInWithEmailAndPassword } from "@/services/app/auth";
import { signOutFirebase } from "@/services/firebase/authentication";
import {
  getDocument,
  increaseDocument,
  setDocument,
} from "@/services/firebase/firestore";
import { updateDocument } from "@/services/firebase/firestore";
import { getFile, uploadFile } from "../firebase/storage";

export const createUser = function (uID, data, image) {
  l("Run - createUser", arguments);
  return f(uploadFile, [`User/${uID}`, "image", image])
    .then(() => f(getFile, [`User/${uID}/image`]))
    .then((url) => {
      data["uID"] = uID;
      data["account"]["photoURL"] = url;
      return f(setDocument, ["User", uID, data]);
    });
};
export const createCompany = function (uID, data) {
  l("Run - createCompany", arguments);
  return f(setDocument, ["Company", uID, { uID: uID, data }]);
};

export const updateUserData = function (uID, data) {
  l("Run - updateUserData", arguments);
  return f(updateDocument, ["User", uID, data]).then(() =>
    f(increaseDocument, ["User", uID, "updateUserData", 1])
  );
};
export const updateCompanyData = function (uID, data) {
  l("Run - updateCompanyData", arguments);
  return f(updateDocument, ["Company", uID, data]).then(() =>
    f(increaseDocument, ["User", uID, "updateCompanyData", 1])
  );
};

export const updateUserPhoto = function (uID, image) {
  l("Run - updateUserPhoto", arguments);
  return f(uploadFile, [`User/${uID}`, "image", image])
    .then(() => f(getFile, [`User/${uID}/image`]))
    .then((url) =>
      f(updateDocument, ["User", uID, { "account.photoURL": url }])
    )
    .then(() => f(increaseDocument, ["User", uID, "updateUserPhoto", 1]));
};
export const getUserData = function (uID) {
  l("Run - getUserData", arguments);
  return f(getDocument, ["User", uID]);
};
export const getUserPhoto = function (uID) {
  l("Run - getUserPhoto", arguments);
  return f(getFile, [`User/${uID}/image`]);
};
export const updatePassword = function (mail, oldPassword, newPassword) {
  l("Run - updatePassword", arguments);
  return f(signInWithEmailAndPassword, [mail, oldPassword]).then(() =>
    f(updateCapacitorPassword, [newPassword])
  );
};

export const signOut = function () {
  l("Run - signOut", arguments);
  return signOutFirebase().then(() => signOutCapacitor());
};

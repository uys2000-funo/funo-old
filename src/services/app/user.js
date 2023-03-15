import { l, f, p } from "@/services/debug.js";
import {
  signOutCapacitor,
  updateCapacitorPassword,
} from "../capacitor/firebaseAuthentication";
import { signInWithEmailAndPassword } from "@/services/app/auth";
import { signOutFirebase } from "@/services/firebase/authentication";
import {
  addDocument,
  getCollectionOWU,
  getDocument,
  increaseDocument,
  setDocument,
} from "@/services/firebase/firestore";
import { updateDocument } from "@/services/firebase/firestore";
import { getFile, uploadFile } from "../firebase/storage";
import user from "@/services/app/user.json";
import { Timestamp } from "firebase/firestore";

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
export const followedUser = function (uID, fID) {
  user.followedUser[0].equality = uID;
  user.followedUser[1].equality = fID;
  return f(getCollectionOWU, ["UserFollowedUser", null, user.followedUser]);
};
export const followUser = function (dID, uID, fID) {
  const fd = { uID, fID, isFollowing: true };
  return p
    .then(() => (uID ? f(updateDocument, ["UserFollowedUser", dID, fd]) : null))
    .then((r) => (!uID ? f(addDocument, ["UserFollowedUser", fd]) : r))
    .then((r) => f(increaseDocument, ["User", fID, "follower", 1], r))
    .then((r) => f(increaseDocument, ["User", uID, "followed", 1], r));
};
export const unfollowUser = function (uID, fID, dID) {
  return f(updateDocument, ["UserFollowedUser", dID, { isFollowing: false }])
    .then((r) => f(increaseDocument, ["User", fID, "follower", -1], r))
    .then((r) => f(increaseDocument, ["User", uID, "followed", -1], r));
};

export const getNewUsers = function (last) {
  const args = ["User", last ? last : Timestamp.now(), user.newUsers];
  return f(getCollectionOWU, args);
};

export const getFollowedUsers = function (uID, last) {
  user.followedUsers[1].equality = uID;
  const args = [
    "UserFollowedUser",
    last ? last : Timestamp.now(),
    user.followedUsers,
  ];
  return f(getCollectionOWU, args);
};

import { c } from "../c";
import { createUserAuth } from "../firebase/authentication";
import { setDocument } from "../firebase/firestore";
import { getFile, uploadFile } from "../firebase/storage";

export const isValidUser = function (user = {}) {
  return new Promise((resolve, reject) => {
    c("isValidUser", user);
    Object.keys(user).forEach((key, index) => {
      c("keys", key, user[key]);
      if (user[key] == undefined || user[key] == null || user[key] == "")
        reject({ result: false, key: key });
      if (index == Object.keys(user).length - 1) resolve(true);
    });
  });
};

export const registerUser = function (user = {}, password = "", image = null) {
  image;
  return createUserAuth(user.mail, password)
    .then((userAuth) =>
      uploadProfilePhoto(userAuth.user.uid, image).then(() =>
        getProfilePhoto(userAuth.user.uid).then((p) =>
          setDocument("-Users", userAuth.user.uid, { ...user, photoURL: p })
        )
      )
    );
};

export const uploadProfilePhoto = function (uID, file) {
  return uploadFile(`-Users/${uID}/uImg`, file);
};
export const getProfilePhoto = function (uID) {
  return getFile(`-Users/${uID}/uImg`);
};

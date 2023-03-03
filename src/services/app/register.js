import { c } from "../c";
import { showAlert } from "../capacitor/dialog";
import { createUserAuth } from "../firebase/core/authentication";
import { setDocument } from "../firebase/core/firestore";
import { getFile, uploadFile } from "../firebase/core/storage";

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

const errCatch = (err) => {
  if (err.code == "auth/invalid-email")
    showAlert("Hata", "Geçersiz Eposta Adresi");
  if (err.code == "auth/weak-password")
    showAlert("Hata", "Şifre en az 6 karakterden oluşmalı");
  if (err.code == "auth/email-already-in-use")
    showAlert("Hata", "Eposta Adresi Kullanımda");
  else console.log(err.code);
};

export const registerUser = function (user = {}, password = "", image = null) {
  image;
  return createUserAuth(user.mail, password)
    .catch(errCatch)
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

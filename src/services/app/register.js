import { c } from "../c";
import { createUserAuth } from "../firebase/core/authentication";
import { setDocument } from "../firebase/core/firestore";

export const isValidUser = function (user = {}) {
  return new Promise((resolve, reject) => {
    c("isValidUser", user);
    Object.keys(user).forEach((key, index) => {
      c("keys", key, user[key]);
      if (user[key] == undefined || user[key] == null || user[key] == "")
        reject(false);
      if (index == Object.keys(user).length - 1) resolve(true);
    });
  });
};

export const registerUser = function (user = {}, password = "") {
  return createUserAuth(user.mail, password).then((u) =>
    setDocument("-Users", u.user.uid, user)
  );
};

import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import app from "./app";
import c from "../c";

const auth = getAuth(app);

const createUserUpdate = function (displayName, hasImg) {
  c("Run: createUserUpdate", [displayName, hasImg]);
  const data = {
    displayName: displayName,
    photoURL: hasImg ? `U/${auth.currentUser.uid}/imgs/pImg` : null,
  };
  c("Call: updateProfile", [auth.currentUser, data]);
  return updateProfile(auth.currentUser, data)
    .then((res) => c(["Res: createUserUpdate", res], true))
    .catch((err) => c(["Res: createUserUpdate", err], false));
};
export const createUserAuth = function (mail, pass, displayName, hasImg) {
  c("Run: createUserAuth", [mail, pass, displayName, hasImg]);
  c("Call: createUserWithEmailAndPassword", [auth, mail, pass]);
  return createUserWithEmailAndPassword(auth, mail, pass)
    .then((res) =>
      c("Res: createUserAuth", res, createUserUpdate(displayName, hasImg))
    )
    .catch((err) => c(["Res: createUserAuth", err], false));
};
export const getUserAuth = function (mail, pass) {
  c("Run: getUserAuth", [mail, pass]);
  c("Call: signInWithEmailAndPassword", [auth, mail, pass]);
  return signInWithEmailAndPassword(auth, mail, pass)
    .then((res) => c("Res: getUserAuth", res))
    .catch((err) => c(["Res: getUserAuth", err], false));
};
export const getUserAuthGoogle = function () {
  c("Run: getUserAuthGoogle");
  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({
    login_hint: "user@example.com",
  });
  provider.addScope("https://www.googleapis.com/auth/userinfo.email");
  provider.addScope("https://www.googleapis.com/auth/userinfo.profile");
  c("Call: signInWithPopup", auth);
  return signInWithPopup(auth, provider)
    .then((res) => c("Res: getUserAuth", res))
    .catch((err) => c(["Res: getUserAuth", err], false));
};

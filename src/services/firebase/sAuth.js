import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import app from "./app";
const auth = getAuth(app);

const createUserUpdate = function (displayName, hasImg) {
  const data = {
    displayName: displayName,
    photoURL: hasImg ? `U/${auth.currentUser.uid}/imgs/pImg` : null,
  };
  return updateProfile(auth.currentUser, data);
};
export const createUserAuth = function (mail, pass, displayName, hasImg) {
  return createUserWithEmailAndPassword(auth, mail, pass).then((res) => {
    createUserUpdate(displayName, hasImg);
    return res;
  });
};
export const getUserAuth = function (mail, pass) {
  return signInWithEmailAndPassword(auth, mail, pass);
};
const getProvider = function () {
  const provider = new GoogleAuthProvider();
  provider.addScope("https://www.googleapis.com/auth/userinfo.profile");
  provider.addScope("https://www.googleapis.com/auth/user.gender.read");
  provider.addScope("https://www.googleapis.com/auth/user.addresses.read");
  provider.addScope("https://www.googleapis.com/auth/user.birthday.read");
  provider.addScope("https://www.googleapis.com/auth/user.phonenumbers.read");
  return provider;
};
export const getUserAuthGoogle = function () {
  const provider = getProvider();
  return signInWithPopup(auth, provider).then((res) => {
    const credential = GoogleAuthProvider.credentialFromResult(res);
    const token = credential.accessToken;
    return [res, token];
  });
};

import {
  sendCapacitorPasswordResetEmail,
  signInCapacitorWithApple,
  signInCapacitorWithEmailAndPassword,
  signInCapacitorWithFacebook,
  signInCapacitorWithGoogle,
  signOutCapacitor,
} from "@/services/capacitor/firebaseAuthentication.js";
import {
  signInFirebaseWithAppleToken,
  signInFirebaseWithEmailAndPassword,
  signInFirebaseWithFacebookToken,
  signInFirebaseWithGoogleToken,
  signOutFirebase,
} from "@/services/firebase/core/authentication.js";
import { f } from "../c";

export const sendPasswordResetEmail = function (email) {
  return f(sendCapacitorPasswordResetEmail, email);
};
export const signInWithEmailAndPassword = function (email, password) {
  return f(signInCapacitorWithEmailAndPassword, email, password).then(() =>
    f(signInFirebaseWithEmailAndPassword, email, password)
  );
};
export const signInWithFacebook = function () {
  return f(signInCapacitorWithFacebook).then((cFacebookAuth) =>
    f(signInFirebaseWithFacebookToken, cFacebookAuth)
  );
};
export const signInWithGoogle = function () {
  return f(signInCapacitorWithGoogle).then((cGoogleAuth) =>
    f(signInFirebaseWithGoogleToken, cGoogleAuth)
  );
};
export const signInWithApple = function () {
  return f(signInCapacitorWithApple).then((cAppleAuth) =>
    f(signInFirebaseWithAppleToken, cAppleAuth)
  );
};
export const signOut = function () {
  return f(signOutCapacitor)
    .catch(() => f(signOutFirebase))
    .then(() => f(signOutFirebase));
};

import {
  signInCapacitorWithApple,
  signInCapacitorWithGoogle,
} from "../capacitor/firebaseAuthentication";
import { setLocalObject } from "../capacitor/preferences";
import {
  signInFirebaseWithApple,
  signInFirebaseWithGoogle,
} from "../firebase/authentication";

export const signInWithGoogle = async function () {
  const signInResult = await signInCapacitorWithGoogle();
  const userCredential = await signInFirebaseWithGoogle(signInResult);
  setLocalObject("isLogged", true);
  return userCredential;
};

export const signInWithApple = async function () {
  const signInResult = await signInCapacitorWithApple();
  const userCredential = await signInFirebaseWithApple(signInResult);
  setLocalObject("isLogged", true);
  return userCredential;
};

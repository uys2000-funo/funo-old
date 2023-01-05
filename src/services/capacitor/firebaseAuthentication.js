import { FirebaseAuthentication } from "@capacitor-firebase/authentication";

export const getCapacitorCurrentUser = function () {
  return FirebaseAuthentication.getCurrentUser();
};

export const sendCapacitorEmailVerification = function () {
  return getCapacitorCurrentUser().then((currentUser) => {
    if (!currentUser.user) return false;
    return FirebaseAuthentication.sendEmailVerification();
  });
};

export const sendCapacitorPasswordResetEmail = function (email) {
  return FirebaseAuthentication.sendPasswordResetEmail({ email: email });
};

export const setCapacitorLanguageCode = function (languageCode = "tr-TR") {
  return FirebaseAuthentication.setLanguageCode({ languageCode: languageCode });
};

export const signInCapacitorWithEmailAndPassword = function (mail, password) {
  return FirebaseAuthentication.signInWithEmailAndPassword({
    email: mail,
    password: password,
  });
};

export const signInCapacitorWithFacebook = function () {
  return FirebaseAuthentication.signInWithFacebook();
};

export const signInCapacitorWithGoogle = function () {
  return FirebaseAuthentication.signInWithGoogle();
};

export const signInCapacitorWithApple = function () {
  return FirebaseAuthentication.signInWithApple();
};
export const signOutCapacitor = function () {
  return FirebaseAuthentication.signOut();
};

export const updateCapacitorEmail = function (email) {
  return getCapacitorCurrentUser().then((currentUser) => {
    if (!currentUser.user) return;
    return FirebaseAuthentication.updateEmail({
      newEmail: email,
    });
  });
};

export const updateCapacitorPassword = function (password) {
  return getCapacitorCurrentUser().then((currentUser) => {
    if (!currentUser.user) return;
    return FirebaseAuthentication.updatePassword({
      newPassword: password,
    });
  });
};

import {
  getCapacitorCurrentUser,
  signInCapacitorWithApple,
  signInCapacitorWithEmailAndPassword,
  signInCapacitorWithFacebook,
  signInCapacitorWithGoogle,
  signOutCapacitor,
} from "@/services/capacitor/firebaseAuthentication.js";
import {
  getFirebaseCurrentUser,
  signInFirebaseWithAppleToken,
  signInFirebaseWithEmailAndPassword,
  signInFirebaseWithFacebookToken,
  signInFirebaseWithGoogleToken,
  signOutFirebase,
} from "@/services/firebase/authentication.js";
import { f } from "@/services/debug.js";

export const signInWithEmailAndPassword = function (email, password) {
  return f(signInCapacitorWithEmailAndPassword, [email, password]).then(() =>
    f(signInFirebaseWithEmailAndPassword, [email, password])
  );
};

export const signInWithFacebook = function () {
  return f(signInCapacitorWithFacebook).then((cFacebookAuth) =>
    f(signInFirebaseWithFacebookToken, [cFacebookAuth])
  );
};

export const signInWithGoogle = function () {
  return f(signInCapacitorWithGoogle).then((cGoogleAuth) =>
    f(signInFirebaseWithGoogleToken, [cGoogleAuth])
  );
};

export const signInWithApple = function () {
  return f(signInCapacitorWithApple).then((cAppleAuth) =>
    f(signInFirebaseWithAppleToken, [cAppleAuth])
  );
};

export const signOut = function () {
  return f(signOutCapacitor)
    .catch(() => f(signOutFirebase))
    .then(() => f(signOutFirebase));
};

export const checkAuth = function () {
  return new Promise((resolve, reject) => {
    const rejectFunction = () => signOut().then(() => reject(false));

    f(getCapacitorCurrentUser)
      .then(() => {
        let counter = 0;
        var interval = setInterval(function () {
          counter = counter + 100;
          const user = getFirebaseCurrentUser();
          if (user) {
            clearInterval(interval);
            resolve(user);
          } else if (counter >= 5000) {
            clearInterval(interval);
            rejectFunction();
          }
        }, 100);
      })
      .catch(rejectFunction);
  });
};

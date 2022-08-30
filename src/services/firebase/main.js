import {
  createUserFirestore,
  getUserFirestore,
  createEventFirestore,
  createEventFirestoreUser,
  getAllEvetntsFirestore,
  getEventFirestore,
  addUserToEventFirestore,
  addEventToUserFirestore,
  updateUser,
  updateEvent,
  removeEventToUserFirestore,
  removeUserToEventFirestore,
} from "./sFirestore";
import { createUserAuth, getUserAuth, getUserAuthGoogle } from "./sAuth";
import {
  createEventImgsStorage,
  createUserImgsStorage,
  getImage,
} from "./sStorage";
import { c, f } from "../c";

export const registerFunction = function (uData, uImg = null, tImg = null) {
  return f(
    createUserAuth,
    uData.mail,
    uData.pass,
    uData.name,
    uImg != null
  ).then((res) => {
    uData["tImg"] = tImg != null ? `U/${res.user.uid}/imgs/tImg` : null;
    f(createUserImgsStorage, res.user.uid, uImg, tImg);
    return f(createUserFirestore, res.user.uid, uData);
  });
};
export const loginFunction = function (uData) {
  return getUserAuth(uData?.mail, uData?.pass).then((res) => {
    return f(getUserFirestore, res.user.uid).then((re) => {
      return c("Res: loginFunction", { userAuth: res, userFire: re.data() });
    });
  });
};
const getEditedData = function (gData, aData) {
  return c("Res: getEditedData", {
    name: aData.user.displayName,
    birth: gData.birthdays[0].date,
    gender: gData.genders[0].value,
    nick: null,
    phone: null,
    mail: aData.user.email,
    pass: null,
  });
};
const getUserDataFromGoogle = function (id, accessToken, aData) {
  const url = `https://people.googleapis.com/v1/people/${id}?personFields=phoneNumbers,genders,birthdays,addresses`;
  return f(fetch, url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Accept: "application/json",
    },
  }).then((res) => {
    return res.json().then((gData) => {
      return getEditedData(gData, aData);
    });
  });
};
const getCheckedData = function (aData, fData) {
  if (fData.data() == undefined) {
    return f(
      getUserDataFromGoogle,
      aData[0].user.providerData[0].uid,
      aData[1],
      aData[0]
    );
  } else {
    return c("Res: loginFunction", { userAuth: aData, userFire: fData.data() });
  }
};
export const loginFunctionGoogle = function () {
  return f(getUserAuthGoogle).then((aData) => {
    return f(getUserFirestore, aData[0].user.uid).then((fData) => {
      return f(getCheckedData, aData, fData);
    });
  });
};
export const addEventFunction = function (uID, data, eImgs, uName) {
  data["owners"] = [uID];
  data["ownersNames"] = [uName];
  data["imgCount"] = eImgs.length;
  return f(createEventFirestore, data).then((res) => {
    return f(createEventFirestoreUser, uID, res.id).then(() => {
      return f(createEventImgsStorage, res.id, eImgs);
    });
  });
};
export const getAllEvents = function () {
  return f(getAllEvetntsFirestore);
};

export const getImgStorage = function (iPath) {
  return f(getImage, iPath);
};

export const getEvent = function (eID) {
  return f(getEventFirestore, eID);
};
export const joinEvent = function (uID, eID, user, event) {
  return f(addEventToUserFirestore, uID, eID)
    .then(() =>
      f(addUserToEventFirestore, uID, eID).catch(() => f(updateUser, uID, user))
    )
    .catch(() => f(updateEvent, eID, event));
};
export const exitEvent = function (uID, eID, user, event) {
  return f(removeEventToUserFirestore, uID, eID)
    .then(() =>
      f(removeUserToEventFirestore, uID, eID).catch(() =>
        f(updateUser, uID, user)
      )
    )
    .catch(() => f(updateEvent, eID, event));
};
export const autoLogin = function (user) {
  return f(loginFunction, user);
};
export const getImg = function (imgDirection) {
  return f(getImage, imgDirection);
};

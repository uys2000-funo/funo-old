import {
  createUserFirestore,
  getUserFirestore,
  createEventFirestore,
  createEventFirestoreUser,
  getAllEvetntsFirestore,
} from "./sFirestore";
import { createUserAuth, getUserAuth, getUserAuthGoogle } from "./sAuth";
import { createEventImgsStorage, createUserImgsStorage } from "./sStorage";
import c from "../c";

export const registerFunction = function (uData, uImg = null, tImg = null) {
  c("Run: registerFunction", [uData, uImg, tImg]);
  c("Call: createUserAuth", [uData.mail, uData.pass, uData.name, uImg]);
  return createUserAuth(uData.mail, uData.pass, uData.name, uImg != null).then(
    (res) => {
      uData["tImg"] = tImg != null ? `U/${res.user.uid}/imgs/tImg` : null;
      c("Call: createUserImgsStorage", [res.user.uid, uImg, tImg]);
      createUserImgsStorage(res.user.uid, uImg, tImg);
      return createUserFirestore(res.user.uid, uData);
    }
  );
};
export const loginFunction = function (uData) {
  c("Run: loginFunction", uData);
  c("Call: getUserAuth", [uData.mail, uData.pass]);
  return getUserAuth(uData.mail, uData.pass).then((res) => {
    c("Call: getUserFirestore", res.user.uid);
    return getUserFirestore(res.user.uid).then((re) => {
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
  c("Run: getUserDataFromGoogle", [id, accessToken]);
  const url = `https://people.googleapis.com/v1/people/${id}?personFields=phoneNumbers,genders,birthdays,addresses`;
  return fetch(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Accept: "application/json",
    },
  }).then((res) => {
    return res.json().then((gData) => {
      c("Res: getUserDataFromGoogle", gData);
      c("Call: getEditedData", [gData, aData]);
      return getEditedData(gData, aData);
    });
  });
};
const getCheckedData = function (aData, fData) {
  if (fData.data() == undefined) {
    c(
      "Call: getUserDataFromGoogle",
      [aData[0].user.providerData[0].uid, aData[1]],
      aData
    );
    return getUserDataFromGoogle(
      aData[0].user.providerData[0].uid,
      aData[1],
      aData[0]
    ).then((res) =>
      c("Res: loginFunction", {
        userAuth: aData[0],
        userFire: res,
      })
    );
  } else {
    return c("Res: loginFunction", { userAuth: aData, userFire: fData.data() });
  }
};
export const loginFunctionGoogle = function () {
  c("Run: loginFunctionGoogle");
  c("Call: getUserAuthGoogle");
  return getUserAuthGoogle().then((aData) => {
    c("Call: getUserFirestore", [aData[0].user.uid]);
    return getUserFirestore(aData[0].user.uid).then((fData) => {
      return getCheckedData(aData, fData);
    });
  });
};
export const addEventFunction = function (uID, data, eImgs) {
  c("Run: addEventFunction", [uID, data, eImgs]);
  data["owners"] = [uID];
  data["imgCount"] = eImgs.length;
  c("Call: createEventFirestore", data);

  return createEventFirestore(data).then((res) => {
    c("Res: createEventFirestore", res);
    c("Call: createEventFirestoreUser", [uID, res.id]);
    return createEventFirestoreUser(uID, res.id).then(() => {
      c("Call: createEventImgsStorage", [res.id, eImgs]);
      return createEventImgsStorage(res.id, eImgs);
    });
  });
};
export const getAllEvetnts = function () {
  c("Call: getAllEvetntsFirestore", "");
  return getAllEvetntsFirestore();
};

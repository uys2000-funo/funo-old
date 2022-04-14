import { createUserFirestore, getUserFirestore } from "./sFirestore";
import { createUserAuth, getUserAuth, getUserAuthGoogle } from "./sAuth";
import { createUserStorage } from "./sStorage";
import c from "../c";

export const registerFunction = function (uData, uImg = null, tImg = null) {
  c("Run: registerFunction", [uData, uImg, tImg]);
  c("Call: createUserAuth", [uData.mail, uData.pass, uData.name, uImg]);
  return createUserAuth(uData.mail, uData.pass, uData.name, uImg != null).then(
    (res) => {
      uData["tImg"] = tImg != null ? `U/${res.user.uid}/imgs/tImg` : null;
      c("Call: createUserStorage", [res.user.uid, uImg, tImg]);
      createUserStorage(res.user.uid, uImg, tImg);
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
  getEditedData;
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
    return c("Res: loginFunction", {
      userAuth: aData,
      userFire: getUserDataFromGoogle(
        aData[0].user.providerData[0].uid,
        aData[1],
        aData[0]
      )
    });
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

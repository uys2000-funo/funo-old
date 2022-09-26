import { createUserFirestore, getUserFirestore } from "./core/sFirestore";
import { createUserImgsStorage } from "./core/sStorage";
import { createUserAuth, getUserAuth, getUserAuthGoogle } from "./core/sAuth";
import { c, f } from "../c";

export const registerFunction = function (uData, uImg = null, tImg = null) {
  uData["hidden"] = false;
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
    birth: `${gData.birthdays[0].date.day}/${gData.birthdays[0].date.month}/${gData.birthdays[0].date.year}`,
    sex: gData.genders[0].value == "male",
    nick: null,
    phoneNumber: null,
    mail: aData.user.email,
    pass: null,
    birthdate: "04/09/2000",
    events: [],
    joinEvent: [],
    tImg: null,
    userName: aData.user.uid,
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
    ).then((res) => {
      //const imgUrl = aData[0].user.photoURL;
      f(createUserFirestore, res.userName, res);
      return c("Res: loginFunction", { userAuth: aData[0], userFire: res });
    });
  } else {
    return c("Res: loginFunction", {
      userAuth: aData[0],
      userFire: fData.data(),
    });
  }
};
export const loginFunctionGoogle = function () {
  return f(getUserAuthGoogle).then((aData) => {
    return f(getUserFirestore, aData[0].user.uid).then((fData) => {
      return getCheckedData(aData, fData);
    });
  });
};

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
export const loginFunctionGoogle = function () {
  c("Run: loginFunctionGoogle");
  c("Call: getUserAuthGoogle");
  return getUserAuthGoogle().then((res) => {
    c("Call: getUserFirestore", res);
    return getUserFirestore(res.user.uid).then((re) => {
      return c("Res: loginFunction", { userAuth: res, userFire: re.data() });
    });
  });
};

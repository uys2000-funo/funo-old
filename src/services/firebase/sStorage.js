import { getStorage, ref, uploadBytes } from "firebase/storage";
import app from "./app";
import c from "../c";

const storage = getStorage(app);

const uploadImage = function (img, path) {
  c("Run: uploadImage", [img, path]);
  const refImg = ref(storage, path);
  return uploadBytes(refImg, img)
    .then((res) => c(["Res: uploadBytes", res], true))
    .catch((err) => c(["Err: uploadBytes", err], false));
};

const uploadBoth = function (uID, uImg, tImg) {
  c("Run: uploadBoth", [uID, uImg, tImg]);
  c("Call: uploadImage", [uImg, `U/${uID}/imgs/uImg`]);
  return uploadImage(uImg, `U/${uID}/imgs/uImg`)
    .then((res) => {
      c("Res: uploadBoth(uImg)", res);
      return uploadImage(tImg, `U/${uID}/imgs/uImg`)
        .then((re) => c(["Res: uploadBoth(All)", re], [true, true]))
        .catch((err) => c(["Err: uploadBoth(All)", err], [true, false]));
    })
    .catch((res) => {
      c("Res: uploadBoth(uImg)", res);
      return uploadImage(tImg, `U/${uID}/imgs/uImg`)
        .then((re) => c(["Res: uploadBoth(All)", re], [false, true]))
        .catch((err) => c(["Err: uploadBoth(All)", err], [false, false]));
    });
};
const uploadOne = function (check, uID, aImg) {
  if (check)
    return uploadImage(aImg, `U/${uID}/imgs/uImg`)
      .then((res) => c(["Res: uploadOne", res], [true, undefined]))
      .catch((err) => c(["Err: uploadOne", err], [false, undefined]));
  else
    return uploadImage(aImg, `U/${uID}/imgs/uImg`)
      .then((res) => c(["Res: uploadOne", res], [undefined, true]))
      .catch((err) => c(["Err: uploadOne", err], [undefined, false]));
};
export const createUserImgsStorage = function (uID, uImg, tImg) {
  c("Run: createUserImgsStorage", [uID, uImg, tImg]);
  if ((uImg != null) & (tImg != null)) return uploadBoth(uID, uImg, tImg);
  else if (uImg != null) return uploadOne(true, uID, uImg);
  else if (tImg != null) return uploadOne(false, uID, tImg);
  else return c("Res: createUserImgsStorage", [undefined, undefined]);
};
const uploadWithOrder = function (eID, eImgs, i = 0) {
  c("Run: uploadWithOrder", [eID, eImgs, i]);
  if ((eImgs[i] != null) & (eImgs[i] != undefined))
    return uploadImage(eImgs[i], `E/${eID}/imgs/img${i}`).then((res) => {
      c(["Res: uploadImage", res], true);
      return uploadWithOrder(eID, eImgs, i + 1);
    });
};
export const createEventImgsStorage = function (eID, eImgs) {
  c("Run: createEventImgsStorage", [eID, eImgs]);
  return uploadWithOrder(eID, eImgs);
};

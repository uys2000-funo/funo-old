import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import app from "./app";
import { c, f, fr } from "../../c";
const storage = getStorage(app);

const uploadImage = function (img, path) {
  const refImg = ref(storage, path);
  return uploadBytes(refImg, img);
};

const uploadBoth = function (uID, uImg, tImg) {
  return f(uploadImage, uImg, `U/${uID}/imgs/uImg`)
    .then(() => {
      return f(uploadImage, tImg, `U/${uID}/imgs/uImg`);
    })
    .catch(() => {
      return f(uploadImage, tImg, `U/${uID}/imgs/uImg`);
    });
};
const uploadOne = function (check, uID, aImg) {
  if (check) return f(uploadImage, aImg, `U/${uID}/imgs/uImg`);
  else return f(uploadImage, aImg, `U/${uID}/imgs/tImg`);
};
export const createUserImgsStorage = function (uID, uImg, tImg) {
  if ((uImg != null) & (tImg != null)) return uploadBoth(uID, uImg, tImg);
  else if (uImg != null) return f(uploadOne, true, uID, uImg);
  else if (tImg != null) return f(uploadOne, false, uID, tImg);
  else return c("Res: createUserImgsStorage", [undefined, undefined]);
};
const uploadWithOrder = function (eID, eImgs, i = 0) {
  if ((eImgs[i] != null) & (eImgs[i] != undefined))
    return f(uploadImage, eImgs[i], `E/${eID}/imgs/img${i}`).then(() => {
      return uploadWithOrder(eID, eImgs, i + 1);
    });
  else fr(true);
};
export const createEventImgsStorage = function (eID, eImgs) {
  c("Run: createEventImgsStorage", [eID, eImgs]);
  return f(uploadWithOrder, eID, eImgs);
};
export const getImage = function (iPath) {
  const imgRef = ref(storage, iPath);
  return getDownloadURL(imgRef);
};

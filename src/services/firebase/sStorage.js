import { getStorage, ref, uploadBytes } from "firebase/storage";
import app from "./app";
import c from "../c";

const storage = getStorage(app);

const uploadImage = function (img, path) {
  c("Run: uploadImage", [img, path]);
  const refImg = ref(storage, path);
  return uploadBytes(refImg, img)
    .then((res) => c(["Res: uploadBytes", res], true))
    .catch((err) => c(["Res: uploadBytes", err], false));
};
export const createUserStorage = function (uID, uImg, tImg) {
  c("Run: createUserStorage", [uID, uImg, tImg]);
  if (uImg != null) uploadImage(uImg, `U/${uID}/imgs/uImg`);
  if (tImg != null) uploadImage(tImg, `U/${uID}/imgs/tImg`);
  return c("Res: createUserStorage", true);
};

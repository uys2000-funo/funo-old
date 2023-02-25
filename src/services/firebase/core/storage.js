import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import app from "./app";
import { f } from "../../c";

const storage = getStorage(app);

export const getFile = function (fPath) {
  const refFile = ref(storage, fPath);
  return f(getDownloadURL, refFile);
};

export const uploadFile = function (fPath, file) {
  const refFile = ref(storage, fPath);
  return f(uploadBytes, refFile, file);
};

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

export const uploadFiles = function (fPath, fName, files) {
  return new Promise((resolve, reject) => {
    let allCount = 0;
    let successfulCount = 0;
    files.forEach((file, index) => {
      allCount++;
      f(uploadFile, `${fPath}/${index}${fName}`, file).then(() => {
        successfulCount++;
        if (successfulCount === files.length)
          resolve({
            success: true,
            successfulCount: successfulCount,
            allCount: allCount,
          });
        else if (allCount === files.length) {
          reject({
            success: false,
            successfulCount: successfulCount,
            allCount: allCount,
          });
        }
      });
    });
  });
};

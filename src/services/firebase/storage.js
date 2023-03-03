import {
  getBytes,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
} from "firebase/storage";
import app from "./app";
import { f } from "@/services/c.js";

const storage = getStorage(app);

export const getFile = function (fPath) {
  const refFile = ref(storage, fPath);
  return f(getDownloadURL, refFile);
};

export const getFileBytes = function (fPath) {
  const refFile = ref(storage, fPath);
  return f(getBytes, refFile);
};

export const getFiles = function (fPath, fName, amount) {
  const promise = new Promise((resolve, reject) => {
    if (amount == 0)
      resolve({ success: true, successfulCount: 0, allCount: 0, files: [] });
    let files = Array(amount);
    let successfulCount = 0;
    for (let index = 0; index < amount; index++) {
      f(getFile, `${fPath}/${index}${fName}`).then((file) => {
        successfulCount++;
        files[index] = file;
        if (successfulCount == files.length && index == amount - 1)
          resolve({
            success: true,
            successfulCount: successfulCount,
            files: files,
          });
        else if (index == amount - 1) {
          reject({
            success: false,
            successfulCount: successfulCount,
            files: files,
          });
        }
      });
    }
  });
  return promise;
};

export const uploadFile = function (fPath, file) {
  const refFile = ref(storage, fPath);
  return f(uploadBytes, refFile, file);
};

export const uploadFiles = function (fPath, fName, files) {
  return new Promise((resolve, reject) => {
    if (files.length == 0)
      resolve({ success: true, successfulCount: 0, allCount: 0 });
    let passCount = 0;
    let successfulCount = 0;
    files.forEach((file, index) => {
      if (!file) {
        passCount++;
        successfulCount++;
        if (successfulCount == files.length && index == files.length - 1)
          resolve({
            success: true,
            successfulCount: successfulCount,
            passCount: passCount,
          });
        else if (index == files.length - 1) {
          reject({
            success: false,
            successfulCount: successfulCount,
            passCount: passCount,
          });
        }
      } else
        f(uploadFile, `${fPath}/${index}${fName}`, file).then(() => {
          successfulCount++;
          console.log(successfulCount, files.length, index, files.length - 1);
          if (successfulCount == files.length && index == files.length - 1)
            resolve({
              success: true,
              successfulCount: successfulCount,
              passCount: passCount,
            });
          else if (index == files.length - 1) {
            reject({
              success: false,
              successfulCount: successfulCount,
              passCount: passCount,
            });
          }
        });
    });
  });
};

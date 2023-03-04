import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import app from "./app";
import { f, p } from "@/services/debug.js";

const storage = getStorage(app);

export const uploadFile = function (path, name, file) {
  const refFile = ref(storage, `${path}/${name}`);
  return f(uploadBytes, [refFile, file]);
};

export const uploadFiles = function (path, name, files) {
  return new Promise((resolve, reject) => {
    const response = { status: true, failed: 0, all: files.length };
    let counter = 0;
    files.forEach((file, index) => {
      let u = uploadFile;
      if (file == false) u = p;
      f(u, [path, `${name}${index}`, file])
        .catch(() => response.failed++)
        .then(() => counter++)
        .then(() => {
          if (response.failed == files.length) {
            response.status = false;
            reject(response);
          } else if (counter == files.length) {
            resolve(response);
          }
        });
    });
  });
};

export const getFile = function (fPath) {
  const refFile = ref(storage, fPath);
  return f(getDownloadURL, [refFile]);
};

export const getFiles = function (fPath, amount) {
  return new Promise((resolve, reject) => {
    const response = { urls: Array(amount), failed: 0, all: amount };
    let counter = 0;
    for (let index = 0; index < amount; index++) {
      f(getFile, [`${fPath}${index}`])
        .then((url) => {
          response.urls[index] = url;
        })
        .catch(() => {
          response.failed++;
          response.urls[index] = null;
        })
        .then(() => counter++)
        .then(() => {
          if (counter == amount) {
            response.status = true;
            resolve(response);
          }
          if (response.failed == amount) {
            response.status = false;
            reject(response);
          }
        });
    }
  });
};

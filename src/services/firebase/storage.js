import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import app from "./app";
import { f } from "@/services/debug.js";

const storage = getStorage(app);

export const uploadFile = function (path, name, file) {
  const refFile = ref(storage, `${path}/${name}`);
  return f(uploadBytes, [refFile, file]);
};

export const uploadFiles = function (path, name, files) {
  return new Promise((resolve, reject) => {
    const response = { status: true, failed: 0, all: files.length };
    files.array.forEach((file, index) => {
      f(uploadFile, [path, `${name}${index}`, file])
        .catch(() => response.failed++)
        .then(() => {
          if (response.failed == files.length) {
            response.status = false;
            reject(response);
          } else if (index == files.length - 1) {
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
    const response = { url: Array(amount), failed: 0, all: amount };
    for (let index = 0; index < amount; index++) {
      f(getFile, [`${fPath}${index}`])
        .catch(() => {
          response.failed++;
          response.url[index] = null;
        })
        .then(() => {
          if (response.failed == amount) {
            response.status = false;
            reject(response);
          } else if (index == amount - 1) {
            resolve(response);
          }
        });
    }
  });
};

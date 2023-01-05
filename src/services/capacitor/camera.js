import { Camera } from "@capacitor/camera";

export const checkCameraPermissions = function () {
  return Camera.checkPermissions();
};

export const requestCameraPermissions = function () {
  return Camera.requestPermissions();
};
export const pickCameraImage = function (limit = 1) {
  return Camera.pickImages({ quality: 85, limit: limit });
};

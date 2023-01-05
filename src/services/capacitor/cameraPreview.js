import { CameraPreview } from "@capacitor-community/camera-preview";

export const startCameraPreview = function () {
  return CameraPreview.start({
    position: "rear",
    toBack: true,
    enableZoom: true,
  });
};

export const stopCameraPreview = function () {
  return CameraPreview.stop();
};

export const flipCameraPreview = function () {
  return CameraPreview.flip();
};

export const captureCameraPreview = function () {
  return CameraPreview.flip();
};

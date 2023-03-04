import { Geolocation } from "@capacitor/geolocation";

export const checkPermissions = function () {
  return Geolocation.checkPermissions();
};

export const requestPermissions = function () {
  return Geolocation.requestPermissions({ permissions: "location" });
};

export const getCurrentPosition = function(){
  return Geolocation.getCurrentPosition({ permissions: "location" });

}
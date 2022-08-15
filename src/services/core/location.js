export const getLocation = function (func) {
  navigator.geolocation.getCurrentPosition(func);
};

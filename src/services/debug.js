import settings from "@/services/settings.json";

const s = (value) => JSON.stringify(value);

const lMobile = function (text, paramaters, result) {
  console.log(`Debug : ${s(text)} --- ${s(paramaters)} --- ${s(result)}`);
  return result;
};
let l = function (text, paramaters, result) {
  console.log("Debug : ", text, paramaters, result);
  return result;
};

const lEMobile = function (text, paramaters, error) {
  console.error(`Debug : ${s(text)} --- ${s(paramaters)} --- ${s(error)}`);
  return error;
};
let lE = function (text, paramaters, error) {
  console.error("Debug : ", text, paramaters, error);
  return error;
};

const lWMobile = function (text, paramaters, error) {
  console.error(`Debug : ${s(text)} --- ${s(paramaters)} --- ${s(error)}`);
  return error;
};
let lW = function (text, paramaters, error) {
  console.error("Debug : ", text, paramaters, error);
  return error;
};

const fNoDebug = function (
  promise = () => new Promise(),
  paramaters = [],
  result = {}
) {
  return new Promise((resolve, reject) => {
    promise
      .apply(null, paramaters)
      .then((r) => resolve(result ? result : r))
      .catch((e) => reject(e));
  });
};
let f = function (promise = () => new Promise(), paramaters = [], result = {}) {
  l(`Run : ${promise.name}`, paramaters, result);
  return new Promise((resolve, reject) => {
    promise
      .apply(null, paramaters)
      .then((r) => l(`Res : ${promise.name}`, paramaters, result ? result : r))
      .then((r) => resolve(r))
      .catch((e) => lE(`Err : ${promise.name}`, paramaters, e))
      .then((e) => reject(e));
  });
};

let p = function (result, isFailed = false) {
  return new Promise((resolve, reject) => {
    if (isFailed) reject(result);
    resolve(reject);
  });
};

if (settings.isMobile) {
  l = lMobile;
  lE = lEMobile;
  lW = lWMobile;
}
if (!settings.debug) {
  l = function () {
    return arguments;
  };
  lE = l;
  lW = l;
  f = fNoDebug;
}

export { p, f, l, lE, lW };

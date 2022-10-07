import settings from "./settings";

const argToArray = function (args) {
  let f = [];
  for (const i in args) {
    f.push(args[i]);
  }
  return f;
};
export const c = function (function_name, data, err) {
  if (settings.debug)
    console.log("Debug :", function_name, data, err ? err : "");
  return data;
};

const iC = function (function_name, data, err) {
  console.log("Debug :", function_name, data, err ? err : "");
  return data;
};
export const fr = function (ret) {
  console.log("Debug : Artificial Promise", ret);
  return new Promise((resolve, refect) => {
    if (ret) resolve(ret);
    else refect(ret);
  });
};

const innerF = function (fFunc, fArgs, resolve, reject) {
  iC(`Run : ${fFunc.name}`, fArgs);
  fFunc
    .apply(null, fArgs)
    .then((res) => {
      resolve(iC(`Res: ${fFunc.name}`, res == undefined ? true : res));
    })
    .catch((err) => {
      reject(
        iC(`Err: ${fArgs} - ${fFunc.name}`, err == undefined ? false : err)
      );
    });
};
export const f = function () {
  const fFunc = arguments[0];
  const fArgs = argToArray(arguments).splice(1, arguments.length);
  return new Promise((resolve, reject) => {
    if (settings.debug) return innerF(fFunc, fArgs, resolve, reject);
    else
      fFunc
        .apply(null, fArgs)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => reject(err));
  });
};

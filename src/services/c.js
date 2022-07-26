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

const c2 = function (function_name, data, err) {
  console.log("Debug :", function_name, data, err ? err : "");
  return data;
};
const f2 = function (fFunc, fArgs) {
  c2(`Run : ${fFunc.name}`, fArgs);
  return fFunc
    .apply(null, fArgs)
    .then((res) => {
      return c2(`Res: ${fFunc.name}`, res == undefined ? true : res);
    })
    .catch((err) => {
      return c2(`Err: ${fFunc.name}`, err == undefined ? false : err);
    });
};
export const f = function () {
  const fFunc = arguments[0];
  const fArgs = argToArray(arguments).splice(1, arguments.length);
  if (settings.debug) return f2(fFunc, fArgs);
  else return fFunc.apply(null, fArgs);
};

export const fr = function (ret) {
  return new Promise((resolve) => {
    resolve(ret);
  });
};

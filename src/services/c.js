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
export const f = function () {
  const fFunc = arguments[0];
  const fArgs = argToArray(arguments).splice(1, arguments.length);
  c(`Run : ${fFunc.name}`, fArgs);
  return fFunc
    .apply(null, fArgs)
    .then((res) => {
      return c(`Res: ${fFunc.name}`, res == undefined ? true : res);
    })
    .catch((err) => {
      return c(`Err: ${fFunc.name}`, err == undefined ? false : err);
    });
};

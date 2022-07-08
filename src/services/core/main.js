import settings from "../settings";
import { c, f } from "../c";

const getPaths = function (routes = [], oldPath = "", paths = []) {
  c("Run: getPaths", routes, oldPath, paths);
  routes.forEach((item) => {
    if (item.children != undefined)
      return paths.concat(
        getPaths(item.children, oldPath + item.path + "/", paths)
      );
    else {
      if (item.path.indexOf(":"))
        paths.push({
          path: oldPath + item.path,
          name: item.name,
        });
      else
        paths.push({
          path: oldPath,
          name: item.name,
        });
    }
  });
  return c("Res: getPaths", paths);
};
export const setDebugRouter = function (routes) {
  c("Run: setDebugRouter", routes);
  let r = {
    path: "/",
    name: "MainLayoutLoader",
    children: routes,
  };

  if (settings.developer) {
    r.name = "TestLayoutLoader";
    r["component"] = () => import("../../layouts/TestLayout.vue");
    r.props = { routes: getPaths(routes) };
  } else {
    r["component"] = () => import("../../layouts/AppLayout.vue");
  }
  return c("Res: setDebugRouter", [r]);
};
export const setLastUser = function (user) {
  c("Run :setLastUser", user);
  localStorage.setItem("u", JSON.stringify(user));
};
export const gettLastUser = function () {
  return c("Run gettLastUser", JSON.parse(localStorage.getItem("u")));
};
export const updateSettings = function (key, value) {
  c("Run: updateSettings", [key, value]);
};
export const chekUserEventJoinStatus = function (user, eID) {
  c("Run: chekUserEventJoinStatus", [user, eID]);
  const res = user.userFire.eventsJoin.some((item) => item === eID);
  return c("Res: chekUserEventJoinStatus", res);
};

const checkComp = function (user) {
  return new Promise((resolve) => {
    let ret = true;
    if (user.name == "") ret = false;
    if (user.taxNumber == "") ret = false;
    if (user.phoneNumber == "") ret = false;
    if (user.companyAdress == "") ret = false;
    if (user.userName == "") ret = false;
    if (user.pass == "" || user.pass.length < 6) ret = false;
    if (user.email == "") ret = false;
    resolve(ret);
  });
};
const checkUser = function (user) {
  console.log(user);
  return new Promise((resolve) => {
    let ret = true;
    if (user.name == "") ret = false;
    if (user.birthdate == "") ret = false;
    if (user.phoneNumber == "") ret = false;
    if (user.userName == "") ret = false;
    if (user.pass == "" || user.pass.length < 6) ret = false;
    if (user.email == "") ret = false;
    resolve(ret);
  });
};
export const registerCheck = function (user) {
  if (user.taxNumber == undefined) return f(checkUser, user);
  else f(checkComp, user);
};

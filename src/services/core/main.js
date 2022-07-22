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
    if (user.name == "") c("Ret: checkComp name == Null", (ret = false));
    if (user.taxNumber == "")
      c("Ret: checkComp taxNumber == Null", (ret = false));
    if (user.phoneNumber == "")
      c("Ret: checkComp phoneNumber == Null", (ret = false));
    if (user.companyAdress == "")
      c("Ret: checkComp companyAdress == Null", (ret = false));
    if (user.userName == "") c("Ret: checkComp userName == 6", (ret = false));
    if (user.pass == "" || user.pass?.length < 6)
      c("Ret: checkComp pass < Null", (ret = false));
    if (user.mail == "") c("Ret: checkComp mail == Null", (ret = false));
    if (user.tags?.length < 6)
      c("Ret: checkComp tags.length < 6", (ret = false));
    resolve(ret);
  });
};
const checkUser = function (user) {
  return new Promise((resolve) => {
    let ret = true;
    if (user.name == "") c("Ret: checkComp name == Null", (ret = false));
    if (user.birthdate == "")
      c("Ret: checkComp birthdate == Null", (ret = false));
    if (user.phoneNumber == "")
      c("Ret: checkComp phoneNumber == Null", (ret = false));
    if (user.userName == "")
      c("Ret: checkComp userName == Null", (ret = false));
    if (user.pass == "" || user.pass?.length < 6)
      c("Ret: checkComp pass < 6", (ret = false));
    if (user.mail == "") c("Ret: checkComp mail == Null", (ret = false));
    if (user.tags?.length < 6)
      c("Ret: checkComp tags.length < 6", (ret = false));
    resolve(ret);
  });
};
export const registerCheck = function (user) {
  if (user.taxNumber == undefined) return f(checkUser, user);
  else return f(checkComp, user);
};

const checkEvent = function (event) {
  return new Promise((resolve) => {
    let ret = true;
    if (event.name == "") c("Ret: checkEvent name == Null", (ret = false));
    if (event.startDate.date == "")
      c("Ret: checkEvent startDate date == Null", (ret = false));
    if (event.startDate.time == "")
      c("Ret: checkEvent startDate time == Null", (ret = false));
    if (event.endDate.date == "")
      c("Ret: checkEvent endDate date == Null", (ret = false));
    if (event.endDate.time == "")
      c("Ret: checkEvent endDate time == Null", (ret = false));
    if (event.app == "") c("Ret: checkEvent app == Null", (ret = false));
    if (event.url == "") c("Ret: checkEvent url == Null", (ret = false));
    let tag = false;
    if (event.tags.spor) tag = true;
    else if (event.tags.artt) tag = true;
    else if (event.tags.educ) tag = true;
    else if (event.tags.musi) tag = true;
    else if (event.tags.meet) tag = true;
    else if (event.tags.part) tag = true;
    if (!tag) c("Ret: checkEvent tag not Found", (ret = false));
    resolve(ret);
  });
};
export const eventCheck = function (event) {
  return f(checkEvent, event);
};

import settings from "../settings";
import { c } from "../c";

const getPaths = function (routes = [], oldPath = "", paths = []) {
  c("Run: getPaths", routes, oldPath, paths);
  routes.forEach((item) => {
    if (item.children != undefined)
      paths.concat(getPaths(item.children, oldPath + item.path + "/", paths));
    else {
      if (item.path.indexOf(":"))
        paths.push({
          path: oldPath + item.path,
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

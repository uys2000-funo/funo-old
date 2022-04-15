import settings from "../settings";
import c from "../c";

const getPaths = function (routes = [], oldPath = "", paths = []) {
  c("Run: getPaths", routes, oldPath, paths);
  routes.forEach((item) => {
    paths.push({
      path: oldPath + item.path,
      name: item.name,
    });
    if (item.children != undefined)
      paths.concat(getPaths(item.children, item.path + "/", paths));
  });
  return c("Res: getPaths", paths);
};
export const setDebugRouter = function (routes) {
  c("Run: setDebugRouter", routes);
  if (settings.developer)
    return c("setDebugRouter", [
      {
        path: "/",
        name: "TestLayoutLoader",
        component: () => import("../../layouts/TestLayout.vue"),
        children: routes,
        props: { routes: getPaths(routes) },
      },
    ]);
  else return c("Res: setDebugRouter", routes);
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

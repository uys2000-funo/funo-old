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
  return paths;
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
        props: { routes: c("Res: getPaths", getPaths(routes)) },
      },
    ]);
  else return c("Res: setDebugRouter", routes);
};

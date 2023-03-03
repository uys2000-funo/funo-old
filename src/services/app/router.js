import settings from "@/services/settings";
import { c } from "@/services/c";

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
};

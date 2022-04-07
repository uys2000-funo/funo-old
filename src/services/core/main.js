import settings from "../settings";
const c = (input) => {
  if (settings.debug) console.log(input);
  return input;
};

const getPaths = function (routes = [], oldPath = "", paths = []) {
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
  if (settings.debug)
    return [
      {
        path: "/",
        name: "TestLayoutLoader",
        component: () => import("../../layouts/TestLayout.vue"),
        children: routes,
        props: { routes: c(getPaths(routes)) },
      },
    ];
  else return routes;
};

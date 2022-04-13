import { setDebugRouter } from "../services/core/main";
export default setDebugRouter([
  {
    path: "/",
    name: "Enterance",
    component: () => import("../views/pageEnter.vue"),
  },
  {
    path: "/registerTest",
    name: "registerTest",
    component: () => import("../views/pageRegisterTest.vue"),
  },
  {
    path: "/loginTest",
    name: "loginTest",
    component: () => import("../views/pageLoginTest.vue"),
  },
]);

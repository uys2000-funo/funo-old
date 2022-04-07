import { setDebugRouter } from "../services/core/main";
export default setDebugRouter([
  {
    path: "/",
    name: "Enterance",
    component: () => import("../views/pageEnter.vue"),
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/pageEnter.vue"),
  },
  {
    path: "/registerTest",
    name: "registerTest",
    component: () => import("../views/pageRegisterTest.vue"),
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("../views/pageEnter.vue"),
    children: [
      {
        path: "",
        name: "Person",
        component: () => import("../views/pageEnter.vue"),
      },
      {
        path: "comp",
        name: "Company",
        component: () => import("../views/pageEnter.vue"),
      },
    ],
  },
]);

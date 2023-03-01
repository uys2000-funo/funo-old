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
    component: () => import("../views/pageLogin.vue"),
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("../layouts/RegisterLayout.vue"),
    children: [
      {
        path: ":pID",
        name: "RegisterPage",
        component: () => import("../views/pageRegister.vue"),
      },
    ],
  },
  {
    path: "/app",
    name: "App",
    component: () => import("../layouts/HomeLayout.vue"),
    children: [
      {
        path: "events",
        name: "Events",
        component: () => import("../layouts/EventsLayout.vue"),
        children: [
          {
            path: "",
            name: "EventsPage",
            component: () => import("../views/pageEvents.vue"),
          },
        ],
      },
      {
        path: "create",
        name: "Create",
        component: () => import("../layouts/CreateLayout.vue"),
        children: [
          {
            path: "",
            name: "CreatePage",
            component: () => import("../views/pageCreate.vue"),
          },
          {
            path: ":pID",
            name: "CreatePageID",
            component: () => import("../views/pageCreate.vue"),
          },
        ],
      },
    ],
  },
]);

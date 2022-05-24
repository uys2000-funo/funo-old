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
        path: "",
        name: "RegisterIndex",
        component: () => import("../views/pageRegister.vue"),
      },
      {
        path: "c",
        name: "RegisterC",
        component: () => import("../views/pageRegisterC.vue"),
      },
      {
        path: "p",
        name: "RegisterP",
        component: () => import("../views/pageRegisterP.vue"),
      },
    ],
  },
  {
    path: "/app",
    name: "App",
    component: () => import("../layouts/AppLayout.vue"),
    children: [
      {
        path: "",
        name: "AppMainIndex",
        component: () => import("../layouts/MainLayout.vue"),
      },
      {
        path: "main",
        name: "AppMain",
        component: () => import("../layouts/MainLayout.vue"),
        children: [],
      },
    ],
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
  {
    path: "/addEventTest",
    name: "addEventTest",
    component: () => import("../views/pageAddEventTest.vue"),
  },
  {
    path: "/updateSetting",
    name: "updateSetting",
    component: () => import("../views/pageUpdateSetting.vue"),
  },
  {
    path: "/eventsAllTest",
    name: "eventsAllTest",
    component: () => import("../views/pageEventsAllTest.vue"),
  },
]);

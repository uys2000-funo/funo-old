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
    path: "/eventsAll",
    name: "eventsAll",
    component: () => import("../views/pageEventsAllTest.vue"),
  },
]);

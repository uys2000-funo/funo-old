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
    component: () => import("../layouts/HomeLayout.vue"),
    children: [
      {
        path: "main",
        name: "AppMain",
        component: () => import("../layouts/MainLayout.vue"),
        children: [
          {
            path: "events",
            name: "EventsAll",
            component: () => import("../views/pageEventsAll.vue"),
            children: [
              /// Popup pages will be in events page to contiune show event list at background
              {
                path: "create",
                name: "Create",
                component: () => import("../layouts/EventAddLayout.vue"),
                children: [
                  {
                    path: "",
                    name: "CreateEvent",
                    component: () =>
                      import("../components/compEventAddPopup.vue"),
                  },
                ],
              },
              {
                path: "event",
                name: "Event",
                component: () => import("../layouts/AppLayout.vue"),
                children: [
                  {
                    path: ":id",
                    name: "Event",
                    component: () => import("../components/compEventPopup.vue"),
                  },
                ],
              },
            ],
          },
          {
            path: "map",
            name: "EventsMap",
            component: () => import("../views/pageEventsMap.vue"),
          },
        ],
      },
      {
        path: "profile",
        name: "profile",
        component: () => import("../layouts/profileLayout.vue"),
      },
      {
        path: "discover",
        name: "discover",
        component: () => import("../layouts/discoverLayout.vue"),
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
  {
    path: "/locationChooseTest",
    name: "locationChooseTest",
    component: () => import("../views/pageLocationChoose.vue"),
  },
  {
    path: "/pageLocationTest",
    name: "pageLocationTest",
    component: () => import("../views/pageLocationTest.vue"),
  },
]);

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
        component: () => import("../layouts/EventsLayout.vue"),
        children: [
          {
            path: "events",
            name: "EventsAll",
            component: () => import("../views/pageEvents.vue"),
            children: [
              /// Popup pages will be in events page to contiune show event list at background
              {
                //Event Create
                path: "create",
                name: "CreateEvent",
                component: () => import("../layouts/EventAddLayout.vue"),
                children: [
                  {
                    path: ":id",
                    name: "CreateEventPage",
                    component: () => import("../views/pageEventAdd.vue"),
                  },
                ],
              },
              {
                //Event
                path: "event",
                name: "Event",
                component: () => import("../layouts/EventLayout.vue"),
                children: [
                  {
                    path: ":id",
                    name: "EventID",
                    component: () => import("../views/pageEvent.vue"),
                  },
                ],
              },
              {
                //Event Edit
                path: "edit",
                name: "EventEdit",
                component: () => import("../layouts/EventEditLayout.vue"),
                children: [
                  {
                    path: ":id",
                    name: "EventEditID",
                    component: () => import("../views/pageEventEdit.vue"),
                  },
                ],
              },
              {
                //Messages
                path: "messages",
                name: "Messages",
                component: () => import("../layouts/MessagesLayout.vue"),
                children: [
                  {
                    path: ":id",
                    name: "EventEditID",
                    component: () => import("../views/pageEventEdit.vue"),
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
        path: "user",
        name: "user",
        component: () => import("../layouts/ProfileLayout.vue"),
        children: [
          {
            path: ":page",
            name: "userPage",
            component: () => import("../views/pageProfile.vue"),
          },
        ],
      },
      {
        path: "profile",
        name: "othersProfile",
        component: () => import("../layouts/OthersProfileLayout.vue"),
        children: [
          {
            path: ":id/:page",
            name: "othersProfilePage",
            component: () => import("../views/pageOthersProfile.vue"),
          },
        ],
      },
      {
        path: "discover",
        name: "discover",
        component: () => import("../layouts/DiscoverLayout.vue"),
        children: [
          {
            path: ":id",
            name: "discoverPage",
            component: () => import("../views/pageDiscover.vue"),
          },
        ],
      },
      {
        path: "notifications",
        name: "notifications",
        component: () => import("../layouts/NotificationLayout.vue"),
        children: [
          {
            path: ":id",
            name: "notificationsPage",
            component: () => import("../views/pageNotification.vue"),
          },
        ],
      },
      {
        path: "messages",
        name: "messages",
        component: () => import("../layouts/NotificationLayout.vue"),
        children: [
          {
            path: "",
            name: "messagesPage",
            component: () => import("../views/pageNotification.vue"),
          },
          {
            path: ":id",
            name: "messagesPage",
            component: () => import("../views/pageNotification.vue"),
          },
        ],
      },
    ],
  },
  {
    path: "/registerTest",
    name: "registerTest",
    component: () => import("../testViews/registerTest.vue"),
  },
  {
    path: "/loginTest",
    name: "loginTest",
    component: () => import("../views/pageLoginTest.vue"),
  },
  {
    path: "/addEventTest",
    name: "addEventTest",
    component: () => import("../testViews/eventAddTest.vue"),
  },
  {
    path: "/updateSetting",
    name: "updateSetting",
    component: () => import("../views/pageUpdateSetting.vue"),
  },
  {
    path: "/locationChooseTest",
    name: "locationChooseTest",
    component: () => import("../views/pageLocationChoose.vue"),
  },
  {
    path: "/test",
    name: "test",
    component: () => import("@/components/general/popupComp.vue"),
  },
]);

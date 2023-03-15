export default [
  // Entrance Page
  {
    path: "/",
    name: "Enterance",
    component: () => import("../views/pageEnter.vue"),
  },
  // Login Page
  {
    path: "/login",
    name: "LoginPage",
    component: () => import("../views/pageLogin.vue"),
  },
  // Register Page
  {
    path: "/register",
    name: "Register",
    component: () => import("../layouts/RegisterLayout.vue"),
    children: [
      {
        path: ":pID",
        name: "RegisterPage",
        component: () => import("../views/pageRegister.vue"),
        children: [
          {
            path: ":uID",
            name: "RegisterPageID",
            component: () => import("../components/compNull.vue"),
          },
        ],
      },
    ],
  },
  // App Page
  {
    path: "/app",
    name: "App",
    component: () => import("../layouts/HomeLayout.vue"),
    children: [
      // Event Create
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
            path: ":eID",
            name: "CreatePageID",
            component: () => import("../views/pageCreate.vue"),
          },
        ],
      },
      // Event Edit
      {
        path: "edit",
        name: "Edit",
        component: () => import("../layouts/CreateLayout.vue"),
        children: [
          {
            path: "",
            name: "EditPage",
            component: () => import("../views/pageCreate.vue"),
          },
          {
            path: ":eID",
            name: "EditPageID",
            component: () => import("../views/pageCreate.vue"),
          },
        ],
      },
      // Discover
      {
        path: "discover",
        name: "Discover",
        component: () => import("@/layouts/DiscoverLayout.vue"),
        children: [
          {
            path: "",
            name: "DiscoverPage",
            component: () => import("../views/pageDiscover.vue"),
          },
        ],
      },
      // Map onDevelop
      {
        path: "map",
        name: "Map",
        component: () => import("../layouts/EventsLayout.vue"),
        children: [
          {
            path: "",
            component: () => import("../views/pageMap.vue"),
            name: "MapPage",
          },
        ],
      },
      // User
      {
        path: "user",
        name: "User",
        component: () => import("../layouts/UserLayout.vue"),
        children: [
          {
            path: "",
            name: "UserPage",
            component: () => import("../views/pageUser.vue"),
          },
          {
            path: ":uID",
            name: "UserPageID",
            component: () => import("../views/pageUser.vue"),
          },
        ],
      },
      // Events Page
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
      // Event Page
      {
        path: "event",
        name: "Event",
        component: () => import("../layouts/EventLayout.vue"),
        children: [
          {
            path: ":eID",
            name: "EventPage",
            component: () => import("../views/pageEvent.vue"),
          },
        ],
      },
      // Messages Page
      {
        path: "messages",
        name: "Messages",
        component: () => import("../layouts/MessagesLayout.vue"),
        children: [
          {
            path: "",
            name: "MessagesPage",
            component: () => import("../views/pageMessages.vue"),
          },
        ],
      },
      // Notifications Page
      {
        path: "notifications",
        name: "Notifications",
        component: () => import("../layouts/NotificationsLayout.vue"),
        children: [
          {
            path: "",
            name: "NotificationsPage",
            component: () => import("../views/pageNotifications.vue"),
          },
        ],
      },
    ],
  },
  // Test Page
  {
    name: "TestPage",
    path: "/test",
    component: () => import("../views/pageTest.vue"),
  },
];

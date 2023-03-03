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
            path: ":pID",
            name: "CreatePageID",
            component: () => import("../views/pageCreate.vue"),
          },
        ],
      },
      // Event Edit
      {
        path: "edit",
        name: "Edit",
        component: () => import("../layouts/EditLayout.vue"),
        children: [
          {
            path: ":eID",
            name: "EditPageID",
            component: () => import("../views/pageEdit.vue"),
          },
        ],
      },
      // Search onDevelop
      {
        path: "serach",
        name: "Search",
        children: [
          {
            path: "",
            name: "SearchPage",
          },
        ],
      },
      // Map onDevelop
      {
        path: "serach",
        name: "Search",
        children: [
          {
            path: "",
            name: "SearchPage",
          },
        ],
      },
      // User onDevelop
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
    ],
  },
  // Test Page
  {
    name: "TestPage",
    path: "/test",
    component: () => import("../views/pageTest.vue"),
  },
];

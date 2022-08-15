import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import { createPinia } from "pinia";

import { Quasar } from "quasar";
import quasarUserOptions from "./quasar-user-options";

const pinia = createPinia();

createApp(App)
  .use(router)
  .use(pinia)
  .use(Quasar, quasarUserOptions)
  .mount("#app");

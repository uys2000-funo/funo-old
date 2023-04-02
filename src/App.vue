<template>
  <router-view v-if="pageLoad" />
  <div v-else class="fit column justify-center items-center">
    <q-spinner-dots color="primary" size="40px" />
  </div>
</template>

<script>
import { useUser } from "@/store/user";
import { checkAuth } from "./services/app/auth";
import { getUserData } from "./services/app/user";
import { getLocalObject } from "./services/capacitor/preferences";
import { setBackButton, setErrorHandler } from "./services/app/app";
export default {
  name: "LayoutDefault",
  data() {
    return {
      pageLoad: false,
      showPopup: true,
      userStore: useUser(),
    };
  },
  methods: {
    succesfullLogin() {
      this.showPopup = false;
      this.pageLoad = true
      if (this.$route.fullPath == "/" || this.$route.fullPath == "/login" || this.$route.fullPath == "/register" || this.$route.fullPath == "/app")
        this.$router.push({ name: "EventsPage" });
    },
    unsuccesfullLogin() {
      this.showPopup = false;
      if (!(this.$route.fullPath == "/") & !(this.$route.fullPath == "/login") & !(this.$route.fullPath == "/register") & !(this.$route.fullPath == "/app"))
        this.$router.push({ name: "LoginPage" });
      this.pageLoad = true
    },
    autoLogin() {
      checkAuth()
        .then(this.userStore.setUserAuth)
        .then(() => getUserData(this.userStore.uID))
        .then(({ data }) => data)
        .then(this.userStore.setUserFire)
        .then(this.succesfullLogin)
        .catch(this.unsuccesfullLogin)
    }
  },
  mounted() {
    setBackButton();
    getLocalObject("isLogged").then(({ value }) => {
      if (value) this.autoLogin()
      else {
        this.$router.push({ name: "Enterance" });
        this.pageLoad = true
      }
    })
    setErrorHandler()
  }
};
</script>
<style>
#app>div>div:not([class="a"]) {
  width: 100vw;
  height: 100vh;
}

.t {
  transition: .5s;
}
</style>

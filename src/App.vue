<template>
  <router-view v-if="pageLoad" />

  <q-dialog v-model="showPopup">
    <q-card style="width: 50vw">
      <q-card-section>
        <div class="text-h6">Info</div>
      </q-card-section>

      <q-card-section class="q-pt-none"> Loginning </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import { useUser } from "@/store/user";
import { checkAuth } from "./services/app/auth";
import { getUserData } from "./services/app/user";
export default {
  name: "LayoutDefault",
  // Fetch events will be in here
  components: {},
  data() {
    return {
      pageLoad: false,
      showPopup: true,
      userStore: useUser(),
    };
  },
  methods: {
    autoLogin() {
      checkAuth()
        .then(this.userStore.setUserAuth)
        .then(() => getUserData(this.userStore.uID))
        .then(({ data }) => data)
        .then(this.userStore.setUserFire)
        .then(() => {
          this.showPopup = false;
          this.pageLoad = true
        })
        .catch(() => {
          this.showPopup = false;
          this.$router.push({ name: "LoginPage" });
          this.pageLoad = true
        })
    }
  },
  mounted() {
    this.autoLogin()
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

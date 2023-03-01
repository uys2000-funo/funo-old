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
import { setBackButton } from "./services/app/main";
import { getFirestoreUser, getLocalUserData } from "./services/app/user";
import { checkAuth } from "@/services/app/auth.js"
import { user } from "@/store/user";
import { w } from "./services/c";
export default {
  name: "LayoutDefault",
  // Fetch events will be in here
  components: {},
  data() {
    return {
      pageLoad: false,
      showPopup: true,
      position: [],
      user: user(),
    };
  },
  methods: {
    autoLogin: function () {
      checkAuth().then((user) => {
        this.user.setUserAuth(user);
        getFirestoreUser(user.uid).then(userFire => {
          this.user.setUserFire(userFire)
          this.showPopup = false
          this.pageLoad = true;
          w("USER DATA AUTOMATICALLY PULLED", user.uid)
          //this.$router.push({ name: "Events" })
        })
      }).catch(() => {
        //this.$router.push({ name: "Login" })
        this.showPopup = false
        this.pageLoad = true;
      })
    },
  },
  mounted() {
    setBackButton();
    getLocalUserData().then(({ value: localUser }) => {
      if (localUser != null) {
        this.user.setUser(localUser)
        this.autoLogin();
      } else {
        //this.$router.push({ name: "Entrance" })
        this.showPopup = false;
        this.pageLoad = true;
      }
    })
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

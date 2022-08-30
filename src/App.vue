<template>
  <router-view v-if="!inf" />

  <q-dialog v-model="inf">
    <q-card style="width: 50vw">
      <q-card-section>
        <div class="text-h6">Info</div>
      </q-card-section>

      <q-card-section class="q-pt-none"> Loginning </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import { getLastUser } from "./services/core/main";
import { autoLogin } from "./services/firebase/main";
import settings from "@/services/settings";

import { App as CapacitorApp } from "@capacitor/app";
import { location } from "@/storages/location";
import { user } from "@/storages/user";
//import { getLocation } from "@/services/openWeather/geocode";
export default {
  name: "LayoutDefault",
  components: {},
  data() {
    return {
      inf: false,
      position: [],
      user: user(),
      location: location(),
    };
  },
  methods: {
    setBackButton: function () {
      CapacitorApp.addListener("backButton", ({ canGoBack }) => {
        if (!canGoBack) {
          alert("asd");
        } else {
          window.history.back();
        }
      });
    },
    checkLocationAccesWeb: function () {
      navigator.geolocation.getCurrentPosition((position) => {
        const location = [position.coords.latitude, position.coords.longitude];
        this.location.setPosition(location[0], location[1]);
        //getLocation(location[0], location[1]).then((res) => {
        //  console.log(res);
        //  this.location.setLocation(res);
        //});
      });
    },
    autoLogin() {
      this.user.setLastUser(getLastUser());
      if (
        this.user.lastUser?.userFire?.mail &&
        this.user.lastUser?.userFire?.pass
      ) {
        this.inf = true;
        autoLogin(this.user.lastUser?.userFire).then((res) => {
          if (res) {
            this.inf = false;
            this.user.setUser(res);
            const path = this.$route.path;
            if (path == "/" || path == "/login")
              this.$router.push("/app/main/events");
          }
        });
      }
    },
  },
  mounted() {
    this.setBackButton();
    this.checkLocationAccesWeb();
    if (settings.autoLogin) this.autoLogin();
  },
};
</script>
<style>
#app > div > div:not([class="a"]) {
  width: 100vw;
  height: 100vh;
}
</style>

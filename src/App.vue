<template>
  <router-view v-if="!loginPopup" />

  <q-dialog v-model="loginPopup">
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
import settings from "@/services/settings";
import { autoLogin } from "./services/core/login";
import { location } from "@/store/location";
import { user } from "@/store/user";
import { getLocationShow } from "./services/geoCode/geocode";
export default {
  name: "LayoutDefault",
  // Fetch events will be in here
  components: {},
  data() {
    return {
      loginPopup: true,
      position: [],
      user: user(),
      location: location(),
    };
  },
  methods: {
    setBackButton: setBackButton,
    autoLogin: autoLogin,
    checkLocationAccesWeb: function () {
      navigator.geolocation.getCurrentPosition((position) => {
        const location = [position.coords.latitude, position.coords.longitude];
        this.location.setPosition(location[0], location[1]);
        getLocationShow(location[0], location[1]).then((res) =>
          this.location.setLocation(
            res.Components.find((val) => val.kind == "area").name
          )
        );
      });
    },
  },
  mounted() {
    this.setBackButton();
    this.checkLocationAccesWeb();
    if (settings.autoLogin) {
      this.autoLogin(this.user, this.loginPopup, this.$route, this.$roter);
    } else this.loginPopup = false;
  },
};
</script>
<style>
#app > div > div:not([class="a"]) {
  width: 100vw;
  height: 100vh;
}
</style>

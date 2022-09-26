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
import { setBackButton } from "./services/app/main";
import { autoLogin } from "./services/firebase/login";
import settings from "@/services/settings";

import { location } from "@/store/location";
import { user } from "@/store/user";
import { getLocationShow } from "./services/geoCode/geocode";
export default {
  name: "LayoutDefault",
  // Fetch events will be in here
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

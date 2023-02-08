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
import { checkAuth } from "@/services/app/auth.js"
import { location } from "@/store/location";
import { user } from "@/store/user";
import { getLocationShow } from "./services/geoCode/geocode";
import { getLocalObject } from "./services/capacitor/preferences";
import { getFirestoreUser } from "./services/app/user";
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
    autoLogin: function () {
      checkAuth().then((user) => {
        console.log("------------------------------------")
        console.log(JSON.stringify(user))
        getLocalObject("user").then(({ value: localUser }) => {
          console.log(localUser);
          getFirestoreUser(user.uid).then(userFire => {
            this.user.setUserFire(userFire)
          })
          this.loginPopup = false
          this.$router.push({ name: "EventsAll" })
        })
      }).catch(() => {
        this.loginPopup = false
      })
    },
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
    getLocalObject("user").then(({ value: localUser }) => {
      if (localUser)
        this.user.setUser(localUser)
      this.autoLogin();
    })

  },
};
</script>
<style>
#app>div>div:not([class="a"]) {
  width: 100vw;
  height: 100vh;
}
</style>

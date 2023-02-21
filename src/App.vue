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
import { getFirestoreUser, getLocalUserData } from "./services/app/user";
import { getMessageIDs } from "./services/app/message";
import { messages } from "./store/messages";
export default {
  name: "LayoutDefault",
  // Fetch events will be in here
  components: {},
  data() {
    return {
      loginPopup: true,
      position: [],
      user: user(),
      messages: messages(),
      location: location(),
    };
  },
  methods: {
    setBackButton: setBackButton,
    getMessages: function () {
      getMessageIDs(this.user.ID).then(messageIDs => {
        this.messages.msgIDList = messageIDs
      })
    },
    autoLogin: function () {
      checkAuth().then((user) => {
        this.user.setUserAuth(user);
        getFirestoreUser(user.uid).then(userFire => {
          this.user.setUserFire(userFire)
          this.loginPopup = false
          this.getMessages();
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
    getLocalUserData().then(({ value: localUser }) => {
      if (localUser != null) {
        this.user.setUser(localUser)
        this.autoLogin();
      } else this.loginPopup = false;
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

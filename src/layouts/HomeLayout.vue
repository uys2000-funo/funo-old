<template>
  <div class="fit column no-wrap overflow-hidden">
    <div class="fit overflow-auto">
      <router-view />
    </div>
    <div class="full-width row no-wrap justify-around" style="height: 15vw;">
      <q-btn flat :to="{ name: 'CreatePage' }">
        <icon-plus class="fill-accent" />
      </q-btn>
      <q-btn flat>
        <icon-compass class="fill-accent" />
      </q-btn>
      <q-btn flat :to="{ name: 'EventsPage' }">
        <icon-logo />
      </q-btn>
      <q-btn flat>
        <icon-world class="fill-accent" />
      </q-btn>
      <q-btn flat :to="{ name: 'UserPage' }">
        <icon-person class="fill-accent" />
      </q-btn>
    </div>
  </div>
</template>
<script>
import { useUser } from "@/store/user";
import iconPlus from "@/icons/home/iconPlus.vue";
import iconCompass from "@/icons/home/iconCompass.vue"
import iconLogo from "@/icons/general/iconLogo.vue";
import iconWorld from "@/icons/home/iconWorld.vue"
import iconPerson from "@/icons/general/iconPerson.vue";
import { getCurrentLocation } from "@/services/app/location"
import { showToast } from "@/services/capacitor/toast";
import { useLocation } from "@/store/location";
export default {
  name: "AppLayout",
  components: { iconPlus, iconCompass, iconLogo, iconWorld, iconPerson },
  //After Login Genral Fetchs
  data() {
    return {
      userStore: useUser(),
      localStorage: useLocation(),
      notificationsListener: null,
      popularEventListener: null,
      joinedEventListener: null,
    };
  },
  methods: {
    setLocation() {
      getCurrentLocation().then((locationResult) => {
        if (!locationResult.status) return showToast("Konuma ulaşılamadı");
        this.localStorage.city = locationResult.city;
        this.localStorage.address = locationResult.address;
      })
    },
    listenNotifications() {

    },
    listenPopularEvents() {

    },
    listenJoinedEvents() {

    }
  },
  mounted() {
    this.setLocation()
    let interval = setInterval(() => {
      if (this.userStore.uID) {
        this.listenNotifications();
        this.listenPopularEvents()
        this.listenJoinedEvents()
        clearInterval(interval)
      }
    }, 200);

  },
  beforeUnmount() {
    if (this.notificationsListener) {
      this.notificationsListener()
    }
    if (this.popularEventListener) {
      this.popularEventListener()
    }
    if (this.joinedEventListener) {
      this.joinedEventListener()
    }
  },
};
</script>

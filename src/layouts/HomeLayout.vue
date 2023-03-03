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
import { user } from "@/store/user";
import iconPlus from "@/icons/home/iconPlus.vue";
import iconCompass from "@/icons/home/iconCompass.vue"
import iconLogo from "@/icons/general/iconLogo.vue";
import iconWorld from "@/icons/home/iconWorld.vue"
import iconPerson from "@/icons/general/iconPerson.vue";
export default {
  name: "AppLayout",
  components: { iconPlus, iconCompass, iconLogo, iconWorld, iconPerson },
  //After Login Genral Fetchs
  data() {
    return {
      user: user(),
      notificationsListener: null,
      popularEventListener: null,
      joinedEventListener: null,
    };
  },
  methods: {
    listenNotifications() {

    },
    listenPopularEvents() {

    },
    listenJoinedEvents() {

    }
  },
  mounted() {
    let interval = setInterval(() => {
      if (this.user.uID) {
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

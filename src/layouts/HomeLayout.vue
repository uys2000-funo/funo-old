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
      <q-btn flat>
        <icon-person class="fill-accent" />
      </q-btn>
    </div>
  </div>
</template>
<script>
import { user } from "@/store/user";
import { events } from "@/store/events";
import { notifications } from "@/store/notifications";
import { watchNotifications } from "@/services/app/notification";
import { watchPopularEvents } from "@/services/app/event";
import { w } from "@/services/c";
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
    };
  },
  methods: {
    listenNotifications() {
      w("NOTIFICATIONS STARTED TO LISTENNING", this.user.ID)
      this.notificationsListener = watchNotifications(
        this.user.ID,
        notifications().add,
        notifications().remove,
        notifications().update
      );
    },
    listenPopularEvents() {
      w("POPULAR EVENTS STARTED TO LISTENNING", "")
      this.popularEventListener = watchPopularEvents(
        events().addPopularEvent,
        events().removePopularEvent,
        events().updatePopularEvent
      );
    }
  },
  mounted() {
    let interval = setInterval(() => {
      if (user().ID) {
        this.listenNotifications();
        this.listenPopularEvents()
        clearInterval(interval)
      }
    }, 200);

  },
  beforeUnmount() {
    if (this.notificationsListener) {
      w("notificationsListener UNMOUNTED", this.user.ID)
      this.notificationsListener()
    }
    if (this.popularEventListener) {
      w("popularEventListener UNMOUNTED", this.user.ID)
      this.popularEventListener()
    }
  },
};
</script>

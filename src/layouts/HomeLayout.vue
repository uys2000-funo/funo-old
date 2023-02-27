<template>
  <div class="asd column no-wrap justify-around items-start content-start">
    <div class="col-11" style="width: 100%">
      <router-view />
    </div>
    <div class="menu row no-wrap col-1">
      <q-btn flat to="/app/main/events/create/general">
        <img :src="require('@/assets/images/icons/addEvent.svg')" alt="" />
      </q-btn>
      <q-btn flat to="/app/discover/serach">
        <img :src="require('@/assets/images/icons/compas.svg')" alt="" />
      </q-btn>
      <q-btn flat to="/app/main/events">
        <img :src="require('@/assets/images/logo.svg')" alt="" />
      </q-btn>
      <q-btn flat to="/app/main/map">
        <img :src="require('@/assets/images/icons/world.svg')" alt="" />
      </q-btn>
      <q-btn flat to="/app/user/user">
        <img :src="require('@/assets/images/icons/person.svg')" alt="" />
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
export default {
  name: "AppLayout",
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
<style scoped>
.asd {
  height: 100vh;
}

.menu {
  bottom: 0px;
  left: 0px;
  width: 100%;
}

.menu>.q-btn {
  margin: auto;
  height: 75%;
  margin-bottom: 0px;
}

.q-btn {
  border-radius: 50%;
  width: 20%;
}
</style>

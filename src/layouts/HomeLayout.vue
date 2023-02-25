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
import { getPopEvents } from "@/services/core/events";
import { events } from "@/store/events";
import { getEvent } from "@/services/core/events";
import { watchNotifications } from "@/services/app/notification";
import { user } from "@/store/user";
import { notifications } from "@/store/notifications";
export default {
  name: "AppLayout",
  //After Login Genral Fetchs
  data() {
    return {
      user: user(),
      notifications: notifications(),
      notificationListener: null,
    };
  },
  methods: {
    getPopEvents: getPopEvents,
    addPopEvent: events().addEventWithPopList,
    getEvent: getEvent,
    addNotifications: function (changes) {
      changes.forEach((change) => {
        const doc = change.doc.data();
        this.notifications.add(doc)
      })
    }
  },
  mounted() {
    if (events().eventPopularList.length == 0)
      this.getPopEvents().then((popEvents) => {
        popEvents.forEach((popEvent) => {
          if (events().eventDict[popEvent.eID]) {
            this.addPopEvent(events().eventDict[popEvent.eID]);
          } else {
            this.getEvent(popEvent.eID).then((event) => {
              console.log(event);
              this.addPopEvent(event);
            });
          }
        });
      });
    this.notificationsListener = watchNotifications(this.user.ID, this.addNotifications);
  },
  beforeUnmount() {
    if (this.notificationsListener) this.notificationsListener()
  }
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

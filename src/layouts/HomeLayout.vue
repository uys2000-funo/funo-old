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
import { getNotifications, watchNotifications } from "@/services/app/notification";
import { user } from "@/store/user";
import { notifications } from "@/store/notifications";
import { w } from "@/services/c";
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
  },
  mounted() {
    if (events().eventPopularList.length == 0)
      this.getPopEvents().then((popEvents) => {
        popEvents.forEach((popEvent) => {
          if (events().eventDict[popEvent.eID]) {
            this.addPopEvent(events().eventDict[popEvent.eID]);
          } else {
            this.getEvent(popEvent.eID).then((event) => {
              this.addPopEvent(event);
            });
          }
        });
      });
    let interval = setInterval(() => {
      if (!this.user.ID) w("USER DOES NOT IMPLEMENTED YET", this.user.ID)
      else {
        w("NOTIFICATIONS STARTED TO GETTING", this.user.ID)
        getNotifications(this.user.ID).then((notifications) => {
          notifications.forEach(notification => {
            this.notifications.add(notification)
          })
          w("NOTIFICATIONS STARTED TO LISTENNING", this.user.ID)
          this.notificationsListener = watchNotifications(
            this.user.ID,
            this.notifications.add,
            this.notifications.remove,
            this.notifications.update
          );
        })
        clearInterval(interval)
      }
    }, 200)

  },
  beforeUnmount() {
    if (this.notificationsListener) {
      w("notificationsListener UNMOUNTED", this.user.ID)
      this.notificationsListener()
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

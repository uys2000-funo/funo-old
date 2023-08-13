<template>
  <div class="fit column no-wrap overflow-hidden">
    <div class="fit overflow-auto">
      <router-view />
    </div>
    <div class="full-width row justify-around" style="height: 78px; overflow-y:visible; padding-bottom: 18px;">
      <q-btn flat dense rounded no-caps style="width: 72px; height: 42px; margin-top: 12px;">
        <div class="column justify-center content-center items-center" style="gap:2px">
          <q-icon size="24px">
            <icon-home />
          </q-icon>
          <span style="font-weight: 400; color: #7B7B7B; line-height: 15px;">
            Anasayfa
          </span>
        </div>
      </q-btn>
      <q-btn flat dense rounded no-caps style="width: 72px; height: 42px; margin-top: 12px;;">
        <div class="column justify-center content-center items-center" style="gap:2px">
          <q-icon size="24px">
            <icon-calendar />
          </q-icon>
          <span style="font-weight: 400; color: #7B7B7B; line-height: 15px;">
            Takvim
          </span>
        </div>
      </q-btn>
      <q-btn flat dense round no-caps class="bg-secondary"
        style="width: 69px; height: 69px; border: 1px solid #3C485332; margin-top: -9px;">
        <div class=" column justify-center content-center items-center" style="gap:2px">
          <q-icon size="28px">
            <icon-logo />
          </q-icon>
          <span style="font-size: 12px; font-weight: 400; color: #7B7B7B; line-height: 15px;">
            Keşfet
          </span>
        </div>
      </q-btn>
      <q-btn flat dense rounded no-caps style="width: 72px; height: 42px; margin-top: 12px;">
        <div class="column justify-center content-center items-center" style="gap:2px">
          <q-icon size=" 24px">
            <icon-world />
          </q-icon>
          <span style="font-weight: 400; color: #7B7B7B; line-height: 15px;">
            Harita
          </span>
        </div>
      </q-btn>
      <q-btn flat dense rounded no-caps style="width: 72px; height: 42px; margin-top: 12px;">
        <div class="column justify-center content-center items-center" style="gap:2px">
          <q-icon size="24px">
            <icon-account />
          </q-icon>
          <span style="font-weight: 400; color: #7B7B7B; line-height: 15px;">
            Profilim
          </span>
        </div>
      </q-btn>
    </div>
  </div>
</template>
<script>
import { useUser } from "@/store/user";
import { getCurrentLocation } from "@/services/app/location"
import { showToast } from "@/services/capacitor/toast";
import { useLocation } from "@/store/location";
import { Timestamp } from "@firebase/firestore";
import { useEvents } from "@/store/event";
import { getEvents, watchEvents } from "@/services/app/event";
import eventArgs from "@/services/app/event.json";
import { watchNotifications } from "@/services/app/notification";
import { useNotifications } from "@/store/notifications";

import IconHome from "@/icons/home/iconHome.vue";
import iconCalendar from "@/icons/home/iconCalendar.vue";
import IconAccount from "@/icons/home/iconAccount.vue";
import IconWorld from "@/icons/home/iconWorld.vue";
import IconLogo from "@/icons/general/iconLogo.vue";
export default {
  name: "AppLayout",
  components: { IconHome, iconCalendar, IconAccount, IconWorld, IconLogo },
  //After Login General Fetchs And Listeners
  data() {
    return {
      userStore: useUser(),
      eventsStore: useEvents(),
      locationStore: useLocation(),
      notificationsStore: useNotifications(),

      notificationUpdateListener: null,

      notificationListener: null,
      popularEventListener: null,
      joinedEventListener: null,

    };
  },
  methods: {
    setLocation() {
      getCurrentLocation().then((locationResult) => {
        if (!locationResult.status) return showToast("Konuma ulaşılamadı");
        this.locationStore.city = locationResult.city;
        this.locationStore.address = locationResult.address;
        this.locationStore.coordinates = locationResult.coordinates;
      })
    },
    notificationUpdate() {
      this.notificationsStore.getItems("futureNotifications").forEach(notification => {
        if (notification.data.nTimestamp.seconds <= Timestamp.now().seconds) {
          this.notificationsStore.addToBegin("Notifications", notification)
          this.notificationsStore.removeFrom("futureNotifications", notification)
        }
      });
    },
    listenNotificationUpdate() {
      this.notificationUpdateListener = setInterval(() => {
        this.notificationUpdate()
      }, 10000)
    },
    listenNotifications() {
      this.notificationListener = watchNotifications(this.userStore.uID,
        (doc) => this.notificationsStore.addTo("futureNotifications", doc),
        (doc) => this.notificationsStore.removeFrom("futureNotifications", doc)
      )
    },
    listenPopularEvents() {
      this.popularEventListener = watchEvents(null, [],
        (doc) => this.eventsStore.addToAs("popular", "eID", doc),
        (doc) => this.eventsStore.removeFromAs("popular", "eID", doc),
        "EventPopular",
      )
    },
    listenJoinedEvents() {
      const startPoint = Timestamp.now();
      eventArgs.watchEventsJoined[2].equality = this.userStore.uID
      this.joinedEventListener = watchEvents(startPoint, eventArgs.watchEventsJoined,
        (doc) => this.eventsStore.addToAs("joined", "eID", doc),
        (doc) => this.eventsStore.removeFromAs("joined", "eID", doc),
        "UserJoinedEvent"
      )
    }
  },
  mounted() {
    this.setLocation()
    let interval = setInterval(() => {
      if (this.userStore.uID) {
        this.listenNotificationUpdate();
        this.listenNotifications();
        this.listenPopularEvents();
        this.listenJoinedEvents();
        clearInterval(interval)
      }
    }, 200);
    getEvents(null, [], "EventPopular")
  },
  beforeUnmount() {
    if (this.notificationUpdateListener) {
      clearInterval(this.notificationUpdateListener)
    }
    if (this.notificationsListener) {
      this.notificationListener()
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

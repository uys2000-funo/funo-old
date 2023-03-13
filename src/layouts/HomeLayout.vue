<template>
  <div class="fit column no-wrap overflow-hidden">
    <div class="fit overflow-auto">
      <router-view />
    </div>
    <div class="full-width row no-wrap justify-around" style="height: 15vw;">
      <q-btn flat :to="{ name: 'CreatePage' }">
        <icon-plus class="fill-accent" />
      </q-btn>
      <q-btn flat :to="{ name: 'DiscoverPage' }">
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
import { Timestamp } from "@firebase/firestore";
import { useEvents } from "@/store/event";
import { getEvents, watchEvents } from "@/services/app/event";
import eventArgs from "@/services/app/event.json";
import { watchNotifications } from "@/services/app/notification";
import { useNotifications } from "@/store/notifications";
export default {
  name: "AppLayout",
  components: { iconPlus, iconCompass, iconLogo, iconWorld, iconPerson },
  //After Login General Fetchs And Listeners
  data() {
    return {
      userStore: useUser(),
      eventsStore: useEvents(),
      localStorage: useLocation(),
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
        this.localStorage.city = locationResult.city;
        this.localStorage.address = locationResult.address;
        this.localStorage.coordinates = locationResult.coordinates;
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

<template>
  <div class="text-h5">Popular Etkinlikler</div>
  <div>Şimdilik En çok katılımcısı olan Etkinlikler</div>
  <q-scroll-area style="width: 100vw; height: 125px">
    <div class="row no-wrap">
      <comp-pop-event
        v-for="event in orderedEvents"
        :key="event"
        :event="event"
      />
    </div>
  </q-scroll-area>
</template>
<script>
import { events } from "@/store/events";
import compPopEvent from "./compPopEvent.vue";
export default {
  components: { compPopEvent },
  data() {
    return {
      events: events(),
      orderedEvents: [],
    };
  },
  methods: {
    orderEvents: function () {
      const order = (a, b) => b.usersCount - a.usersCount;
      this.orderedEvents = [...this.events.events].sort(order);
      console.log(
        "---------",
        [...this.orderedEvents].map((val) => val.usersCount)
      );
    },
  },
  computed: {
    eventsAll: function () {
      return this.events.eventsAll;
    },
  },
  watch: {
    eventsAll() {
      this.orderEvents();
    },
  },
};
</script>

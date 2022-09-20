<template>
  <q-scroll-area style="width: 100vw; height: 100%">
    <comp-popular-events />
    <comp-events-flow :tags="tags" />
  </q-scroll-area>
  <comp-event-settings />
  <router-view />
</template>

<script>
import { events } from "@/store/events";
import { getAllEventsFunction } from "@/services/core/events";
import compEventSettings from "@/components/general/compEvent/compEventSettings.vue";
import CompEventsFlow from "@/components/events/compEventsFlow.vue";
import compPopularEvents from "@/components/events/compPopularEvents.vue";
export default {
  components: {
    compEventSettings,
    CompEventsFlow,
    compPopularEvents,
  },
  props: ["tags"],
  data() {
    return {
      events: events(),
    };
  },
  mounted() {
    getAllEventsFunction(this.events.setEvents, this.events.getNextEvents);
  },
  watch: {},
};
</script>

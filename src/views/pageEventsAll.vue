<template>
  <q-scroll-area style="width: 100vw; height: 100%">
    <div>
      <span> çevrendeki etkinlikler </span>
      {{ events.index }}
    </div>
    <q-infinite-scroll
      @load="events.getNextEvents"
      :offset="0"
      v-if="events.events.length != 0"
    >
      <div v-for="event in events.events" :key="event">
        <comp-event :event="event" :tags="tags" />
      </div>
      <template v-slot:loading>
        <div class="row justify-center q-my-md">
          <q-spinner-dots color="primary" size="40px" />
        </div>
      </template>
    </q-infinite-scroll>
  </q-scroll-area>
  <router-view />
</template>

<script>
import compEvent from "@/components/compEvent.vue";
import { events } from "@/store/events";
import { getAllEventsFunction } from "@/services/core/events";
export default {
  components: {
    compEvent,
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

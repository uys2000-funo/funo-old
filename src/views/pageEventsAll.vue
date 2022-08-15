<template>
  <q-scroll-area style="width: 100vw; height: 100%">
    <div>
      <span> çevrendeki etkinlikler </span>
      {{ eventStorage.index }}
    </div>
    <q-infinite-scroll
      @load="eventStorage.getNextEvents"
      :offset="0"
      v-if="eventStorage.events.length != 0"
    >
      <div v-for="event in eventStorage.events" :key="event">
        <com-event :event="event" :tags="tags" />
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
import comEvent from "@/components/compEvent.vue";
import { eventStorage } from "@/storages/events";
import { getAllEventsFunction } from "@/services/core/events";
export default {
  components: {
    comEvent,
  },
  props: ["tags"],
  data() {
    return {
      eventStorage: eventStorage(),
      hideAmount: 0,
      shown: { f: 0, l: 2 },
    };
  },
  mounted() {
    getAllEventsFunction(
      this.eventStorage.setEvents,
      this.eventStorage.getNextEvents
    );
  },
  watch: {},
};
</script>

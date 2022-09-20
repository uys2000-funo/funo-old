<template>
  <div class="text-h5">çevrendeki etkinlikler</div>
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
</template>
<script>
import compEvent from "@/components/general/compEvent.vue";
import { events } from "@/store/events";
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
  watch: {},
};
</script>

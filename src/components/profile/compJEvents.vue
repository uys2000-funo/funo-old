<template>
  <q-scroll-area style="width: 100vw; height: 100%">
    <q-infinite-scroll
      @load="() => ''"
      :offset="0"
      v-if="events.eventsJoined.length != 0"
    >
      <div v-for="event in events.eventsJoined" :key="event">
        <comp-event :event="event" :tags="[]" />
      </div>
      <template v-slot:loading>
        <div class="row justify-center q-my-md">
          <q-spinner-dots color="primary" size="40px" />
        </div>
      </template>
    </q-infinite-scroll>
  </q-scroll-area>
</template>
<script>
import { user } from "@/store/user";
import { events } from "@/store/events";
import { getEventsCreated } from "@/services/core/createdEvents";
import compEvent from "../general/compEvent.vue";
export default {
  components: { compEvent },
  data() {
    return {
      events: events(),
      user: user(),
      eventsJoined: events().eventsJoined,
      jEvents: user().jEvents,
    };
  },
  methods: {
    setEventsJoined: events().setEventsJoined,
    getEvents: function (i, f = () => "") {
      i;
      getEventsCreated(this.jEvents).then((res) => {
        if (this.events.eventsJoined.length == 0) this.setEventsJoined(res);
        f();
      });
    },
  },
  mounted() {
    if (this.eventsJoined.length == 0) this.getEvents();
  },
};
</script>

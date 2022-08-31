<template>
  <q-scroll-area style="width: 100vw; height: 100%">
    <q-infinite-scroll
      @load="() => ''"
      :offset="0"
      v-if="events.eventsCreated.length != 0"
    >
      <div v-for="event in events.eventsCreated" :key="event">
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
import { getEventsCreated } from "@/services/core/createdEvents";
import { events } from "@/store/events";
import { user } from "@/store/user";
import compEvent from "../compEvent.vue";
export default {
  components: { compEvent },
  data() {
    return {
      events: events(),
      user: user(),
      eventsCreated: events().eventsCreated,
      userEvents: user().fire?.events,
    };
  },
  methods: {
    setEventsCreated: events().setEventsCreated,
    getEvents: function (i, f = () => "") {
      i;
      getEventsCreated(this.user.fire?.events).then((res) => {
        if (this.events.eventsCreated.length == 0) this.setEventsCreated(res);
        f();
      });
    },
  },
  mounted() {
    if (this.eventsCreated.length == 0) this.getEvents();
    console.log(this.events, this.userEvents);
  },
};
</script>

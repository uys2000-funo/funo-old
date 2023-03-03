<template>
  <q-scroll-area style="width: 100vw; height: 100%">
    <q-infinite-scroll
      @load="() => ''"
      :offset="0"
      v-if="eventList.length != 0"
    >
      <div v-for="eID in eventList" :key="eID">
        <comp-event v-if="eventDict[eID]" :event="eventDict[eID]" :tags="[]" />
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
import compEvent from "../general/compEvent.";
import { events } from "@/store/event";
import { getEvent } from "@/services/core/events";
export default {
  components: { compEvent },
  props: ["eventList"],
  data() {
    return {
      events: events(),
      eventDict: events().eventDict,
    };
  },
  methods: {
    addEvent: events().addEvent,
    getEvents: function (eID) {
      if (!this.eventDict[eID])
        getEvent(eID).then((event) => this.addEvent(event));
    },
  },
  mounted() {
    this.eventList.forEach((eID) => {
      this.getEvents(eID);
    });
  },
};
</script>

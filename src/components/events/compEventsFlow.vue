<template>
  <div class="text-h5">çevrendeki etkinlikler</div>
  <q-infinite-scroll
    @load="getEvents"
    :offset="0"
    v-if="events.eventFlowList.length != 0"
  >
    <div v-for="eID in events.eventFlowList" :key="eID">
      <comp-event :event="events.eventDict[eID]" :tags="tags" />
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
import { getEvents } from "@/services/core/events";
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
  methods: {
    getEvents: function (i, done) {
      getEvents(this.events.lastFlowEventDate).then((res) => {
        this.events.addEventsWithFlowList(res);
        if (res.length == 0) done(true);
        else i, done();
      });
    },
  },
  mounted() {
    getEvents().then((res) => this.events.addEventsWithFlowList(res));
  },
};
</script>

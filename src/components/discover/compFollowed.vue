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
import { getEvent, getEventsFollowed } from "@/services/core/events";
import { user } from "@/store/user";
export default {
  components: { compEvent },
  data() {
    return {
      events: events(),
      eventDict: events().eventDict,
      eventList: events().eventFollowedList,
      fIDs: user().user.userFire.fUsers,
    };
  },
  methods: {
    addEvent: events().addEvent,
    getEventsFollowed: getEventsFollowed,
    addEventsWithFollowedList: events().addEventsWithFollowedList,
    getEvent: function (eID) {
      if (!this.eventDict[eID])
        getEvent(eID).then((event) => this.addEvent(event));
    },
    getEvents: function () {
      this.eventList.forEach((eID) => {
        this.getEvent(eID);
      });
    },
  },
  mounted() {
    if (this.eventList.length == 0)
      getEventsFollowed(this.fIDs, 0, 10).then((events) => {
        this.addEventsWithFollowedList(events);
        this.getEvents();
      });
    else this.getEvents();
  },
};
</script>

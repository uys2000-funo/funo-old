<template>
  <popup-comp fullscreen>
    <back-button />
    <q-scroll-area class="fit">
      <router-view :event="event" />
    </q-scroll-area>
  </popup-comp>
</template>
<script>
import { getEvent } from "@/services/firebase/event";
import popupComp from "@/components/general/popupComp.vue";
import backButton from "@/components/general/backButton.vue";
import { events } from "@/store/events";
export default {
  components: {
    popupComp,
    backButton,
  },
  data() {
    return {
      event: {},
      events: events(),
    };
  },
  methods: {
    getEvent: function () {
      if (this.events.eventDict[this.$route.params.id]) {
        this.event = this.events.eventDict[this.$route.params.id];
        console.log("Event Used From Cache");
      } else
        getEvent(this.$route.params.id).then((res) => {
          this.events.addEvent({ eID: res.id, ...res.data() });
          this.event = this.events.eventDict[this.$route.params.id];
          console.log("Event get From DB", this.event);
        });
    },
  },
  mounted() {
    this.getEvent();
  },
};
</script>

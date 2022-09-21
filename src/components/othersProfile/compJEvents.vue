<template>
  <q-scroll-area style="width: 100vw; height: 100%">
    <q-infinite-scroll
      @load="() => ''"
      :offset="0"
      v-if="jEventsShow.length != 0"
    >
      <div v-for="event in jEventsShow" :key="event">
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
import compEvent from "../general/compEvent.vue";
export default {
  components: { compEvent },
  props: ["joinEvent"],
  data() {
    return {
      jEventsShow: [],
    };
  },
  methods: {
    getEvents: function () {
      getEventsCreated(this.joinEvent).then((res) => {
        this.jEventsShow = res;
      });
    },
  },
  mounted() {
    if (this.jEventsShow.length == 0) this.getEvents();
  },
};
</script>

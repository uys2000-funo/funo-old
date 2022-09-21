<template>
  <q-scroll-area style="width: 100vw; height: 100%">
    <q-infinite-scroll
      @load="() => ''"
      :offset="0"
      v-if="cEventsShow.length != 0"
    >
      <div v-for="event in cEventsShow" :key="event">
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
  props: ["createdEvents"],
  data() {
    return {
      cEventsShow: [],
    };
  },
  methods: {
    getEvents: function () {
      getEventsCreated(this.createdEvents).then((res) => {
        this.cEventsShow = res;
      });
    },
  },
  mounted() {
    if (this.cEventsShow.length == 0) this.getEvents();
  },
};
</script>

<template>
  <q-carousel
    v-if="user"
    :model-value="`${page % 5 < 0 ? (page % 5) + 5 : page % 5}`"
    :transition-prev="ani"
    :transition-next="ani"
    animated
    infinite
    control-color="primary"
    class="bg-secondary fit"
    keep-alive
  >
    <q-carousel-slide name="0" class="column no-wrap flex-center">
      <comp-share />
    </q-carousel-slide>
    <q-carousel-slide name="1" class="column no-wrap flex-center">
      <comp-message/>
    </q-carousel-slide>
    <q-carousel-slide name="2" class="column no-wrap flex-center">
      <comp-setting />
    </q-carousel-slide>
    <q-carousel-slide name="3" class="column no-wrap flex-center">
      <comp-events :eventList="user.joinEvent" />
    </q-carousel-slide>
    <q-carousel-slide name="4" class="column no-wrap flex-center">
      <comp-events :eventList="user.events" />
    </q-carousel-slide>
  </q-carousel>
  <comp-event-settings />
</template>
<script>
import compShare from "@/components/othersProfile/compShare.vue";
import compMessage from "@/components/othersProfile/compMessage.vue";
import compSetting from "@/components/othersProfile/compSettings.vue";
import compEvents from "@/components/othersProfile/compEvents.vue";
import compEventSettings from "@/components/general/compEvent/compEventSettings.vue";
export default {
  components: {
    compShare,
    compMessage,
    compSetting,
    compEvents,
    compEventSettings,
  },
  props: ["page", "user"],
  data() {
    return {
      ani: "slide-left",
      p: this.$route.params.p,
    };
  },
  watch: {
    page(nVal, oVal) {
      if (nVal > oVal) this.ani = "slide-left";
      else if (nVal < oVal) this.ani = "slide-right";
    },
    p(nVal, oVal) {
      console.log(nVal, oVal, this.p);
    },
  },
};
</script>

<template>
  <q-carousel
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
      <comp-edit-pro />
    </q-carousel-slide>
    <q-carousel-slide name="2" class="column no-wrap flex-center">
      <comp-setting />
    </q-carousel-slide>
    <q-carousel-slide name="3" class="column no-wrap flex-center">
      <comp-events :eventList="jEvents" />
    </q-carousel-slide>
    <q-carousel-slide name="4" class="column no-wrap flex-center">
      <comp-events :eventList="cEvents" />
    </q-carousel-slide>
  </q-carousel>
  <comp-event-settings />
</template>
<script>
import compShare from "@/components/profile/compShare.vue";
import compEditPro from "@/components/profile/compEditPro.vue";
import compSetting from "@/components/profile/compSettings.vue";
import compEvents from "@/components/profile/compEvents.vue";
import compEventSettings from "@/components/general/compEvent/compEventSettings.vue";
import { user } from "@/store/user";
export default {
  components: {
    compShare,
    compEditPro,
    compSetting,
    compEvents,
    compEventSettings,
  },
  props: ["page"],
  data() {
    return {
      ani: "slide-left",
      p: this.$route.params.p,
      user: user(),
      jEvents: user().jEvents,
      cEvents: user().cEvents,
    };
  },
  watch: {
    page(nVal, oVal) {
      if (nVal > oVal) this.ani = "slide-left";
      else if (nVal < oVal) this.ani = "slide-right";
    },
  },
};
</script>

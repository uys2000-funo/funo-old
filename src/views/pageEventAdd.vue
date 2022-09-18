<template>
  <q-carousel
    :model-value="`${eventAdd.getPage}`"
    :transition-prev="ani"
    :transition-next="ani"
    animated
    infinite
    control-color="primary"
    class="bg-secondary fit"
    keep-alive
  >
    <q-carousel-slide name="0" class="column no-wrap flex-center">
      <comp-general />
    </q-carousel-slide>
    <q-carousel-slide name="1" class="column no-wrap flex-center">
      <comp-time />
    </q-carousel-slide>
    <q-carousel-slide name="2" class="column no-wrap flex-center">
      <comp-location />
    </q-carousel-slide>
    <q-carousel-slide name="3" class="column no-wrap flex-center">
      <comp-image />
    </q-carousel-slide>
  </q-carousel>
</template>
<script>
import compGeneral from "@/components/eventAdd/compGeneral.vue";
import compTime from "@/components/eventAdd/compTime.vue";
import compLocation from "@/components/eventAdd/compLocation.vue";
import compImage from "@/components/eventAdd/compImage.vue";
import { eventAdd } from "@/store/eventAdd";
export default {
  components: { compGeneral, compTime, compLocation, compImage },
  data() {
    return {
      eventAdd: eventAdd(),
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

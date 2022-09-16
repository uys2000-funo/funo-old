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
      <comp-search />
    </q-carousel-slide>
    <q-carousel-slide name="1" class="column no-wrap flex-center">
      <comp-events />
    </q-carousel-slide>
    <q-carousel-slide name="2" class="column no-wrap flex-center">
      <comp-users />
    </q-carousel-slide>
    <q-carousel-slide name="3" class="column no-wrap flex-center">
      <comp-atmo />
    </q-carousel-slide>
    <q-carousel-slide name="4" class="column no-wrap flex-center">
      <comp-followed />
    </q-carousel-slide>
  </q-carousel>
</template>
<script>
import compSearch from "@/components/discover/compSearch.vue";
import compEvents from "@/components/discover/compEvents.vue";
import compUsers from "@/components/discover/compUsers.vue";
import compAtmo from "@/components/discover/compAtmo.vue";
import compFollowed from "@/components/discover/compFollowed.vue";
export default {
  components: { compSearch, compEvents, compUsers, compAtmo, compFollowed },
  props: ["page"],
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

<template>
  <q-carousel
    :model-value="`${page % 5 < 0 ? (page % 5) + 5 : page % 5}`"
    :transition-prev="ani"
    :transition-next="ani"
    animated
    infinite
    control-color="primary"
    class="bg-secondary"
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
      <comp-j-events />
    </q-carousel-slide>
    <q-carousel-slide name="4" class="column no-wrap flex-center">
      <comp-events />
    </q-carousel-slide>
  </q-carousel>
</template>
<script>
import compShare from "@/components/profile/compShare.vue";
import compEditPro from "@/components/profile/compEditPro.vue";
import compSetting from "@/components/profile/compSettings.vue";
import compJEvents from "@/components/profile/compJEvents.vue";
import compEvents from "@/components/profile/compEvents.vue";
export default {
  components: { compShare, compEditPro, compSetting, compJEvents, compEvents },
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

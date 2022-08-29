<template>
  <q-carousel
    :model-value="`${page % 5 < 0 ? (page % 5) + 5 : page % 5}`"
    transition-prev="slide-right"
    transition-next="slide-left"
    animated
    infinite
    control-color="primary"
    class="bg-secondary"
  >
    <q-carousel-slide name="0" class="column no-wrap flex-center">
      {{ page % 5 }}
    </q-carousel-slide>
    <q-carousel-slide name="1" class="column no-wrap flex-center">
      {{ page % 5 }}
    </q-carousel-slide>
    <q-carousel-slide name="2" class="column no-wrap flex-center">
      {{ page % 5 }}
    </q-carousel-slide>
    <q-carousel-slide name="3" class="column no-wrap flex-center">
      {{ page % 5 }}
    </q-carousel-slide>
    <q-carousel-slide name="4" class="column no-wrap flex-center">
      {{ page % 5 }}
    </q-carousel-slide>
  </q-carousel>
</template>
<script>
export default {
  props: ["page"],
  data() {
    return {
      p: this.$route.params.p,
    };
  },
  watch: {
    p() {
      console.log(this.p);
    },
  },
};
</script>

<template>
  <q-carousel
  swipeable
    transition-prev="slide-right"
    transition-next="slide-left"
    animated
    control-color="primary"
    class="rounded-borders"
  >
    <q-carousel-slide name="style" class="column no-wrap flex-center">
      <q-icon name="style" color="primary" size="56px" />
      <div class="q-mt-md text-center">asdasd</div>
    </q-carousel-slide>
    <q-carousel-slide name="tv" class="column no-wrap flex-center">
      <q-icon name="live_tv" color="primary" size="56px" />
      <div class="q-mt-md text-center">asdasd</div>
    </q-carousel-slide>
    <q-carousel-slide name="layers" class="column no-wrap flex-center">
      <q-icon name="layers" color="primary" size="56px" />
      <div class="q-mt-md text-center">asdasdasd</div>
    </q-carousel-slide>
    <q-carousel-slide name="map" class="column no-wrap flex-center">
      <q-icon name="terrain" color="primary" size="56px" />
      <div class="q-mt-md text-center">asdasd</div>
    </q-carousel-slide>
  </q-carousel>
</template>

<script>
export default {
  setup() {
    return {
      slide: "style",
      lorem:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Itaque voluptatem totam, architecto cupiditate officia rerum, error dignissimos praesentium libero ab nemo provident incidunt ducimus iusto perferendis porro earum. Totam, numquam?",
    };
  },
};
</script>

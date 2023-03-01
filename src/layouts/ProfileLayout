<template>
  <div class="row o flex column">
    <div
      class="col-4 flex justify-center"
      style="overflow: hidden; max-width: 100vw"
    >
      <comp-wheel :r="r" :setR="(value) => (r = value)" />
    </div>
    <div class="col-8">
      <router-view :page="r" />
    </div>
  </div>
</template>
<script>
import compWheel from "@/components/profile/compWheel.vue";
export default {
  components: {
    compWheel,
  },
  data() {
    return {
      r: 0,
    };
  },
};
</script>
<style scoped>
.o {
  height: 100%;
}
</style>

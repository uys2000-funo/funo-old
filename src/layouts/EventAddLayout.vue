<template>
  <popup-comp fullscreen>
    <div class="row o column">
      <div
        class="col-4 row justify-center content-center items-center"
        style="overflow: hidden; max-width: 100vw"
      >
        <comp-wheel :r="r" :setR="(value) => (r = value)" />
      </div>
      <div class="col-8">
        <router-view :page="r" />
      </div>
    </div>
  </popup-comp>
</template>
<script>
import popupComp from "@/components/general/popupComp.vue";
import compWheel from "@/components/eventAdd/compWheel.vue";
export default {
  components: {
    compWheel,
    popupComp,
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

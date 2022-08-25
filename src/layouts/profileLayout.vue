<template>
  <div class="row o flex column">
    <div class="col-4 flex justify-center">
      <comp-profile-wheel w="90vw" h="90vw" />
    </div>
    <div class="col-8">asd</div>
  </div>
</template>
<script>
import compProfileWheel from "@/components/compProfileWheel.vue";
export default {
  components: {
    compProfileWheel,
  },
};
</script>
<style scoped>
.o {
  height: 100%;
}
</style>

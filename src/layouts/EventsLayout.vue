<template>
  <div class="relative fit column no-wrap ">
    <div class="full-width">
      <comp-header class="shadow-box" />
    </div>
    <router-view />
  </div>
</template>
<script>
import compHeader from '@/components/events/compHeader.vue';
export default {
  components: { compHeader },
}
</script>
<style>
.sticky {
  width: 100%;
  position: absolute;
  left: 0;
}
</style>
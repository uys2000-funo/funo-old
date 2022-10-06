<template>
  <popup-comp fullscreen>
    <div class="bg bg-primary">
      Mesajlar
    </div>
  </popup-comp>
</template>


<script>
import popupComp from '@/components/general/popupComp.vue';
export default {
  components: { popupComp }
}
</script>
<style scoped>
.bg {
  width: 100vw;
  height: 100vh;
}
</style>
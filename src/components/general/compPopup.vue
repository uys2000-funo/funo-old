<template>
  <q-dialog v-model="popup" :maximized="fullscreen ?? false">
    <div :class="`${bg ? 'bg-' + bg : 'bg-secondary'}`">
      <slot />
    </div>
  </q-dialog>
</template>
<script>
export default {
  props: ["fullscreen", "bg"],
  data() {
    return {
      popup: true,
    };
  },
  mounted() {
    setTimeout(() => {
      this.popup = true;
    }, 500);
  }
};
</script>
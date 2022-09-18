<template>
  <q-dialog v-model="popup" :maximized="fullscreen ?? false">
    <div class="bg-secondary">
      <slot />
    </div>
  </q-dialog>
</template>
<script>
export default {
  props: ["fullscreen"],
  data() {
    return {
      popup: true,
    };
  },
};
</script>

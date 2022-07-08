<template>
  <q-btn
    round
    flat
    fab-mini
    @click="goBack"
    class="bg-secondary"
    style="position: absolute; z-index: 1000"
  >
    <g-icon src="backArrow.svg" sizeO="7vw" sizeI="7vw" />
  </q-btn>
</template>

<script>
import gIcon from "./gIcon.vue";
export default {
  props: ["beforeGoBack", "time","goBackFunc"],
  components: {
    gIcon,
  },
  methods: {
    goBack: function () {
      if (this.beforeGoBack) this.beforeGoBack();
      setTimeout(
        () => {
          console.log(this.onGoBackFunc);
          this.$router.go(-1);
        },
        this.time == undefined ? 400 : this.time
      );
    },
  },
};
</script>

<style scoped></style>

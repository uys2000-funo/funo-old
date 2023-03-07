<template>
  <q-btn round fab-mini @click="goBack" class="bg-transparent">
    <q-icon name="arrow_back" color="primary"/>
  </q-btn>
</template>

<script>
export default {
  props: ["beforeGoBack", "time", "goBackFunc"],
  methods: {
    goBack: function () {
      if (this.beforeGoBack) this.beforeGoBack();
      setTimeout(
        () => {
          if (this.goBackFunc != undefined) this.goBackFunc();
          else this.$router.go(-1);
        },
        this.time == undefined ? 400 : this.time
      );
    },
  },
};
</script>

<style scoped>
.q-btn {
  position: fixed;
  left: 2vw;
  top: 1vh;
}
</style>

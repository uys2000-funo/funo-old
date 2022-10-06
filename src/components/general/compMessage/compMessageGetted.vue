<template>
  <div class="row no-wrap items-center content-center">
    <div class="img" :style="`background-image: url('${uIMG}'`" />
    <div class="full-width msg q-py-sm q-px-md">
      {{ msg }}
    </div>
  </div>
</template>
<script>
export default {
  props: ["uIMG", "msg"]
}
</script>
<style scoped>
.img {
  width: 10vw;
  height: 10vw;
  min-width: 10vw;
  min-height: 10vw;
  border-radius: 50%;
  margin: auto;
  background-position: center;
  background-size: cover;
}

.msg {
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 30px;
}
</style>
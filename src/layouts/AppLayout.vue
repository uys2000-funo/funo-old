<template>
  <div class="asd">
    <div class="f">
      <router-view />
    </div>
    <div class="row no-wrap">
      <div class="col-2 text-center">
        <img
          :src="require('@/assets/images/icons/addEvent.svg')"
          alt=""
          class="fit"
        />
      </div>
      <div class="col-2 text-center">
        <img
          :src="require('@/assets/images/icons/compas.svg')"
          alt=""
          class="fit"
        />
      </div>
      <div class="col-4 text-center">
        <img :src="require('@/assets/images/logo.svg')" alt="" class="fit" />
      </div>
      <div class="col-2 text-center">
        <img
          :src="require('@/assets/images/icons/world.svg')"
          alt=""
          class="fit"
        />
      </div>
      <div class="col-2 text-center">
        <img
          :src="require('@/assets/images/icons/person.svg')"
          alt=""
          class="fit"
        />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "AppLayout",
};
</script>
<style scoped>
div.asd {
  height: 100vh;
  width: 100vw;
}
div.asd > div {
  position: fixed;
  bottom: 0px;
  left: 0px;
  width: 100vw;
  height: 10vh;
}
div.asd > div > div {
  margin: auto;
  height: 75%;
  margin-bottom: 0px;
}
.f{
  position: relative;
}
</style>

<template>
  <div class="asd column no-wrap justify-start items-start content-start">
    <div class="col-11" style="width: 100%">
      <router-view />
    </div>
    <div class="menu row no-wrap col-1">
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
.asd {
  height: 100vh;
}
.menu {
  bottom: 0px;
  left: 0px;
  width: 100%;
}
.menu > div {
  margin: auto;
  height: 75%;
  margin-bottom: 0px;
}
</style>

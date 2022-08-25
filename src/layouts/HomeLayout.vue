<template>
  <div class="asd column no-wrap justify-around items-start content-start">
    <div class="col-11" style="width: 100%">
      <router-view />
    </div>
    <div class="menu row no-wrap col-1">
      <q-btn flat to="/app/main/events/create">
        <img :src="require('@/assets/images/icons/addEvent.svg')" alt="" />
      </q-btn>
      <q-btn flat to="/app/discover">
        <img :src="require('@/assets/images/icons/compas.svg')" alt="" />
      </q-btn>
      <q-btn flat to="/app/main/events">
        <img :src="require('@/assets/images/logo.svg')" alt="" />
      </q-btn>
      <q-btn flat to="/app/main/map">
        <img :src="require('@/assets/images/icons/world.svg')" alt="" />
      </q-btn>
      <q-btn flat to="/app/profile">
        <img :src="require('@/assets/images/icons/person.svg')" alt="" />
      </q-btn>
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
.menu > .q-btn {
  margin: auto;
  height: 75%;
  margin-bottom: 0px;
}
.q-btn {
  border-radius: 50%;
  width: 20%;
}
</style>

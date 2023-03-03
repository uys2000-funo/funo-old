<template>
  <router-view v-if="pageLoad" />

  <q-dialog v-model="showPopup">
    <q-card style="width: 50vw">
      <q-card-section>
        <div class="text-h6">Info</div>
      </q-card-section>

      <q-card-section class="q-pt-none"> Loginning </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import { useUser } from "@/store/user";
export default {
  name: "LayoutDefault",
  // Fetch events will be in here
  components: {},
  data() {
    return {
      pageLoad: true,
      showPopup: true,
      userStore: useUser(),
    };
  },
  methods: {

  },
  mounted() {

  }
};
</script>
<style>
#app>div>div:not([class="a"]) {
  width: 100vw;
  height: 100vh;
}

.t {
  transition: .5s;
}
</style>

<template>
  <q-dialog v-model="pages.notificationDialog" maximized>
    <div class="bg-primary flex column row" style="height: 100vh; width: 100vw">
      <div
        class="full-width col-2  text-center flex justify-center items-center content-center"
      >
        Bildirimler
      </div>
      <div class="col-10 bg-secondary notbar">asd</div>
      <back-button-top-left
        :goBackFunc="() => pages.setNotificationDialog(false)"
      />
    </div>
  </q-dialog>
</template>
<script>
import backButtonTopLeft from "../components/general/backButton.vue";
import { pages } from "@/store/pages";
export default {
  components: { backButtonTopLeft },
  data() {
    return {
      pages: pages(),
    };
  },
};
</script>
<style>
.notbar {
  border-top-right-radius: 10vw;
  border-top-left-radius: 10vw;
}
</style>

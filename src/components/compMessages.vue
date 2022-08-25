<template>
  <q-dialog v-model="pages.messagesDialog" maximized>
    <div class="bg-primary flex column row" style="height: 100vh; width: 100vw">
      <div
        class="full-width col-2  text-center flex justify-center items-center content-center"
      >
        Mesajlar
      </div>
      <div class="col-10 bg-secondary notbar">asd</div>
      <back-button-top-left
        :goBackFunc="() => pages.setMessagesDialog(false)"
      />
    </div>
  </q-dialog>
</template>
<script>
import backButtonTopLeft from "./backButtonTopLeft.vue";
import { pages } from "@/storages/pages";
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

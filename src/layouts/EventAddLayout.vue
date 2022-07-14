<template>
  <q-dialog
    v-model="dialog"
    persistent
    :maximized="true"
    transition-show="slide-up"
    transition-hide="slide-down"
  >
    <div class="fit bg-secondary column">
      <go-back-btn
        :beforeGoBack="() => (dialog = false)"
        :goBackFunc="() => 'asd'"
      />
      <div class="column no-wrap col-6 text-center">
        <div class="col-2">
          <h5 class="q-mt-md">Temel Bilgiler</h5>
        </div>
        <div class="col-10">
          <img :src="require('@/assets/images/register.svg')" alt="image" />
        </div>
      </div>
      <div class="col-6">
        <router-view :page="page" />
      </div>
    </div>
  </q-dialog>
</template>

<script>
import goBackBtn from "../components/backButtonTopLeft.vue";
export default {
  components: {
    goBackBtn,
  },
  data() {
    return {
      dialog: true,
      page: 0,
    };
  },
};
</script>

<style scoped>

img {
  height:100%
}
</style>

<template>
  <popup-comp fullscreen>
    <div class="row o column">
      <div class="col-5" style="overflow: hidden; max-width: 100vw">
        <div class="text-center text-h5 q-mt-sm">
          <span v-if="eventAdd.getPage == 0">Temel Bilgiler</span>
          <span v-if="eventAdd.getPage == 1">Zaman&Tarih</span>
          <span v-if="eventAdd.getPage == 2">Konum&Fiyat</span>
          <span v-if="eventAdd.getPage == 3">Görsel</span>
        </div>
        <div class="row justify-center content-center items-center q-mt-sm">
          <comp-wheel />
        </div>
      </div>
      <div class="col-6">
        <router-view />
      </div>
      <div class="col-1 full-width text-center row justify-center">
        <q-btn
          class="bg-primary q-ma-auto"
          rounded
          style="width: 50%; height: 75%"
          @click="changePage"
        >
          Devam
        </q-btn>
        {{ eventAdd.getPage }}
      </div>
    </div>
  </popup-comp>
</template>
<script>
import popupComp from "@/components/general/popupComp.vue";
import compWheel from "@/components/eventAdd/compWheel.vue";
import { eventAdd } from "@/store/eventAdd";
export default {
  components: {
    compWheel,
    popupComp,
  },
  data() {
    return {
      eventAdd: eventAdd(),
    };
  },
  methods: {
    setPage: function () {
      const p = this.$route.params.id;
      if (p == "date") this.eventAdd.setPage(1);
      else if (p == "price") this.eventAdd.setPage(2);
      else if (p == "img") this.eventAdd.setPage(3);
      else this.eventAdd.setPage(0);
    },
    changePage: function () {
      console.log(this.eventAdd.page, this.eventAdd.pageBtn);
      this.eventAdd.page = this.eventAdd.page + 1;
      this.eventAdd.pageBtn = this.eventAdd.page;
      console.log(this.eventAdd.page, this.eventAdd.pageBtn);
    },
  },
  mounted() {
    this.setPage();
  },
};
</script>
<style scoped>
.o {
  height: 100%;
}
</style>

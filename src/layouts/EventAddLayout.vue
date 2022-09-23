<template>
  <popup-comp fullscreen>
    <back-button />
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
        <q-scroll-area class="fit">
          <router-view />
        </q-scroll-area>
      </div>
      <div class="col-1 full-width text-center row justify-center">
        <q-btn
          rounded
          class="bg-primary q-ma-auto"
          @click="clickEvent"
          style="width: 50%; height: 75%"
          :disable="onProgress"
          :loading="onProgress"
        >
          <template v-slot:default>
            <q-icon v-if="eventAdd.getPage == 3" name="add" />
            <div>{{ eventAdd.getPage == 3 ? "Etkinlik Ekle" : "Devam" }}</div>
          </template>
          <template v-slot:loading>
            <q-spinner-facebook />
            <div>{{ eventAdd.getPage == 3 ? "Etkinlik Ekle" : "Devam" }}</div>
          </template>
        </q-btn>
      </div>
    </div>
  </popup-comp>
</template>
<script>
import popupComp from "@/components/general/popupComp.vue";
import compWheel from "@/components/eventAdd/compWheel.vue";
import backButton from "@/components/general/backButton.vue";
import { eventAdd } from "@/store/eventAdd";
import { eventCheck } from "@/services/core/main";
import { addEventFunction } from "@/services/firebase/event";
import { user } from "@/store/user";
export default {
  components: {
    compWheel,
    popupComp,
    backButton,
  },
  data() {
    return {
      user: user(),
      eventAdd: eventAdd(),
      onProgress: false,
    };
  },
  methods: {
    setPage: function () {
      const p = this.$route.params.id;
      if (p == "time") this.eventAdd.setPage(1);
      else if (p == "location") this.eventAdd.setPage(2);
      else if (p == "image") this.eventAdd.setPage(3);
      else this.eventAdd.setPage(0);
    },
    changePage: function () {
      this.eventAdd.page = this.eventAdd.page + 1;
      this.eventAdd.pageBtn = this.eventAdd.page;
    },
    createEvent: function () {
      this.onProgress = true;
      eventCheck(this.eventAdd.event).then((check) => {
        if (check)
          addEventFunction(
            this.user.ID,
            this.eventAdd.event,
            this.eventAdd.images,
            this.user.userName
          ).then((res) => {
            if (res) {
              this.eventAdd.cleanEvent();
              this.$router.push("/app/main/events/");
            } else alert("Some Problems");
            this.onProgress = false;
          });
        else this.onProgress = false;
      });
    },
    clickEvent() {
      if (this.eventAdd.getPage == 3) {
        this.createEvent();
      } else {
        this.changePage();
      }
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

<template>
  <popup-comp fullscreen>
    <back-button />
    <back-button />
    <div class="row o column fit">
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
            <div
              class="row no-wrap"
              style="
                text-overflow: ellipsis;
                overflow: hidden;
                white-space: nowrap;
              "
            >
              <q-icon v-if="eventAdd.getPage == 3" name="add" />
              {{ eventAdd.getPage == 3 ? "Etkinlik Güncelle" : "Devam" }}
            </div>
          </template>
          <template v-slot:loading>
            <div
              class="row no-wrap"
              style="
                text-overflow: ellipsis;
                overflow: hidden;
                white-space: nowrap;
              "
            >
              <q-spinner-facebook />
              {{ eventAdd.getPage == 3 ? "Etkinlik Güncelle" : "Devam" }}
            </div>
          </template>
        </q-btn>
      </div>
    </div>
  </popup-comp>
</template>
<script>
import popupComp from "@/components/general/popupComp.vue";
import backButton from "@/components/general/backButton.vue";
import { eventAdd } from "@/store/eventAdd";
import compWheel from "@/components/eventAdd/compWheel.vue";
import { getEvent, updateEventFunction } from "@/services/firebase/event";
import { eventCheck } from "@/services/core/main";
export default {
  components: {
    popupComp,
    backButton,
    compWheel,
  },
  data() {
    return {
      eventAdd: eventAdd(),
      onProgress: false,
    };
  },
  methods: {
    updateEvent: function () {
      this.onProgress = true;
      eventCheck(this.eventAdd.event).then((check) => {
        if (check)
          updateEventFunction(this.eventAdd.event, this.$route.params.id).then(
            (res) => {
              if (res) {
                this.eventAdd.cleanEvent();
                this.$router.back();
              } else alert("Some Problems");
              this.onProgress = false;
            }
          );
        else this.onProgress = false;
      });
    },
    changePage: function () {
      this.eventAdd.page = this.eventAdd.page + 1;
      this.eventAdd.pageBtn = this.eventAdd.page;
    },
    clickEvent: function () {
      if (this.eventAdd.getPage == 3) {
        this.updateEvent();
      } else {
        this.changePage();
      }
    },
    getEvent: function () {
      if (this.$route.params.id)
        getEvent(this.$route.params.id).then((res) => {
          this.eventAdd.setEvent(res.data());
          console.log(res.data());
        });
      else this.$router.back();
    },
  },
  mounted() {
    this.getEvent();
  },
};
</script>

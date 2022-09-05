<template>
  <q-dialog
    v-model="dialog"
    persistent
    :maximized="true"
    transition-show="slide-up"
    transition-hide="slide-down"
  >
    <div class="fit bg-secondary column noflow">
      <go-back-btn
        :beforeGoBack="() => (page == -1 ? (dialog = false) : 0)"
        :goBackFunc="goBack"
      />
      <div class="column no-wrap col-6 text-center">
        <div class="col-2">
          <q-carousel
            :model-value="`${page}`"
            style="height: 100%"
            transition-prev="slide-right"
            transition-next="slide-left"
            animated
            class="co bg-secondary"
          >
            <q-carousel-slide name="0" class="column no-wrap flex-center">
              <h5 class="q-mt-md">Temel Bilgiler</h5>
            </q-carousel-slide>
            <q-carousel-slide name="1" class="column no-wrap flex-center">
              <h5 class="q-mt-md">Zaman&Tarih</h5>
            </q-carousel-slide>
            <q-carousel-slide name="2" class="column no-wrap flex-center">
              <h5 class="q-mt-md">Konum&Fiyat</h5>
            </q-carousel-slide>
            <q-carousel-slide name="3" class="column no-wrap flex-center">
              <h5 class="q-mt-md">Görsel</h5>
            </q-carousel-slide>
          </q-carousel>
        </div>
        <div class="col-10 reg full-width">
          <event-add-wheel :page="page" />
        </div>
      </div>
      <div class="col-5">
        <q-scroll-area class="fit">
          <router-view :page="page" :event="eObj" />
        </q-scroll-area>
      </div>
      <div class="col-1 row wrap justify-center items-center content-center">
        <q-btn v-if="page != 3" class="btn" @click="goNext">
          <div>Devam</div>
        </q-btn>
        <q-btn v-else :disabed="dis" class="btn" @click="addEvent">
          <div>Kaydol</div>
        </q-btn>
      </div>
    </div>
  </q-dialog>
</template>

<script>
import { eventCheck } from "@/services/core/main";
import goBackBtn from "../components/backButtonTopLeft.vue";
import eventAddWheel from "../components/compEventAddWheel.vue";
import { addEventFunction } from "@/services/firebase/main";
import { user } from "@/store/user";
export default {
  components: {
    goBackBtn,
    eventAddWheel,
  },
  data() {
    return {
      user: user(),
      dialog: true,
      imgs: [],
      page: 0,
      dis: false,
      eObj: {
        name: "",
        desc: "",
        tags: {
          spor: false,
          artt: false,
          educ: false,
          musi: false,
          meet: false,
          part: false,
        },
        startDate: {
          date: "",
          time: "",
        },
        endDate: {
          date: "",
          time: "",
        },
        limit: 0,
        apro: false,
        type: false,
        app: { text: "", coord: [0, 0] },
        url: "",
        price: 0,
      },
    };
  },
  methods: {
    goNext: function () {
      this.page += 1;
    },
    goBack: function () {
      this.page -= 1;
      if (this.page == -1) this.$router.back();
    },
    addEventFunction: function () {
      this.dis = true;
      if (!this.limit) this.eObj.limit = 0;
      addEventFunction(this.user.ID, this.eObj, this.imgs, this.user.name).then(
        (res) => {
          if (res) this.$router.push("/app/main/events/");
          else alert("Some Problems");
          this.dis = false;
        }
      );
    },
    addEvent: function () {
      eventCheck(this.eObj).then((res) => {
        if (res) this.addEventFunction();
      });
    },
  },
  provide() {
    return {
      setPage: (page) => (this.page = page),
      updateEvent: (key, value) => (this.eObj[key] = value),
      updateEventInner: (key, key2, value) => (this.eObj[key][key2] = value),
      setImages: (imgs) => (this.imgs = imgs),
    };
  },
  mounted() {
    this.dialog = true;
  },
};
</script>

<style scoped>
.reg {
  margin: auto;
}
.btn {
  background: #ff7f00;
  border-radius: 20px;
  width: 75vw;
  margin: auto;
}
.noflow {
  height: 100%;
  width: 100%;
  overflow: hidden;
}
</style>

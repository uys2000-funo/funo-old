<template>
  <q-dialog persistent v-model="dialog" style="width: 90vw; height: 90vh">
    <div style="position: relative; width: 100%; height: 100%">
      <div class="absolute-bottom full-width flex justify-center t w">
        <q-btn class="bg-primary text-white" label="seç" @click="setLocation" />
      </div>
      <yandex-map ref="ymap" class="fit" :settings="settings" :coords="coords__" zoom="10.6" @click="updateLocation">
        <ymap-marker marker-id="1" :coords="coords__" :icon="markerIcon" :marker-events="['click']" />
      </yandex-map>
    </div>
  </q-dialog>
</template>
<script>
import { yandexMap, ymapMarker } from "vue-yandex-maps";
import { useLocation } from "@/store/location";
export default {
  name: "LoacitonChooseTest",
  components: { yandexMap, ymapMarker },
  props: ["coords"],
  emits: ["setCord", "endFunc"],
  data() {
    return {
      dialog: true,
      locationStore: useLocation(),
      settings: {
        apiKey: "cdbd6f55-bb30-4404-a6bb-215a26c76d72",
        lang: "tr_TR",
        coordorder: "latlong",
        enterprise: false,
        version: "2.1",
      },
      markerIcon: {
        layout: "default#imageWithContent",
        imageHref: '',
        imageSize: [40, 40],
        imageOffset: [-20, -30],
        contentOffset: [0, 0],
      },
      coords__: [0, 0],
    };
  },
  methods: {
    updateLocation(e) {
      if (e.get)
        this.coords__ = e.get("coords");
    },
    setLocation() {
      this.$emit("setCord", this.coords__);
      this.dialog = false;
      setTimeout(() => {
        this.$emit("endFunc");
      }, 200);
    },
  },
  mounted() {
    if (this.coords != undefined) this.coords__ = this.coords;
    else this.coords__ = this.locationStore.getCoordinates;
    console.log(this.coords__, this.locationStore.getCoordinates);
  },
};
</script>
<style lang="scss" scoped>
.w {
  height: 20vh;
  min-height: 100px;
}

.w .q-btn {
  z-index: 100;
  width: 50%;
  height: 50px;
}
</style>

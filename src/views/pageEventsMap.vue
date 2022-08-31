<template>
  <yandex-map
    ref="ymap"
    class="fit"
    :settings="settings"
    :coords="cords[0]"
    zoom="10.6"
  >
    <ymap-marker
      v-for="cord in cords"
      :key="cord"
      marker-id="1"
      :coords="cord"
      :marker-events="['click']"
    />
  </yandex-map>
</template>

<script>
import { yandexMap, ymapMarker } from "vue-yandex-maps";
import { location } from "@/store/location";
export default {
  name: "MapComponent",
  components: { yandexMap, ymapMarker },
  data() {
    return {
      location: location(),
      settings: {
        apiKey: "cdbd6f55-bb30-4404-a6bb-215a26c76d72",
        lang: "tr_TR",
        coordorder: "latlong",
        enterprise: false,
        version: "2.1",
      },
      cords: [
        [54.82896654088406, 39.831893822753904],
        [55.76, 37.56],
        [55.8, 37.3],
        [55.8, 37.4],
        [55.7, 37.3],
        [55.7, 37.4],
      ],
    };
  },
  mounted() {
    console.log(this.$refs.ymap);
  },
};
</script>

<style>
.ymap-container {
  width: 80%;
  height: 200px;
  margin: 0 auto;
}
</style>

<template>
  <yandex-map class="fit" :settings="settings" :coords="[38.561785, -121.449756]" zoom="10.6">
    <ymap-marker
      marker-id="123"
      :coords="[38.561785, -121.449756]"
      :marker-events="['click']"
    ></ymap-marker>
  </yandex-map>
</template>

<script>
import { yandexMap, ymapMarker } from "vue-yandex-maps";

export default {
  name: "MapComponent",
  components: { yandexMap, ymapMarker },

  setup() {
    return {
      settings: {
        apiKey: "cdbd6f55-bb30-4404-a6bb-215a26c76d72",
        lang: "tr_TR",
        coordorder: "latlong",
        enterprise: false,
        version: "2.1",
      },
      coords: [38.561785, -121.449756],
    };
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

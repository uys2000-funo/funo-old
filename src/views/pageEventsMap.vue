<template>
  <yandex-map ref="ymap" class="fit" :settings="settings" :coords="coords__" zoom="10.6"
    v-if="events.eventFlowList.length > 0">
    <template v-for="eID in events.eventFlowList" :key="eID">
      <ymap-marker v-if="eventDict[eID]" marker-id="1" :coords="eventDict[eID].app?.coord" @click="clickEvent(eID)" />
    </template>
  </yandex-map>
</template>

<script>
import { yandexMap, ymapMarker } from "vue-yandex-maps";
import { location } from "@/store/location";
import { events } from "@/store/events";
export default {
  name: "MapComponent",
  components: { yandexMap, ymapMarker },
  data() {
    return {
      location: location(),
      coords__: [],
      events: events(),
      eventDict: events().eventDict,
      eventFlowList: events().eventFlowList,
      settings: {
        apiKey: "cdbd6f55-bb30-4404-a6bb-215a26c76d72",
        lang: "tr_TR",
        coordorder: "latlong",
        enterprise: false,
        version: "2.1",
      },
    };
  }, methods: {
    clickEvent: function (eID) {
      this.$router.push({ path: `/app/main/events/event/${eID}` })
    }
  },
  mounted() {
    this.coords__ = this.location.getPosition;
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

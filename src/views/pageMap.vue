<template>
    <yandex-map ref="ymap" class="fit" :settings="settings" :coords="coords__" zoom="10.6">
        <template v-for="(eID, index) in eventsStore.lists[this.list]" :key="index">
            <comp-point :eID="eID" :eData="eventsStore.dict[eID]?.data" />
        </template>
    </yandex-map>
</template>
  
<script>
import { yandexMap } from "vue-yandex-maps";
import { useLocation } from "@/store/location";
import { useEvents } from "@/store/event";
import compPoint from "@/components/Map/compPoint.vue"
export default {
    name: "MapComponent",
    components: { yandexMap, compPoint },
    data() {
        return {
            locationStore: useLocation(),
            eventsStore: useEvents(),
            coords__: [],
            settings: {
                apiKey: "cdbd6f55-bb30-4404-a6bb-215a26c76d72",
                lang: "tr_TR",
                coordorder: "latlong",
                enterprise: false,
                version: "2.1",
            },
            list: "EventFlow",
        };
    },
    methods: {
        clickEvent: function (eID) {
            this.$router.push({ path: `/app/main/events/event/${eID}` })
        }
    },
    mounted() {
        this.coords__ = this.locationStore.getCoordinates;
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
  
<template>
    <div class="fit relative-position">
        <yandex-map ref="ymap" class="fit" :settings="settings" :coords="coords__" zoom="10.6">
            <template v-for="(eID, index) in eventsStore.lists[this.list]" :key="index">
                <comp-point :eID="eID" :eData="eventsStore.dict[eID]?.data" />
            </template>
        </yandex-map>
        <div class="absolute absolute-bottom q-mb-xl" style="z-index=1000">
            <q-btn dense class="q-ml-sm bg-primary" no-caps @click="onLoad">Daha Fazla Etkinlik</q-btn>
        </div>
    </div>
</template>
  
<script>
import { yandexMap } from "vue-yandex-maps";
import { useLocation } from "@/store/location";
import { useEvents } from "@/store/event";
import eventArgs from "@/services/app/event.json"
import compPoint from "@/components/Map/compPoint.vue"
import { getEvents } from "@/services/app/event";
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
        },
        createMethodArgs() {
            this.eventsStore.filterArgs = [
                eventArgs.EventFlow.default
            ]
            if (this.eventsStore.tags.length > 0) {
                eventArgs.EventFlow.tags.equality = this.eventsStore.tags
                this.eventsStore.filterArgs.push(eventArgs.EventFlow.tags)
            }

            if (this.eventsStore.filter.ownerType != "all") {
                eventArgs.EventFlow.ownerType.equality = this.eventsStore.filter.ownerType == "true"
                this.eventsStore.filterArgs.push(eventArgs.EventFlow.ownerType)
            }

            if (this.eventsStore.filter.hasApproval != "all") {
                eventArgs.EventFlow.hasApproval.equality = this.eventsStore.filter.hasApproval == "true"
                this.eventsStore.filterArgs.push(eventArgs.EventFlow.hasApproval)
            }

            if (this.eventsStore.filter.hasUserLimit != "all")
                this.eventsStore.filterArgs.push(eventArgs.EventFlow.hasUserLimit)

            if (this.eventsStore.filter.hasPrice != "all")
                this.eventsStore.filterArgs.push(eventArgs.EventFlow.hasPrice)

            if (this.eventsStore.filter.isOnline == "false") {
                eventArgs.EventFlow.location.column = "location.city"
                eventArgs.EventFlow.location.equality = this.locationStore.city
                this.eventsStore.filterArgs.push(eventArgs.EventFlow.location)
            }

            eventArgs.EventFlow.isOnline.equality = this.eventsStore.filter.isOnline == "true"
            this.eventsStore.filterArgs.push(eventArgs.EventFlow.isOnline)

        },
        onLoad() {
            this.createMethodArgs();

            const startPoint = this.eventsStore.getLast(this.list)?.data.date.end

            if (this.eventsStore.filter.isOnline == "true") return true;
            else
                getEvents(startPoint, this.eventsStore.filterArgs).then(documents => {
                    this.eventsStore.addToMany(this.list, documents)
                }).catch(() => { })
        },
    },
    errorCaptured() {
        //if get errors refreshes page
        this.$router.go()
    },
    mounted() {
        this.$refs.ymap.$options.beforeUnmount = function () {
            this.myMap && this.myMap.geoObjects && this.myMap.geoObjects.removeAll();
        }
        this.coords__ = this.locationStore.getCoordinates;
        if (this.eventsStore.lists[this.list]?.length == 0) this.onLoad();
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
  
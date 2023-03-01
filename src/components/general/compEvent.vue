<template>
    <div class="event full-width text-black q-mb-md">
        <comp-header :event="event" :icon="icon" :openSettings="openSettings" />
        <q-carousel keep-alive v-model="slide" transition-prev="slide-right" transition-next="slide-left" animated class="bg-secondary"
            style="height: min-content;">
            <q-carousel-slide name="event" class="full-width" style="height: min-content;">
                <comp-body :event="event" />
            </q-carousel-slide>
            <q-carousel-slide name="settings" class="full-width overflow-hidden" style="height: min-content;">
                <comp-settings :event="event" />
            </q-carousel-slide>
        </q-carousel>
        <comp-footer :event="event" />
    </div>
</template>
<script>
import compHeader from './compEvent/compHeader.vue';
import compBody from './compEvent/compBody.vue';
import compSettings from './compEvent/compSettings.vue';
import compFooter from './compEvent/compFooter.vue';
export default {
    components: { compHeader, compBody, compSettings, compFooter },
    props: ["event"],
    data() {
        return {
            slide: "event"
        }
    },
    methods: {
        openSettings() {
            if (this.slide == "event")
                this.slide = "settings"
            else this.slide = "event"
        }
    },
    computed: {
        icon() {
            return this.slide == "event" ?  "more_vert" : "celebration"
        }
    }
}
</script>
<style>
.event {
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25), 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 10px;
}
</style>
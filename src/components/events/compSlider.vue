<template>
    <div class="full-width">
        <div class="row justify-between" style="margin: 0 16px; margin-bottom: 16px;">
            <span style="text-transform: uppercase; font-size: 14px; font-weight: 600px;">
                <slot />
            </span>
            <span class="text-primary" style="font-weight: 600; font-size: 14px;">
                Tümünü gör
            </span>
        </div>
        <div style="overflow-x: auto; padding: 0 16px;">
            <div class="row no-wrap" style="gap:8px">
                <template v-for="(eID, index) in eventsStore.lists[target]" :key="index">
                    <comp-slider-event :eID="eID" :data="eventsStore.dict[eID][target].data" />
                </template>
            </div>
        </div>
    </div>
</template>
<script>
import { useEvents } from "@/store/event";
import compSliderEvent from "./compSliderEvent.vue"

export default {
    components: { compSliderEvent },
    props: {
        target: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            eventsStore: useEvents()
        }
    }

}
</script>
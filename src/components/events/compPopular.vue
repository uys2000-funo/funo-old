<template>
    <div class="full-width shadow-box">
        <div class="text-h6 q-pl-sm shadow-box">
            Takım Yıldızları
        </div>
        <div style="overflow-x: auto;">
            <div class="row no-wrap">
                <template v-for="(eID, index) in eventsStore.lists.popular" :key="index">
                    <comp-popular-event :eID="eID" :data="eventsStore.dict[eID].popular.data" />
                </template>
            </div>
        </div>
    </div>
</template>
<script>
import { useEvents } from '@/store/event';
import compPopularEvent from "./compPopularEvent.vue"

export default {
    components: { compPopularEvent },
    data() {
        return {
            eventsStore: useEvents()
        }
    }
}
</script>
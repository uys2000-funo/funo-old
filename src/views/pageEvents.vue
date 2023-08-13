<template>
    <div class="fit column no-wrap" style="gap: 24px; overflow-y: auto;">
        <comp-slider target="popular">
            Populer Etkinlikler
        </comp-slider>
        <comp-slider target="popular">
            Çevrendekiler
        </comp-slider>
        <comp-slider target="popular">
            Sana Özel
        </comp-slider>
    </div>
</template>
<script>
import compSlider from '@/components/events/compSlider.vue';
import { useEvents } from '@/store/event';
export default {
    components: { compSlider },
    data() {
        return {
            eventsStore: useEvents()
        }
    },
    mounted() {

    }
}
</script>
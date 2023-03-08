<template>
    <q-carousel :model-value="slide" transition-prev="slide-right" transition-next="slide-left" animated
        class="fit bg-secondary">
        <q-carousel-slide name="all" class="q-pa-none">
            <comp-notifications />
        </q-carousel-slide>
        <q-carousel-slide name="notification" class="q-pa-none">
            <comp-notification />
        </q-carousel-slide>
    </q-carousel>
</template>
<script>
import compNotifications from './notifications/compNotifications.vue';
import compNotification from './notifications/compNotification.vue';
export default {
    components: { compNotifications, compNotification },
    data() {
        return {
            slide: "all"
        }
    },
    methods: {
        changeSlide() {
            this.slide = this.slide === "all" ? "notification" : "all"
        },
    },
    provide() {
        return {
            changeSlide: this.changeSlide
        }
    }
}
</script>
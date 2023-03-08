<template>
    <q-carousel :model-value="tab" transition-prev="slide-right" transition-next="slide-left" animated
        class="fit bg-secondary">
        <q-carousel-slide name="notifications" class="fit q-px-none">
            <comp-notifications />
        </q-carousel-slide>
        <q-carousel-slide name="announcements" class="fit q-px-none">
            <comp-announcements />
        </q-carousel-slide>
    </q-carousel>
</template>
<script>
import compNotifications from '@/components/notifications/compNotifications.vue';
import compAnnouncements from '@/components/notifications/compAnnouncements.vue';
export default {
    components: { compNotifications, compAnnouncements },
    props: ["tab"],
    data() {
        return {
            slide: "all",
        }
    }
}
</script>
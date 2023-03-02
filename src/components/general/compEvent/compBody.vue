<template>
    <div class="q-px-sm rounded-borders" style="height:35vw">
        <div class="image fit rounded-borders relative" :style="`background-image: url(${srcImg});`">
            <div class="full-width row no-wrap justify-end">
                <q-icon size="sm" class="q-mr-sm q-mt-sm" v-if="event.tags.main.includes('art')">
                    <icon-art />
                </q-icon>
                <q-icon size="sm" class="q-mr-sm q-mt-sm" v-if="event.tags.main.includes('education')">
                    <icon-education />
                </q-icon>
                <q-icon size="sm" class="q-mr-sm q-mt-sm" v-if="event.tags.main.includes('meeting')">
                    <icon-meeting />
                </q-icon>
                <q-icon size="sm" class="q-mr-sm q-mt-sm" v-if="event.tags.main.includes('music')">
                    <icon-music />
                </q-icon>
                <q-icon size="sm" class="q-mr-sm q-mt-sm" v-if="event.tags.main.includes('party')">
                    <icon-party />
                </q-icon>
                <q-icon size="sm" class="q-mr-sm q-mt-sm" v-if="event.tags.main.includes('sport')">
                    <icon-sport />
                </q-icon>
            </div>
        </div>
    </div>
</template>
<script>
import { getEventImage } from "@/services/app/event.js";
import iconArt from '@/icons/tags/iconArt.vue';
import iconEducation from '@/icons/tags/iconEducation.vue';
import iconMeeting from '@/icons/tags/iconMeeting.vue';
import iconMusic from '@/icons/tags/iconMusic.vue';
import iconParty from '@/icons/tags/iconParty.vue';
import iconSport from '@/icons/tags/iconSport.vue';
export default {
    components: { iconArt, iconEducation, iconMeeting, iconMusic, iconParty, iconSport },
    props: ["event"],
    data() {
        return {
            srcImg: "https://mehmetuysal.dev/_nuxt/logo.f6c5d2fc.jpg"
        }
    },
    methods: {
        getImage() {
            if (this.event.counters.image != 0)
                getEventImage(this.event.eID)
                    .then(srcImg => this.srcImg = srcImg)
        }
    },
    mounted() {
        this.getImage()
    }
}
</script>
<style>
.image {
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
}
</style>
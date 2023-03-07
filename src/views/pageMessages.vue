<template>
    <q-carousel v-model="slide" transition-prev="slide-right" transition-next="slide-left" animated
        class="fit bg-secondary">
        <q-carousel-slide name="all" class="fit q-pt-md">
            <comp-messages :updateProps="updateProps" />
        </q-carousel-slide>
        <q-carousel-slide name="message" class="fit">
            <comp-message :rPhotoURL="rPhotoURL" :rID="rID" :updateProps="updateProps" />
        </q-carousel-slide>

    </q-carousel>
</template>
<script>
import compMessages from '@/components/messages/compMessages.vue';
import compMessage from "@/components/messages/compMessage.vue"
export default {
    components: { compMessages, compMessage },
    data() {
        return {
            slide: "all",
            rPhotoURL: "",
            rID: "",
        }
    },
    methods: {
        updateProps(slide, rID, rPhotoURL) {
            if (rID) this.rID = rID;
            if (rPhotoURL) this.rPhotoURL = rPhotoURL;
            this.slide = slide
        },
    }
}
</script>
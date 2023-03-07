<template>
    <div class="fit column no-wrap overflow-hidden">
        <q-carousel v-model="slide" vertical transition-prev="slide-up" transition-next="slide-up" animated
            control-color="white" class="bg-secondary fit  overflow-hidden">
            <q-carousel-slide name="event" class="fit ">
                <compEvent />
            </q-carousel-slide>
            <q-carousel-slide name="comment" class="fit overflow-hidden">
                <comp-comments />
            </q-carousel-slide>
        </q-carousel>
        <q-btn dense flat class="full-width text-center" @click="changePage">
            {{ this.slide === "event" ? "Yorumlar" : "Detaylar" }}
            <q-avatar>
                <q-icon name="expand_more" />
            </q-avatar>
        </q-btn>
    </div>
</template>
<script>
import compEvent from "@/components/event/compEvent.vue"
import compComments from "@/components/event/compComments.vue";
export default {
    components: { compEvent, compComments },
    data() {
        return {
            slide: "event"
        }
    },
    methods: {
        changePage() {
            this.slide = this.slide === "event" ? "comment" : "event"
        }
    }

}
</script>
<style scoped>
.bottom-center {
    position: absolute;
    bottom: 0px;
    left: 50%;
    transform: translate(-50%, 0);
}
</style>
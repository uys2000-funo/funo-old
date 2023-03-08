<template>
    <q-carousel :model-value="p" :transition-prev="animation" :transition-next="animation" animated infinite
        class="fit bg-secondary text-black" keep-alive>
        <q-carousel-slide :name="0" class="column no-wrap flex-start" style="padding: 0px;">
            <comp-user />
        </q-carousel-slide>
        <q-carousel-slide :name="1" class="column no-wrap flex-start" style="padding: 0px;">
            <comp-user-event />
        </q-carousel-slide>
        <q-carousel-slide :name="2" class="column no-wrap flex-start" style="padding: 0px;">
            <comp-event />
        </q-carousel-slide>
        <q-carousel-slide :name="3" class="column no-wrap flex-start" style="padding: 0px;">
            <comp-atmosphere />
        </q-carousel-slide>
        <q-carousel-slide :name="4" class="column no-wrap flex-start" style="padding: 0px;">
            <comp-search />
        </q-carousel-slide>
    </q-carousel>
</template>
<script>
import compUserEvent from '@/components/discover/compUserEvent.vue';
import compAtmosphere from '@/components/discover/compAtmosphere.vue';
import compEvent from '@/components/discover/compEvent.vue';
import compUser from '@/components/discover/compUser.vue';
import compSearch from '@/components/discover/compSearch.vue';
export default {
    components: {
        compUserEvent, compAtmosphere, compEvent, compUser, compSearch
    },
    props: ["pageNumber", "setPage"],
    data() {
        return {
            animation: "slide-left",
        };
    },
    computed: {
        p() {
            const r = (this.pageNumber + 2) % 5
            return r < 0 ? r + 5 : r
        }
    },
    watch: {
        pageNumber(nVal, oVal) {
            if (nVal > oVal) this.animation = "slide-left";
            else if (nVal < oVal) this.animation = "slide-right";
        },
    },
};
</script>
  
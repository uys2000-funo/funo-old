<template>
    <q-carousel :model-value="pageNumber" :transition-prev="animation" :transition-next="animation" animated infinite
        class="fit bg-secondary text-black" keep-alive>
        <q-carousel-slide :name="0" class="column no-wrap flex-start">
            <comp-general :page-number="pageNumber" :setPage="setPage" />
        </q-carousel-slide>
        <q-carousel-slide :name="1" class="column no-wrap flex-start">
            <comp-date :page-number="pageNumber" :setPage="setPage" />
        </q-carousel-slide>
        <q-carousel-slide :name="2" class="column no-wrap flex-start">
            <comp-location :page-number="pageNumber" :setPage="setPage" />
        </q-carousel-slide>
        <q-carousel-slide :name="3" class="column no-wrap flex-start">
            <comp-images :page-number="pageNumber" :setPage="setPage" :images="images" />
        </q-carousel-slide>
    </q-carousel>
</template>
<script>
import compGeneral from '@/components/create/compGeneral.vue';
import compDate from '@/components/create/compDateCondition.vue';
import compLocation from '@/components/create/compLocationPrice.vue';
import compImages from '@/components/create/compImages.vue';
export default {
    components: { compGeneral, compDate, compLocation, compImages },
    props: ["pageNumber", "setPage", "images"],
    data() {
        return {
            animation: "slide-left",
        };
    },
    watch: {
        pageNumber(nVal, oVal) {
            if (nVal > oVal) this.animation = "slide-left";
            else if (nVal < oVal) this.animation = "slide-right";
        },
    },
};
</script>
  
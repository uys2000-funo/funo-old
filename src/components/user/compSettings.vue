<template>
    <q-carousel v-model="slide" transition-prev="slide-right" transition-next="slide-left" animated class="fit bg-secondary"
        style="height: 300px;">
        <q-carousel-slide name="list" class="column no-wrap flex-center">
            <comp-list :setPage="setPage" />
        </q-carousel-slide>
        <q-carousel-slide name="password" class="column no-wrap flex-center">
            <comp-password :setPage="setPage" />
        </q-carousel-slide>
        <q-carousel-slide name="about" class="column no-wrap flex-center">
            <comp-about :setPage="setPage" />
        </q-carousel-slide>
        <q-carousel-slide name="help" class="column no-wrap flex-center">
            <comp-help :setPage="setPage" />
        </q-carousel-slide>
    </q-carousel>
</template>
<script>
import compList from './settings/compList.vue';
import compPassword from './settings/compPassword.vue';
import compAbout from './settings/compAbout.vue';
import compHelp from './settings/compHelp.vue';
export default {
    components: { compList, compPassword, compAbout, compHelp },
    data() {
        return {
            slide: "list"
        }
    },
    methods: {
        setPage(value) {
            this.slide = value;
        }
    }
}
</script>
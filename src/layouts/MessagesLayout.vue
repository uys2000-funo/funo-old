<template>
    <router-view v-slot="{ Component }">
        <comp-popup ref="pop" fullscreen bg="primary">
            <div class="fit column no-wrap items-center">
                <div class="row justify-center align-center items-center text-h5 text-secondary " style="height: 10vh;">
                    <back-button color="secondary" :beforeGoBack="beforeBackFunction" />
                    Mesajlar
                </div>
                <div class="fit bg-secondary overflow-hidden round-top" style="flex-grow: 1;">
                    <component :is="Component" />
                </div>
            </div>
        </comp-popup>
    </router-view>
</template>

<script>
import compPopup from '@/components/general/compPopup.vue';
import backButton from '@/components/general/backButton.vue';
export default {
    components: { compPopup, backButton },
    methods: {
        beforeBackFunction() {
            this.$refs.pop.closePopup()
        },
    }
}
</script>
<style scoped>
.round-top {
    border-top-right-radius: 50px;
    border-top-left-radius: 50px;
}
</style>
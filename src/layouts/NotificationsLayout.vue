<template>
    <router-view v-slot="{ Component }">
        <comp-popup fullscreen bg="primary">
            <div class="fit column no-wrap items-center">
                <div class="full-width row justify-center align-center items-center text-h4 text-secondary q-mt-sm "
                    style="height: 10vh;">
                    <back-button color="secondary" />
                    Bildirimler
                </div>
                <div class="text-h4">
                    <q-tabs flat v-model="tab" class="text-white" indicator-color="purple">
                        <q-tab name="notifications" label="Bildirimler" :ripple="false" />
                        <q-tab name="announcements" label="Duyurular" :ripple="false" />
                    </q-tabs>
                </div>
                <div class="fit bg-secondary overflow-hidden round-top text-black" style="flex-grow: 1;">
                    <component :is="Component" :tab="tab" />
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
    data() {
        return {
            tab: 'notifications'
        }
    }
}
</script>
<style scoped>
.round-top {
    border-top-right-radius: 50px;
    border-top-left-radius: 50px;
}
</style>
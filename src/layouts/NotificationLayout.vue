<template>
    <popup-comp bg="primary" :fullscreen="true" ref="popup">
        <div class="flex column no-wrap" style="width: 100vw; height: 100vh;">
            <div class="q-mt-md relative-position full-width">
                <backButton :beforeGoBack="beforeGoBackFunction"></backButton>
                <div class="flex justify-center content-center text-weight-bold" style="height:9vh;">
                    <span class="text-secondary text-h5">
                        Bildirimler
                    </span>
                </div>
                <div>
                    <q-tabs v-model="page" class="bg-primary text-white q-mb-sm">
                        <q-tab name="notifications" label="Bildirimler" :ripple="false" />
                        <q-tab name="aprovals" label="Onaylar" :ripple="false"/>
                        <q-tab name="announcements" label="Duyurular" :ripple="false"/>
                    </q-tabs>
                </div>
            </div>
            <div class="fit flex bg-secondary not">
                <q-scroll-area class="fit" style="border-radius: 15px;">
                    <router-view :page="page"/>
                </q-scroll-area>
            </div>
        </div>
    </popup-comp>
</template>
<script>
import popupComp from '@/components/general/popupComp.vue';
import backButton from '@/components/general/backButton.vue';
export default {
    components: { popupComp, backButton },
    data() {
        return {
            time: 10,
            page: "notifications"
        }
    },
    methods: {
        beforeGoBackFunction() {
            this.$refs.popup.popup = false;
        }
    },
    mounted() {

    }
}
</script>
<style>
.not {
    border-radius: 50px 50px 0px 0px;
    padding: 10px;
}
</style>
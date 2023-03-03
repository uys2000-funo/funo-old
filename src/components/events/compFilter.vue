<template>
    <div class="bg-secondary row no-wrap justify-between shadow-box q-px-sm">
        <div class="text-h6">
            Yörünge
        </div>
        <q-btn flat round dense class="bg-white" @click="() => isOpen = !isOpen">
            <q-icon name="filter_alt" />
        </q-btn>
    </div>
    <q-dialog :model-value="isOpen" position="bottom" @before-hide="cancelFilter" @before-show="setupFilter">
        <q-card class="full-width">
            <q-card-section>
                <div class="text-subtitle1 row justify-between items-center">
                    Etkinlik Sahibi
                    <q-btn no-caps dense flat @click="updateFilter">Filtrele</q-btn>
                </div>
                <q-tabs no-caps dense v-model="eventsStore.filter.ownerType" class="" indicator-color="primary"
                    active-color="negative">
                    <q-tab name="all">
                        Hepsi
                    </q-tab>
                    <q-tab name="person">
                        Bireysel
                    </q-tab>
                    <q-tab name="company">
                        Firma
                    </q-tab>
                </q-tabs>
                <div class="text-subtitle1 q-mt-md">
                    Ön Onay
                </div>
                <q-tabs no-caps dense v-model="eventsStore.filter.hasApprovall" class="" indicator-color="primary"
                    active-color="negative">
                    <q-tab name="all">
                        Hepsi
                    </q-tab>
                    <q-tab name="approval">
                        Onaylı
                    </q-tab>
                    <q-tab name="company">
                        Onaysız
                    </q-tab>
                </q-tabs>
                <div class="text-subtitle1 q-mt-md">
                    Katılımcı Sınırı
                </div>
                <q-tabs no-caps dense v-model="eventsStore.filter.hasUserLimit" class="" indicator-color="primary"
                    active-color="negative">
                    <q-tab name="all">
                        Hepsi
                    </q-tab>
                    <q-tab name="person">
                        Sınırlı
                    </q-tab>
                    <q-tab name="company">
                        Sınırsız
                    </q-tab>
                </q-tabs>
                <div class="text-subtitle1 q-mt-md">
                    Etkinlik Türü
                </div>
                <q-tabs no-caps dense v-model="eventsStore.filter.isOnline" class="" indicator-color="primary"
                    active-color="negative">
                    <q-tab name="all">
                        Hepsi
                    </q-tab>
                    <q-tab name="person">
                        Online
                    </q-tab>
                    <q-tab name="company">
                        Yüzyüze
                    </q-tab>
                </q-tabs>
                <div class="text-subtitle1 q-mt-md">
                    Ücret
                </div>
                <q-tabs no-caps dense v-model="eventsStore.filter.hasPrice" class="" indicator-color="primary"
                    active-color="negative">
                    <q-tab name="all">
                        Hepsi
                    </q-tab>
                    <q-tab name="person">
                        Ücretli
                    </q-tab>
                    <q-tab name="company">
                        Ücretsiz
                    </q-tab>
                </q-tabs>
            </q-card-section>

        </q-card>
    </q-dialog>
</template>
<script>
import { useEvents } from '@/store/event';

export default {
    data() {
        return {
            isOpen: true,
            eventsStore: useEvents(),
            tmp: null
        }
    },
    methods: {
        setupFilter() {
            this.tmp = { ...this.eventsStore.filter };
        },
        cancelFilter() {
            this.eventsStore.filter = { ...this.tmp }
            this.isOpen = false
        },
        updateFilter() {
            this.tmp = this.eventsStore.filter;
            this.eventsStore.eventsFlowList = []
            this.isOpen = false
        },
    },

}
</script>
<style>
.tab {
    width: 35%;
}
</style>
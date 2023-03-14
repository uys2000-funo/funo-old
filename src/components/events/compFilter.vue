<template>
    <div class="bg-secondary row no-wrap justify-between shadow-box q-px-sm">
        <div class="text-h6">
            Yörünge
        </div>
        <q-btn flat round dense class="bg-white" @click="() => isOpen = !isOpen">
            <q-icon name="filter_alt" />
        </q-btn>

        <q-dialog :model-value="isOpen" position="bottom" @before-hide="cancelFilter" @before-show="setupFilter">
            <q-card class="full-width">
                <q-card-section>
                    <div class="text-subtitle1 row justify-between items-center">
                        Etkinlik Sahibi
                        <q-btn no-caps dense flat @click="updateFilter">Filtrele</q-btn>
                    </div>
                    <q-tabs no-caps dense v-model="filter.ownerType" class="" indicator-color="primary"
                        active-color="negative">
                        <q-tab name="all">
                            Hepsi
                        </q-tab>
                        <q-tab name="true">
                            Bireysel
                        </q-tab>
                        <q-tab name="false">
                            Firma
                        </q-tab>
                    </q-tabs>
                    <div class="text-subtitle1 q-mt-md">
                        Etkinlik Türü
                    </div>
                    <q-tabs no-caps dense v-model="filter.isOnline" class="" indicator-color="primary"
                        active-color="negative">
                        <q-tab name="true">
                            Online
                        </q-tab>
                        <q-tab name="false">
                            Yüzyüze
                        </q-tab>
                    </q-tabs>
                    <div class="text-subtitle1 q-mt-md">
                        Ön Onay
                    </div>
                    <q-tabs no-caps dense v-model="filter.hasApproval" class="" indicator-color="primary"
                        active-color="negative">
                        <q-tab name="all">
                            Hepsi
                        </q-tab>
                        <q-tab name="true">
                            Onaylı
                        </q-tab>
                        <q-tab name="false">
                            Onaysız
                        </q-tab>
                    </q-tabs>
                    <div class="text-subtitle1 q-mt-md">
                        Katılımcı Sınırı
                    </div>
                    <q-tabs no-caps dense v-model="filter.hasUserLimit" class="" indicator-color="primary"
                        active-color="negative">
                        <q-tab name="all">
                            Hepsi
                        </q-tab>
                        <q-tab name="false">
                            Sınırsız
                        </q-tab>
                    </q-tabs>
                    <div class="text-subtitle1 q-mt-md">
                        Ücret
                    </div>
                    <q-tabs no-caps dense v-model="filter.hasPrice" class="" indicator-color="primary"
                        active-color="negative">
                        <q-tab name="all">
                            Hepsi
                        </q-tab>
                        <q-tab name="false">
                            Ücretsiz
                        </q-tab>
                    </q-tabs>
                </q-card-section>

            </q-card>
        </q-dialog>
    </div>
</template>
<script>
import { useEvents } from '@/store/event';

export default {
    props: ["reset"],
    data() {
        return {
            isOpen: false,
            eventsStore: useEvents(),
            filter: {
                ownerType: "all",
                isOnline: "false",
                hasApproval: "all",
                hasUserLimit: "all",
                hasPrice: "all",
            }
        }
    },
    methods: {
        setupFilter() {
            this.filter = { ...this.eventsStore.filter }
        },
        cancelFilter() {
            this.filter = { ...this.eventsStore.filter }
            this.isOpen = false
        },
        updateFilter() {
            if (this.filter != this.eventsStore.filter) {
                this.eventsStore.filter = this.filter;
                this.isOpen = false
                this.eventsStore.lists["EventFlow"] = []
                if (this.reset) this.reset()
            }
        },
    },

}
</script>
<style>
.tab {
    width: 35%;
}
</style>
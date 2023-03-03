<template>
    <q-carousel :model-value="pageNumber" @update:model-value="setPageNumber" :transition-prev="animation"
        :transition-next="animation" swipeable animated class="fit bg-secondary text-black rounded-borders">
        <q-carousel-slide :name="0">
            <comp-choose style="overflow-y: auto;" :pageNumber="pageNumber" :setPageNumber="setPageNumber" />
        </q-carousel-slide>
        <q-carousel-slide :name="1">
            <comp-personnel-general v-if="userStore.user.account.isPerson" style="overflow-y: auto;"
                :pageNumber="pageNumber" :setPageNumber="setPageNumber" />
            <comp-company-general v-else style="overflow-y: auto;" :pageNumber="pageNumber"
                :setPageNumber="setPageNumber" />
        </q-carousel-slide>
        <q-carousel-slide :name="2">
            <comp-account style="overflow-y: auto;" :pageNumber="pageNumber" :setPageNumber="setPageNumber" />
        </q-carousel-slide>
        <q-carousel-slide :name="3">
            <comp-profile style="overflow-y: auto;" :pageNumber="pageNumber" :setPageNumber="setPageNumber" />
        </q-carousel-slide>
    </q-carousel>
</template>
<script>
import compPersonnelGeneral from '@/components/register/compPersonnelGeneral.vue';
import compCompanyGeneral from '@/components/register/compCompanyGeneral.vue';
import compAccount from '@/components/register/compAccount.vue';
import compProfile from '@/components/register/compProfile.vue';
import compChoose from '@/components/register/compChoose.vue';
import { useUserRegister } from '@/store/user';
export default {
    components: { compPersonnelGeneral, compCompanyGeneral, compAccount, compProfile, compChoose },
    props: ["pageNumber", "setPageNumber"],
    data() {
        return {
            animation: "slide-left",
            userStore: useUserRegister(),
        }
    },
    watch: {
        pageNumber(nVal, oVal) {
            if (nVal > oVal) this.animation = "slide-left";
            else if (nVal < oVal) this.animation = "slide-right";
        },
    },
}
</script>
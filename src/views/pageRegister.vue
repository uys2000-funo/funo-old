<template>
    <q-carousel :model-value="pageNumber" @update:model-value="setPageNumber" transition-prev="scale"
        transition-next="scale" swipeable animated control-color="white" padding
        class="fit bg-secondary text-black rounded-borders">
        <q-carousel-slide :name="0">
            <comp-choose style="overflow-y: auto;" :pageNumber="pageNumber" :setPageNumber="setPageNumber" />
        </q-carousel-slide>
        <q-carousel-slide :name="1">
            <comp-personnel-general v-if="register.user.type" style="overflow-y: auto;" :pageNumber="pageNumber"
                :setPageNumber="setPageNumber" />
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
import { register } from '@/store/register';
import compPersonnelGeneral from '@/components/register/compPersonnelGeneral.vue';
import compCompanyGeneral from '@/components/register/compCompanyGeneral.vue';
import compAccount from '@/components/register/compAccount.vue';
import compProfile from '@/components/register/compProfile.vue';
import compChoose from '@/components/register/compChoose.vue';
export default {
    components: { compPersonnelGeneral, compCompanyGeneral, compAccount, compProfile, compChoose },
    props: ["pageNumber", "setPageNumber"],
    data() {
        return {
            register: register(),
        }
    },
}
</script>
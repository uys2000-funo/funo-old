<template>
    <div class="fit column no-wrap">
        <div class="full-width row justify-between align-end text-h6">
            @Mehmet Uysal
            <q-avatar size="lg" v-ripple @click="backButton">
                <q-icon name="arrow_back_ios" />
            </q-avatar>
        </div>
        <div class="fit">
            <comp-message :rPhotoURL="rPhotoURL" :rID="rID" />
        </div>
    </div>
</template>
<script>
import compMessage from '../general/compMessage.vue';
export default {
    components: { compMessage },
    props: ["rID", "rPhotoURL", "updateProps"],
    methods: {
        backButton() {
            if (this.updateProps) this.updateProps("all")
        }
    },
}
</script>
<style>
.r20 {
    width: 20%;
}
</style>
<template>
    <div>
        <comp-wheel :s="['50vw', '50vw']" :p="pageNumber" :r="90" :moveEndEvent="moveEndEvent">
            <template v-slot:c>
                <div class="center">
                    <icon-logo />
                </div>
            </template>
            <template v-slot:ie>
                <div class="inner-dot">
                    <icon-dot class="fill-negative" />
                </div>
            </template>
            <template v-slot:is>
                <div class="inner-dot">
                    <icon-dot class="fill-primary" />
                </div>
            </template>
            <template v-slot:iw>
                <div class="inner-dot">
                    <icon-dot class="fill-negative" />
                </div>
            </template>
            <template v-slot:in>
                <div class="inner-dot">
                    <icon-dot class="fill-primary" />
                </div>
            </template>
            <template v-slot:oe>
                <div class="outter-icon">
                    <icon-clock class="fill-primary" />
                </div>
            </template>
            <template v-slot:ose>
                <div class="outter-dot">
                    <icon-dot class="fill-primary" />
                </div>
            </template>
            <template v-slot:os>
                <div class="outter-icon">
                    <icon-info class="fill-negative" />
                </div>
            </template>
            <template v-slot:osw>
                <div class="outter-dot">
                    <icon-dot class="fill-negative" />
                </div>
            </template>
            <template v-slot:ow>
                <div class="outter-icon">
                    <icon-image class="fill-primary" />
                </div>
            </template>
            <template v-slot:onw>
                <div class="outter-dot">
                    <icon-dot class="fill-primary" />
                </div>
            </template>
            <template v-slot:on>
                <div class="outter-icon">
                    <icon-location class="fill-negative" />
                </div>
            </template>
            <template v-slot:one>
                <div class="outter-dot">
                    <icon-dot class="fill-negative" />
                </div>
            </template>
        </comp-wheel>
    </div>
</template>
<script>
import iconLogo from "@/icons/general/iconLogo.vue";
import compWheel from "@/components/general/compWheel.vue";
import iconImage from "@/icons/general/iconImage.vue";
import iconInfo from "@/icons/create/iconInfo.vue";
import iconClock from "@/icons/create/iconClock.vue";
import iconLocation from "@/icons/create/iconLocation.vue";
import iconDot from "@/icons/general/iconDot.vue";
export default {
    components: { iconLogo, compWheel, iconImage, iconInfo, iconClock, iconLocation, iconDot },
    props: ["r", "setR", "pageNumber"],
    methods: {
        moveEndEvent: function (res) {
            if (!this.setR) return;
            const r = res % 4
            this.setR(r < 0 ? r + 4 : r);
        },
    },
    mounted() {
        this.moveEndEvent(this.pageNumber);
    }
};
</script>
<style scoped>
.center {
    display: flex;
    width: 15vw;
    height: 15vw;
}

.inner-dot {
    display: flex;
    width: 2vw;
    height: 2vw;
}

.outter-dot {
    display: flex;
    width: 5vw;
    height: 5vw;
}

.outter-icon {
    display: flex;
    width: 10vw;
    height: 10vw;
}
</style>
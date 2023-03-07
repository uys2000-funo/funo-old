<template>
    <q-carousel swipeable animated arrows v-model="images" v-model:fullscreen="fullscreen" class="nonturned-out"
        :class="{ 'turned-out': fullscreen }" style="flex-shrink: 0;">
        <template v-for="(photoURL, index) in photoURLs" :key="index">
            <q-carousel-slide :name="index" :img-src="photoURL" :class="{ 'inner-image': fullscreen }">
            </q-carousel-slide>
        </template>
        <template v-slot:control>
            <q-carousel-control position="bottom-right" :offset="[18, 18]">
                <q-btn push round dense color="white" text-color="primary"
                    :icon="fullscreen ? 'fullscreen_exit' : 'fullscreen'" @click="fullscreen = !fullscreen" />
            </q-carousel-control>
        </template>
    </q-carousel>
</template>
<script>
export default {
    props: ["photoURLs"],
    data() {
        return {
            fullscreen: false,
            images: 0
        }
    }
}
</script>

<style scoped>
.nonturned-out {
    height: 50vw;
}

.turned-out {
    position: fixed;
    top: 50%;
    left: 50%;
    bottom: unset;
    right: unset;
    transform: translate(-50%, -50%) rotate(90deg);
    width: 100vh;
    height: 100vw;
    max-width: 100vh;
    max-height: 100vw;
}

.inner-image {
    background-repeat: no-repeat;
    background-position: center;
    background-attachment: fixed;
    background-size: contain;
}
</style>
<template>
    <q-carousel v-model="slide" transition-prev="slide-right" transition-next="slide-left" animated control-color="primary"
        class="q-my-md" arrows infinite style="height: 80vw; width: 45vw; border-radius: 20px;">
        <template v-for="(photoURL, index) in aData.photoURLs" :key="index">
            <q-carousel-slide :name="index" :img-src="photoURL" />
        </template>
        <template v-slot:control>
            <q-carousel-control position="top" :offset="[18, 18]" class="text-center">
                <q-btn push rounded dense color="white" text-color="primary" @click="$router.push(`/app/event/${aData.eID}`)">
                    <div class="full-width row no-wrap overflow-hidden">
                        <q-avatar size="sm">
                            <img :src="aData.ePhotoURL" alt="">
                        </q-avatar>
                        <span class="q-ml-sm overflow-hidden" style="word-break: break-all; height: 20px;">
                            {{ aData.eName }}
                        </span>
                    </div>
                </q-btn>
            </q-carousel-control>
            <q-carousel-control position="bottom" :offset="[18, 18]" class="text-center">
                <q-btn push rounded dense color="white" text-color="primary" class="full-width" @click="$router.push(`/app/user/${aData.uID}`)">
                    <div class="full-width row no-wrap overflow-hidden">
                        <q-avatar size="sm">
                            <img :src="aData.uPhotoURL" alt="">
                        </q-avatar>
                        <span class="q-ml-sm overflow-hidden" style="word-break: break-all; height: 20px;">
                            {{ aData.uName }}
                        </span>
                    </div>
                </q-btn>    
            </q-carousel-control>
        </template>
    </q-carousel>
</template>

<script>
export default {
    props: ["aID", "aData"],
    data() {
        return {
            slide: 0
        }
    }, mounted() {
        console.log("data", this.aData)
    }
}
</script>
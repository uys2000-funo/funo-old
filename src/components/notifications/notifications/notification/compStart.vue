## For event which is started

<template>
    <div class="fit column no-wrap shink">
        <div class="text-h6 q-pl-md">
            Etkinlik Başladı
        </div>
        <q-img class="full-width" style="height:40vw" :src="notification.data.notification.ePhotoURL" />
        <div class="fit" style="flex-shrink: 1;  ">
            <p class="q-px-md q-pt-lg">
                Etkinliğe katıldın mı?
            </p>
            <p class="q-px-md">
                Etkinliğin atmoseferini paylaşmak veya yorum yapmak ister misin? :).
            </p>
            <p v-if="time != 0" class="q-px-md">
                {{ time }} defa resim yüklemişsin bi daha resim yüklemek ister misin? :)
            </p>
        </div>
        <div class="row no-wrap full-width" style="overflow-x: auto;">
            <template v-for="(image, index) in imageURLs" :key="index">
                <div style="width: 20vw; height: 30vw;" :style="`background-image: url(${image});`" class="image q-mx-sm">
                    <q-btn no-caps class="absolute-bottom text-white" style="background-color: #00000050" flat
                        @click="removeImage(index)" label="Kaldır" />
                </div>
            </template>
        </div>
        <div class="text-center">
            <q-btn class="bg-primary q-mx-sm" @click="openInput">
                Resim Ekle
            </q-btn>
            <q-btn class="bg-primary q-mx-sm" @click="openEvent" v-if="images.length == 0">
                Etkinliği Aç
            </q-btn>
            <q-btn class="bg-primary q-mx-sm" @click="uploadAtmosphere" v-else>
                Yükle
            </q-btn>
        </div>
    </div>

    <div class="hidden">
        <input @change="loadImage" multiple ref="refInput" type="file" accept="image/*" />
    </div>
</template>

<script>
import { getAtmosphere, uploadAtmosphere } from '@/services/app/atmosphere';

export default {
    props: ["notification"],
    data() {
        return {
            aID: null,
            time: 0,
            images: [],
            imageURLs: []
        }
    },
    methods: {
        openInput() {
            this.$refs.refInput.click()
        },
        loadImage(value) {
            const files = value.target.files;
            for (let index = 0; index < files.length; index++) {
                this.images[index] = files[index];
                this.readImage(files[index], index);
            }
        },
        readImage(image, index) {
            const reader = new FileReader();
            reader.addEventListener("load", img => this.imageURLs[index] = img.target.result, false);
            reader.readAsDataURL(image);
        },
        removeImage(index) {
            this.imageURLs.splice(index, 1);
            this.images.splice(index, 1);
        },
        uploadAtmosphere() {
            const uID = this.notification.data.uID
            const eID = this.notification.data.notification.eID
            uploadAtmosphere(uID, eID, this.aID, this.time, this.images).then(() => {
                this.time++
                this.images = []
                this.imageURLs = []
            })
        },
        openEvent() {
            this.$router.push("/app/event/" + this.notification.data.notification.eID)
        }
    },
    mounted() {
        const uID = this.notification.data.uID
        const eID = this.notification.data.notification.eID
        getAtmosphere(uID, eID).then(([res]) => {
            if (res.dID) this.aID = res.dID
            if (res.data?.time) this.time = res.data.time
            console.log(JSON.stringify( res))
        })
    }
}
</script>
<style scoped>
.shink * {
    flex-shrink: 0;
}

.image {
    position: relative;
    width: 25vw;
    height: 20vw;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
}
</style>
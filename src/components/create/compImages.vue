<template>
    <div class="fit column no-wrap">
        <div class="full-width row justify-between q-mb-md">
            <span class="text-h6">Görseller</span>
            <q-btn flat class="bg-primary" @click="openInput">Resim Ekle</q-btn>
        </div>
        <div class="full-width" style="flex-grow: 1; overflow: auto;">
            <div class="images">
                <div v-for="(image, index) in eventStore.imageURLs" :key="index" :style="`background-image: url(${image});`"
                    class="image">
                    <q-btn no-caps class="absolute-bottom" style="background-color: #ffffff50" flat
                        @click="removeImageLocal(index)" label="Kaldır" />
                </div>
            </div>
        </div>
    </div>
    <div class="hidden">
        <input @change="loadImage" multiple ref="refInput" type="file" accept="image/*" />
    </div>
</template>
<script>
import { useEvent } from "@/store/event.js";
export default {
    props: ["pageNumber", "setPage"],
    data() {
        return {
            eventStore: useEvent(),
        };
    },
    methods: {
        openInput() {
            this.$refs.refInput.click()
        },
        readImage(image, index) {
            const reader = new FileReader();
            reader.addEventListener("load", img => this.eventStore.imageURLs[index] = img.target.result, false);
            reader.readAsDataURL(image);
        },
        loadImage(value) {
            const files = value.target.files;
            for (let index = 0; index < files.length; index++) {
                this.eventStore.images[this.eventStore.imageURLs.length + index] = files[index];
                this.readImage(files[index], this.eventStore.imageURLs.length + index);
            }
        },
        removeImageLocal(index) {
            this.eventStore.imageURLs.splice(index, 1);
            this.eventStore.images.splice(index, 1);
        }
    },
    mounted() {
        if (this.page == 0 && this.setPage) this.setPage(0);
    }
};
</script>
<style scoped>
.images {
    width: 100%;
    height: 100%;
    border: 1px dashed #000000;
    border-radius: 20px;
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    overflow: auto;
}

.image {
    position: relative;
    max-width: 100px;
    min-width: 50px;
    width: 25vw;
    max-height: 75px;
    min-height: 30px;
    height: 20vw;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
}
</style>
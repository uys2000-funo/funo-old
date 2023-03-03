<template>
    <div>
        <p>Profil Fotoğrafı</p>
        <q-img :src="
            userStore.photoUrl == '' ?
                require('@/assets/images/registerUpload.svg') :
                userStore.photoUrl" @click="openImageChooser">
            <div class="absolute-full text-subtitle2 flex flex-center bg">
                Profil fotoğrafı yüklemek için dokunun
            </div>
        </q-img>
        <div class="hid">
            <input @change="setImageEvent" ref="imgPicker" type="file" accept="image/*" />
        </div>
    </div>
</template>
<script>
import { useUserRegister } from '@/store/user';

export default {
    props: ["page", "setPage"],
    data() {
        return {
            userStore: useUserRegister(),
        }
    },
    methods: {
        openImageChooser() {
            this.$refs.imgPicker.click();
        },
        setImage(val) {
            this.userStore.photoUrl = val.target.result;
        },
        setImageEvent: function (val) {
            const img = val.target.files[0];
            const reader = new FileReader();
            reader.addEventListener("load", this.setImage, false);
            reader.readAsDataURL(img);
            this.userStore.photo = img
        },
    },
    mounted() {
        if (this.page == 0 && this.setPage) this.setPage(2);
    }
}
</script>

<style scoped>
.co {
    width: 100vw;
}

.bg {
    color: #000;
    background-color: #00000000;
}

.hid {
    display: none;
}
</style>
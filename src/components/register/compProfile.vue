<template>
    <div>
        <p>Profil Fotoğrafı</p>
        <q-img :src="
            img == null ?
                require('@/assets/images/registerUpload.svg') :
                img" @click="openImageChooser">
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
import { register } from '@/store/register';

export default {
    props: ["page", "setPage"],
    data() {
        return {
            register: register(),
            img: null
        }
    },
    methods: {
        openImageChooser() {
            this.$refs.imgPicker.click();
        },
        setImage(val) {
            this.img = val.target.result;
        },
        setImageEvent: function (val) {
            const img = val.target.files[0];
            const reader = new FileReader();
            reader.addEventListener("load", this.setImage, false);
            reader.readAsDataURL(img);
            this.register.profileImage = img;
            this.register.user.imgType = "default";
            this.register.user.imgLocation = "default";
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
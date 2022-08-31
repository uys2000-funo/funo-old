<template>
  <q-carousel
    :model-value="`${page}`"
    transition-prev="slide-right"
    transition-next="slide-left"
    animated
    class="co bg-secondary"
  >
    <q-carousel-slide name="1" class="column no-wrap flex-center">
      <div style="width: 95vw">
        <div style="width: 95vw">
          <div>
            <p>İşletme İsmi</p>
            <q-input
              outlined
              placeholder="İşletme ismini giriniz"
              v-model="cUser.name"
            />
          </div>
          <div>
            <p>İşletme vergi numarası</p>
            <q-input
              outlined
              placeholder="İşletme vergi numarasını giriniz"
              v-model="cUser.taxNumber"
            />
          </div>
          <div>
            <p>Telefon Numarası</p>
            <q-input
              outlined
              v-model="cUser.phoneNumber"
              placeholder="Telefon numaranızı giriniz"
              mask="#"
              reverse-fill-mask
              prefix="+"
            />
          </div>
          <div>
            <p>İşletme Konumu</p>
            <q-input
              outlined
              placeholder="İşletme konumunu şeçin"
              v-model="cUser.companyAdress"
            />
          </div>
        </div>
      </div>
    </q-carousel-slide>
    <q-carousel-slide name="2" class="column no-wrap flex-center">
      <div style="width: 95vw">
        <div>
          <p>Kullanıcı Adı</p>
          <q-input
            outlined
            placeholder="Kullanıcı adınızı girin"
            v-model="cUser.userName"
          />
        </div>
        <div>
          <p>Şifre</p>
          <q-input
            outlined
            placeholder="Şİfrenizi giriniz"
            v-model="cUser.pass"
          />
        </div>
        <div>
          <p>Mail</p>
          <q-input
            outlined
            placeholder="Mail adresinizi girin"
            v-model="cUser.mail"
          />
        </div>
        <div>
          <q-checkbox
            :model-value="right"
            @update:model-value="setRight"
            label="Kullanıcı sözlemesini  okudum ve onaylıyorum"
          />
        </div>
      </div>
    </q-carousel-slide>
    <q-carousel-slide name="3" class="column no-wrap flex-center">
      <div style="width: 95vw; max-height: 90%">
        <p>Profil Fotoğrafı</p>
        <q-img
          :src="
            img == null ? require('@/assets/images/registerUpload.svg') : img
          "
          @click="imageEvent"
        >
          <div class="absolute-full text-subtitle2 flex flex-center bg">
            Profil fotoğrafı yüklemek için dokunun
          </div>
        </q-img>
        <div class="hid">
          <input
            @change="imageSetEvent"
            ref="imgPicker"
            type="file"
            accept="image/*"
          />
        </div>
      </div>
    </q-carousel-slide>
    <q-carousel-slide name="4" class="column no-wrap flex-center">
      <div style="width: 95vw">
        <register-tag />
      </div>
    </q-carousel-slide>
  </q-carousel>
</template>

<script>
import registerTag from "@/components/compRegisterTag.vue";
import { register } from "@/store/register";
export default {
  props: ["page", "uWatch", "right"],
  inject: ["setPage", "setRight", "setImage"],
  components: {
    registerTag,
  },
  data() {
    return {
      img: null,
      register: register(),
      cUser: {
        name: "",
        taxNumber: "",
        phoneNumber: "",
        companyAdress: "",
        userName: "",
        pass: "",
        mail: "",
      },
    };
  },
  methods: {
    updateImage: function (val) {
      this.img = val.target.result;
    },
    imageSetEvent: function (val) {
      const img = val.target.files[0];
      const reader = new FileReader();
      reader.addEventListener("load", this.updateImage, false);
      reader.readAsDataURL(img);
      this.setImage(img);
    },
    imageEvent: function () {
      this.$refs.imgPicker.click();
    },
  },
  mounted() {
    if (this.page == 0) this.setPage(1);
  },
  watch: {
    uWatch() {
      this.register.user = this.cUser;
    },
  },
};
</script>

<style scoped>
.co {
  width: 100vw;
  height: 100%;
}
.bg {
  color: #000;
  background-color: #00000000;
}
.hid {
  display: none;
}
</style>

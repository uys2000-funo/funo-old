<template>
  <q-carousel
    :model-value="`${page}`"
    transition-prev="slide-right"
    transition-next="slide-left"
    animated
    class="co bg-secondary"
  >
    <q-carousel-slide name="-1" class="column no-wrap flex-center">
      <div style="width: 95vw">
        <div>
          <p>Ad Soyad</p>
          <q-input
            outlined
            placeholder="Adınızı ve sosyadınızı giriniz"
            v-model="pUser.name"
          />
        </div>
        <div>
          <p>Doğum Tarihi</p>
          <q-input
            outlined
            placeholder="Doğum tarihinizi  seçiniz"
            v-model="pUser.birthdate"
            mask="##/##/####"
          >
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer text-primary">
                <q-popup-proxy
                  cover
                  transition-show="scale"
                  transition-hide="scale"
                >
                  <q-date v-model="pUser.birthdate" mask="DD/MM/YYYY">
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Close" color="primary" flat />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </div>
        <div>
          <p>Telefon Numarası</p>
          <q-input
            outlined
            placeholder="Telefon numaranızı giriniz"
            mask="#"
            reverse-fill-mask
            prefix="+"
            v-model="pUser.phoneNumber"
          />
        </div>
        <div class="row no-wrap justify-around items-center content-center">
          <div class="col-5">Cinsiyet</div>
          <div
            class="col-7 column no-wrap justify-around items-center content-center"
          >
            <div>
              <q-toggle
                size="8vh"
                v-model="pUser.sex"
                color="orange"
                keep-color
              />
            </div>
            <div>Kadın / Erkek</div>
          </div>
        </div>
      </div>
    </q-carousel-slide>
    <q-carousel-slide name="-2" class="column no-wrap flex-center">
      <div style="width: 95vw">
        <div>
          <p>Kullanıcı Adı</p>
          <q-input
            outlined
            placeholder="Kullanıcı adınızı girin"
            v-model="pUser.userName"
          />
        </div>
        <div>
          <p>Şifre</p>
          <q-input
            outlined
            placeholder="Şİfrenizi giriniz"
            v-model="pUser.pass"
          />
        </div>
        <div>
          <p>Mail</p>
          <q-input
            outlined
            placeholder="Mail adresinizi girin"
            v-model="pUser.mail"
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
    <q-carousel-slide name="-3" class="column no-wrap flex-center">
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
    <q-carousel-slide name="-4" class="column no-wrap flex-center">
      <div style="width: 95vw">
        <register-tag />
      </div>
    </q-carousel-slide>
  </q-carousel>
</template>

<script>
import registerTag from "@/components/compRegisterTag.vue";
export default {
  props: ["page", "uWatch", "right"],
  inject: ["setPage", "setUser", "setRight", "setImage"],
  components: {
    registerTag,
  },
  data() {
    return {
      img: null,
      pUser: {
        name: "",
        birthdate: "",
        phoneNumber: "",
        sex: false,
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
    if (this.page == 0) this.setPage(-1);
  },
  watch: {
    uWatch() {
      this.setUser(this.pUser);
    },
  },
};
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
<style>
.q-toggle__inner--falsy {
  color: rgb(250, 50, 0) !important;
}
.q-toggle__inner--truthy {
  color: rgb(0, 250, 150) !important;
}
.q-toggle__thumb {
  color: white !important;
}
</style>

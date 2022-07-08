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
              rounded
              placeholder="İşletme ismini giriniz"
              v-model="cUser.name"
            />
          </div>
          <div>
            <p>İşletme vergi numarası</p>
            <q-input
              outlined
              rounded
              placeholder="İşletme vergi numarasını giriniz"
              v-model="cUser.taxNumber"
            />
          </div>
          <div>
            <p>Telefon Numarası</p>
            <q-input
              outlined
              rounded
              placeholder="Telefon numaranızı giriniz"
              v-model="cUser.phoneNumber"
            />
          </div>
          <div>
            <p>İşletme Konumu</p>
            <q-input
              outlined
              rounded
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
            rounded
            placeholder="Kullanıcı adınızı girin"
            v-model="cUser.userName"
          />
        </div>
        <div>
          <p>Şifre</p>
          <q-input
            outlined
            rounded
            placeholder="Şİfrenizi giriniz"
            v-model="cUser.pass"
          />
        </div>
        <div>
          <p>Mail</p>
          <q-input
            outlined
            rounded
            placeholder="Mail adresinizi girin"
            v-model="cUser.email"
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
      <div style="width: 95vw">
        <p>Profil Fotoğrafı</p>
        <q-img :src="require('@/assets/images/registerUpload.svg')">
          <div class="absolute-full text-subtitle2 flex flex-center bg">
            Profil fotoğrafı yüklemek için dokunun
          </div>
        </q-img>
      </div>
    </q-carousel-slide>
  </q-carousel>
</template>

<script>
export default {
  props: ["page", "uWatch", "right"],
  inject: ["setPage", "setUser", "setRight"],
  data() {
    return {
      cUser: {
        name: "",
        taxNumber: "",
        phoneNumber: "",
        companyAdress: "",
        userName: "",
        pass: "",
        email: "",
      },
    };
  },
  mounted() {
    if (this.page == 0) this.setPage(1);
  },
  watch: {
    uWatch() {
      this.setUser(this.cUser);
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
</style>

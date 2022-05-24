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
              rounded
              placeholder="İşletme ismini giriniz"
              v-model="text"
            />
          </div>
          <div>
            <p>İşletme vergi numarası</p>
            <q-input
              outlined
              rounded
              placeholder="İşletme vergi numarasını giriniz"
              v-model="text"
            />
          </div>
          <div>
            <p>Telefon Numarası</p>
            <q-input
              outlined
              rounded
              placeholder="Telefon numaranızı giriniz"
              v-model="text"
            />
          </div>
          <div>
            <p>İşletme Konumu</p>
            <q-input
              outlined
              rounded
              placeholder="İşletme konumunu şeçin"
              v-model="text"
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
            v-model="text"
          />
        </div>
        <div>
          <p>Şifre</p>
          <q-input
            outlined
            rounded
            placeholder="Şİfrenizi giriniz"
            v-model="text"
          />
        </div>
        <div>
          <p>Mail</p>
          <q-input
            outlined
            rounded
            placeholder="Mail adresinizi girin"
            v-model="text"
          />
        </div>
        <div>
          <q-checkbox
            v-model="right"
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
  props: ["page"],
  inject: ["setPage"],
  mounted() {
    if (this.page == 0) this.setPage(1);
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

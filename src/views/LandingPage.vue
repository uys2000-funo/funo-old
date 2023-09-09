<template>
  <div class="fit column no-wrap justify-center items-center content-center" style="padding: 16px;">
    <div style="width:99px">
      <icon-logo-text class="fill-primary" />
    </div>
    <div class="image-welcome full-width" style="flex-grow: 1;"
      :style="`background-image: url('${require('@/assets/images/welcome.svg')}')`">
    </div>
    <div style="margin-bottom: 52px;">
      <h1 style="font-size: 28px; line-height: 35px; font-weight: 400; margin-bottom: 16px;">
        Çevrenizdeki <br />
        etkinlikleri <span class="text-primary" style="font-weight: 700;">hemen bulun</span>
      </h1>
      <p style="font-weight: 400;  size: 36px; height: 20px; margin-bottom: 56px;">
        Çevrenizdeki etkinlikler hakkında sizi bilgilendirmek ve sizi kullanıcılara sosyalleştirmek için tasarlanmıştır
      </p>
      <q-btn class="bg-primary text-white full-width" no-caps style="height: 56px;" to="/login">
        Hemen başla
      </q-btn>
    </div>
  </div>
</template>
<script>
import iconLogoText from '@/icons/logo/iconFunoText.vue';
export default {
  components: { iconLogoText }
}
</script>
<style>
.image-welcome {
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
}
</style>
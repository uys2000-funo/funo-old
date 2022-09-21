<template>
  <div class="fit a">
    <div class="row">
      <div class="col-2 flex items-center content-center">
        <img
          :src="require('@/assets/images/profile/settings/lock.svg')"
          alt=""
        />
      </div>
      <div class="col-8 flex items-center content-center">Hesabı gizle</div>
      <div class="col-2 flex items-center content-center">
        <q-toggle
          :model-value="user.hidden"
          @click="setHiddenStatus"
          :disable="isDisabled"
        />
      </div>
    </div>
    <div class="row">
      <div class="col-2 flex items-center content-center">
        <img
          :src="require('@/assets/images/profile/settings/key.svg')"
          alt=""
        />
      </div>
      <div class="col-10 flex items-center content-center">Şifre Değiştir</div>
    </div>
    <div class="row">
      <div class="col-2 flex items-center content-center">
        <img
          :src="require('@/assets/images/profile/settings/link.svg')"
          alt=""
        />
      </div>
      <div class="col-10 flex items-center content-center">Hesap Bağlama</div>
    </div>
    <div class="row">
      <div class="col-2 flex items-center content-center">
        <img
          :src="require('@/assets/images/profile/settings/info.svg')"
          alt=""
        />
      </div>
      <div class="col-10 flex items-center content-center">Hakkımızda</div>
    </div>
    <div class="row">
      <div class="col-2 flex items-center content-center">
        <img
          :src="require('@/assets/images/profile/settings/help.svg')"
          alt=""
        />
      </div>
      <div class="col-10 flex items-center content-center">Yardım</div>
    </div>
    <div class="row">
      <div class="col-2 flex items-center content-center">
        <img
          :src="require('@/assets/images/profile/settings/exit.svg')"
          alt=""
        />
      </div>
      <div class="col-10 flex items-center content-center">Çıkış Yap</div>
    </div>
  </div>
</template>
<script>
import { user } from "@/store/user";
import { updateUser } from "@/services/firebase/core/sFirestore";
export default {
  data() {
    return {
      user: user(),
      isDisabled: false,
    };
  },
  methods: {
    setHiddenStatus: function () {
      this.isDisabled = true;
      updateUser(this.user.ID, { hidden: !this.user.hidden }).then(() => {
        this.isDisabled = false;
        this.user.setHidden(!this.user.hidden);
      });
    },
  },

  watch: {
    hidden() {},
  },
};
</script>
<style scoped>
.a > div {
  height: 5vh;
  min-height: 40px;
}
</style>

<template>
  <div class="page column no-wrap justify-center items-center content-center">
    <div
      class="col-8 column no-wrap justify-center items-center content-center"
    >
      <div
        class="col-6 column no-wrap justify-center items-center content-center"
      >
        <img
          class="col-8"
          :src="require('@/assets/images/logo.svg')"
          alt="logoImage"
        />
        <b><p class="col-4 logo text-primary">evento</p></b>
      </div>
      <div
        class="col-6 column no-wrap justify-around items-center content-center"
      >
        <div class="col-3 field" rounded outlined>
          <q-input
            v-model="text"
            :dense="h < 720"
            placeholder=" Kullanıcı Adı"
          />
        </div>
        <div class="col-3 field" rounded outlined>
          <q-input v-model="text" :dense="h < 720" placeholder=" Şifre" />
        </div>
        <div class="col-2 row full-width">
          <p class="reg">Şifreni mi unuttun?</p>
        </div>
        <div class="col-3">
          <q-btn
            class="login bg-primary text-white"
            fab-mini
            label="Giriş Yap"
          />
        </div>
      </div>
    </div>
    <div
      class="col-4 column no-wrap justify-center items-center content-center"
    >
      <div
        class="col-4 column no-wrap justify-center items-center content-center"
      >
        YA DA
      </div>
      <div
        class="col-2 column no-wrap justify-center items-center content-center"
      >
        <div>
          <q-btn rounded label="Google" />
          <q-btn rounded label="Facebook" />
        </div>
      </div>
      <div
        class="col-6 column no-wrap justify-center items-center content-center"
      >
        <p>Hesabın yok mu? <router-link to="/register">Kaydol</router-link></p>
      </div>
    </div>
  </div>
</template>
<script>
import { loginFunction, loginFunctionGoogle } from "../services/firebase/main";
import { setLastUser } from "@/services/core/main";
export default {
  data() {
    return {
      h: window.innerHeight,
    };
  },

  methods: {
    loginFunction: function (data) {
      loginFunction(data, this.pImg, this.tImg).then((res) => {
        this.setUser(res);
        setLastUser(res);
        this.$router.push("/main")
      });
    },
    loginFunctionGoogle: function () {
      loginFunctionGoogle().then((res) => {
        this.setUser(res);
        setLastUser(res);
      });
    },
  },
};
</script>
<style scoped>
* {
  font-size: 2vh;
}
.logo {
  font-size: 5vh;
}
img {
  width: 100%;
  height: 100%;
}
.col-6 {
  width: 80vw;
}
.q-field {
  font-size: 3vh;
  background: #f5f7fb;
  border: 2px solid rgba(0, 0, 0, 0.3);
  box-sizing: border-box;
  border-radius: 10px;
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 800;
  line-height: 90%;
}

.reg {
  margin-bottom: auto;
  margin-top: 0px;
  margin-left: auto;
  margin-right: 10%;
}
.field {
  width: 90%;
}
.login {
  width: 50vw;
  height: 6vh;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25), 0px 4px 4px rgba(0, 0, 0, 0.25),
    0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 20px;
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 800;
  font-size: 3vh;
  line-height: 100%;
}
</style>

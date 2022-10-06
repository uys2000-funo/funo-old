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
        <b><p class="col-4 logo text-primary">funo</p></b>
      </div>
      <div
        class="col-6 column no-wrap justify-around items-center content-center"
      >
        <div class="col-3 field" rounded outlined>
          <q-input
            v-model="userL.mail"
            :dense="h < 720"
            placeholder=" Kullanıcı Adı"
          />
        </div>
        <div class="col-3 field" rounded outlined>
          <q-input v-model="userL.pass" :dense="h < 720" placeholder=" Şifre" />
        </div>
        <div class="col-2 row full-width">
          <p class="reg">Şifreni mi unuttun?</p>
        </div>
        <div class="col-3">
          <q-btn
            class="login bg-primary text-white"
            fab-mini
            @click="loginFunction(userL)"
          >
            <template v-slot:default>
              <span class="loginText">GİRİŞ YAP</span>
              <q-tooltip v-model="loginError" class="bg-primary"
                >Bişiler Yanlış Mı Ne</q-tooltip
              >
            </template>
            <template v-slot:loading>
              <span class="loginText">KONTROL EDİLİYOR</span>
            </template>
          </q-btn>
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
          <q-btn rounded @click="loginFunctionGoogle" :loading="btnGoogle">
            <template v-slot:default>
              <q-icon>
                <img
                  :src="require('@/assets/images/icons/google.svg')"
                  alt="icon"
                />
              </q-icon>
              <div>Google</div>
            </template>
            <template v-slot:loading>
              <q-spinner-facebook />
              <div>Google</div>
            </template>
          </q-btn>
          <q-tooltip v-model="loginErrorGoogle" class="bg-primary"
            >Bişiler Yanlış Mı Ne</q-tooltip
          >
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
import { loginFunction, loginFunctionGoogle } from "../services/firebase/login";
import { setLastUser } from "@/services/core/main";
import { user } from "@/store/user";
export default {
  data() {
    return {
      h: window.innerHeight,
      btnGoogle: false,
      btnLogin: false,
      loginError: false,
      loginErrorGoogle: false,
      user: user(),
      userL: {
        mail: null,
        pass: null,
      },
    };
  },
  methods: {
    loginSucces: function (res, s = true) {
      console.log(res);
      this.user.setUser(res);
      if (s) setLastUser(res);
      this.$router.push("/app/main/events");
    },
    loginFunction: function (data) {
      this.btnLogin = true;
      loginFunction(data, this.pImg, this.tImg)
        .then((res) => {
          this.btnLogin = false;
          console.log(res);
          if (res) this.loginSucces(res);
        })
        .catch((err) => {
          console.log(err, this.user, this.pass);
          this.loginError = true;
          this.btnLogin = false;
          setTimeout(() => {
            this.loginError = false;
          }, 1000);
        });
    },
    loginFunctionGoogle: function () {
      this.btnGoogle = true;
      loginFunctionGoogle()
        .then((res) => {
          this.btnGoogle = false;
          this.loginSucces(res, false);
        })
        .catch((err) => {
          this.btnGoogle = false;
          this.loginErrorGoogle = true;
          setTimeout(() => {
            this.loginErrorGoogle = false;
            console.log(err);
          }, 1000);
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
}
.loginText {
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 800;
  font-size: 3vh;
  line-height: 100%;
}
</style>

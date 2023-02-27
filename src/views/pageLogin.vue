<template>
  <div class="column no-wrap justify-around items-center content-center" style="width:100vw;"
    :style="`height:${height}px`">
    <!-- Logo Part-->
    <div class="grow column">
      <div class="column m-auto">
        <img :src="require('@/assets/images/logo.svg')" class="logo-img">
        <img :src="require('@/assets/funo.svg')" class="logo-text">
      </div>
    </div>
    <!-- Input Part-->
    <div class="grow column">
      <q-carousel v-model="slide" transition-prev="slide-right" transition-next="slide-left" animated
        class="bg-secodary fit">
        <!-- Login Part-->
        <q-carousel-slide name="login" class="bg-secondary column">
          <div class="column q-ma-auto" style="width:60vw">
            <div>
              <q-input outlined class="r fit" style="margin: 2px 0px " v-model="email" type="email"
                placeholder="E-Mail" />
            </div>
            <div>
              <q-input outlined class="r fit" style="margin: 2px 0px " v-model="password" type="password"
                placeholder="Şifre" />
            </div>
            <div class="row justify-end">
              <span style="font-size:8pt" @click="slide = 'forgot'">Şifremi Unuttum</span>
            </div>
            <div class="column m-auto r" style="width:50vw">
              <q-btn rounded class="bg-primary text-secondary" style="width:100%" @click="login">Giriş</q-btn>
            </div>
          </div>
        </q-carousel-slide>
        <!-- Forgot Password Part-->
        <q-carousel-slide name="forgot" class="bg-secondary column no-wrap flex-center">
          <div class="column q-ma-auto" style="width:60vw">
            <div>
              <q-input outlined class="r fit" style="margin: 2px 0px " v-model="email" type="email"
                placeholder="E-Mail" />
            </div>
            <div class="column m-auto r" style="width:50vw">
              <q-btn rounded class="bg-primary text-secondary" style="width:100%" @click="sendMail">Gönder</q-btn>
            </div>
          </div>
        </q-carousel-slide>
      </q-carousel>
    </div>
    <!-- Split Part-->
    <div class="grow">
      <div>
        <div class="row">
          <div class="bg-black q-my-auto q-mr-lg" style="width: 25vw; height: 1px;"></div>
          <span class="m-auto">
            YA DA
          </span>
          <div class="bg-black q-my-auto q-ml-lg" style="width: 25vw; height: 1px;"></div>
        </div>
      </div>
    </div>
    <!-- Bottom Buttons Part-->
    <div class="grow column no-wrap justify-around items-center content-center">
      <div class="grow" style="min-width:50vw">
        <div class="row justify-around">
          <q-btn rounded text-color="secondary" class="m-auto" color="grey-9" label="Google" @click="loginGoogle" />
          <q-btn rounded text-color="secondary" class="m-auto" color="indigo-9" label="Facebook"
            @click="loginFacebook" />
        </div>
      </div>
      <div class="grow">
        <div>
          <span>Hesabın yok mu?</span> <router-link to="/register"><span class="text-blue-6">Kaydol</span></router-link>
        </div>
      </div>
    </div>

  </div>
</template>
<script>
import { user } from '@/store/user';
import { sendPasswordResetEmail, signInWithEmailAndPassword, signOut } from "@/services/app/auth.js"
import { getFirestoreUser, getLocalUserData, setLocalUserData } from '@/services/app/user.js';
import { signInWithGoogle, signInWithFacebook } from "@/services/app/auth"
export default {
  data() {
    return {
      height: window.innerHeight,
      user: user(),
      slide: "login",
      email: "",
      password: ""
    }
  },
  methods: {
    sendMail() {
      console.log(this.email)
      sendPasswordResetEmail(this.email)
        .then(() => this.slide = "login")
        .catch(() => {
          alert("Hata \n\nKüçük bir hata var, Mail yanlış olabilir veya internet bağlantında sorun olabilir.")
          this.slide = "login"
        })
    },
    loginSucces() {
      this.$router.push({ name: "EventsAll" })
    },
    getUserSucces(user, userFire) {
      user.userFire = userFire;
      this.user.setUser(user)
      return setLocalUserData(user).then(()=>{
        getLocalUserData().then(data=>{
          console.log(JSON.stringify(data));
        })
      })
    },
    signInSucces(user, userAuth) {
      user.userAuth = userAuth.user
      return getFirestoreUser(userAuth.user.uid)
        .then(userFire => this.getUserSucces(user, userFire))
    },
    login() {
      let user = { userFire: {}, userAuth: {} }
      signInWithEmailAndPassword(this.email, this.password)
        .then((userAuth) => this.signInSucces(user, userAuth))
        .then(() => this.loginSucces())
        .catch(() => signOut())
    },
    loginGoogle() {
      let user = { userFire: {}, userAuth: {} }
      signInWithGoogle()
        .then((userAuth) => this.signInSucces(user, userAuth))
        .then(() => this.loginSucces())
        .catch(() => signOut())
    },
    loginFacebook() {
      let user = { userFire: {}, userAuth: {} }
      signInWithFacebook()
        .then((userAuth) => this.signInSucces(user, userAuth))
        .then(() => this.loginSucces())
        .catch(() => signOut())

    }
  }, mounted() {

  }
}
</script>
<style scoped>
.r {
  border-radius: 50px;
}

.m-auto {
  margin: auto;
}

.grow {
  flex-grow: 1;
}

.logo-img {
  margin: auto;
  width: 1000px;
  max-width: 75vw;
  height: auto;
  max-height: 30vw;
}

.logo-text {
  margin: auto;
  width: 1000px;
  max-width: 50vw;
  height: auto;
  max-height: 10vw;
}
</style>
<style>
.q-field__control {
  border-radius: 10px !important;
}
</style>

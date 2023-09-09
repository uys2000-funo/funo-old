<template>
  <div class="fit">
    <div class=" full-width absolute-top" style="z-index: -1;">
      <icon-login-top class="full-width" />
    </div>
    <div style="height: 32px; margin-top: 32px; margin-bottom: 16px;">
      <icon-funo-text color="#fff" />
    </div>
    <q-carousel v-model="tab" transition-prev="slide-right" transition-next="slide-left" animated control-color="primary"
      class="rounded-borders fit" style="background-color: #00000000;">
      <q-carousel-slide name="login" class="fit column no-wrap justify-around items-center content-center"
        style="padding: 0px;">
        <div class="fit column no-wrap justify-around items-center content-center">
          <div style="flex-grow: 1; margin-bottom: 16px;">
            <icon-login class="svg-content" style="height: 100%;" />
          </div>
          <span class="text-center"
            style="font-size: 18px;font-weight: 400;line-height: 27px; letter-spacing: 0.5%; padding: 16px; margin-bottom: 24px;">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </span>
          <form class="full-width" @submit.prevent="signIn" style="padding: 0 16px; margin-bottom: 24px;">
            <q-input outlined class="username full-width" name="username" type="text" label="Kullanıcı adı"
              v-model="form.username" style="margin-bottom: 16px;" :disable="disabled" />
            <q-input outlined class="password full-width" name="password" type="password" label="Şifre"
              v-model="form.password" style="margin-bottom: 24px;" :disable="disabled" />
            <q-btn no-caps class="full-width bg-primary text-white" type="submit" label="Giriş Yap"
              style="height: 56px; margin-bottom: 16px;" :disable="disabled" />
            <div class="text-right" style="text-decoration: underline;">
              <span style="font-size: 16px; font-weight: 600; line-height: 20px;" @click="tab = 'forgot'">Şifreni mi
                unuttun?</span>
            </div>
          </form>
          <div class="text-center"
            style="border-top:solid #00000010 1px; padding: 24px 16px 0 16px; margin-bottom: 50px;">
            <q-btn id="login-google" no-caps class="full-width" style="height: 56px; margin-bottom: 16px;"
              @click="signInGoogle" :disable="disabled">
              <div class="row justify-center items-center" style="gap:8px">
                <icon-google />
                Google ile devam et
              </div>
            </q-btn>
            <q-btn id="login-apple" no-caps class="full-width" style="height: 56px; margin-bottom: 30px;"
              @click="signInApple" :disable="disabled">
              <div class="row justify-center items-center" style="gap:8px">
                <icon-apple />
                Apple ile devam et
              </div>
            </q-btn>
            <span style="font-size: 16px; color: #8A8A8A; line-height: 24px;">
              Hesabın yok mu?
              <span class="text-primary" style="font-weight: 700px;">
                Hemen kaydol
              </span>
            </span>
          </div>
        </div>
      </q-carousel-slide>
      <q-carousel-slide name="forgot" class="fit column no-wrap justify-around items-center content-center"
        style="padding: 0px;">
        <div class="full-width column no-wrap justify-around items-center content-center" style="margin-bottom:30vh">
          <icon-forgot style=" margin-bottom: 24px;" />
          <span class="text-center"
            style="font-size: 20px; font-weight: 600; line-height: 30px; letter-spacing:0.5%; padding: 0 16px; margin-bottom: 24px;">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </span>
          <form class="full-width" @submit.prevent="signIn" style="padding: 0 16px; margin-bottom: 24px;">
            <q-input outlined class="username full-width" name="username" type="email" label="Kullanıcı adı"
              style="margin-bottom: 16px;" :disable="disabled" />
            <q-btn no-caps class="full-width bg-primary text-white" type="submit" label="Gönder"
              style="height: 56px; margin-bottom: 16px;" @click="tab = 'login'" :disable="disabled" />
          </form>
        </div>
      </q-carousel-slide>

    </q-carousel>
  </div>
</template>
<script>
import iconFunoText from "@/icons/logo/iconFunoText.vue"
import iconLoginTop from "@/icons/login/iconLoginTop.vue"
import iconLogin from "@/icons/login/iconLogin.vue"
import iconForgot from "@/icons/login/iconForgot.vue"
import iconGoogle from "@/icons/logo/iconGoogle.vue"
import iconApple from "@/icons/logo/iconApple.vue"
import { signInWithApple, signInWithGoogle } from "@/services/app/authentication"
import { showAlert } from "@/services/capacitor/dialog"
import { signinGoogle } from "@/services/firebase/authentication"
signInWithGoogle
export default {
  components: { iconFunoText, iconLoginTop, iconLogin, iconForgot, iconGoogle, iconApple },
  data() {
    return {
      tab: "login",
      form: {
        username: "",
        password: "",
      },
      disabled: false
    }
  },
  methods: {
    signInError(error) {
      console.log(error)
      showAlert("Error", "Firebase Services returned Error")
    },
    signIn() {
      this.disabled = true;
      this.disabled = false;
    },
    async signInGoogle() {
      signinGoogle()
      //this.disabled = true;
      //const user = await signInWithGoogle().catch(this.signInError).finally(() => (this.disabled = false))
      //console.log(user)
    },
    async signInApple() {
      this.disabled = true;
      const user = await signInWithApple().catch(this.signInError).finally(() => (this.disabled = false))
      console.log(user)

    },
  }
}
</script>

<style>
.username.q-field--outlined .q-field__control,
.username.q-field--outlined .q-field__control {
  border-radius: 8px !important;
  border-color: #00000028;
}

#login-google,
#login-apple {
  border: solid #000 1px;
  border-radius: 24px;
}
</style>
<style scoped>
@media (max-height:800px) {
  .svg-content {
    display: none;
  }
}
</style>
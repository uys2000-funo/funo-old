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
              <q-btn rounded class="bg-primary text-secondary" style="width:100%">Giriş</q-btn>
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
              <q-btn rounded class="bg-primary text-secondary" style="width:100%">Gönder</q-btn>
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
          <q-btn rounded text-color="secondary" class="m-auto" color="grey-9" label="Google" />
          <q-btn rounded text-color="secondary" class="m-auto" color="indigo-9" label="Facebook" />
        </div>
      </div>
      <div class="grow">
        <div>
          <span>Hesabın yok mu?</span> <span class="text-blue-6">Kaydol</span>
        </div>
      </div>
    </div>

  </div>
</template>
<script>
export default {
  data() {
    return {
      height: window.innerHeight,
      slide: "login",
      email: "",
      password: ""
    }
  },
  methods:{
    login(){
      
    }
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

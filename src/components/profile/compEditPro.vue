<template>
  <div class="fit a">
    <div class="flex justify-center items-center content-center">
      <q-field class="full-width" outlined stack-label label="Name">
        <template v-slot:control>{{ user?.name }} </template>
      </q-field>
    </div>
    <div class="flex justify-center items-center content-center">
      <q-field class="full-width" outlined stack-label label="User Name">
        <template v-slot:control>{{ user?.userName }} </template>
      </q-field>
    </div>
    <div class="row flex justify-center items-center content-center">
      <q-field outlined stack-label label="E-Posta" class="col-10">
        <template v-slot:control>{{ user?.mail }} </template>
      </q-field>
      <div class="col-2 flex justify-center items-center content-center">
        <img
          class="z"
          :src="require('@/assets/images/profile/editPro/tick.svg')"
          alt=""
        />
      </div>
    </div>
    <div class="flex justify-center items-center content-center">
      <q-field class="full-width" outlined stack-label label="Telefon Numarası">
        <template v-slot:control>{{ user?.phoneNumber }} </template>
      </q-field>
    </div>
    <div class="flex justify-center items-center content-center">
      <q-field class="full-width" outlined stack-label label="Doğum Tarihi">
        <template v-slot:control>{{ user?.birthdate }} </template>
      </q-field>
    </div>
    <div class="flex justify-center items-center content-center">
      <q-field class="full-width" outlined stack-label label="Cinsiyet">
        <template v-slot:control>{{ user?.sex ? "erkek" : "kadın" }} </template>
      </q-field>
    </div>
  </div>
</template>
<script>
import { user } from "@/store/user";
export default {
  data() {
    return {
      user: user().user.userFire,
      text: "",
    };
  },
  mounted() {
    console.log(this.user);
  },
};
</script>
<style scoped>
.a > div {
  height: 7vh;
  min-height: 75px;
}
.z {
  max-width: 100%;
  max-height: 100%;
}
</style>

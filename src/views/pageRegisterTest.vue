<template>
  <div class="f">
    <div>
      <h6>Img</h6>
      <div>
        <q-file v-model="pImg" label="Profil Img" accept=".jpg, image/*" />
      </div>
    </div>
    <div>
      <h6>person</h6>
      <div>
        <q-input v-model="pObj.name" label="Full Name" />
        <q-input v-model="pObj.birth" label="Birth" />
        <q-input v-model="pObj.gender" label="Gender" />
        <q-input v-model="pObj.nick" label="Nick" />
        <q-input v-model="pObj.phone" label="Phone" />
        <q-input v-model="pObj.mail" label="Mail" />
        <q-input v-model="pObj.pass" label="Password" />

        <q-btn
          style="width: 100%"
          label="Register Person"
          @click="registerFunction(pObj)"
        />
      </div>
    </div>
    <div>
      <h6>company</h6>
      <div>
        <q-input v-model="cObj.name" label="Full Name" />
        <q-input v-model="cObj.phone" label="Phone" />
        <q-input v-model="cObj.mail" label="Mail" />
        <q-input v-model="cObj.pass" label="Password" />

        <q-file v-model="tImg" label="Tax Sheet Photo" accept=".jpg, image/*" />

        <q-btn
          style="width: 100%"
          label="Register Person"
          @click="registerFunction(cObj)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { registerFunction } from "../services/firebase/main";
export default {
  data() {
    return {
      pImg: null,
      tImg: null,
      pObj: {
        name: "",
        birth: "",
        gender: "",
        nick: "",
        phone: "",
        mail: "",
        pass: "",
      },
      cObj: {
        name: "",
        phone: "",
        mail: "",
        pass: "",
      },
    };
  },
  methods: {
    registerFunction: function (data) {
      registerFunction(data, this.pImg, this.tImg);
    },
  },
};
</script>

<style scoped>
h6 {
  margin-top: 20px;
}
.f{
  height: 100vh;
  overflow: auto;
}
</style>

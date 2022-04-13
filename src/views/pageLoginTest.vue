<template>
  <div>
    <h6>person</h6>
    <div>
      <q-input v-model="lObj.mail" label="Mail" />
      <q-input v-model="lObj.pass" label="Password" />

      <q-btn style="width: 100%" label="Login" @click="loginFunction(lObj)" />
    </div>
    <div>
      <q-btn
        style="width: 100%"
        label="Login Google"
        @click="loginFunctionGoogle(lObj)"
      />
    </div>
  </div>
</template>

<script>
import { loginFunction } from "../services/firebase/main";
export default {
  data() {
    return {
      lObj: {
        mail: "",
        pass: "",
      },
    };
  },
  methods: {
    loginFunction: function (data) {
      loginFunction(data, this.pImg, this.tImg);
    },
    handleCredentialResponse: function (response) {
      console.log("Encoded JWT ID token: " + response.credential);
    },
  },
  mounted() {},
};
</script>

<style scoped>
h6 {
  margin-top: 20px;
}
</style>
